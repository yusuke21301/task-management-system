"use client";

import type { FormEvent } from "react";
import { deleteTask } from "@/app/actions/task-actions";

type Props = {
  id: number;
  taskName: string;
};

export default function DeleteButton({
  id,
  taskName,
}: Props) {
  const deleteTaskWithId = deleteTask.bind(null, id);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    const confirmed = window.confirm(
      `「${taskName}」を削除しますか？`
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={deleteTaskWithId}
      onSubmit={handleSubmit}
      style={{ display: "inline" }}
    >
      <button 
        type="submit"
        className="button button-danger"
      >
        削除
      </button>
    </form>
  );
}