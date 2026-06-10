"use server";

import { prisma } from "@/lib/prisma";

export async function deleteImroll(id: string) {
    await prisma.imroll.delete({
        where: { id },
    });

    return { success: true };
}
