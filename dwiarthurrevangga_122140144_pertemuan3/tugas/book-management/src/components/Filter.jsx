import React from 'react';
import PropTypes from 'prop-types';

// Komponen untuk filter berdasarkan status buku
const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <label>Filter: </label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="semua">Semua</option>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
