function initProductsApp() {
            // 1. MOBILE NAVIGATION DRAWER
            const menuToggle = document.getElementById('mobile-menu');
            const navList = document.getElementById('nav-list');

            if (menuToggle && navList) {
                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('active');
                    navList.classList.toggle('active');
                });

                const navLinks = document.querySelectorAll('.nav-menu a');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('active');
                        navList.classList.remove('active');
                    });
                });
            }

            // 2. PRODUCT FILTERING LOGIC
            const filterButtons = document.querySelectorAll('.filter-btn');
            const productCards = document.querySelectorAll('.product-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Reset active class on all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');

                    const category = button.getAttribute('data-filter');

                    productCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (category === 'all' || cardCategory === category) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            // 3. BOOKING MODAL LOGIC (No-Alert, Pure Interactive Flows)
            const orderButtons = document.querySelectorAll('.order-btn-card');
            const orderModal = document.getElementById('order-modal');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            
            const prodInput = document.getElementById('pilih-produk');
            const priceInput = document.getElementById('pilih-harga');
            const orderForm = document.getElementById('order-form');

            // Open modal and pre-fill details
            orderButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const productName = btn.getAttribute('data-product');
                    const productPrice = btn.getAttribute('data-price');

                    if (prodInput && priceInput && orderModal) {
                        prodInput.value = productName;
                        priceInput.value = productPrice;
                        orderModal.classList.add('active');
                    }
                });
            });

            // Close Modal handlers
            if (modalCloseBtn && orderModal) {
                modalCloseBtn.addEventListener('click', () => {
                    orderModal.classList.remove('active');
                });

                orderModal.addEventListener('click', (e) => {
                    if (e.target === orderModal) {
                        orderModal.classList.remove('active');
                    }
                });
            }

            // Form Submit and WhatsApp Text Generator
            if (orderForm) {
                orderForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const nama = document.getElementById('nama-pembeli').value;
                    const produk = prodInput.value;
                    const harga = priceInput.value;
                    const jumlah = document.getElementById('jumlah-beli').value;
                    const alamat = document.getElementById('alamat-kirim').value;

                    // Mengompilasi teks template pesanan rapi untuk dikirimkan ke CS WhatsApp
                    const textWhatsApp = `Halo Jamur Indonesia, saya ingin memesan:\n\n` +
                                         `*Nama Pembeli:* ${nama}\n` +
                                         `*Produk:* ${produk}\n` +
                                         `*Harga Satuan:* ${harga}\n` +
                                         `*Jumlah:* ${jumlah} Pack\n` +
                                         `*Alamat Kirim:* ${alamat}\n\n` +
                                         `Mohon informasi total harga beserta ongkos kirimnya. Terima kasih!`;

                    const encodedText = encodeURIComponent(textWhatsApp);
                    const waLink = `https://wa.me/6281234567890?text=${encodedText}`;

                    // Membuka tautan WhatsApp pada tab baru
                    window.open(waLink, '_blank');
                    
                    // Reset dan tutup modal dengan anggun
                    orderForm.reset();
                    orderModal.classList.remove('active');
                });
            }

            // 4. MODERN SCROLL REVEAL INTERACTIVE LOGIC (Optimized for Desktop)
            const revealElements = document.querySelectorAll('.reveal');

            if ('IntersectionObserver' in window) {
                const revealObserverOptions = {
                    root: null, // Viewport pengguna
                    threshold: 0.05, // Mulai terpicu jika 5% bagian terlihat
                    
                    // rootMargin disetel ke -120px untuk desktop agar elemen tidak langsung muncul,
                    // melainkan menanti user scroll setidaknya 120px ke dalam layar.
                    rootMargin: '0px 0px -120px 0px' 
                };

                const revealObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            // Berhenti memantau elemen ini setelah animasi masuk berhasil dimainkan sekali
                            observer.unobserve(entry.target);
                        }
                    });
                }, revealObserverOptions);

                revealElements.forEach(element => {
                    revealObserver.observe(element);
                });
            } else {
                // Fallback otomatis jika browser tidak mendukung Intersection Observer
                revealElements.forEach(element => {
                    element.classList.add('active');
                });
            }
        }

        // AMAN DARI LATENCY: Jalankan inisialisasi meskipun DOMContentLoaded sudah berlalu
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initProductsApp);
        } else {
            initProductsApp();
        }