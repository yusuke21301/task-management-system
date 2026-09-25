import type { Operator } from "@/types/operator";
import type { Task } from "@/types/task";
import type { TaskActionState } from "@/app/actions/task-actions";

type Props = {
  operators: Operator[];
  task?: Task;
  state: TaskActionState;
};

export default function TaskFormFields({
  operators,
  task,
  state,
}: Props) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="taskName">
          タスク名
        </label>

        <input
          id="taskName"
          name="taskName"
          type="text"
          maxLength={200}
          required
          defaultValue={task?.taskName ?? ""}
          aria-invalid={
            !!state.errors?.taskName
          }
        />

        {state.errors?.taskName?.map(
          (error) => (
            <p
              key={error}
              className="form-error"
            >
              {error}
            </p>
          )
        )}
      </div>

      <div className="form-group">
        <label htmlFor="operatorId">
          担当者
        </label>

        <select
          id="operatorId"
          name="operatorId"
          required
          defaultValue={
            task?.operatorId ?? ""
          }
        >
          {!task && (
            <option value="" disabled>
              選択してください
            </option>
          )}

          {operators.map((operator) => (
            <option
              key={operator.id}
              value={operator.id}
            >
              {operator.name}
            </option>
          ))}
        </select>

        {state.errors?.operatorId?.map(
          (error) => (
            <p
              key={error}
              className="form-error"
            >
              {error}
            </p>
          )
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">
          ステータス
        </label>

        <select
          id="status"
          name="status"
          defaultValue={task?.status ?? 0}
        >
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

      <div className="form-group">
        <label htmlFor="plannedDate">
          予定日
        </label>

        <input
          id="plannedDate"
          name="plannedDate"
          type="date"
          defaultValue={
            task?.plannedDate?.slice(0, 10) ?? ""
          }
        />
      </div>

      {state.message && (
        <p className="form-error">
          {state.message}
        </p>
      )}
    </>
  );
}