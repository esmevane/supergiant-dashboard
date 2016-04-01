import { clouds, parseClouds, serializeClouds } from './schema'

describe("lib/schema.js", () => {
  const json = [
    {
      name: `local-cloud`,
      metadata: { tags: [{ name: `name`, value: `Local cloud` }] },
      nodes: [
        {
          name: `master`,
          size: `m4.large`,
          metadata: { tags: [{ name: `name`, value: `Master node` }] }
        }
      ],
      registries: [
        {
          name: `docker-hub`,
          uri: `https://hub.docker.com`,
          metadata: { tags: [{ name: `name`, value: `Docker Hub` }] },
          repos: [
            {
              name: "organization",
              key: "arglebargle",
              metadata: { tags: [{ name: `name`, value: `Organization` }] }
            }
          ]
        }
      ],
      apps: [
        {
          name: `qbox-development`,
          metadata: { tags: [{ name: `name`, value: `Qbox Development` }] },
          components: [
            {
              name: "elasticsearch",
              instances: 3,
              metadata: { tags: [{ name: `name`, value: `Elasticsearch` }] },
              blueprint: {
                containers: [
                  {
                    cpu: { min: 0, max: 500 },
                    image: "qbox/qbox-docker:2.1.1",
                    metadata: { tags: [{ name: `name`, value: `Search` }] },
                    mounts: [
                      { volume: `elasticsearch-data`, path: `/data-1` }
                    ],
                    ports: [
                      { protocol: `HTTP`, number: 9200, public: true },
                      { protocol: `TCP`, number: 9300 }
                    ],
                    env: [
                      { name: `CLUSTER_ID`, value: `SG_TEST` },
                      {
                        name: `NODE_NAME`,
                        value: `SG_TEST_({ instance_id })`
                      },
                      { name: `MASTER_ELIGIBLE`, value: `true` },
                      { name: `DATA_PATHS`, value: `/data-1` },
                      {
                        name: `UNICAST_HOSTS`,
                        value: `elasticsearch.test.svc.cluster.local:9300`
                      },
                      { name: "MIN_MASTER_NODES", value: "2" },
                      { name: "CORES", value: "1" },
                      { name: "ES_HEAP_SIZE", value: "1024m" },
                      { name: "INDEX_NUMBER_OF_SHARDS", value: "4" },
                      { name: "INDEX_NUMBER_OF_REPLICAS", value: "0" }
                    ],
                    ram: { min: 2048, max: 2048 },
                  }
                ],
                volumes: [
                  {
                    metadata: {
                      tags: [{ name: `name`, value: `Elasticsearch Data` }]
                    },
                    name: "elasticsearch-data",
                    type: "gp2",
                    size: 10
                  }
                ],
                termination_grace_period: 10
              }
            }
          ]
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
    expect(entities).to.have.all.keys(
      'apps',
      'clouds',
      'components',
      'nodes',
      'registries',
      'repos'
    )
  })

  it("dehydrates", () => { expect(serializeClouds(output)).to.eql(json) })
})
