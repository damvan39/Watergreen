const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
    status: String!
    live: [Link]!
}
type Link {
    id: ID!
    time: String!
    data [Float!]
}
`
let links = [{
    id: 'link-0',
    url: 'ptable.xyz',
    description: 'really cool website'
}]

const resolvers = {
    Query: {
        status: () => `Ni Hao`,
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers,
})
server.start(() => console.log('server running'))