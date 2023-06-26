import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { api } from "@/server/api/client"
import { MarkdownReader } from '@components'
import { GetPostDTO } from '@dtos'
import { Post as PostModel } from "@models"
import { formatDistance } from 'date-fns'
import { Metadata } from 'next'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const response = await api.get<GetPostDTO>(`posts/${id}`)

  return {
    title: `${response.title} by ${response.user.name}`,
    description: response.description
  }
}

export default async function Post({ params: { id } }: Props) {
  const response = await api.get<GetPostDTO>(`posts/${id}`)
  const post = new PostModel(response.id, response.title, response.content, response.description, new Date(response.createdAt))
  
  return (
    <div className="flex flex-col select-text w-full">
      <div className="mb-16 text-center flex flex-col gap-8 items-center">
        <h2 className="font-bold text-2xl dark:text-white">{post.title}</h2>
        <span className="italic dark:text-gray-300 text-gray-700">{post.description}</span>

        <div className='w-fit flex gap-4'>
          <Avatar>
            <AvatarImage src={response.user.image} />
          </Avatar>

          <div className='flex flex-col items-start justify-between'>
            <span className='font-bold'>{response.user.name}</span>
            <time
              dateTime={post.createdAt.toISOString()}
              className='text-sm text-gray-500 dark:text-gray-300'
            >
              {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
            </time>
          </div>
        </div>
      </div>

      <MarkdownReader content={post.content} />
    </div>
  )
}
