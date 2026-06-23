function initAboutApp() {
            // Mobile Menu Toggle
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
        }

        // Jalankan inisialisasi dengan andal
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAboutApp);
        } else {
            initAboutApp();
        }