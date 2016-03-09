import DevTools from '../../lib/components/DevTools'
import Footer from '../../lib/components/Footer'
import Header from '../../lib/components/Header'
import Menu from '../../lib/components/Menu'
import PageChange from '../../lib/components/PageChange'

describe("Components", () => {
  describe("DevTools", () => {
    it("exists", () => { expect(DevTools).to.be.ok })
  })

  describe("PageChange", () => {
    it("exists", () => { expect(PageChange).to.be.ok })
  })

  describe("Footer", () => { it("exists", () => { expect(Footer).to.be.ok }) })
  describe("Header", () => { it("exists", () => { expect(Header).to.be.ok }) })
  describe("Menu", () => { it("exists", () => { expect(Menu).to.be.ok }) })
})
