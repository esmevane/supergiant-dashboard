export function denormalize({ result, entities }, schema) {
  const serialize = ({ name, has }) => {
    let space = entities[name]
    if (has) {
      return result.map(id => {
        let resource = space[id]
        let reducer = (previous, current) => {
          let ids = resource[current.name]
          let result = denormalize({ result: ids, entities }, current)

          return { ...previous, [current.name]: result }
        }

        let resources = has.reduce(reducer, {})

        return { ...resource, ...resources }
      })
    } else {
      return result.map(id => space[id])
    }
  }

  return Array.isArray(schema) ? schema.map(serialize) : serialize(schema)
}
