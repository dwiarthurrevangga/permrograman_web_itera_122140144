import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';

describe('Filter Component', () => {
  const mockSetFilter = jest.fn();

  test('menampilkan semua opsi filter dengan benar', () => {
    render(<Filter filter="semua" setFilter={mockSetFilter} />);

    expect(screen.getByLabelText(/Filter/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Semua' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Milik' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sedang Dibaca' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Ingin Dibeli' })).toBeInTheDocument();
  });

  test('mengubah filter memanggil fungsi setFilter', () => {
    render(<Filter filter="semua" setFilter={mockSetFilter} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'baca' } });

    expect(mockSetFilter).toHaveBeenCalledWith('baca');
    expect(mockSetFilter).toHaveBeenCalledTimes(1);
  });
});
