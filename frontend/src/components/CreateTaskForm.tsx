"use client";

import { useActionState } from "react";

import {
  createTask,
  type TaskActionState,
} from "@/app/actions/task-actions";

import type { Operator } from "@/types/operator";

import TaskFormFields
  from "@/components/TaskFormFields";

type Props = {
  operators: Operator[];
};

const initialState: TaskActionState = {
  errors: {},
  message: null,
};

export default function CreateTaskForm({
  operators,
}: Props) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createTask,
    initialState
  );

  return (
    <form
      action={formAction}
      className="task-form"
    >
      <TaskFormFields
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
            ? "登録中..."
            : "登録"}
        </button>
      </div>
    </form>
  );
}