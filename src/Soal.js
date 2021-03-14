/*
EXERCISE JCWM-1602
Anda adalah web developer yang sedang membuat project web application sebuah e-commerce yang menjual produk pakaian 
(kaos, celana, dan sepatu) dengan spesifikasi sebagai berikut :

1. Pages Register
- Buatlah halaman register hanya 1 halaman saja {--done--}
- User hanya dapat mendaftarkan email saja dengan ketentuan :
  • Email harus tervalidasi {--done--}
  • Email harus belum terdaftar di database {--done--}
- User harus memasukan password & confirm password dengan ketentuan :
  • Password & confirm password harus sesuai {--done--}
  • Password minimal 8 karakter {--done--}
* Notes : 

- Apabila user berhasil mendaftar, redirect ke halaman landing page.  {--done--}
- Apabila user sudah login, maka pages register tidak dapat di akses. {--done--}

2. Pages Login
- Buatlah pages login (bukan modal) {--done--}
- Apabila user sudah login, tampilkan nama email di navbar (tampilkan nama email sebanyak 10 karakter saja.  {--done--}
  Ex. ryan.fandy@gmail.com - - - > ryan.fandy…, ryandefryan@gmail.com - - - > ryandefrya… ). {--done--}
- Apabila user login maka selamanya user tetap login meskipun halaman web di close maupun di refresh (kecuali user telah melakukan logout) {--done--}
* Notes : 

- Apabila user berhasil login, redirect ke halaman landing page. {--done--}
– Apabila user sudah login, maka pages login tidak dapat di akses. {--done--}

3. Landing Page
- Tampilkan 10 product yang memiliki harga paling murah menggunakan React Slick {--done--}

4. Detail Product
- Tampilkan seluruh informasi product dengan layouting yang sama dengan project front-end {--done--}
- Tampilkan info “product hampir habis” Ketika stock product <= 3 {--done--}
- Tampilkan product yg memiliki kategori serupa dibawah detail product {--done--}
* Notes : 
    -   Tampilkan button add to cart untuk user login dan belum login. {--done--}
        Apabila user belum login, Ketika melakukan add to cart maka tampilkan warning dalam bentuk pop-up.  {--done--}
    -   Ketika user melakukan add to cart, tampilkan total cart terbaru user di navbar. {--done--}

5. User Cart
- Buatlah halaman cart sesuai dengan project front-end {--done--}

6. Checkout / Payment
- Buatlah halaman CO/Payment sesuai dengan project front-end {--done--}
- Buatlah konfirmasi menggunakan pop-up Ketika user melakukan CO/payment {--done--}

7. History Transaction
- Buatlah history transaction sesuai dengan project front-end dan tambahkan : {--done--}
• Batas transaksi harus dilakukan di tanggal yg sama. Apabila berbeda, tampilkan status “cancelled”. {--done--}
* Notes : - User hanya dapat melakukan pembayaran ketika status transaksi Unpaid. {--done--}



























*/