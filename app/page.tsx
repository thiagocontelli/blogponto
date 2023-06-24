import { api } from '@/server/api/client'
import { Pagination } from '@components'
import { GetPostsDTO } from '@dtos'
import { Post, User } from '@models'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: {
    page: number | undefined
  }
}

export default async function Home({ searchParams }: Props) {
  const page = Number(searchParams.page) || 0
  const response = await api.get<GetPostsDTO>(`posts?page=${page}&size=${10}`, { cache: 'no-store' })
  const posts = response.posts.map(item => new Post(item.id, item.title, item.content, item.description, new Date(item.createdAt)))
  const users = response.posts.map(({ user }) => new User(user.id, user.name, user.email, user.image))

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

  if (page >= response.totalPages) {
    redirect('/')
  }

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

      <Pagination
        nextDisabled={page + 1 >= response.totalPages}
        previousDisabled={page - 1 < 0}
        page={page}
      />
    </div>
  )
}
