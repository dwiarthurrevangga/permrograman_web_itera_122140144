import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditBook from '../pages/EditBook';
import { BookContext } from '../context/BookContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock useNavigate dari react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('EditBook Page', () => {
  const mockUpdateBook = jest.fn();

  const books = [
    {
      id: '123',
      title: 'Buku Lama',
      author: 'Penulis Lama',
      status: 'baca',
    },
  ];

  const renderComponent = (id = '123') => {
    render(
      <BookContext.Provider value={{ books, updateBook: mockUpdateBook }}>
        <MemoryRouter initialEntries={[`/edit/${id}`]}>
          <Routes>
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </MemoryRouter>
      </BookContext.Provider>
    );
  };

  test('menampilkan form edit dengan data buku lama', () => {
    renderComponent();

    expect(screen.getByDisplayValue('Buku Lama')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Penulis Lama')).toBeInTheDocument();
    expect(screen.getByDisplayValue('baca')).toBeInTheDocument();
  });

  test('menampilkan error jika field dikosongkan lalu disubmit', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Penulis/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/Perbarui Buku/i));

    expect(screen.getByText(/Judul wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Penulis wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Status wajib dipilih/i)).toBeInTheDocument();
  });

  test('memanggil updateBook dan navigate saat form valid', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Buku Baru' },
    });

    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Penulis Baru' },
    });

    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: 'milik' },
    });

    fireEvent.click(screen.getByText(/Perbarui Buku/i));

    setTimeout(() => {
      expect(mockUpdateBook).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }, 0);
  });

  test('menampilkan pesan jika buku tidak ditemukan', () => {
    render(
      <BookContext.Provider value={{ books: [], updateBook: mockUpdateBook }}>
        <MemoryRouter initialEntries={['/edit/xxx']}>
          <Routes>
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </MemoryRouter>
      </BookContext.Provider>
    );

    expect(screen.getByText(/Buku tidak ditemukan/i)).toBeInTheDocument();
  });
});
