// Мобильное меню
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('active');
});

// Анимация бургер-меню
burgerMenu.addEventListener('click', () => {
    const lines = burgerMenu.querySelectorAll('.line');
    lines.forEach(line => line.classList.toggle('active'));
});

// Плавная прокрутка для навигации и кнопки CTA
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Добавляем небольшую задержку для плавности
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            // Если это кнопка CTA, фокусируемся на первом поле формы
            if (this.classList.contains('cta-button')) {
                setTimeout(() => {
                    const firstInput = document.querySelector('.contact-form input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 1000);
            }

            // Закрываем мобильное меню при клике на ссылку
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Обработка формы с валидацией
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Валидация формы
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    // Получаем данные формы
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Имитация отправки данных на сервер
    showNotification('Отправка формы...', 'info');
    
    setTimeout(() => {
        console.log('Отправка формы:', data);
        showNotification('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.', 'success');
        contactForm.reset();
    }, 1500);
});

// Система уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Анимация для кнопки CTA
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseover', () => {
    ctaButton.style.transform = 'scale(1.05)';
});
ctaButton.addEventListener('mouseout', () => {
    ctaButton.style.transform = 'scale(1)';
});

// Фиксированная шапка при прокрутке
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Прокрутка вниз
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Прокрутка вверх
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Анимация счетчиков в секции "О компании"
const stats = document.querySelectorAll('.stat-item h3');
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.textContent.includes('+') ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target;
            const endValue = parseInt(statElement.textContent);
            animateValue(statElement, 0, endValue, 2000);
            statsObserver.unobserve(statElement);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Добавление эффекта параллакса для фонового изображения
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
}); 