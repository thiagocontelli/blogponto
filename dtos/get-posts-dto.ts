type User = {
  id: string,
  name: string,
  email: string,
  image: string
}

type Post = {
  id: string,
  title: string,
  content: string,
  description: string,
  createdAt: string,
  user: User
}

export type GetPostsDTO = Post[]