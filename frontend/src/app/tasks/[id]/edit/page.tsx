import Link from "next/link";

import { getTask } from "@/lib/task-api";
import { getOperators } from "@/lib/operator-api";

import EditTaskForm
  from "@/components/EditTaskForm";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const taskId = Number(id);

  const [task, operators] =
    await Promise.all([
      getTask(taskId),
      getOperators(),
    ]);

  return (
    <main>
      <h1>タスク編集</h1>

      <EditTaskForm
        task={task}
        operators={operators}
      />

      <p>
        <Link href="/">
          一覧へ戻る
        </Link>
      </p>
    </main>
  );
}