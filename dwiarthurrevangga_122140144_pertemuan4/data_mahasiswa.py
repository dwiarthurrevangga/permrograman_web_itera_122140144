data_mahasiswa = [
    {"nama": "Tinky-Winky", "nim": "001", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 80},
    {"nama": "Dipsy", "nim": "002", "nilai_uts": 75, "nilai_uas": 80, "nilai_tugas": 70},
    {"nama": "Lala", "nim": "003", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 60},
    {"nama": "Po", "nim": "004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 50},
    {"nama": "Asep", "nim": "005", "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 40},
]

for mahasiswa in data_mahasiswa:
    nilai_akhir = (0.3 * mahasiswa["nilai_uts"] + 
                  0.4 * mahasiswa["nilai_uas"] + 
                  0.3 * mahasiswa["nilai_tugas"])
    mahasiswa["nilai_akhir"] = nilai_akhir
    
    if nilai_akhir >= 80:
        mahasiswa["grade"] = "A"
    elif 70 <= nilai_akhir < 80:
        mahasiswa["grade"] = "B"
    elif 60 <= nilai_akhir < 70:
        mahasiswa["grade"] = "C"
    elif 50 <= nilai_akhir < 60:
        mahasiswa["grade"] = "D"
    else:
        mahasiswa["grade"] = "E"

print("\nDaftar Nilai Mahasiswa")
print("="*70)
print("| {:<5} | {:<15} | {:<10} | {:<10} | {:<10} | {:<10} | {:<5} |".format(
    "NIM", "Nama", "UTS", "UAS", "Tugas", "Akhir", "Grade"))
print("="*70)

for mhs in data_mahasiswa:
    print("| {:<5} | {:<15} | {:<10.1f} | {:<10.1f} | {:<10.1f} | {:<10.1f} | {:<5} |".format(
        mhs["nim"], mhs["nama"], mhs["nilai_uts"], mhs["nilai_uas"], 
        mhs["nilai_tugas"], mhs["nilai_akhir"], mhs["grade"]))

print("="*70)

nilai_akhir_list = [mhs["nilai_akhir"] for mhs in data_mahasiswa]
max_index = nilai_akhir_list.index(max(nilai_akhir_list))
min_index = nilai_akhir_list.index(min(nilai_akhir_list))

print("\nMahasiswa dengan nilai tertinggi:")
print(f"Nama: {data_mahasiswa[max_index]['nama']}, Nilai: {data_mahasiswa[max_index]['nilai_akhir']:.1f}, Grade: {data_mahasiswa[max_index]['grade']}")
print("\nMahasiswa dengan nilai terendah:")
print(f"Nama: {data_mahasiswa[min_index]['nama']}, Nilai: {data_mahasiswa[min_index]['nilai_akhir']:.1f}, Grade: {data_mahasiswa[min_index]['grade']}")