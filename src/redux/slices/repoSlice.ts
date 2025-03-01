import { fetchRepo } from "@/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type RepoState = {
  owner: string;
  name: string;
  stars: number;
  error: string | null;
};

const initialState: RepoState = {
  owner: "",
  name: "",
  stars: 0,
  error: null,
};

export const loadRepo = createAsyncThunk(
  "repo/loadRepo",
  async ({ owner, repo }: { owner: string; repo: string }, { rejectWithValue }) => {
    try {
      return await fetchRepo(owner, repo);
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Cannot load repository ${owner}/${repo}`);
    }
  },
);

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepo: (_state, action: PayloadAction<RepoState>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRepo.fulfilled, (state, action) => {
        state.owner = action.payload.owner.login;
        state.name = action.payload.name;
        state.stars = action.payload.stargazers_count;
        state.error = null;
      })
      .addCase(loadRepo.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setRepo } = repoSlice.actions;
export default repoSlice.reducer;
