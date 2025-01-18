"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/file-upload";
import ColorPicker from "../color-picker";
import { createBook } from "@/lib/actions/admin/book.action";

interface IProps extends Partial<IBook> {
  type?: "create" | "update";
}

const BookFrom = ({ type, ...book }: IProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof bookSchema>) => {
    const result = await createBook(data);

    if (result.success) {
      toast({
        title: "Success",
        description: "Book created successfully",
      });
      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {type !== "update" ? "Create Book" : "Update Book"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book Title"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book Author"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book Genre"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Book rating"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total Copies
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    min={0}
                    max={10000}
                    placeholder="Total Copies"
                    className="book-form_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Image
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    placeholder="Upload book cover image"
                    folder="books/covers"
                    variant="light"
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Primary color
                </FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value}
                    onPickerChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book Description"
                    {...field}
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Trailer
                </FormLabel>

                <FormControl>
                  <FileUpload
                    type="video"
                    accept="video/*"
                    placeholder="Upload a book trailer"
                    folder="books/videos"
                    variant="light"
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book Summary"
                    {...field}
                    rows={5}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="book-form_btn text-white">
            {type !== "update" ? "Add book to library" : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookFrom;
