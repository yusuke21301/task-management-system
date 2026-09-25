"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type TaskActionState = {
  errors?: {
    taskName?: string[];
    operatorId?: string[];
    status?: string[];
    plannedDate?: string[];
  };
  message?: string | null;
};

type TaskInput = {
  taskName: string;
  operatorId: number;
  status: number;
  plannedDate: string | null;
};

function getTaskInput(formData: FormData): TaskInput {
  const taskName =
    formData.get("taskName")?.toString().trim() ?? "";

  const operatorId =
    Number(formData.get("operatorId"));

  const status =
    Number(formData.get("status"));

  const plannedDateText =
    formData.get("plannedDate")?.toString() ?? "";

  return {
    taskName,
    operatorId,
    status,
    plannedDate:
      plannedDateText === ""
        ? null
        : plannedDateText,
  };
}

function validateTask(
  input: TaskInput
): TaskActionState["errors"] {
  const errors: TaskActionState["errors"] = {};

  if (input.taskName === "") {
    errors.taskName = [
      "タスク名を入力してください。",
    ];
  } else if (input.taskName.length > 200) {
    errors.taskName = [
      "タスク名は200文字以内で入力してください。",
    ];
  }

  if (
    !Number.isInteger(input.operatorId) ||
    input.operatorId <= 0
  ) {
    errors.operatorId = [
      "担当者を選択してください。",
    ];
  }

  if (![0, 1, 2].includes(input.status)) {
    errors.status = [
      "ステータスが正しくありません。",
    ];
  }

  return errors;
}

export async function createTask(
  _previousState: TaskActionState,
  formData: FormData
): Promise<TaskActionState> {
  const input = getTaskInput(formData);

  const errors = validateTask(input);

  if (Object.keys(errors ?? {}).length > 0) {
    return {
      errors,
      message: "入力内容を確認してください。",
    };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/Tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!response.ok) {
    return {
      errors: {},
      message: "タスクの登録に失敗しました。",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateTask(
  id: number,
  _previousState: TaskActionState,
  formData: FormData
): Promise<TaskActionState> {
  const input = getTaskInput(formData);

  const errors = validateTask(input);

  if (Object.keys(errors ?? {}).length > 0) {
    return {
      errors,
      message: "入力内容を確認してください。",
    };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/Tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!response.ok) {
    return {
      errors: {},
      message: "タスクの更新に失敗しました。",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteTask(
  id: number,
  _formData: FormData
) {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/Tasks/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "タスクの削除に失敗しました。"
    );
  }

  revalidatePath("/");
}