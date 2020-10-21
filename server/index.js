const { GraphQLServer } = require('graphql-yoga');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsWithGrep(cmd) {
  try {
      const { stdout, stderr } = await exec(cmd);
      console.log("called")
      return stdout
  }
  catch (err) {
     return Promise.reject(err)
  };
};


let links = [{
    id: 'link-0',
    time: '5:32',
    data: lsWithGrep(`bash -c "date"`),
}]

links[0].data.then(val => console.log(val)).catch(err => console.log(err))
// links[0].data.then(val => console.log(val))
let idCount = links.length
const resolvers = {
    Query: {
        status: () => `Ni Hao`,
        live: () => links,
    },
    Mutation: {
        add_data: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                time: args.time,
                date: args.data,
            }
            links.push(link)
            return link
        }
    }
}

const server = new GraphQLServer ({
    typeDefs:'./src/schema.graphql',
    resolvers,
})
server.start((foo) => console.log(foo))

 