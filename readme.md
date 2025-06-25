# Vue Optimization

## Why need optimization?
Sebenarnya Vue.js didesain ringan dan cepat. Tapi jika membuat aplikasi yang kompleks tanpa teknik optimasi yang tepat, performa bisa turun.

Tantangan Utama dalam performa Vue.js:
- **Over-reactivity** : Terlalu banyak reactivity yang tidak perlu.
- **Component re-render** : Komponen yang sering di-render ulang tanpa keperluan.
- **Large bundle size** : Ukuran bundle yang besar karena banyaknya dependensi.
- **Heavy DOM Operation** : Operasi DOM yang berat karena manipulasi yang tidak efisien, UI jadi lambat.

## What to do?

### [Reactivity Optimization](https://vuejs.org/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
Reactivity adalah fitur dimana Vue melacak perubahan data dan memperbarui DOM secara otomatis.

**How to optimize :**
- Gunakan `computed` dibanding `watch` untuk menghindari overhead reactivity.
- Gunakan `shallowReactive` atau `shallowRef` untuk struktur data besar yang tidak perlu reactivity mendalam.

[**Deep Reactivity Problem**](https://vuejs.org/guide/extras/reactivity-in-depth#reactivity-in-depth)

`ref` dan `reactive` pada secara default akan membuat deep reactivity (semua properti di dalam objek akan dilacak atau menjadi reaktif). Hal ini dapat menyebabkan overhead kinerja, (seperti data chart, geoJSON, konfigurasi kompleks) bisa membuat aplikasi lemot dan lamban merespons.

`shallowRef` dan `shallowReactive` hanya membuat top-level reactivity, alias tidak hanya melakukan perubahan (reaktif) pada tingkat paling atas. Hal ini tentu meningkatkan performa karena menghindari deep reactivity.

<img src="./asset/shallow.png"/>

### Debounce & Throttle
Dalam Vue apps, event seperti input, scroll, atau resize dapat memicu terlalu banyak update atau API call. 

Maka, Gunakan `debounce` atau `throttle` untuk membatasi frekuensi eksekusi fungsi tersebut.
- **Debounce** : Menunda eksekusi fungsi sampai tidak ada event lagi selama X ms (delay)
- **Throttle** : Menjalankan fungsi maksimal sekali tiap X ms, walaupun event terus terjadi

<img src="./asset/debounce.png"/>

### Reduce Component Re-render
Untuk menghindari komponen yang sering di-render ulang:
- Gunakan attribute `key` pada elemen yang diulang (loop) untuk membantu Vue mengidentifikasi elemen yang berubah.
- Gunakan `v-once` untuk merender elemen hanya sekali, jika tidak ada perubahan yang diharapkan.
- Gunakan `v-memo` untuknghindari re-render me
- Gunakan `v-show` daripada `v-if` jika elemen hanya perlu disembunyikan, karena `v-show` hanya mengubah visibilitas CSS tanpa merender ulang.  

### Lazy Loading
Lazy loading adalah teknik untuk memuat komponen atau resource hanya saat dibutuhkan, bukan saat aplikasi dimuat pertama kali. Ini mengurangi ukuran bundle awal dan mempercepat loading awal.

Vue.js menyediakan dua pendekatan utama untuk menerapkan lazy loading :  
- Melalui `Vue Router`, di mana setiap rute dapat dimuat secara dinamis hanya saat dibutuhkan. 
- Dengan memanfaatkan fungsi `defineAsyncComponent` dari Vue.js untuk memuat komponen tertentu secara terpisah, sehingga aplikasi menjadi lebih ringan dan efisien.

