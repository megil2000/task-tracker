import { STATUS_LABELS } from '../../../shared/types'
import type { Task, TaskPatch, TaskStatus } from '../../../shared/types'

export default function TaskItem({
  task,
  onUpdate,
  onRemove
}: {
  task: Task
  onUpdate: (id: string, patch: TaskPatch) => void
  onRemove: (id: string) => void
}): React.JSX.Element {
  return (
    <li className={`task task--${task.status}`}>
      <span className="task__title">{task.title}</span>
      <select
        value={task.status}
        onChange={(e) => onUpdate(task.id, { status: e.target.value as TaskStatus })}
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button onClick={() => onRemove(task.id)}>✕</button>
    </li>
  )
}
