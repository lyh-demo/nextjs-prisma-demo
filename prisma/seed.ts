import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: 'Post 1',
        slug: 'post-1',
        content: 'content of post 1',
        author: {
            connectOrCreate: {
                where: {
                    email: 'john@gmail.com'
                },
                create: {
                    email: 'john@gmail.com',
                    hashedPassword: 'e10adc3949ba59abbe56e057f20f883e'
                }
            }
        }
    },
    {
        title: 'Post 2',
        slug: 'post-2',
        content: 'content of post 2',
        author: {
            connectOrCreate: {
                where: {
                    email: 'john@gmail.com'
                },
                create: {
                    email: 'john@gmail.com',
                    hashedPassword: 'e10adc3949ba59abbe56e057f20f883e'
                }
            }
        }
    }
];

async function main() {
    console.log('Start seeding ...');

    for (const post of initialPosts) {
        const newPost = await prisma.post.create({
            data: post
        });
        console.log(`Created post with id: ${newPost.id}`);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})