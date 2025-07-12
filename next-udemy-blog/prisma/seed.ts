import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcryptjs'
import { title } from "process"

const prisma = new PrismaClient()

async function main() {
    // クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcrypt.hash('password123', 12)

    const dummyImages = [
        'https://picsum.photos/seed/post1/600/400',
        'https://picsum.photos/seed/post2/600/400'
    ]

    const user =await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: '初めてのブログ投稿',
                        content: 'これは最初のブログ投稿',
                        topImage: dummyImages[0],
                        published: true
                    },
                    {
                        title: '２番目の投稿',
                        content: 'これは２つ目のブログ投稿',
                        topImage: dummyImages[1],
                        published: true
                    }
                ]
            }
        }
    })
    console.log({user})
}

main()
    .catch((e) =>{
        console.error(e)
        process.exit(1)             // プロセスを止める
    })
    .finally(async () => {
        await prisma.$disconnect()  // DB切断
    })

