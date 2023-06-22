import Image from 'next/image'

export default async function Home() {
  const response = await fetch('http://localhost:3001/api/posts', { method: 'GET', cache: 'no-store' })
  const posts = await response.json()

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

  return (
    <div className="flex justify-between flex-wrap gap-8 p-8">
      {posts.map((post: any) =>
        <article
          key={post.id}
          className="flex p-4 w-[350px] flex-col items-start justify-between border-2 rounded hover:cursor-pointer hover:bg-gray-50 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={post.createdAt} className="text-gray-500">
              {dateFormatter.format(new Date(post.createdAt))}
            </time>
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
              <a>
                <span className="absolute inset-0" />
                {post.title}
              </a>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
          </div>
          <div className="relative mt-8 flex items-center gap-x-4">
            <Image src={post.user.image} alt="User profile picture" width={40} height={40} className="rounded-full" />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="absolute inset-0" />
                {post.user.name}
              </p>
            </div>
          </div>
        </article>
      )}
    </div>
  )
}
