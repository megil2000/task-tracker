import { ElectronAPI } from '@electron-toolkit/preload'
import type { TasksApi } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: { tasks: TasksApi }
  }
}
