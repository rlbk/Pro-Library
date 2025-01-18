import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./book-cover";

type TProps = {
  book: IBook;
};

const BookOverview = ({
  title,
  author,
  availableCopies,
  totalCopies,
  coverColor,
  coverUrl,
  description,
  genre,
  rating,
}: IBook) => {
  console.log("@coverUrl", coverUrl);
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
        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow Book</p>
        </Button>
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
