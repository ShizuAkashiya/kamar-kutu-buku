import { useState } from "react";
import "./styles.css";

export default function SearchBar({ onAddBook }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState({});

  const searchBooks = async () => {
    if (!query.trim()) return;
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.docs.slice(0, 10));
  };

  const getDescription = async (key, index) => {
    try {
      const res = await fetch(`https://openlibrary.org${key}.json`);
      const data = await res.json();
      const desc =
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "gk ada sypnosis, kak.";
      setExpanded((prev) => ({ ...prev, [index]: desc }));
    } catch {
      setExpanded((prev) => ({ ...prev, [index]: "gk ada sypnosis, kak." }));
    }
  };

  return (
    <div className="search-bar">
      <h2>Search for Books</h2>
      <input
        type="text"
        placeholder="contoh: SCP-001 Swann's Proposal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>

      <ul className="book-results">
        {results.map((book, index) => {
          const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "";
          return (
            <li key={book.key}>
              <img src={cover} alt="cover" width="80" />
              <div>
                <strong>{book.title}</strong>
                <div>by {book.author_name?.[0] || "Unknown"}</div>
                <button onClick={() => onAddBook(book)}>Add</button>
                <button onClick={() => getDescription(book.key, index)}>
                  {expanded[index] ? "Hide" : "More"}
                </button>
                {expanded[index] && (
                  <p className="description">{expanded[index]}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
