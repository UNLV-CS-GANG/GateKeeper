import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { clerkClient } from '@clerk/nextjs'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const query = {
    id: req.nextUrl.searchParams.get('id'),
    eventId: req.nextUrl.searchParams.get('eventId'),
  }
  console.log('api/clerk/user GET:', query)

  try {
    // get user by userId
    if (query.id) {
      const user = await clerkClient.users.getUser(query.id)
      console.log('clerk user:', user)
      return NextResponse.json(user, { status: 200 })
    }

    // get users associated by eventId
    if (query.eventId) {
      const invites = await prisma.invite.findMany({
        where: {
          eventId: String(query.eventId),
        },
        select: {
          userId: true,
        },
      })

      console.log('invites', invites)

      // const users = await clerkClient.users.getUserList({
      //   userId: body.userIds,
      // })

      // console.log('clerk users:', users)
      return NextResponse.json(invites, { status: 200 })
    } else {
      throw new Error('Missing "userIds" in body')
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}