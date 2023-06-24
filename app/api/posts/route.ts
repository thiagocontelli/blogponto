import { prisma } from "@/server/db/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  searchParams: {
    page: number,
    size: number
  }
}

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get('page'))
  const size = Number(request.nextUrl.searchParams.get('size'))
  
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: page * size,
      take: size
    })

    const count = await prisma.post.count()
    
    return NextResponse.json({
      posts,
      page,
      totalElements: count,
      totalPages: Math.ceil(count / size)
    })
  } catch (error) {
    return NextResponse.json({ error: "There was a error while fetching the posts" }, { status: 500 })
  }
}