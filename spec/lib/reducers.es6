import Immutable from 'immutable'
import { Supergiant } from '../../lib/reducers'
import * as Actions from '../../lib/actions'

describe("Reducers", () => {
  describe("Supergiant", () => {
    it("exists", () => { expect(Supergiant).to.be.ok })

    it("gives a default state", () => {
      expect(Supergiant(undefined, "action:string")).to.be.ok
    })
  })
})
