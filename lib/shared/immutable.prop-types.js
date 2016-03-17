import Immutable from 'immutable'
import uuid from 'uuid'

export const isList = (props, name, component) => {
  let candidate = Reflect.get(props, name)

  if (!candidate) {
    return new Error(`${component} expects an Immutable.List for '${name}';`)
  }

  if (Immutable.List.isList(candidate)) { return }

  return new Error(`${component}: '${name}' must be an Immutable.List;`)
}

export const isMap = (props, name, component) => {
  let candidate = Reflect.get(props, name)

  if (!candidate) {
    return new Error(`${component} expects an Immutable.Map for '${name}';`)
  }

  if (Immutable.Map.isMap(candidate)) { return }

  return new Error(`${component}: '${name}' must be an Immutable.Map;`)
}
