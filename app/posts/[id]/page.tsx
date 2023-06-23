import MdReader from "@/app/components/MdReader"
import { Post as PostModel } from "@/models/Post"
import { api } from "@/server/api/client"
import Image from "next/image"

type Props = {
  params: {
    id: string
  }
}

export default async function Post({ params: { id } }: Props) {
  const response = await api.get<PostModel>(`posts/${id}`)
  const post = new PostModel(response.id, response.title, response.content, response.description, new Date(response.createdAt), response.user)

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

  return (
    <div className="flex flex-col">
      <div className="mb-16 text-center flex flex-col gap-8">
        <h2 className="font-bold text-2xl dark:text-white">{post.title}</h2>
        <span className="italic dark:text-gray-300 text-gray-700">{post.description}</span>
      </div>

      <MdReader content={post.content} />
    </div>
  )
}
