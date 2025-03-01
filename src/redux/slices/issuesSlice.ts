import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue } from "../types";
import { fetchIssues } from "@/api";

type ColumnState = {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
};

type IssuesState = {
  repos: Record<string, ColumnState>;
  currentRepo: string;
  error: string | null;
};

const initialState: IssuesState = {
  repos: {},
  currentRepo: "",
  error: null,
};

export const loadIssues = createAsyncThunk(
  "issues/loadIssues",
  async ({ owner, repo }: { owner: string; repo: string }, { rejectWithValue }) => {
    try {
      return await fetchIssues(owner, repo);
    } catch (error) {
      console.log(error);
      return rejectWithValue(`Cannot load issues for ${owner}/${repo}`);
    }
  },
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<{ repoKey: string; columns: ColumnState }>) => {
      const { repoKey, columns } = action.payload;
      state.repos[repoKey] = columns;
    },
    moveIssue: (
      state,
      action: PayloadAction<{
        repoKey: string;
        id: number;
        from: keyof ColumnState;
        to: keyof ColumnState;
      }>,
    ) => {
      const { repoKey, id, from, to } = action.payload;
      const repoState = state.repos[repoKey];
      if (!repoState) return;

      const issue = repoState[from].find((i) => i.id === id);
      if (!issue) return;

      repoState[from] = repoState[from].filter((i) => i.id !== id);
      repoState[to].push(issue);
    },
    setCurrentRepo: (state, action: PayloadAction<string>) => {
      state.currentRepo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIssues.fulfilled, (state, action) => {
        const issues = action.payload as Issue[];
        const { owner, repo } = action.meta.arg;
        const repoKey = `${owner}/${repo}`;
        if (!state.repos[repoKey]) {
        state.repos[repoKey] = {
          todo: issues.filter((issue) => issue.state === "open" && !issue.assignee),
          inProgress: issues.filter((issue) => issue.state === "open" && !!issue.assignee),
          done: issues.filter((issue) => issue.state === "closed"),
        };
      }
        state.currentRepo = repoKey;
        state.error = null;
      })
      .addCase(loadIssues.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setIssues, moveIssue, setCurrentRepo } = issuesSlice.actions;
export default issuesSlice.reducer;
