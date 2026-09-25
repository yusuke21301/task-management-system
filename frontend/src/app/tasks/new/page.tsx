import Link from "next/link";
import { getOperators } from "@/lib/operator-api";
import CreateTaskForm from "@/components/CreateTaskForm";

export default async function NewTaskPage() {
  const operators = await getOperators();

  return (
    <main>
      <h1>タスク新規登録</h1>

      <CreateTaskForm
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