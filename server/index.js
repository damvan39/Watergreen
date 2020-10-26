const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsWithGrep(cmd) {
  try {
      const { stdout, stderr } = await exec(cmd);
      console.log(JSON.parse(stdout.replace(/\n|\r|\\|\o/g, '')))
      return stdout.replace(/\n|\r|\\/g, '')
  }
  catch (err) {
      console.log(err)
     return Promise.reject(err)
  };
};

water_temp_command = `py ds18b20.py test`


const resolvers = {
    Query: {
        status: () => `Ni Hao`,
        live: async() => JSON.parse(await lsWithGrep(water_temp_command)),
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
    }
})
server.start((foo) => console.log(foo))

//  console.log({live_data: lsWithGrep(`python3 ../tools/"`).catch(err => console.log(err))})