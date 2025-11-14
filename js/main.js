/* ============================================ */
/* SCRIPTS PRINCIPALES - FHADDEV CHILE */
/* ============================================ */
/* 
⚠️ IMPORTANTE: Este archivo es gestionado por el programador
NO REALIZAR MODIFICACIONES sin consultar primero

Este archivo controla:
- Carrusel de "Qué Hacemos"
- Header sticky al hacer scroll
- Menú móvil
- Animaciones al hacer scroll
*/

// ============================================
// ESPERAR A QUE LAS SECCIONES SE CARGUEN
// ============================================

// Escuchar el evento de que las secciones se cargaron
document.addEventListener('sectionsLoaded', function() {
    console.log('📦 Secciones cargadas, inicializando scripts...');
    
    // Dar un pequeño delay para que el DOM se renderice completamente
    setTimeout(initializeScripts, 100);
});

// Fallback: Si las secciones ya están cargadas cuando se ejecuta este script
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Fhaddev Chile website cargado correctamente');
    
    // Si las secciones ya están cargadas (por si acaso)
    setTimeout(() => {
        if (document.querySelector('#fade-carousel')) {
            console.log('⚡ Secciones ya presentes, inicializando...');
            initializeScripts();
        }
    }, 600);
});

// ============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================

function initializeScripts() {
    initCarousel();
    initStickyHeader();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    
    console.log('✅ Todos los scripts inicializados');
}

// ============================================
// 1. CARRUSEL FADE-IN-OUT (Qué Hacemos)
// ============================================

function initCarousel() {
    const items = document.querySelectorAll('#fade-carousel .carousel-item');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    
    if (items.length === 0) {
        console.warn('⚠️ Carrusel no encontrado');
        return;
    }
    
    let currentIndex = 0;
    const intervalTime = 5000; // 5 segundos
    let carouselInterval;

    function showItem(index) {
        // Validar índice
        if (index >= items.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = items.length - 1;
        } else {
            currentIndex = index;
        }

        // Ocultar todos los items
        items.forEach((item) => {
            item.classList.remove('active', 'opacity-100');
            item.classList.add('opacity-0');
        });

        // Mostrar item actual
        const currentItem = items[currentIndex];
        currentItem.classList.add('active', 'opacity-100');
        currentItem.classList.remove('opacity-0');
    }

    function nextSlide() {
        showItem(currentIndex + 1);
        resetInterval();
    }

    function prevSlide() {
        showItem(currentIndex - 1);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Inicializar
    showItem(currentIndex);
    
    // Event listeners para botones
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    if (prevButton) prevButton.addEventListener('click', prevSlide);

    // Iniciar rotación automática
    carouselInterval = setInterval(nextSlide, intervalTime);
    
    console.log('✅ Carrusel inicializado');
}

// ============================================
// 2. HEADER STICKY AL HACER SCROLL
// ============================================

function initStickyHeader() {
    const header = document.getElementById('main-header');
    
    if (!header) {
        console.warn('⚠️ Header no encontrado');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    console.log('✅ Header sticky inicializado');
}

// ============================================
// 3. MENÚ MÓVIL TOGGLE
// ============================================

function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) {
        console.warn('⚠️ Menú móvil no encontrado');
        return;
    }
    
    // Toggle del menú
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    console.log('✅ Menú móvil inicializado');
}

// ============================================
// 4. ANIMACIONES AL HACER SCROLL
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`✅ ${animatedElements.length} elementos con animación inicializados`);
}

// ============================================
// 5. SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    // Smooth scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar enlaces vacíos o solo con #
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.getElementById('main-header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Smooth scroll inicializado');
}

// ============================================
// UTILIDADES ADICIONALES
// ============================================

// Log de errores para debugging
window.addEventListener('error', function(e) {
    console.error('❌ Error detectado:', e.message);
});

console.log('📄 main.js cargado');
