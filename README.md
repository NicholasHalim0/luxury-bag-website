# Tentang Proyek Ini

Proyek ini merupakan website e-commerce untuk penjualan luxury bags yang saya bangun dengan tujuan memberikan pengalaman berbelanja online yang modern dan mewah. Saya menggunakan teknologi-teknologi terkini untuk memastikan website ini responsif, aman, dan mudah dioperasikan oleh pengguna serta admin.

## Teknologi yang Digunakan

**Backend**:
Saya menggunakan Node.js dan Express.js untuk membangun API yang mengatur semua logika bisnis, mulai dari autentikasi pengguna (register, login, update profile, dan penghapusan akun), manajemen produk (CRUD produk), hingga pengelolaan pesanan. Data disimpan di MongoDB dan diakses menggunakan Mongoose untuk memudahkan interaksi dengan database. Untuk menjaga keamanan, saya menerapkan autentikasi berbasis JSON Web Token (JWT), sehingga hanya pengguna yang sudah terverifikasi yang dapat mengakses endpoint tertentu.

**Frontend**:
Di sisi frontend, saya menggunakan React untuk membangun antarmuka pengguna yang interaktif dan dinamis. Routing antar halaman diatur dengan React Router v6, yang memungkinkan navigasi yang mulus antara halaman Home, Produk, Detail Produk, Login, Register, Checkout, Payment, serta halaman khusus admin. Saya juga menggunakan Context API untuk mengelola state global, misalnya untuk keranjang belanja (cart), sehingga informasi produk yang dipilih dapat diakses di berbagai bagian aplikasi.

**Integrasi Pembayaran**:
Untuk proses pembayaran, saya mengintegrasikan PayPal menggunakan library @paypal/react-paypal-js. Hal ini memungkinkan pengguna untuk melakukan pembayaran secara online melalui PayPal, dengan tombol pembayaran yang dinamis berdasarkan total belanja mereka.

**Build Tools dan Styling**:
Proyek ini dibuat menggunakan Create React App untuk bagian frontend. Saya memanfaatkan CRACO (Create React App Configuration Override) untuk mengatasi beberapa konfigurasi webpack, seperti error source map, tanpa harus eject dari CRA. Styling pada website diatur menggunakan CSS yang modular untuk setiap komponen, sehingga tampilan halaman menjadi modern dan konsisten dengan identitas brand luxury bags.

## Fitur Utama
**Autentikasi Pengguna**:
Pengguna dapat mendaftar dengan memasukkan email, password, username, dan nomor handphone. Setelah registrasi, mereka dapat login untuk mendapatkan akses penuh ke website. Fitur edit profile memungkinkan pengguna untuk memperbarui informasi mereka kapan saja.

**Manajemen Produk**:
Produk ditampilkan secara dinamis dari database. Pengguna dapat melihat detail produk dengan informasi lengkap, sedangkan admin memiliki akses ke dashboard khusus yang memungkinkan mereka menambah, mengedit, dan menghapus produk.

**Keranjang Belanja dan Checkout**:
Fitur keranjang belanja menggunakan Context API untuk menyimpan produk yang dipilih pengguna. Di halaman checkout, pengguna dapat memasukkan informasi alamat pengiriman, yang kemudian akan digunakan untuk proses pengiriman produk.

**Integrasi Pembayaran dengan PayPal**:
Proses pembayaran dilakukan melalui PayPal, dengan tombol pembayaran yang disesuaikan secara dinamis berdasarkan total belanja pengguna. Hal ini memastikan pengalaman pembayaran yang mudah dan aman.

**Fitur Admin**:
Untuk admin, saya menyertakan dashboard khusus yang memungkinkan pengelolaan produk secara menyeluruh. Hanya pengguna dengan hak akses admin (ditandai dengan properti isAdmin) yang dapat mengakses fitur-fitur ini, sehingga menjaga keamanan dan integritas data produk.

# Kesimpulan
Proyek e-commerce luxury bags ini dibangun dengan fokus pada pengalaman pengguna yang elegan dan fungsionalitas yang kuat. Dengan memanfaatkan teknologi seperti Node.js, Express.js, MongoDB, React, dan integrasi PayPal, saya berharap website ini dapat memberikan pengalaman berbelanja yang menyenangkan dan aman bagi pengguna, sekaligus menyediakan alat pengelolaan yang efisien bagi admin.

Jika ada pertanyaan atau masukan lebih lanjut, silakan hubungi saya melalui nicholashalim13@gmail.com. Terima kasih!
