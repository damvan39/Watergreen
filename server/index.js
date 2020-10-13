const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
    info: String!
}
`

const resolvers = {
    Query: {
        info: () => `Ni Hao`
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers,
})
server.start(() => console.log('server running'))