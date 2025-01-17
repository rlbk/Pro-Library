import React from "react";
import BookCard from "./book-card";

type TProps = {
  title: string;
  books: IBook[];
  containerClassName?: string;
};

const BookList = ({ title, books, containerClassName }: TProps) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
