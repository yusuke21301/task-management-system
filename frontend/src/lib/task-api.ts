import type { Task } from "@/types/task";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/api/Tasks`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("タスクの取得に失敗しました。");
  }

  return response.json();
}

export async function getTask(id: number): Promise<Task> {
  const response = await fetch(
    `${API_BASE_URL}/api/Tasks/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("タスクの取得に失敗しました。");
  }

  return response.json();
}