import { Post as PostModel } from "@/models/Post"
import { api } from "@/server/api/client"

type Props = {
  params: {
    id: string
  }
}

export default async function Post({ params: { id } }: Props) {
  const response = await api.get<PostModel>(`posts/${id}`)
  const post = new PostModel(response.id, response.title, response.content, new Date(response.createdAt), response.user)
  
  return (
    <div>
      <h3>{post.title}</h3>
    </div>
  )
}
