import { GetPostsDTO } from '@dtos'
import { Post } from '@/models/Post'
import { User } from '@/models/User'
import { api } from '@/server/api/client'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const response = await api.get<GetPostsDTO>('posts', { cache: 'no-store' })
  const posts = response.map(item => new Post(item.id, item.title, item.content, item.description, new Date(item.createdAt)))
  const users = response.map(({ user }) => new User(user.id, user.name, user.email, user.image))   
  
  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

  return (
    <div className="flex flex-col gap-8 py-8">
      {posts.map((post: Post, idx) =>
        <article
          key={post.id}
          className=' hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-transform hover:cursor-pointer p-4 border-2 rounded'
        >
          <Link
            href={`posts/${post.id}`}
            className='flex flex-col items-start justify-between h-full'
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.createdAt.toISOString()} className="text-gray-500 dark:text-gray-400">
                {dateFormatter.format(new Date(post.createdAt))}
              </time>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100">
                <p>
                  <span className="absolute inset-0" />
                  {post.title}
                </p>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{post.description}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <Image
                src={users[idx].image}
                alt="User profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900 dark:text-gray-200">
                  <span className="absolute inset-0" />
                  {users[idx].name}
                </p>
              </div>
            </div>
          </Link>
        </article>
      )}
    </div>
  )
}
