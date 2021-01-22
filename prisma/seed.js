import pkg from "@prisma/client"
const { PrismaClient } = pkg;

const prisma = new PrismaClient()

const main = async () => {
    const bob = await prisma.user.create({
        data: {
            id: 1,
            name: "Bob",
            email: "bob@prisma.io",
            posts: []
        }
      })
      console.log(bob)
      const alice = await prisma.user.create({
        data: {
            id: 2,
            name: "Alice",
            email: "alice@prisma.io",
            posts: []
        }
      })
      console.log(alice)
    const post1 = await prisma.post.create({
        data: {
            id: 1,
            authorId: 2,
            content: "https://www.prisma.io/blog/z11sg6ipb3i1/",
            published: false,
            title: "Watch the talks from Prisma Day 2019"
        }
    })
    console.log(post1)
    const post2 = await prisma.post.create({
        data: {
            id: 2,
            authorId: 1,
            content: "https://graphqlweekly.com/",
            published: true,
            title: "Subscribe to GraphQL Weekly for community news"
        }
    })
    console.log(post2)
    const post3 = await prisma.post.create({
        data: {
            id: 3,
            authorId: 1,
            content: "https://twitter.com/prisma/",
            published: false,
            title: "Follow Prisma on Twitter"
        }
    })
    console.log(post3)
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })