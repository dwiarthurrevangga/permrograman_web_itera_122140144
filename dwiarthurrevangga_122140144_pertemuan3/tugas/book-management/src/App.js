import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import { BookProvider } from './context/BookContext';

// Komponen utama aplikasi
const App = () => {
  return (
    // Menggunakan BookProvider untuk menyediakan state global
    <BookProvider>
      <Router>
        <div className="container">
          <h1>📚 Aplikasi Manajemen Buku</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
};

export default App;
