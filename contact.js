const fs = require('fs');
const readline = require('readline');
const validator = require('validator')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contact.json jika belum ada
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}





// Fungsi untuk menulis pertanyaan
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve) => {
    rl.question(pertanyaan, (jawaban) => {
      resolve(jawaban);
    });
  });
};

// Fungsi untuk menyimpan kontak
const simpanContact = (name, email, phone) => {
  const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const newContact = {name: name.toLowerCase(), email: email.toLowerCase(), phone };
  const nama =  name.toLowerCase();
  const gmail = email.toLowerCase();


  if(!name || !email || !phone) {
    console.log('Data tidak boleh kosong!');
    return rl.close();
  }else if(validator.isEmail(email) === false && validator.isMobilePhone(phone, 'id-ID') === false){
    console.log('Email dan no telepon tidak valid!');
    console.log('Contoh email yang valid: @gmail.com');
    console.log('Contoh no telepon yang valid: 085234567890');
    console.log('silahkan coba lagi');
    return rl.close();

  }else if(validator.isEmail(email) === false){
    console.log('Email tidak valid!');
    console.log('Contoh email yang valid: @gmail.com');
    console.log('silahkan coba lagi');
    return rl.close();
  }else if(validator.isMobilePhone(phone, 'id-ID') === false){
    console.log('No telepon tidak valid!');
    console.log('Contoh no telepon yang valid: 085234567890');
    console.log('silahkan coba lagi');
    return rl.close();
  }
  else{
    if(contacts.some(contact => contact.name === nama)){
      console.log(`Data ${name} sudah ada di contact.json`);
      rl.close();
    }else if(contacts.some(contact => contact.email === gmail)){
      console.log(`Data ${email} sudah ada di contact.json`);
      rl.close();
    }    
    else if(contacts.some(contact => contact.phone === phone)){
      console.log(`Data ${phone} sudah ada di contact.json`);
      rl.close();
    }
    else {
      contacts.push(newContact);
      fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
      console.log('Data berhasil disimpan ke contact.json');
      rl.close();
    }
  }
};

const listContacts = () => {
  const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  // jika data ada
  if(contacts.length === 0){
    console.log('Data kosong');
    return rl.close();
  }else{  console.log('Daftar Kontak :');
    contacts.forEach((contact, i) => {
      console.log(`${i + 1}. Nama : ${contact.name} - Email : ${contact.email} - Phone : ${contact.phone}`);
    });
    rl.close();
  }

};

const deleteContact = () => {
  const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const nama = contacts.map(contact => contact.name);
  const gmail = contacts.map(contact => contact.email);
  const phone = contacts.map(contact => contact.phone);
  
  rl.question('Masukkan nama, email atau no telepon yang ingin dihapus : ', (input) => {
    if(nama.includes(input) || gmail.includes(input) || phone.includes(input)){
      const newContacts = contacts.filter(contact => contact.name !== input && contact.email !== input && contact.phone !== input);
      fs.writeFileSync(dataPath, JSON.stringify(newContacts, null, 2));
      console.log('Data berhasil dihapus');
      rl.close();
    }else{
      console.log('Data tidak ditemukan');
      rl.close();
    }
  });

}
module.exports = { tulisPertanyaan, simpanContact, listContacts ,deleteContact};