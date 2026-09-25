"use client";

import { useActionState } from "react";

import {
  updateTask,
  type TaskActionState,
} from "@/app/actions/task-actions";

import type { Operator } from "@/types/operator";
import type { Task } from "@/types/task";

import TaskFormFields
  from "@/components/TaskFormFields";

type Props = {
  task: Task;
  operators: Operator[];
};

const initialState: TaskActionState = {
  errors: {},
  message: null,
};

export default function EditTaskForm({
  task,
  operators,
}: Props) {
  const updateTaskWithId =
    updateTask.bind(null, task.id);

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    updateTaskWithId,
    initialState
  );

  return (
    <form
        action={formAction}
        className="task-form"
    >
      <TaskFormFields
        task={task}
        operators={operators}
        state={state}
      />

      <div className="form-actions">
        <button
            type="submit"
            className="button"
            disabled={isPending}
        >
            {isPending
            ? "更新中..."
            : "更新"}
        </button>
        </div>
    </form>
  );
}