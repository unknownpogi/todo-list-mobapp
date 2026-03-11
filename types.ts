export type Note = {
  documentId: string;
  title: string;
  notes: string;
};

export type Task = {
  id: number;
  title: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
};

export type FormFields = "title" | "note";

export type TaskPayload = {
  title: string;
  notes: string;
};
