import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Komponen untuk menampilkan satu item buku
const BookItem = ({ book, onDelete }) => {
  return (
    <div className="book-item">
      <div className="book-details">
        <h3>{book.title}</h3>
        <p><strong>Penulis:</strong> {book.author}</p>
        <p><strong>Status:</strong> {book.status}</p>
      </div>

      <div className="actions">
        <Link to={`/edit/${book.id}`} className="btn secondary">Edit</Link>
        <button onClick={() => onDelete(book.id)} className="btn danger">Hapus</button>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;
