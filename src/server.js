const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client')
const { APP_SECRET, getUserId } = require('./tokens.js')
const prisma = new PrismaClient()
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const { request } = require('http');
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






async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
    
    // 2
    const user = await context.prisma.user.create({ data: { ...args, password } })
  
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 4
    return {
      token,
      user,
    }
  }
  
  async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findOne({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
  }
  
  const resolvers = {
    Query: {
        live: async() => JSON.parse(await execute(water_temp_command)),
        history: async (parent, args, context) => {
            return context.prisma.data.findMany()
        }
    },
}
const server = new GraphQLServer ({
    typeDefs:'./schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }  
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
console.log(Date.now())