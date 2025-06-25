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

How to optimize :
- Gunakan `computed` dibanding `watch` untuk menghindari overhead reactivity.
- Gunakan `shallowReactive` atau `shallowRef` untuk struktur data besar yang tidak perlu reactivity mendalam.
- Gunakan `v-once` untuk elemen yang tidak berubah, sehingga Vue tidak perlu memantau perubahan pada elemen tersebut.
### Debounce & Throttle
### Reduce Component Re-render
### Lazy Loading
### Code Splitting
