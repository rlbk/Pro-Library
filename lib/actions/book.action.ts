"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: IBorrowBookParams) => {
  const { userId, bookId } = params;
  try {
    const book = await db
      .select({ avaibleCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].avaibleCopies < 1)
      return { success: false, error: "Book is not available" };

    const dueDate = dayjs().add(7, "day").toDate().toDateString();
    const record = await db
      .insert(borrowRecords)
      .values({ userId, bookId, dueDate, status: "BORROWED" });

    await db
      .update(books)
      .set({ availableCopies: book[0].avaibleCopies - 1 })
      .where(eq(books.id, bookId));

    return { success: true, data: JSON.parse(JSON.stringify(record)) };
  } catch (error) {
    console.log("@Error borrowing book:", error);
    return { success: false, error: "Failed to borrow book" };
  }
};
