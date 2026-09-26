import Link from "next/link";

import { getTasks } from "@/lib/task-api";
import { getOperators } from "@/lib/operator-api";
import DeleteButton from "@/components/DeleteButton";

const statusLabels: Record<number, string> = {
  0: "未着手",
  1: "進行中",
  2: "完了",
};

type Props = {
  searchParams: Promise<{
    taskName?: string;
    operatorId?: string;
    status?: string;
  }>;
};

function formatDateTime(value: string): string {
  const date = new Date(value);

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function Home({
  searchParams,
}: Props) {
  const params = await searchParams;

  const [tasks, operators] = await Promise.all([
    getTasks(),
    getOperators(),
  ]);

  const taskName =
    params.taskName?.trim() ?? "";

  const operatorId =
    params.operatorId ?? "";

  const status =
    params.status ?? "";

  const filteredTasks = tasks.filter((task) => {
    const matchTaskName =
      taskName === "" ||
      task.taskName
        .toLowerCase()
        .includes(taskName.toLowerCase());

    const matchOperator =
      operatorId === "" ||
      task.operatorId === Number(operatorId);

    const matchStatus =
      status === "" ||
      task.status === Number(status);

    return (
      matchTaskName &&
      matchOperator &&
      matchStatus
    );
  });

  return (
    <main>
      <div className="page-header">
        <h1>タスク管理</h1>

        <Link
          href="/tasks/new"
          className="button"
        >
          ＋ 新規登録
        </Link>
      </div>

      <form className="search-form">
        <div>
          <label htmlFor="taskName">
            タスク名
          </label>

          <input
            id="taskName"
            name="taskName"
            type="text"
            defaultValue={taskName}
          />
        </div>

        <div>
          <label htmlFor="operatorId">
            担当者
          </label>

          <select
            id="operatorId"
            name="operatorId"
            defaultValue={operatorId}
          >
            <option value="">
              すべて
            </option>

            {operators.map((operator) => (
              <option
                key={operator.id}
                value={operator.id}
              >
                {operator.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status">
            ステータス
          </label>

          <select
            id="status"
            name="status"
            defaultValue={status}
          >
            <option value="">
              すべて
            </option>

            <option value="0">
              未着手
            </option>

            <option value="1">
              進行中
            </option>

            <option value="2">
              完了
            </option>
          </select>
        </div>

        <div className="search-actions">
          <button
            type="submit"
            className="button"
          >
            検索
          </button>

          <Link
            href="/"
            className="button button-secondary"
          >
            クリア
          </Link>
        </div>
      </form>

      <p>
        {filteredTasks.length} 件
      </p>

      <div className="task-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>タスク名</th>
              <th>担当者</th>
              <th>ステータス</th>
              <th>予定日</th>
              <th>更新日時</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskName}</td>
                <td>{task.operatorName}</td>
                <td>
                  {statusLabels[task.status] ?? "不明"}
                </td>
                <td>
                  {task.plannedDate?.slice(0, 10).replaceAll("-", "/") ?? "-"}
                </td>
                <td>
                  {formatDateTime(task.updatedAt)}
                </td>

                <td>
                  <div className="actions">
                    <Link
                      href={`/tasks/${task.id}/edit`}
                    >
                      編集
                    </Link>

                    <DeleteButton
                      id={task.id}
                      taskName={task.taskName}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}