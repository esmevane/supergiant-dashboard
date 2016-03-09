import NotFound from '../../lib/pages/NotFound'
import Styleguide from '../../lib/pages/Styleguide'
import Welcome from '../../lib/pages/Welcome'

describe("Pages", () => {
  describe("NotFound", () => {
    it("exists", () => { expect(NotFound).to.be.ok })
  })

  describe("Styleguide", () => {
    it("exists", () => { expect(Styleguide).to.be.ok })
  })

  describe("Welcome", () => {
    it("exists", () => { expect(Welcome).to.be.ok })
  })
})
