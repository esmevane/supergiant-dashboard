import EventEmitter from 'events'
import { fromJS } from 'immutable'
import uuid from 'uuid'

export const ById = `byId`
export const Cancel = `cancel`
export const Cancelled = `cancelled`
export const Run = `run`
export const Running = `running`
export const Start = `start`
export const Stop = `stop`

export const Descriptor = (task, sagaId) => ({ task, sagaId })

export default class SagaRegistry extends EventEmitter {
  constructor(store, rootSagas = []) {
    super()

    this.runner = saga => store.runSaga(saga, store.getState)
    this.contents = fromJS({ [ById]: {}, [Cancelled]: [], [Running]: [] })

    rootSagas.map(saga => this.contents = this.save(saga))
  }

  commit = contents => this.contents = contents
  isRunnable = candidate => !this.isRunning(candidate)
  isRunning = candidate => this.runningIds().indexOf(candidate.id) > -1
  runnables = () => this.sagas().filter(saga => this.isRunnable(saga))
  runningIds = () => this.contents.get(Running).map(({ sagaId }) => sagaId)
  sagas = () => this.contents.get(ById)
  save = saga => this.contents.setIn([ById, saga.id || uuid.v4()], saga);

  start() {
    const { runner } = this
    const sagas = this.runnables()
    const tasks = sagas.map((saga, id) => Descriptor(runner(saga), id))

    this.commit(this.contents.update(Running, list => list.concat(tasks)))
    this.emit(Start, tasks, this)
  }

  run(saga) {
    const { runner } = this

    if (this.isRunning(saga)) { return }

    this.commit(
      this.save(saga)
        .update(Running, list => list.push(Descriptor(runner(saga), saga.id)))
    )

    this.emit(Run, saga.id, this)
    this.emit(`${Run}:${saga.id}`, saga.id, this)
  }

  cancel(saga) {
    if (!this.isRunning(saga)) { return }

    let match = descriptor => saga.id === descriptor.sagaId
    let noMatch = descriptor => !match(descriptor)
    let targets = this.contents.get(Running).filter(match)

    targets.forEach(descriptor => descriptor.task.cancel())

    this.commit(
      this.contents
        .update(Running, list => list.filter(noMatch))
        .update(Cancelled, list => list.concat(targets))
    )

    this.emit(Cancel, saga.id, this)
    this.emit(`${Cancel}:${saga.id}`, saga.id, this)
  }

  stop() {
    const running = this.contents.get(Running)
    const cancelled = running.forEach(descriptor => descriptor.task.cancel())

    this.commit(
      this.contents
        .update(Running, list => list.clear())
        .update(Cancelled, list => list.concat(cancelled))
    )

    this.emit(Stop, cancelled, this)
  }

}
