const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express')
const app = express()
const port = 80
// check development mode
switch (process.argv.slice(2)[0]){
    case 'dev':
        console.log('development mode enabled')
        water_temp_command = `py ds18b20.py test`
        graphiql = '/'
        break
    default: 
    water_temp_command = `py ds18b20.py`
    graphiql = false

}

//setup function for running commands on terminal
async function execute(cmd) {
  try {
      const { stdout, stderr } = await exec(cmd);
      return stdout.replace(/\n|\r|\\/g, '') //remove formatting characters so that output can be parsed
  }
  catch (err) {
      console.log(err)
     return Promise.reject(err) //reject promise if command returns error
  };
};




const resolvers = {
    Query: {
        status: () => `Ni Hao`,
        live: async() => JSON.parse(await execute(water_temp_command)),
        history: async (parent, args, context) => {
            return context.prisma.data.findMany()
        }
    },
}

const server = new GraphQLServer ({
    typeDefs:'./schema.graphql',
    resolvers,
    context: {
        prisma,
    },
})
server.start({
    playground:graphiql,
    port:4000,
    endpoint: "/graphql",
    cors:true,
    getEndpoint:true
},(foo) => console.log(foo))

app.use(express.static('static'))
app.listen(port, () => console.log(`html server listening on port ${port}`))

//  console.log({live_data: lsWithGrep(`python3 ../tools/"`).catch(err => console.log(err))})