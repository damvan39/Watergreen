const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
    status: String!
    live: [Link]!
}
type Link {
    id: ID!
    time: String!
    data: [Float]
}
`
let links = [{
    id: 'link-0',
    time: '5:32',
    data: [12,15]
}]

const resolvers = {
    Query: {
        status: () => `Ni Hao`,
        live: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        time: (parent) => parent.time,
        data: (parent) => parent.data,
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers,
})
server.start(() => console.log('server running'))