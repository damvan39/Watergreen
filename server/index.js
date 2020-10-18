"use strict"
const { GraphQLServer } = require('graphql-yoga');
const { resolve } = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsWithGrep() {
  try {
      const { stdout, stderr } = await exec(`wsl date`);
      return(stdout)
  }
  catch (err) {
     return Promise.reject(err)
  };
};

var test = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("hello kitty"), 2000)
})

// test.then((val) => console.log(val))

// lsWithGrep().then(val => console.log(val)).catch(err => console.log(err))

const typeDefs = `
type Query {
    status: String!
    live: [Link]!
}
type Link {
    id: ID!
    time: String!
    data: String!
}
`
let links = [{
    id: 'link-0',
    time: '5:32',
    data: Date.now(),
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