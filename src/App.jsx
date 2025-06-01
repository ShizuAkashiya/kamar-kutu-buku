import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import "./styles.css";
import logo from "./assets/logo.png";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("my-books");
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("my-books", JSON.stringify(books));
  }, [books]);

  const addBook = async (book) => {
    const image = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "";

    let description = "";
    try {
      const res = await fetch(`https://openlibrary.org${book.key}.json`);
      const data = await res.json();
      description =
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "";
    } catch {
      description = "";
    }

    const newBook = {
      id: Date.now(),
      title: book.title,
      author: book.author_name?.[0] || "Unknown",
      image,
      description,
    };

    setBooks((prev) => [...prev, newBook]);
  };

  const editBook = (id, field, value) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };


  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="app">
      <a
        href="https://github.com/ShizuAkashiya"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-logo"
      >
        <img src={logo} alt="Logo" />
      </a>

      <h1>Kamar Kutu Buku</h1>
      <SearchBar onAddBook={addBook} />
      <hr />
      <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
    </div>
  );
}

export default App;
