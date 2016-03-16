import Immutable from 'immutable'
import uuid from 'uuid'

export const isAppList = (props, name, component) => {
  let candidate = Reflect.get(props, name)

  if (!candidate) {
    return new Error(`${component} requires an immutable app list in ${name}`)
  }

  if (Immutable.List.isList(candidate)) { return }

  return new Error(`${component}: '${name}' must be an Immutable.List;`)
}

export const isApp = (props, name, component) => {
  let candidate = Reflect.get(props, name)

  if (!candidate) {
    return new Error(`${component}: '${name}' is required;`)
  }

  if (Immutable.Map.isMap(candidate)) { return }

  return new Error(`${component}: '${name}' must be an Immutable.Map;`)
}
