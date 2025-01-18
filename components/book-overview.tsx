import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./book-cover";
import BorrowBook from "./borrow-book";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface IProps extends IBook {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  availableCopies,
  totalCopies,
  coverColor,
  coverUrl,
  description,
  genre,
  rating,
  id,
  userId,
}: IProps) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!user) return null;

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="start" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total books <span className="">{totalCopies}</span>
          </p>
          <p>
            Available books <span className="">{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <BorrowBook
          bookId={id}
          userId={userId}
          borrowingEligibility={borrowingEligibility}
        />
      </div>
      <div className="relative flex  flex-1 juctify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>
        <div className="absolute top-10 left-16 rotate-12 opacity-40 max-sm:hidden">
          <BookCover
            variant="wide"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
