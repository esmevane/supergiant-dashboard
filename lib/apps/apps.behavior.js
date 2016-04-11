import { fromJS } from 'immutable'

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
        if (!list) { return fromJS([name]) }

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
