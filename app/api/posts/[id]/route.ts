import { prisma } from "@/server/db/client";
import { NextResponse } from "next/server";

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

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "There was a error while fetching the post" }, { status: 500 })
  }
}