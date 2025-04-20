import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Membuat konteks untuk buku
export const BookContext = createContext();

// Komponen Provider yang menyimpan dan menyediakan state buku
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // Mengambil data dari localStorage saat pertama kali render
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Menyimpan data ke localStorage setiap kali state buku berubah
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Fungsi untuk menambah buku baru
  const addBook = (book) => {
    setBooks([...books, { ...book, id: uuidv4() }]);
  };

  // Fungsi untuk menghapus buku berdasarkan ID
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Fungsi untuk mengedit buku berdasarkan ID
  const updateBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  // Menyediakan state dan fungsi ke seluruh aplikasi
  return (
    <BookContext.Provider
      value={{ books, addBook, deleteBook, updateBook }}
    >
      {children}
    </BookContext.Provider>
  );
};
