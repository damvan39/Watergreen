const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { Sequelize, DataTypes } = require('sequelize');
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

// async function logTemp() {
//   await prisma.data.create({
//     data: {
//       data: JSON.parse(await execute(water_temp_command))[0].data
//     }
//   }).then(d => console.log(d))
// }



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

var schema = buildSchema(`
type Query {
  live: [Live!]!
  history: [Data]
}

type Live {
  address: String!
  data: Float!
}
type Data {
  id: ID!
  loggedAt: String!
  data: Float!
}
`);

  const resolvers = {

        live: async() => JSON.parse(await execute(water_temp_command)),
        history: async (args, context) => {
            // return await context.data.findMany()
    },
}

app.use('/graphql', graphqlHTTP( async () => ({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
})),

)

app.use(express.static('static'))
app.listen(port, () => console.log(`html server listening on port ${port}`))

//  console.log({live_data: lsWithGrep(`python3 ../tools/"`).catch(err => console.log(err))})
console.log(Date.now())

const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true