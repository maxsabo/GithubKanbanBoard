import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  repoUrl: string
  loading: boolean
};

const initialState: UIState = {
  repoUrl: '',
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRepoUrl: (state, action: PayloadAction<string>) => {
      state.repoUrl = action.payload;
      localStorage.setItem("repoUrl", action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading, setRepoUrl } = uiSlice.actions;
export default uiSlice.reducer;
