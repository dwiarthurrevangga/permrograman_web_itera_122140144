import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { BookContext } from '../context/BookContext';
import useForm from '../hooks/useForm';

const AddBook = () => {
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = 'Judul wajib diisi';
    if (!values.author) errors.author = 'Penulis wajib diisi';
    if (!values.status) errors.status = 'Status wajib dipilih';
    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm({ title: '', author: '', status: '' }, false, validate);

  const onSubmit = () => {
    addBook(values);
    navigate('/');
  };

  return (
    <div>
      <h2>Tambah Buku</h2>
      <BookForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={(e) => handleSubmit(e, onSubmit)}
      />
    </div>
  );
};

export default AddBook;
