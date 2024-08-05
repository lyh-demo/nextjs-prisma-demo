"use server"

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
    try {
        await prisma.post.create({
            data: {
                title: formData.get("title") as string,
                content: formData.get("content") as string,
                slug: (formData.get("title") as string)
                    .replace(/\s+/g, "-").toLowerCase(),
                author: {
                    connect: {
                        email: "john@gmail.com",
                    },
                },
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                console.log(`Unique constraint failed on the {constraint}`);
            }
        }
    }

    revalidatePath("/posts");
}

export async function updatePost(formData: FormData, id: string) {
    await prisma.post.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            slug: (formData.get("title") as string)
                .replace(/\s+/g, "-").toLowerCase(),
        }
    });
}

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: { id }
    });
}