import prisma from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache((slug) => {
    return prisma.post.findUnique({
        where: {
            slug,
        },
    });
});

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getCachedPost(params.slug);
    return (
        <main className="flex min-h-screen flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">{post?.title}</h1>
            <p>{post?.content}</p>
        </main>
    );
}