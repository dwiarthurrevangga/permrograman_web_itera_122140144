import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { BookContext } from '../context/BookContext';
import { MemoryRouter } from 'react-router-dom';

describe('Halaman Home', () => {
  const mockDeleteBook = jest.fn();

  const books = [
    { id: '1', title: 'Belajar React', author: 'Andi', status: 'baca' },
    { id: '2', title: 'Pemrograman JavaScript', author: 'Budi', status: 'milik' },
    { id: '3', title: 'Beli Buku Baru', author: 'Citra', status: 'beli' },
  ];

  const renderComponent = () => {
    render(
      <BookContext.Provider value={{ books, deleteBook: mockDeleteBook }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </BookContext.Provider>
    );
  };

  test('menampilkan semua buku saat awal', () => {
    renderComponent();
    expect(screen.getByText('Belajar React')).toBeInTheDocument();
    expect(screen.getByText('Pemrograman JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Beli Buku Baru')).toBeInTheDocument();
  });

  test('menampilkan hasil pencarian', () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/cari judul/i), {
      target: { value: 'react' },
    });

    expect(screen.getByText('Belajar React')).toBeInTheDocument();
    expect(screen.queryByText('Pemrograman JavaScript')).not.toBeInTheDocument();
  });

  test('menampilkan hasil filter berdasarkan status', () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Filter/i), {
      target: { value: 'beli' },
    });

    expect(screen.getByText('Beli Buku Baru')).toBeInTheDocument();
    expect(screen.queryByText('Belajar React')).not.toBeInTheDocument();
  });

  test('menampilkan pesan jika tidak ada buku ditemukan', () => {
    render(
      <BookContext.Provider value={{ books: [], deleteBook: mockDeleteBook }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </BookContext.Provider>
    );

    expect(screen.getByText(/tidak ada buku ditemukan/i)).toBeInTheDocument();
  });

  test('memanggil fungsi deleteBook saat tombol hapus diklik', () => {
    renderComponent();
    const deleteButton = screen.getAllByText(/hapus/i)[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
  });
});
