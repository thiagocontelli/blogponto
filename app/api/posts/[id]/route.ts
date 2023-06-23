import { prisma } from "@/server/db/client";
import { NextResponse } from "next/server";
import { remark } from 'remark';
import remarkHtml from 'remark-html';

type Params = {
  params: {
    id: string
  }
}

export async function GET(_: Request, { params: { id } }: Params) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id
      }
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    let md

    try {
      md = remark().use(remarkHtml).processSync(post.content)
    } catch (error) {
      return NextResponse.json({ error: "There was a error while converting the content" }, { status: 500 })
    }
    
    return NextResponse.json({ id: post.id, title: post.title, content: md.value, description: post.description, createdAt: post.createdAt })
  } catch (error) {
    return NextResponse.json({ error: "There was a error while fetching the post" }, { status: 500 })
  }
}