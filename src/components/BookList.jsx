import "./styles.css";

export default function BookList({ books, onDelete, onEdit }) {
  return (
    <div>
      <h2>My Library</h2>
      {books.length === 0 ? (
        <p>baca dikit donk, kak</p>
      ) : (
        <ul className="library-list">
          {books.map((book) => (
            <li key={book.id}>
              {book.image && (
                <img src={book.image} alt="cover" width="60" />
              )}
              <div>
                <input
                  type="text"
                  value={book.title}
                  onChange={(e) => onEdit(book.id, "title", e.target.value)}/>
                <input
                  type="text"
                  value={book.author}
                  onChange={(e) => onEdit(book.id, "author", e.target.value)}/>
                <button onClick={() => onDelete(book.id)}>Delete</button>
                {book.description && (
                  <p className="description">{book.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
