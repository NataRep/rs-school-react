import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SubmittedForm } from '../../../types/user';
import UserCard from './UserCard';

const mockUser: SubmittedForm = {
  id: 'user-id-123',
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  gender: 'male',
  country: 'USA',
  profileImage: 'https://example.com/avatar.jpg',
  submittedAt: '2026-06-08T12:00:00.000Z',
  password: 'hashed_password_or_string',
  confirmPassword: 'hashed_password_or_string',
  acceptTerms: true,
};

const mockUserNoImage: SubmittedForm = {
  ...mockUser,
  profileImage: '',
};

describe('UserCard', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-06-08T12:05:00.000Z'));
    mockOnDelete.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render user details correctly', () => {
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />);

    expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('30 years')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('should render profile image when profileImage is provided', () => {
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />);

    const img = screen.getByAltText("John Doe's avatar");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('should render initials placeholder when profileImage is missing', () => {
    render(<UserCard user={mockUserNoImage} onDelete={mockOnDelete} />);

    expect(screen.queryByAltText("John Doe's avatar")).not.toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('should format the submission date correctly', () => {
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />);

    const timeElement = screen.getByText(/8\.06\.2026/);
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', mockUser.submittedAt);
  });

  it('should call onDelete with user id when delete button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />);

    const deleteBtn = screen.getByRole('button', { name: '×' });
    await user.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith('user-id-123');
  });

  it('should handle highlighting lifestyle for new cards and clean up timers', () => {
    jest.setSystemTime(new Date('2026-06-08T12:00:01.000Z'));

    const { container } = render(
      <UserCard user={mockUser} onDelete={mockOnDelete} />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('newCardHighlight');

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(card).not.toHaveClass('newCardHighlight');

    jest.setSystemTime(new Date('2026-06-08T12:00:01.000Z'));
    const spyClearTimeout = jest.spyOn(globalThis, 'clearTimeout');

    const { unmount: unmountFreshCard } = render(
      <UserCard user={mockUser} onDelete={mockOnDelete} />
    );

    unmountFreshCard();

    expect(spyClearTimeout).toHaveBeenCalled();
    spyClearTimeout.mockRestore();
  });

  it('should not highlight the card if elapsed time is 4000ms or more', () => {
    jest.setSystemTime(new Date('2026-06-08T12:00:04.000Z'));

    const { container } = render(<UserCard user={mockUser} onDelete={mockOnDelete} />);

    const card = container.firstChild;
    expect(card).not.toHaveClass('newCardHighlight');
  });
});