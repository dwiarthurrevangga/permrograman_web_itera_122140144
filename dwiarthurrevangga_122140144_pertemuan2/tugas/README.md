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

- **Template Literals**  
  Untuk rendering HTML dinamis  
  ```js
  `<li class="task-item">${task.title}</li>`
  ```

- **Classes**  
  Menggunakan kelas `TaskManager` sebagai inti aplikasi dengan method dan properti yang terorganisir

- **let dan const**  
  - `const` untuk nilai yang tidak berubah
  - `let` untuk variabel yang dapat di-reassign

- **Destructuring Assignment**  
  Untuk ekstraksi nilai dari objek atau array  
  ```js
  const { id, title } = task;
  ```

- **Spread Operator**  
  Untuk menggabungkan array atau objek  
  ```js
  this.tasks = [...this.tasks, newTask];
  ```

- **Array Methods**  
  Menggunakan `map()`, `filter()`, `reduce()`, `findIndex()`  
  ```js
  this.tasks.map(task => this.renderTask(task));
  ```

- **LocalStorage**  
  Untuk penyimpanan data persisten di browser  
  ```js
  localStorage.setItem("tasks", JSON.stringify(this.tasks));
  localStorage.getItem("tasks");
  ```

---

## 🚀 Cara Menggunakan

### ✅ Menambahkan Tugas
1. Isi form **"Add New Task"**
2. Masukkan judul, deadline, dan pilih prioritas
3. Klik tombol **"Add"**

### 🧹 Mengelola Tugas
- Klik pada tugas untuk menandainya sebagai selesai/belum
- Klik tombol **"Delete"** untuk menghapus tugas

### 📘 Menambahkan Jadwal Kelas
1. Isi form **"Add Class Schedule"**
2. Masukkan detail kelas: nama, dosen, hari, waktu, dan ruangan
3. Klik tombol **"Add Class"**

### 🔁 Mengelola Jadwal Kelas
- Klik tombol **"Edit"** untuk mengubah detail kelas
- Klik tombol **"Delete"** untuk menghapus jadwal kelas

---

## 🛠️ Teknologi yang Digunakan
- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage untuk penyimpanan data

---
