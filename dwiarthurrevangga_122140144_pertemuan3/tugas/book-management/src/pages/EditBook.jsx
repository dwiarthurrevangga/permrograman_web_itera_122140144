import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { BookContext } from '../context/BookContext';
import useForm from '../hooks/useForm';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, updateBook } = useContext(BookContext);

  const selectedBook = books.find((b) => b.id === id);

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = 'Judul wajib diisi';
    if (!values.author) errors.author = 'Penulis wajib diisi';
    if (!values.status) errors.status = 'Status wajib dipilih';
    return errors;
  };

  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  } = useForm({ title: '', author: '', status: '' }, false, validate);

  useEffect(() => {
    if (selectedBook) {
      setValues(selectedBook);
    }
  }, [selectedBook, setValues]);

  const onSubmit = () => {
    updateBook(values);
    navigate('/');
  };

  if (!selectedBook) {
    return <p>Buku tidak ditemukan.</p>;
  }

  return (
    <div>
      <h2>Edit Buku</h2>
      <BookForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={(e) => handleSubmit(e, onSubmit)}
        isEdit
      />
    </div>
  );
};

export default EditBook;
