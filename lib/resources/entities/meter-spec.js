import Immutable from 'immutable'
import kebabCase from 'lodash/kebabCase'
import Meter from './meter'

describe("Instance", () => {
  describe("initializing", () => {
    const usage = 0
    const limit = 1
    const meter = new Meter({ usage, limit })

    it('responds to usage', () => expect(meter.usage).to.equal(usage))
    it('responds to limit', () => expect(meter.limit).to.equal(limit))
  })
})
