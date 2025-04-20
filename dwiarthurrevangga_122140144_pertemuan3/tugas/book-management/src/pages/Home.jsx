import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import BookItem from '../components/BookItem';
import Filter from '../components/Filter';

const Home = () => {
  const { books, deleteBook } = useContext(BookContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('semua');

  // Filter dan pencarian
  const filteredBooks = books.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'semua' || book.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Cari judul buku..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/add" className="btn">+ Tambah Buku</Link>
      </div>

      <Filter filter={filter} setFilter={setFilter} />

      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <BookItem key={book.id} book={book} onDelete={deleteBook} />
        ))
      ) : (
        <p>Tidak ada buku ditemukan.</p>
      )}
    </div>
  );
};

export default Home;
