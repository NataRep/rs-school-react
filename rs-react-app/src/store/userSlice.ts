import { createSlice, type PayloadAction, } from '@reduxjs/toolkit';
import { COUNTRIES_DICTIONARY } from '../constants/countries';
import type { SubmittedForm, UserFormData } from '../types/user';

interface UserState {
  submissions: SubmittedForm[];
  countries: string[];
}

const initialState: UserState = {
  submissions: [],
  countries: [...COUNTRIES_DICTIONARY],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<UserFormData>) => {
      const newSubmission: SubmittedForm = {
        ...action.payload,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
      };
      state.submissions.push(newSubmission);
    },

    removeSubmission: (state, action: PayloadAction<string>) => {
      state.submissions = state.submissions.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addSubmission, removeSubmission } = userSlice.actions;
export default userSlice.reducer;