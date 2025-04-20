import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookItem from '../components/BookItem';

describe('BookItem Component', () => {
  const mockBook = {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'milik',
  };

  const mockDelete = jest.fn();

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <BookItem book={mockBook} onDelete={mockDelete} />
      </BrowserRouter>
    );
  };

  test('menampilkan detail buku dengan benar', () => {
    renderComponent();

    expect(screen.getByText(/Atomic Habits/i)).toBeInTheDocument();
    expect(screen.getByText(/James Clear/i)).toBeInTheDocument();
    expect(screen.getByText(/milik/i)).toBeInTheDocument();
  });

  test('memiliki tombol Edit yang mengarah ke halaman edit', () => {
    renderComponent();

    const editButton = screen.getByText(/Edit/i);
    expect(editButton).toHaveAttribute('href', '/edit/1');
  });

  test('menjalankan fungsi onDelete saat tombol Hapus diklik', () => {
    renderComponent();

    const deleteButton = screen.getByText(/Hapus/i);
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith('1');
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
