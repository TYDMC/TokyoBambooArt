/**
 * 東京バンブーアート - メインJavaScript
 * アーティスティックでシックなインタラクション
 */

(function() {
    'use strict';

    // ======================================
    // Mobile Menu Toggle
    // ======================================
    
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const navMobileLinks = navMobile.querySelectorAll('a');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    // モバイルメニューのリンクをクリックしたらメニューを閉じる
    navMobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ======================================
    // Smooth Scroll with Offset for Header
    // ======================================
    
    const header = document.getElementById('header');
    const headerHeight = header.offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #のみの場合はトップへ
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================================
    // Scroll Effects
    // ======================================
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // ヘッダーの背景透明度を調整
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        }

        lastScrollTop = scrollTop;
    });

    // ======================================
    // Intersection Observer for Fade-in Animations
    // ======================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInElements = document.querySelectorAll('.gallery-item, .story-item, .news-item');

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // 順次表示のディレイ
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        fadeInObserver.observe(element);
    });

    // ======================================
    // Parallax Effect for Hero Section
    // ======================================
    
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight) * 1.5;
            const translateY = scrolled * 0.5;
            
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    });

    // ======================================
    // Scroll Indicator Auto-hide
    // ======================================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // ======================================
    // Image Placeholder Enhancement
    // ======================================
    
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    imagePlaceholders.forEach((placeholder, index) => {
        const icons = ['fa-leaf', 'fa-spa', 'fa-feather', 'fa-mountain', 'fa-tree'];
        const icon = placeholder.querySelector('i');
        
        if (icon && !icon.classList.contains('fa-image')) {
            // ランダムにアイコンを選択（シード値として index を使用）
            const iconClass = icons[index % icons.length];
            icon.classList.remove('fa-image');
            icon.classList.add(iconClass);
        }
    });

    // ======================================
    // Add Loading Animation
    // ======================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // ページロード時のフェードイン
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ======================================
    // Gallery Item Hover Effect Enhancement
    // ======================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ======================================
    // Smooth Opacity Transition for Sections
    // ======================================
    
    const sections = document.querySelectorAll('.section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        sectionObserver.observe(section);
    });

    // ======================================
    // Easter Egg: Bamboo Animation on Logo Click
    // ======================================
    
    const logo = document.querySelector('.logo');
    let clickCount = 0;

    logo.addEventListener('click', function(e) {
        clickCount++;
        
        if (clickCount === 5) {
            // 5回クリックでイースターエッグ発動
            createBambooAnimation();
            clickCount = 0;
        }

        // 3秒後にカウントリセット
        setTimeout(() => {
            clickCount = 0;
        }, 3000);
    });

    function createBambooAnimation() {
        const bamboo = document.createElement('div');
        bamboo.innerHTML = '🎋';
        bamboo.style.position = 'fixed';
        bamboo.style.left = '50%';
        bamboo.style.top = '50%';
        bamboo.style.transform = 'translate(-50%, -50%) scale(0)';
        bamboo.style.fontSize = '10rem';
        bamboo.style.zIndex = '10000';
        bamboo.style.transition = 'all 1s ease-out';
        bamboo.style.pointerEvents = 'none';
        
        document.body.appendChild(bamboo);

        setTimeout(() => {
            bamboo.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)';
            bamboo.style.opacity = '0.8';
        }, 10);

        setTimeout(() => {
            bamboo.style.transform = 'translate(-50%, -50%) scale(0) rotate(720deg)';
            bamboo.style.opacity = '0';
        }, 1500);

        setTimeout(() => {
            document.body.removeChild(bamboo);
        }, 2500);
    }

    // ======================================
    // Console Art (ブランドメッセージ)
    // ======================================
    
    console.log('%c東京バンブーアート', 'font-size: 24px; font-weight: bold; color: #8b9a6d;');
    console.log('%c光を彫る、心を灯す。', 'font-size: 16px; color: #1a1a1a;');
    console.log('%c竹明かり、にあらず。', 'font-size: 14px; font-style: italic; color: #2d2d2d;');
    console.log('%c────────────────────', 'color: #8b9a6d;');
    console.log('Website: https://tokyo-bamboo-art.com');
    console.log('Instagram: @tokyobambooart');

})();