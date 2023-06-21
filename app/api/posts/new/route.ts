import { prisma } from "@/server/db/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { title, content } = await request.json()

  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title can't be empty" }, { status: 400 })
  }

  if (!content || !content.trim()) {
    return NextResponse.json({ error: "Content can't be empty" }, { status: 400 })
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email || ''
      }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    await prisma.post.create({
      data: {
        title,
        content,
        userId: user.id
      }
    })

    return NextResponse.json({ message: "Post created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error while creating a post" }, { status: 500 })
  }
}