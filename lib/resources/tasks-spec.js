import Task from './entities/task'
import Tasks from './tasks'

describe("Tasks client", () => {
  const client = new Tasks(mockClient(Task))

  describe("get", () => {
    it("returns a task", () => {
      expect(client.get('ci')).to.eventually.be.an.instanceof(Task)
    })
  })

  describe("fetch", () => {
    it("returns a list", () => {
      expect(client.fetch()).to.eventually.be.an.instanceof(Array)
    })
  })

  describe("create", () => {
    it("returns a task", () => {
      let promise = client.create({ name: 'key' })

      expect(promise).to.eventually.be.an.instanceof(Task)
    })
  })

  describe("delete", () => {
    it("returns an empty object", () => {
      expect(client.delete('key')).to.eventually.be.an.instanceof(Object)
    })
  })

  describe("update", () => {
    it("returns a task", () => {
      let task = new Task({ name: "CI" })
      let promise = client.update(task)

      expect(promise).to.eventually.be.an.instanceof(Task)
    })
  })
})
