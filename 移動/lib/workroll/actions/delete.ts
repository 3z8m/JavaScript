"use server";

import { prisma } from "@/lib/prisma";

export async function deleteWorkroll(id: string) {
    await prisma.workroll.delete({
        where: { id },
    });

    return { success: true };
}
