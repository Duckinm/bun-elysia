import type { Post } from './types'

export async function getPosts() {
  try {
    const files = Bun.file('./public/data.json')
    const data = await files.json()

    return data
  } catch (error) {
    console.log('Error getting posts:', error)
  }
}

export async function getPostById(id: number) {
  try {
    const files = Bun.file('./public/data.json')
    const data = (await files.json()) as {
      data: Post[]
    }

    return data.data.find((post) => post.id === id)
  } catch (error) {
    console.log('Error getting post by id:', error)
  }
}

export async function createPost({ title, content }: { title: string; content: string }) {
  try {
    const files = Bun.file('./public/data.json')
    const data = (await files.json()) as {
      data: Post[]
    }

    // if no data, pust it, else append it
    if (!data) {
      await Bun.write(
        './public/data.json',
        JSON.stringify({
          data: [
            {
              id: 1,
              title,
              content,
            },
          ],
        })
      )
      return
    }

    const newPost = {
      id: data.data.length + 1,
      title: 'New Post',
      content: 'This is a new post',
    }

    data.data.push(newPost)
    await Bun.write('./public/data.json', JSON.stringify(data))
  } catch (error) {
    console.log('Error creating post:', error)
  }
}

export async function updatePost(id: number, { title, content }: { title?: string; content?: string }) {
  try {
    const files = Bun.file('./public/data.json')
    const data = (await files.json()) as {
      data: Post[]
    }

    const postIndex = data.data.findIndex((post) => post.id === id)

    if (postIndex === -1) {
      return
    }

    data.data[postIndex] = {
      id,
      title: title ?? data.data[postIndex].title,
      content: content ?? data.data[postIndex].content,
    }

    await Bun.write('./public/data.json', JSON.stringify(data))
  } catch (error) {
    console.log('Error updating post:', error)
  }
}

export async function deletePost(id: number) {
  try {
    const files = Bun.file('./public/data.json')
    const data = (await files.json()) as {
      data: Post[]
    }

    const postIndex = data.data.findIndex((post) => post.id === id)

    if (postIndex === -1) {
      return
    }

    data.data.splice(postIndex, 1)

    await Bun.write('./public/data.json', JSON.stringify(data))
  } catch (error) {
    console.log('Error deleting post:', error)
  }
}
