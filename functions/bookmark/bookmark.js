const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
require('dotenv').config();

const typeDefs = gql`
  type Query {
    bookmark: [Bookmark!]
  }
  type Bookmark {
    id: ID! 
    title: String!
    url: String!
  }

  type Mutation {
    addBookmark(title: String! , url:String!) : Bookmark
  }
`

const resolvers = {
  Query: {
    bookmark: async (parent, args, context) => {
      try {
        var adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('url'))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(d => {
          return {
            id: d.ts,
            title: d.data.title,
            url: d.data.url
          }
        })

      }
      catch (err) {
        console.log(err)
      }
    },
  },

  Mutation: {
    addBookmark: async (_, { title, url }) => {
      console.log("title", title, "url", url)

      try {
        var client = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });
        var result = await client.query(
          q.Create(
            q.Collection('bookmarks'),
            {
              data: {
                title,
                url
              }
            },
          )
        );
        console.log("Document Created and Inserted in Container: " + result.ref.id);
        return result.ref.data

      }
      catch (err) {
        return console.log(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
