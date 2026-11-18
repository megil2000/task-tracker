import { app } from 'electron'
import { randomUUID } from 'crypto'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { NewTask, Task, TaskPatch } from '../shared/types'

// Простейшее хранилище: JSON-файл в userData. Потом можно заменить на SQLite.
const file = (): string => join(app.getPath('userData'), 'tasks.json')

let tasks: Task[] | null = null

function load(): Task[] {
  if (tasks) return tasks
  tasks = existsSync(file()) ? JSON.parse(readFileSync(file(), 'utf-8')) : []
  return tasks!
}

function save(): void {
  writeFileSync(file(), JSON.stringify(tasks, null, 2))
}

export function listTasks(): Task[] {
  return load()
}

export function createTask(input: NewTask): Task {
  const now = Date.now()
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    description: input.description ?? '',
    status: input.status ?? 'todo',
    createdAt: now,
    updatedAt: now
  }
  load().push(task)
  save()
  return task
}

export function updateTask(id: string, patch: TaskPatch): Task {
  const task = load().find((t) => t.id === id)
  if (!task) throw new Error(`Task ${id} not found`)
  Object.assign(task, patch, { updatedAt: Date.now() })
  save()
  return task
}

export function removeTask(id: string): void {
  tasks = load().filter((t) => t.id !== id)
  save()
}
