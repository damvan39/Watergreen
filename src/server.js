const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { Sequelize, DataTypes } = require('sequelize');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const { request } = require('http');
const app = express()
const port = 80
const interval = 1000
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

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/data.db'
});


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

const history = sequelize.define('history', {
  // Model attributes are defined here
  id:{
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull:false,
    primaryKey:true,

  },
  loggedAt:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  data:{
    type: DataTypes.FLOAT,
    allowNull:false,
  }

});





  const resolvers = {

        live: async() => JSON.parse(await execute(water_temp_command)),
        history: async (args, context) => await context.findAll(),
}

sequelize.sync()

app.use('/graphql', graphqlHTTP( async () => ({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  context: history
})),

)

app.use(express.static('static'))
app.listen(port, () => console.log(`html server listening on port ${port}`))

//  console.log({live_data: lsWithGrep(`python3 ../tools/"`).catch(err => console.log(err))})
// setInterval(logData, interval);

async function logData () {
  history.create({
  data: JSON.parse(await execute(water_temp_command))[0].data,
  loggedAt: Date.now()
})
}

logData()



// `sequelize.define` also returns the model
