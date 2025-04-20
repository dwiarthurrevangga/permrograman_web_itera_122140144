import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddBook from '../pages/AddBook';
import { BookContext } from '../context/BookContext';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate dari react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('AddBook Page', () => {
  const mockAddBook = jest.fn();

  const renderComponent = () => {
    render(
      <BookContext.Provider value={{ addBook: mockAddBook }}>
        <BrowserRouter>
          <AddBook />
        </BrowserRouter>
      </BookContext.Provider>
    );
  };

  test('menampilkan form tambah buku', () => {
    renderComponent();

    expect(screen.getByText(/Tambah Buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul Buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Tambah Buku/i)).toBeInTheDocument();
  });

  test('menampilkan pesan error jika form kosong dan disubmit', () => {
    renderComponent();

    const submitButton = screen.getByText(/Tambah Buku/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Judul wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Penulis wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Status wajib dipilih/i)).toBeInTheDocument();
  });

  test('memanggil addBook jika form valid dan disubmit', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Buku Test' },
    });

    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Penulis Test' },
    });

    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: 'milik' },
    });

    fireEvent.click(screen.getByText(/Tambah Buku/i));

    // Tunggu satu tick event loop agar validasi selesai
    setTimeout(() => {
      expect(mockAddBook).toHaveBeenCalled();
    }, 0);
  });
});
