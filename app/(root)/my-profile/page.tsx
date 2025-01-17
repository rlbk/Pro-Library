import { signOut } from "@/auth";
import BookList from "@/components/book-list";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

const MyProfile = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}
        className="mb-10"
      >
        <Button>Log out</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default MyProfile;
