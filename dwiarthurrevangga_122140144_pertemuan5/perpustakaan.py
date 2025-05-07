from abc import ABC, abstractmethod
from typing import Dict, List, Optional

class LibraryItem(ABC):
    def __init__(self, item_id: str, title: str):
        self._item_id = item_id
        self._title = title
        self._is_available = True
        
    @property
    def item_id(self) -> str:
        """Getter untuk item_id dengan property decorator"""
        return self._item_id
    
    @property
    def title(self) -> str:
        """Getter untuk title dengan property decorator"""
        return self._title
    
    @property
    def is_available(self) -> bool:
        """Getter untuk status ketersediaan"""
        return self._is_available
    
    @abstractmethod
    def display_info(self) -> None:
        """Method abstract untuk menampilkan informasi item"""
        pass
    
    def check_out(self) -> bool:
        """Method untuk meminjam item"""
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def check_in(self) -> None:
        """Method untuk mengembalikan item"""
        self._is_available = True


class Book(LibraryItem):
    def __init__(self, item_id: str, title: str, author: str, pages: int):
        super().__init__(item_id, title)
        self.__author = author
        self.__pages = pages
    
    @property
    def author(self) -> str:
        """Getter untuk author"""
        return self.__author
    
    def display_info(self) -> None:
        """Implementasi method abstract untuk menampilkan info buku"""
        availability = "Tersedia" if self._is_available else "Dipinjam"
        print(f"Buku [ID: {self._item_id}]")
        print(f"Judul: {self._title}")
        print(f"Pengarang: {self.__author}")
        print(f"Halaman: {self.__pages}")
        print(f"Status: {availability}\n")


class Magazine(LibraryItem):
    def __init__(self, item_id: str, title: str, issue: str, publisher: str):
        super().__init__(item_id, title)
        self.__issue = issue
        self.__publisher = publisher
    
    @property
    def issue(self) -> str:
        """Getter untuk issue"""
        return self.__issue
    
    def display_info(self) -> None:
        """Implementasi method abstract untuk menampilkan info majalah"""
        availability = "Tersedia" if self._is_available else "Dipinjam"
        print(f"Majalah [ID: {self._item_id}]")
        print(f"Judul: {self._title}")
        print(f"Issue: {self.__issue}")
        print(f"Penerbit: {self.__publisher}")
        print(f"Status: {availability}\n")


class Library:
    def __init__(self):
        self.__items: Dict[str, LibraryItem] = {}
    
    def add_item(self, item: LibraryItem) -> None:
        """Menambahkan item baru ke perpustakaan"""
        self.__items[item.item_id] = item
        print(f"Item dengan ID {item.item_id} berhasil ditambahkan.")
    
    def display_all_items(self) -> None:
        """Menampilkan semua item di perpustakaan"""
        if not self.__items:
            print("Perpustakaan kosong.")
            return
        
        print("\nDaftar Item di Perpustakaan:")
        for item in self.__items.values():
            item.display_info()
    
    def find_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """Mencari item berdasarkan ID"""
        return self.__items.get(item_id)
    
    def find_by_title(self, title: str) -> List[LibraryItem]:
        """Mencari item berdasarkan judul (case insensitive)"""
        return [item for item in self.__items.values() 
                if title.lower() in item.title.lower()]
    
    def check_out_item(self, item_id: str) -> bool:
        """Meminjam item dari perpustakaan"""
        item = self.find_by_id(item_id)
        if item and item.check_out():
            print(f"Item dengan ID {item_id} berhasil dipinjam.")
            return True
        print(f"Item dengan ID {item_id} tidak tersedia atau tidak ditemukan.")
        return False
    
    def check_in_item(self, item_id: str) -> bool:
        """Mengembalikan item ke perpustakaan"""
        item = self.find_by_id(item_id)
        if item:
            item.check_in()
            print(f"Item dengan ID {item_id} berhasil dikembalikan.")
            return True
        print(f"Item dengan ID {item_id} tidak ditemukan.")
        return False


def main():
    library = Library()
    
    # Menambahkan beberapa item ke perpustakaan
    book1 = Book("B001", "Python Programming", "John Smith", 350)
    book2 = Book("B002", "Clean Code", "Robert Martin", 400)
    magazine1 = Magazine("M001", "National Geographic", "2023-10", "National Geographic Society")
    magazine2 = Magazine("M002", "Time", "2023-11", "Time USA")
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(magazine1)
    library.add_item(magazine2)
    
    # Menampilkan semua item
    library.display_all_items()
    
    # Mencari item berdasarkan judul
    print("\nHasil pencarian untuk 'Python':")
    results = library.find_by_title("Python")
    for item in results:
        item.display_info()
    
    # Meminjam dan mengembalikan item
    library.check_out_item("B001")
    library.display_all_items()
    
    library.check_in_item("B001")
    library.display_all_items()


if __name__ == "__main__":
    main()