import React from 'react';
import PropTypes from 'prop-types';

// Komponen form untuk menambah atau mengedit buku
const BookForm = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  isEdit = false,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && <small className="error">{errors.title}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
        />
        {errors.author && <small className="error">{errors.author}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
        >
          <option value="">-- Pilih Status --</option>
          <option value="milik">Milik</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
        {errors.status && <small className="error">{errors.status}</small>}
      </div>

      <button type="submit" className="btn">
        {isEdit ? 'Perbarui Buku' : 'Tambah Buku'}
      </button>
    </form>
  );
};

// PropTypes digunakan untuk mengecek tipe props
BookForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
};

export default BookForm;
