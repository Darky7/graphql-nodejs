import app  from '../src/app'
import request from 'supertest'

describe('GET /', () => {
  let response

  test('get title of post', async () =>{
    const query_string = `{
      posts{
      title,
    }
    }`
    response = await request(app)
    .post('/graphql').send({ query: query_string})
    expect(response.body.data.posts[0].title).toBe("My first blog post")
    console.log(response.body.data.posts[0].title)
})

test('verify get one post by id 3', async () => {
    const query_string = `
    query {
        post(id:3) {
            title
        }
    }`
  response = await request(app)
  .post('/graphql').send({ query: query_string })
  expect(response.body.data.post.title).toBe("Building a REST API")
  console.log(response.body.data.post.title)
})

  test('verify send many posts has authors', async () =>{
    const query_string = `{
      posts{
      title,
      author {
          name  
      }
    }
    }`
    response  = await  request(app).post('/graphql').send({ query:  query_string})
    expect(response.body.data.posts[0].title).toBe("My first blog post")
    console.log(response.body)
    })
  });
