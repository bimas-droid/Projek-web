
        function initApp() {
            
            // 1. MOBILE NAVIGATION DRAWER
            const menuToggle = document.getElementById('mobile-menu');
            const navList = document.getElementById('nav-list');

            if (menuToggle && navList) {
                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('active');
                    navList.classList.toggle('active');
                });

                // Menutup drawer ketika tautan navigasi di-klik
                const navLinks = document.querySelectorAll('.nav-menu a');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('active');
                        navList.classList.remove('active');
                    });
                });
            }

            // 2. COUNTER ANIMATION SYSTEM (Andal untuk Semua Mode Rendering)
            const stats = document.querySelectorAll('.statistik h2');
            const statSection = document.getElementById('stat-section');
            let animated = false;

            const animateCounters = () => {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    let currentCount = 0;
                    
                    const duration = 2000; // Durasi animasi dalam milidetik (2 detik)
                    const increment = Math.ceil(target / 80); // Laju peningkatan angka

                    const timer = setInterval(() => {
                        currentCount += increment;
                        if (currentCount >= target) {
                            stat.textContent = target.toLocaleString('id-ID') + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = currentCount.toLocaleString('id-ID') + '+';
                        }
                    }, 25);
                });
            };

            // Intersection Observer dengan Threshold Rendah (0.1) untuk keandalan maksimal di iFrame
            if (statSection && 'IntersectionObserver' in window) {
                const observerOptions = {
                    root: null, // default viewport browser
                    threshold: 0.1 // akan terpicu begitu 10% bagian statistik masuk layar
                };

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !animated) {
                            animateCounters();
                            animated = true;
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                observer.observe(statSection);
            } else {
                // Fallback otomatis jika browser/sandbox tidak mendukung Intersection Observer
                setTimeout(() => {
                    if (!animated) {
                        animateCounters();
                        animated = true;
                    }
                }, 1000);
            }

            // 3. CUSTOM MODAL DIALOG
            const orderBtn = document.getElementById('order-btn');
            const orderModal = document.getElementById('order-modal');
            const modalCloseBtn = document.getElementById('modal-close-btn');

            if (orderBtn && orderModal && modalCloseBtn) {
                orderBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    orderModal.classList.add('active');
                });

                modalCloseBtn.addEventListener('click', () => {
                    orderModal.classList.remove('active');
                });

                // Tutup modal jika area luar konten modal di-klik
                orderModal.addEventListener('click', (e) => {
                    if (e.target === orderModal) {
                        orderModal.classList.remove('active');
                    }
                });
            }
        }

        // AMAN DARI LATENCY: Jalankan inisialisasi meskipun DOMContentLoaded sudah berlalu
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }