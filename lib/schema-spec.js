import { clouds, parseClouds, serializeClouds } from './schema'

describe("lib/schema.js", () => {
  const json = [
    {
      id: 1,
      title: `Local cloud`,
      nodes: [{ id: 1, name: "Master", size: 'm4.large' }],
      apps: [
        {
          id: 1,
          name: "Qbox Hosted Elasticsearch",
          components: [{ id: 1, name: "Blog", type: 'php' }]
        }
      ]
    }
  ]

  const output = parseClouds(json)
  const { result, entities } = output

  it("creates an entity structure based on an array", () => {
    expect(output).to.have.all.keys('result', 'entities')
  })

  it("builds root level namespaces", () => {
    expect(entities).to.have.all.keys('apps', 'clouds', 'components', 'nodes')
  })

  it("dehydrates", () => { expect(serializeClouds(output)).to.eql(json) })
})
