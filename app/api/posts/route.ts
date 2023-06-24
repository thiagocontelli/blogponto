import { prisma } from "@/server/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "There was a error while fetching the posts" }, { status: 500 })
  }
}