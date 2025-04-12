# Student Task Manager - Personal Dashboard

![Screenshot 2025-04-13 000702](https://github.com/user-attachments/assets/6585330d-6edf-4e7f-a1b3-274ce428fb7a)

## 📝 Deskripsi Aplikasi

Student Task Manager adalah aplikasi dashboard personal yang membantu mahasiswa mengorganisir tugas-tugas kuliah dan jadwal kelas mereka. Aplikasi ini menyediakan antarmuka yang sederhana namun powerful untuk mengelola aktivitas akademik sehari-hari.

## ✨ Fitur Utama

### 📌 Manajemen Tugas
- Tambah tugas baru dengan judul, deadline, dan prioritas
- Tandai tugas sebagai **selesai** atau **belum**
- Hapus tugas yang sudah tidak relevan
- Prioritas tugas (**High**, **Medium**, **Low**) ditandai dengan warna berbeda
- Statistik tugas: total tugas dan jumlah tugas dengan prioritas tinggi

### 🗓️ Manajemen Jadwal Kelas
- Tambah jadwal kelas dengan detail lengkap (nama mata kuliah, dosen, hari, waktu, ruangan)
- Edit jadwal kelas yang sudah ada
- Hapus jadwal kelas
- Tampilan terorganisir berdasarkan hari dalam seminggu

### 🔧 Fitur Tambahan
- Penyimpanan lokal menggunakan **localStorage** (data tetap tersimpan saat browser ditutup)
- Tampilan waktu **real-time**
- Antarmuka **responsif** yang bekerja di berbagai perangkat

---

## 🧠 Fitur ES6+ yang Diimplementasikan

- **Arrow Functions**  
  Digunakan untuk metode kelas dan event handlers  
  ```js
  loadTasks = () => {...}
  handleAddTask = (e) => {...}
  ```
