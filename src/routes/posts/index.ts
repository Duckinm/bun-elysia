import { Elysia, t } from 'elysia'
import { createPost, deletePost, getPostById, getPosts, updatePost } from './handlers'

const app = new Elysia({ prefix: '/posts' })

const postParams = t.Object({
  id: t.Numeric(),
})

const postRoutes = app
  .get('/', () => getPosts())
  .get('/:id', ({ params: { id } }) => getPostById(id), {
    params: postParams,
  })
  .post('/', ({ body }) => createPost(body), {
    body: t.Object({
      title: t.String(),
      content: t.String(),
    }),
  })
  .patch('/:id', ({ params: { id }, body }) => updatePost(id, body), {
    params: postParams,
    body: t.Object({
      title: t.Optional(t.String()),
      content: t.Optional(t.String()),
    }),
  })
  .delete('/:id', ({ params: { id } }) => deletePost(id), {
    params: postParams,
  })

export default postRoutes
