import Immutable from 'immutable'
import { kebabCase } from 'lodash'
import Task from './task'

describe("Task", () => {
  describe("initializing", () => {
    const name = `Task Name`
    const tags = { }
    const task = new Task({ name, tags })

    it("responds to tags", () => {
      expect(task.tags).to.be.an.instanceof(Immutable.Map)
    })
  })

  describe("id", () => {
    const task = new Task({ })

    it("returns the id", () => expect(task.id()).to.equal(task._id))
  })

  describe("key", () => {
    const task = new Task({ })

    it("returns the id", () => expect(task.key()).to.equal(task._id))
  })

  describe("toPayload", () => {
    const name = "Super Fancy New Task"
    const task = new Task({ name })
    const payload = task.toPayload()

    it("is an object", () => expect(payload).to.be.an.instanceof(Object))
  })

  describe("marshaling from an API", () => {
    const payload = {
      name: "ci",
      created: (new Date).toString(),
      updated: null,
      tags: { name: "Ultra Name" }
    }

    const task = new Task(payload)

    it("exposes a name", () => expect(task.name).to.equal(payload.name))

  })
})
