// Custom hook untuk mengelola input form dan validasi
import { useState } from 'react';

const useForm = (initialValues, validateOnSubmit = false, validate) => {
  const [values, setValues] = useState(initialValues);     // Menyimpan nilai input
  const [errors, setErrors] = useState({});                // Menyimpan pesan error validasi

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Validasi saat input jika diperlukan
    if (!validateOnSubmit) {
      const error = validate({ [name]: value });
      setErrors({
        ...errors,
        ...error,
      });
    }
  };

  // Handler untuk submit form
  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Hanya submit jika tidak ada error
    if (Object.keys(validationErrors).length === 0) {
      onSubmit();
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
