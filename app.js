const {
  simpanContact,
  tulisPertanyaan,
  listContacts,
  deleteContact,
  detail,
} = require("./contact.js");

console.log("Selamat datang di aplikasi ini");
console.log("Pilihlah salah satu opsi dibawah ini");
console.log("1. Tambahkan data");
console.log("2. Hapus data");
console.log("3. Tampilkan data");
console.log("4. Detail data");

async function main() {
  const input = await tulisPertanyaan("Masukan Input dengan angka 1 - 4 : ");
  if (input === "1") {
    console.log("Kamu memilih angka 1 berarti kamu akan menambahkan data");
    const nama = await tulisPertanyaan("Masukkan nama anda : ");
    const email = await tulisPertanyaan("Masukkan email anda : ");
    const phone = await tulisPertanyaan("Masukkan no telepon anda : ");
    simpanContact(nama, email, phone);
  } else if (input === "2") {
    console.log("Kamu memilih angka 2 berarti kamu akan menghapus data");
    deleteContact();
  } else if (input === "3") {
    console.log("Kamu memilih angka 3 berarti kamu akan menampilkan data");
    listContacts();
  } else if (input === "4") {
    console.log("Kamu memilih angka 4 berarti kamu akan detail data");
    detail();
  } else {
    console.log("Kamu tidak memilih angka 1 - 4");
  }
}

main();
