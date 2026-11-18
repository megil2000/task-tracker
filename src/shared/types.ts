export type TaskStatus = 'todo' | 'in_progress' | 'done'

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'К выполнению',
  in_progress: 'В работе',
  done: 'Готово'
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: number
  updatedAt: number
}

export type NewTask = Pick<Task, 'title'> & Partial<Pick<Task, 'description' | 'status'>>
export type TaskPatch = Partial<Pick<Task, 'title' | 'description' | 'status'>>

export interface TasksApi {
  list(): Promise<Task[]>
  create(input: NewTask): Promise<Task>
  update(id: string, patch: TaskPatch): Promise<Task>
  remove(id: string): Promise<void>
}
