import NotFound from '../../lib/pages/NotFound'
import Styleguide from '../../lib/pages/Styleguide'
import Dashboard from '../../lib/pages/Dashboard'

describe("Pages", () => {
  describe("NotFound", () => {
    it("exists", () => { expect(NotFound).to.be.ok })
  })

  describe("Styleguide", () => {
    it("exists", () => { expect(Styleguide).to.be.ok })
  })

  describe("Dashboard", () => {
    it("exists", () => { expect(Dashboard).to.be.ok })
  })
})
