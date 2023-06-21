import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' })
  }
  
  try {
    const posts = await prisma.post.findMany()
    
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "There was a error while fetching the posts" }, { status: 500 })
  }
}