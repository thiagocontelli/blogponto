import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/server/api/client'
import { Pagination } from '@components'
import { GetPostsDTO } from '@dtos'
import { Post, User } from '@models'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { formatDistance } from 'date-fns'

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

  if (page && page >= response.totalPages) {
    redirect('/')
  }

  return (
    <div className="flex flex-col gap-8 py-8 w-full">
      {posts.map((post: Post, idx) =>
        <Card className='hover:bg-gray-100 dark:hover:bg-gray-700 transition-all' key={post.id}>
          <Link href={`posts/${post.id}`}>
            <CardHeader>
              <CardDescription>
                {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
              </CardDescription>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>{post.description}</CardContent>
            <CardFooter>
              <Avatar>
                <AvatarImage src={users[idx].image} />
              </Avatar>
              <p className='ml-4 font-medium'>{users[idx].name}</p>
            </CardFooter>
          </Link>
        </Card>
      )}

      <Pagination
        nextDisabled={page + 1 >= response.totalPages}
        previousDisabled={page - 1 < 0}
        page={page}
      />
    </div>
  )
}
