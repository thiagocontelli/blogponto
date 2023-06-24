type User = {
  id: string,
  name: string,
  email: string,
  image: string
}

export type GetPostDTO = {
  id: string,
  title: string,
  content: string,
  description: string,
  createdAt: string,
  user: User
}