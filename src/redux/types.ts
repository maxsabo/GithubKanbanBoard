export type Issue = {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
  };
  comments: number;
  state: "open" | "closed";
  assignee: {
    login: string;
  } | null;
};
