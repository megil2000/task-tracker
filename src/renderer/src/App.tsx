import { useState } from 'react'
import { STATUS_LABELS } from '../../shared/types'
import type { TaskStatus } from '../../shared/types'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import { useTasks } from './useTasks'

type Filter = 'all' | TaskStatus

function App(): React.JSX.Element {
  const { tasks, create, update, remove } = useTasks()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)

  return (
    <main className="app">
      <h1>Задачи</h1>

      <TaskForm onSubmit={create} />

      <nav className="filters">
        {(['all', 'todo', 'in_progress', 'done'] as Filter[]).map((f) => (
          <button key={f} className={f === filter ? 'active' : ''} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Все' : STATUS_LABELS[f]}
          </button>
        ))}
      </nav>

      <ul className="task-list">
        {visible.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={update} onRemove={remove} />
        ))}
        {visible.length === 0 && <li className="empty">Пусто</li>}
      </ul>
    </main>
  )
}

export default App
