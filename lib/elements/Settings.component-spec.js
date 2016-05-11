import React from 'react'
import Settings from './Settings.component'

describe("Settings", () => {
  const onClick = () => console.log("Do the thing")
  const renderer = createRenderer()

  renderer.render(<Settings onClick={ onClick } />)

  const element = renderer.getRenderOutput()

  it("is a div", () => expect(element.type).to.equal('div'))

  it("has the settings class", () => {
    expect(element.props.className).to.include(`settings`)
  })

  describe("child nodes", () => {
    const [header, body] = element.props.children

    describe("header", () => {
      const [title, menu] = header.props.children

      it("is a ContextHeader", () => {
        expect(header.type.name).to.equal(`ContextHeader`)
      })

      describe("title", () => {
        it("is a ContextTitle", () => {
          expect(title.type.name).to.equal(`ContextTitle`)
        })

        it("contains a Settings header", () => {
          expect(title.props.children).to.equal(`Settings`)
        })
      })

      describe("menu", () => {
        it("is a ContextMenu", () => {
          expect(menu.type.name).to.equal(`ContextMenu`)
        })
      })
    })

    describe("body", () => {
      const [entries, registries] = body.props.children

      it("is a Row", () => expect(body.type.name).to.equal(`Row`))

      describe("entries column", () => {
        it("is a Column", () => expect(entries.type.name).to.equal(`Column`))
        it("is size 7", () => expect(entries.props.size).to.equal(7))

        it("contains an Entrypoints node", () => {
          const container = entries.props.children.type.WrappedComponent
          expect(container.name).to.equal(`Entrypoints`)
        })
      })

      describe("registries column", () => {
        it("is a Column", () => expect(registries.type.name).to.equal(`Column`))
        it("is size 5", () => expect(registries.props.size).to.equal(5))

        it("has a Registries container", () => {
          const container = registries.props.children.type.WrappedComponent
          expect(container.name).to.equal(`Registries`)
        })
      })

    })
  })
})
