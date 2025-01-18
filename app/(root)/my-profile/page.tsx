import { auth } from "@/auth";
import BookList from "@/components/book-list";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";
import React from "react";

const MyProfile = async () => {
  const session = await auth();
  const borrowedRecords = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id as string))
    .limit(10);
  const bookIds = borrowedRecords.map((record) => record.bookId);
  const borrowedBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds));
  return (
    <>
      <h1 className="font-semibold text-light-200 text-3xl">
        Hi, {session?.user?.name}!
      </h1>
      <p className="text-light-400 font-base text-xl mb-10">
        You have borrowed {borrowedRecords.length} books
      </p>
      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};

export default MyProfile;
