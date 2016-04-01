import { fromJS, Map } from 'immutable'
import { create, get, order, reorder } from './entities.behavior'

describe("create", () => {
  let entity = create({ name: "Your super duper entity name" })

  it("is an immutable map", () => { expect(entity).to.be.instanceof(Map) })
  it("has an ID", () => { expect(entity.get('name')).to.be.ok })
})

describe("reorder", () => {
  let firstEntity = create({ name: 'First entity' })
  let secondEntity = create({ name: 'Second entity' })
  let thirdEntity = create({ name: 'Third entity' })
  let entities = fromJS([firstEntity, secondEntity, thirdEntity])
  let ids = entities.map(entity => entity.get('name'))
  let index = 0
  let newOrder = reorder(thirdEntity.get('name'), index, ids)

  it("is the same length", () => {
    expect(newOrder.count()).to.equal(ids.count())
  })

  it("puts the entity at the given spot", () => {
    expect(newOrder.get(index)).to.equal(thirdEntity.get('name'))
  })
})
