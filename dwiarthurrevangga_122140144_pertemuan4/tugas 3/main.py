import math_operations as mo
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

print("=== Perhitungan Geometri ===")
print(f"Luas persegi (sisi=5): {mo.luas_persegi(5)}")
print(f"Keliling persegi (sisi=5): {mo.keliling_persegi(5)}")
print(f"Luas persegi panjang (7x4): {mo.luas_persegi_panjang(7, 4)}")
print(f"Keliling persegi panjang (7x4): {mo.keliling_persegi_panjang(7, 4)}")
print(f"Luas lingkaran (r=3): {mo.luas_lingkaran(3):.2f}")
print(f"Keliling lingkaran (r=3): {mo.keliling_lingkaran(3):.2f}")

print("\n=== Konversi Suhu ===")
print("Menggunakan import modul:")
print(f"25°C = {mo.celsius_ke_fahrenheit(25):.2f}°F")
print(f"25°C = {mo.celsius_ke_kelvin(25):.2f}K")

print("\nMenggunakan import fungsi langsung:")
print(f"30°C = {celsius_ke_fahrenheit(30):.2f}°F")
print(f"30°C = {celsius_ke_kelvin(30):.2f}K")

print(f"\nNilai konstanta PI: {mo.PI}")