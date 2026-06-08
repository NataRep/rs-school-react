import type { RootState } from '.';
import type { SubmittedForm, UserFormData } from '../types/user';
import userReducer, { addSubmission, removeSubmission, selectSubmissions } from './userSlice';

describe('userSlice', () => {
  const mockInitialState = {
    submissions: [],
  };

  const mockFormData: UserFormData<string> = {
    name: 'Luke Skywalker',
    email: 'luke@galaxy.far',
    password: 'securepassword123',
    confirmPassword: 'securepassword123',
    acceptTerms: true,
  } as unknown as UserFormData<string>;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-06-08T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle initial state reducer requirements', () => {
    const result = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual({ submissions: [] });
  });

  it('should handle addSubmission action creator and reducer logic', () => {
    const nextState = userReducer(mockInitialState, addSubmission(mockFormData));

    expect(nextState.submissions).toHaveLength(1);

    const submission = nextState.submissions[0];
    expect(submission).not.toBeNull();
    expect(submission.name).toBe('Luke Skywalker');
    expect(submission.id).toBeDefined();
    expect(typeof submission.id).toBe('string');
    expect(submission.submittedAt).toBe('2026-06-08T12:00:00.000Z');
  });

  it('should handle removeSubmission action creator and reducer logic', () => {
    const existingSubmission: SubmittedForm = {
      ...mockFormData,
      id: 'test-uuid-12345',
      submittedAt: '2026-06-08T12:00:00.000Z',
    };

    const stateWithData = {
      submissions: [existingSubmission],
    };

    const nextState = userReducer(stateWithData, removeSubmission('test-uuid-12345'));

    expect(nextState.submissions).toHaveLength(0);
  });

  it('should correctly extract data via selectSubmissions selector', () => {
    const existingSubmission: SubmittedForm = {
      ...mockFormData,
      id: 'test-uuid-12345',
      submittedAt: '2026-06-08T12:00:00.000Z',
    };

    const mockRootState = {
      user: {
        submissions: [existingSubmission],
      },
    } as RootState;

    const selectedData = selectSubmissions(mockRootState);

    expect(selectedData).toHaveLength(1);
    expect(selectedData[0]).toEqual(existingSubmission);
  });
});