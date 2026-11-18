import { useEffect, useState } from 'react'
import type { NewTask, Task, TaskPatch } from '../../shared/types'

interface UseTasks {
  tasks: Task[]
  create: (input: NewTask) => Promise<void>
  update: (id: string, patch: TaskPatch) => Promise<void>
  remove: (id: string) => Promise<void>
}

export function useTasks(): UseTasks {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    window.api.tasks.list().then(setTasks)
  }, [])

  const reload = async (): Promise<void> => setTasks(await window.api.tasks.list())

  const create = async (input: NewTask): Promise<void> => {
    await window.api.tasks.create(input)
    await reload()
  }

  const update = async (id: string, patch: TaskPatch): Promise<void> => {
    await window.api.tasks.update(id, patch)
    await reload()
  }

  const remove = async (id: string): Promise<void> => {
    await window.api.tasks.remove(id)
    await reload()
  }

  return { tasks, create, update, remove }
}
