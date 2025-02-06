import Vant from 'vant'
import type { App } from 'vue'

export function useVant(app: App<Element>) {
  app.use(Vant)
}
