import { MdReader } from '@components'
import { Post as PostModel, User } from "@models"
import { api } from "@/server/api/client"
import { GetPostDTO } from '@dtos'
import Image from 'next/image'

type Props = {
  params: {
    id: string
  }
}

export default async function Post({ params: { id } }: Props) {
  const response = await api.get<GetPostDTO>(`posts/${id}`)
  const post = new PostModel(response.id, response.title, response.content, response.description, new Date(response.createdAt))

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

  return (
    <div className="flex flex-col select-text ">
      <div className="mb-16 text-center flex flex-col gap-8 items-center">
        <h2 className="font-bold text-2xl dark:text-white">{post.title}</h2>
        <span className="italic dark:text-gray-300 text-gray-700">{post.description}</span>

        <div className='w-fit flex gap-4'>
          <Image
            src={response.user.image}
            width={50}
            height={50}
            alt='User profile picture'
            className='rounded-full'
          />

          <div className='flex flex-col items-start justify-between'>
            <span className='font-bold'>{response.user.name}</span>
            <time
              dateTime={post.createdAt.toISOString()}
              className='text-sm text-gray-500 dark:text-gray-300'
            >
              {dateFormatter.format(post.createdAt)}
            </time>
          </div>
        </div>
      </div>

      <MdReader content={post.content} />
    </div>
  )
}
