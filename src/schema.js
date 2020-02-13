const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql
import { fakeDatabase } from './FakeDatabase'

const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    }
})

const blogPostType = new GraphQLObjectType({
    name: 'BlogPost',
    fields: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        author: {
            type: authorType,
            resolve: (source, params) => {
                return fakeDatabase.getAuthor(source.id)
            }
        }
    }
})

const commentsType = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        postId: {
            type: blogPostType,
            resolve: (source, params) => {
                return fakeDatabase.getBlogPost(source.id)
            }
        }
    }
})

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        post: {
            type: blogPostType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (source, { id }) => {
                return fakeDatabase.getBlogPost(id)
            }
        },
        posts: {
            type: new GraphQLList(blogPostType),
            resolve: () => {
                return fakeDatabase.getBlogPosts()
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
})

module.exports = schema