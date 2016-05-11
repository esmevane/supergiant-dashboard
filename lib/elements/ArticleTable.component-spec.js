import ArticleTable from './ArticleTable.component'

describe("ArticleTable", () => {
  const children = <div />
  const classes = 'some extra classes'
  const renderer = createRenderer()

  renderer.render(
    <ArticleTable className={ classes }>
      { children }
    </ArticleTable>
  )

  const element = renderer.getRenderOutput()

  it("is an article", () => expect(element.type).to.equal('article'))

  it("has lined table-row classes", () => {
    expect(element.props.className).to.include('table-row lined')
  })

  it("yields to given classes", () => {
    expect(element.props.className).to.include(classes)
  })

  it("yields to given children", () => {
    expect(element.props.children).to.equal(children)
  })

})
