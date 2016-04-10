import { fromJS } from 'immutable'
import { reorder } from '../shared/entities.behavior'

export function addApp(apps, app) {
  return apps.set(app.get('name'), app)
}

export function addComponent(apps, appName, name) {
  let app = apps.get(appName) || fromJS({})

  return apps.set(
    appName,
    app.update(
      'components',
      list => {
        if (!list) { return fromJS([]) }

        return list.indexOf(name) >= 0 ? list : list.push(name)
      }
    )
  )
}

export function removeComponent(apps, appName, name) {
  let app = apps.get(appName) || fromJS({})

  return apps.set(
    appName,
    app.update(
      'components',
      list => {
        if (!list) { return fromJS([]) }

        return list.splice(list.indexOf(name), 1)
      }
    )
  )
}

export function sortComponents(apps, appName, index, name) {
  let app = apps.get(appName)

  return apps.set(
    appName,
    app.update(
      'components',
      list => reorder(name, index, list)
    )
  )
}
