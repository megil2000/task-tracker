import { useState } from 'react'
import type { NewTask } from '../../../shared/types'

export default function TaskForm({
  onSubmit
}: {
  onSubmit: (input: NewTask) => void
}): React.JSX.Element {
  const [title, setTitle] = useState('')

  const submit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim() })
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Новая задача…" />
      <button type="submit">Добавить</button>
    </form>
  )
}
