import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" })
  }
  
  const { title, content } = await request.json()

  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title can't be empty" }, { status: 400 })
  }

  if (!content || !content.trim()) {
    return NextResponse.json({ error: "Content can't be empty" }, { status: 400 })
  }
  
  try {
    await prisma.post.create({
      data: {
        title,
        content
      }
    })

    return NextResponse.json({ message: "Post created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error while creating a post" }, { status: 500 })
  }
}