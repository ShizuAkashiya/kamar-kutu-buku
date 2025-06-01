import { useEffect, useState } from "react";
import BookList from "./BookList";
export default function MyLibrary() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("my-books");
    if (stored) setBooks(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem("my-books", JSON.stringify(books));
  }, [books]);
  const addBook = (book) => {
    const newBook = {
      id: Date.now(),
      title: book.title,
      author: book.author_name?.[0] || "Unknown",
    };
    setBooks([...books, newBook]);
  };
  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };
  const editBook = (id, field, value) => {
    setBooks(
      books.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  return (
    <>
      <BookList books={books} onDelete={deleteBook} onEdit={editBook} />
      <hr />
    </>
  );
}
