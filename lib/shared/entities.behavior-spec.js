import { fromJS, Map } from 'immutable'
import { create, get, order, reorder } from './entities.behavior'

describe("create", () => {
  let entity = create({ name: "Your super duper entity name" })

  it("is an immutable map", () => { expect(entity).to.be.instanceof(Map) })
  it("has an ID", () => { expect(entity.get('id')).to.be.ok })
})

describe("get", () => {
  let firstEntity = create({ name: 'First entity' })
  let secondEntity = create({ name: 'Second entity' })
  let entities = fromJS([firstEntity, secondEntity])
  let entity = get(firstEntity.get('id'), entities)

  it("retrieves the correct entity", () => { expect(entity).to.equal(firstEntity) })
})

describe("order", () => {
  let firstEntity = create({ name: 'First entity' })
  let secondEntity = create({ name: 'Second entity' })
  let thirdEntity = create({ name: 'Third entity' })
  let entities = fromJS([firstEntity, secondEntity, thirdEntity])
  let ids = entities.map(entity => entity.get('id'))
  let index = 0
  let newOrder = reorder(thirdEntity.get('id'), index, ids)
  let ordered = order(newOrder, entities)

  it("is the same length", () => {
    expect(ordered.count()).to.equal(entities.count())
  })

  it("puts the entity at the given spot", () => {
    expect(ordered.get(index)).to.equal(thirdEntity)
  })
})

describe("reorder", () => {
  let firstEntity = create({ name: 'First entity' })
  let secondEntity = create({ name: 'Second entity' })
  let thirdEntity = create({ name: 'Third entity' })
  let entities = fromJS([firstEntity, secondEntity, thirdEntity])
  let ids = entities.map(entity => entity.get('id'))
  let index = 0
  let newOrder = reorder(thirdEntity.get('id'), index, ids)

  it("is the same length", () => {
    expect(newOrder.count()).to.equal(ids.count())
  })

  it("puts the entity at the given spot", () => {
    expect(newOrder.get(index)).to.equal(thirdEntity.get('id'))
  })
})
