import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm';

describe('BookForm Component', () => {
  const mockValues = {
    title: '',
    author: '',
    status: '',
  };

  const mockErrors = {
    title: '',
    author: '',
    status: '',
  };

  const handleChange = jest.fn();
  const handleSubmit = jest.fn((e) => e.preventDefault());

  test('render input dan tombol dengan benar', () => {
    render(
      <BookForm
        values={mockValues}
        errors={mockErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    expect(screen.getByLabelText(/Judul Buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Tambah Buku/i)).toBeInTheDocument();
  });

  test('menjalankan handleChange saat input berubah', () => {
    render(
      <BookForm
        values={mockValues}
        errors={mockErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    const titleInput = screen.getByLabelText(/Judul Buku/i);
    fireEvent.change(titleInput, { target: { value: 'Buku Baru' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('menjalankan handleSubmit saat form disubmit', () => {
    render(
      <BookForm
        values={mockValues}
        errors={mockErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    const form = screen.getByRole('form', { hidden: true }) || screen.getByRole('form') || screen.getByText(/Tambah Buku/i).closest('form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('menampilkan pesan error jika ada error pada input', () => {
    const errorsWithMessage = {
      title: 'Judul wajib diisi',
      author: 'Penulis wajib diisi',
      status: 'Status wajib dipilih',
    };

    render(
      <BookForm
        values={mockValues}
        errors={errorsWithMessage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    expect(screen.getByText(/Judul wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Penulis wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Status wajib dipilih/i)).toBeInTheDocument();
  });

  test('menampilkan tombol dengan label Perbarui Buku jika mode edit', () => {
    render(
      <BookForm
        values={mockValues}
        errors={mockErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={true}
      />
    );

    expect(screen.getByText(/Perbarui Buku/i)).toBeInTheDocument();
  });
});
