import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { COUNTRIES_DICTIONARY } from '../components/features/forms/constants/countries';
import type { SubmittedForm, UserFormData } from '../types/user';

export interface Base64UserFormData extends Omit<UserFormData, 'profileImage'> {
  profileImage: string;
}

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
    addSubmission: (state, action: PayloadAction<Base64UserFormData>) => {
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

export const selectCountries = (state: RootState) => state.user.countries;
export const selectSubmissions = (state: RootState) => state.user.submissions;
export default userSlice.reducer;