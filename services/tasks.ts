import { TaskPayload } from "@/types";
import instance from "@/utils/axios";

export const getAllTasks = async () => {
  const res = await instance.get("/tasks?sort=updatedAt:desc");
  return res.data;
};

export const getTask = async (id: string) => {
  const res = await instance.get(`/tasks/${id}`);
  return res.data;
};

export const addTask = async (payload: TaskPayload) => {
  const res = await instance.post(`/tasks`, {
    data: payload,
  });
  return res.data;
};

export const updateTask = async (payload: {
  id: string;
  title: string;
  notes: string;
}) => {
  const { id, ...rest } = payload;

  const res = await instance.put(`/tasks/${id}`, {
    data: rest,
  });
  return res.data;
};

export const deleteSelectedTask = async (id: string) => {
  return await instance.delete(`/tasks/${id}`);
};
