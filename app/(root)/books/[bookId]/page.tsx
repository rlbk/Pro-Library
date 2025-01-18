import { auth } from "@/auth";
import BookOverview from "@/components/book-overview";
import BookVideo from "@/components/book-video";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type TProps = {
  params: Promise<{ bookId: string }>;
};

const Page = async ({ params }: TProps) => {
  const { bookId } = await params;
  const session = await auth();

  // fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);
  if (!bookDetails) return redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
        {/* Similar books component */}
      </div>
    </>
  );
};

export default Page;
