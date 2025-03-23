// To-Do List dengan LocalStorage
function simpanToDo() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(item => {
        todos.push({ text: item.querySelector("span").innerText, completed: item.classList.contains("line-through") });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function muatToDo() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    document.getElementById("todo-list").innerHTML = "";
    todos.forEach(todo => tambahItemToDo(todo.text, todo.completed));
}

function tambahItemToDo(text, completed = false) {
    const list = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.className = `flex justify-between items-center p-2 border rounded mb-2 ${completed ? "line-through text-gray-500" : ""}`;
    li.innerHTML = `<span>${text}</span>
        <div>
            <button class="btn-selesai bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2">✔</button>
            <button class="btn-hapus bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">✖</button>
        </div>`;
    
    li.querySelector(".btn-selesai").addEventListener("click", function() {
        li.classList.toggle("line-through");
        li.classList.toggle("text-gray-500");
        simpanToDo();
    });

    li.querySelector(".btn-hapus").addEventListener("click", function() {
        li.remove();
        simpanToDo();
    });

    list.appendChild(li);
    simpanToDo();
}

document.getElementById("btn-tambah-todo").addEventListener("click", function() {
    const input = document.getElementById("todo-input");
    if (input.value.trim() !== "") {
        tambahItemToDo(input.value.trim());
        input.value = "";
    }
});

document.addEventListener("DOMContentLoaded", muatToDo);

//Kalkulator
function hitungKalkulator(angka1, angka2, operasi) {
    if (isNaN(angka1) || isNaN(angka2)) return "Masukkan angka!";
    switch (operasi) {
        case "tambah": return angka1 + angka2;
        case "kurang": return angka1 - angka2;
        case "kali": return angka1 * angka2;
        case "bagi": return angka2 !== 0 ? angka1 / angka2 : "Error: Tidak bisa bagi nol";
        case "pangkat": return Math.pow(angka1, angka2);
        case "akar": return Math.sqrt(angka1);
        case "modulus": return angka1 % angka2;
        default: return "Operasi tidak valid";
    }
}

["tambah", "kurang", "kali", "bagi", "pangkat", "akar", "modulus"].forEach(op => {
    document.getElementById(`btn-${op}`).addEventListener("click", function() {
        const a = parseFloat(document.getElementById("angka1").value);
        const b = parseFloat(document.getElementById("angka2").value);
        const hasil = hitungKalkulator(a, b, op);
        document.getElementById("hasil-kalkulator").innerHTML = `Hasil: ${hasil}`;
    });
});

//Validasi Form
function validasiForm() {
    const nama = document.getElementById("form-nama").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const password = document.getElementById("form-password").value.trim();
    let pesan = "";

    if (nama.length < 3) {
        pesan += "<p class='text-red-500'>❌ Nama harus lebih dari 3 karakter!</p>";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        pesan += "<p class='text-red-500'>❌ Email tidak valid!</p>";
    }

    if (password.length < 8) {
        pesan += "<p class='text-red-500'>❌ Password harus minimal 8 karakter!</p>";
    }

    document.getElementById("form-output").innerHTML = pesan || "<p class='text-green-500'>✅ Form valid!</p>";
}

document.getElementById("btn-validasi").addEventListener("click", validasiForm);
