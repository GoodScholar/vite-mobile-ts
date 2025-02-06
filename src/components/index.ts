/**
 * @description 自动将 ./src/components/global 下的组件注册成为全局组件
 * @param  app 当前应用实例
 * @returns {void} void
 */

export function registerGlobalComponent(app: { component: (arg0: string, arg1: any) => void }) {
  const components = import.meta.glob('./*', { eager: true })

  for (const path in components) {
    let componentName = path.match(/(.*)\.vue$/)?.[1]
    if (componentName && componentName.includes('./')) {
      componentName = componentName.replace('./', '')
      const component = (components[path] as { default: any }).default
      app.component(componentName, component)
    }
  }
}
