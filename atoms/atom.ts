import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const listNotesAtom = atom([
  {
    id: 1,
    title: "Draft Database Schema",
    notes:
      "Define the initial tables for users, tasks, and tags. Ensure proper indexing for foreigkjsfksdflksdflsdlfsldfs;",
  },
  {
    id: 2,
    title: "Update Project README",
    notes:
      "Add installation instructions, environment variable setup, and a brief architecturalsjfjlsdhfkjsdfkjlsd",
  },
]);

type Note = {
  id: number;
  title: string;
  notes: string;
};

export const allNotesAtom = atomWithStorage<Note[]>("notes-storage", []);

export const isContainerGrid = atom(false);
