import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { removeSubmission } from '../../../../../store/userSlice';
import UserGrid from './UserGrid';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../../UI/UserCard/UserCard', () => {
  return function MockUserCard({ user, onDelete }: { user: { id: string; name: string }; onDelete: (id: string) => void }) {
    return (
      <div data-testid={`user-card-${user.id}`}>
        <span>{user.name}</span>
        <button type="button" onClick={() => onDelete(user.id)}>
          Delete {user.name}
        </button>
      </div>
    );
  };
});

describe('UserGrid', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render the empty state message when the selection array is empty', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    render(<UserGrid />);

    expect(screen.getByText('The user list is empty')).toBeInTheDocument();
    expect(screen.queryByTestId(/user-card-/)).not.toBeInTheDocument();
  });

  it('should map and render elements for each individual user object present in state', () => {
    const mockUsers = [
      { id: 'uuid-1', name: 'Luke Skywalker' },
      { id: 'uuid-2', name: 'Leia Organa' },
    ];
    (useSelector as unknown as jest.Mock).mockReturnValue(mockUsers);

    render(<UserGrid />);

    expect(screen.queryByText('The user list is empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('user-card-uuid-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-card-uuid-2')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('should dispatch the remove action with appropriate identifiers when item deletion is invoked', async () => {
    const user = userEvent.setup();
    const mockUsers = [{ id: 'id-to-remove-999', name: 'Han Solo' }];
    (useSelector as unknown as jest.Mock).mockReturnValue(mockUsers);

    render(<UserGrid />);

    const deleteBtn = screen.getByRole('button', { name: 'Delete Han Solo' });
    await user.click(deleteBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(removeSubmission('id-to-remove-999'));
  });
});