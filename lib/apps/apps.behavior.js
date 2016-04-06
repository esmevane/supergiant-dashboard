import Immutable from 'immutable'
import { reorder } from '../shared/entities.behavior'

export function addApp(apps, app) {
  return apps.set(app.get('name'), app)
}

export function addComponent(apps, appName, componentName) {
  let app = apps.get(appName) || Immutable.fromJS({})
  let componentNames = app.get('components') || Immutable.fromJS([])

  return apps.set(
    appName,
    app.set('components', componentNames.push(componentName))
  )
}

export function removeComponent(apps, appName, componentName) {
  let app = apps.get(appName) || Immutable.fromJS({})
  let componentNames = app.get('components') || Immutable.fromJS([])

  return apps.set(
    appName,
    app.set('components',
      componentNames.splice(componentNames.indexOf(componentName), 1)
    )
  )
}

export function sortComponents(apps, name, index, componentName) {
  let app = apps.get(name)

  return apps.set(
    name,
    app.set('components', reorder(
      componentName,
      index,
      app.get('components')
    ))
  )
}
