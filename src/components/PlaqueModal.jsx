import { useState, useEffect } from "react";
import BookListItem from "./BookListItem";

export default function PlaqueModal({ selectedPlaque, setIsModalOpen }) {
  const [books, setBooks] = useState([]);

  // ✅ Fetch books from OpenLibrary
  async function fetchBooks() {
    const author =
      selectedPlaque?.properties?.lead_subject_name ||
      selectedPlaque?.properties?.name ||
      selectedPlaque?.properties?.title;

    if (!author) return;

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${author}&limit=5`
      );

      const data = await response.json();

      console.log("Fetched books data:", data);

      setBooks(data.docs);
    } catch (error) {
      console.error("Error fetching books data:", error);
    }
  }

  // ✅ useEffect runs once when Modal mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 9999,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Modal Box */}
      <div
        style={{
          width: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          Recommended Reading for{" "}
          {selectedPlaque?.properties?.lead_subject_name ||
            selectedPlaque?.properties?.name ||
            "Unknown Author"}
        </h2>

        {/* ✅ Render book list */}
        <div style={{ marginTop: "15px" }}>
          {books.length === 0 ? (
            <p>Loading recommended reading...</p>
          ) : (
            books.map((book) => (
              <BookListItem
                key={book.cover_edition_key || book.key}
                book={book}
              />
            ))
          )}
        </div>

        {/* Close Button */}
        <button
          style={{
            marginTop: "15px",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
