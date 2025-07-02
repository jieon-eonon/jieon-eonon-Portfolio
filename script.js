// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 네비게이션 관련 기능 =====
    
    // 햄버거 메뉴 토글 기능 (모바일)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 햄버거 아이콘 애니메이션
            hamburger.classList.toggle('active');
        });
        
        // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // 스크롤 시 네비게이션 바 스타일 변경
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // ===== 부드러운 스크롤 네비게이션 =====
    
    // 네비게이션 링크 클릭 시 해당 섹션으로 부드럽게 스크롤
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 네비게이션 바 높이만큼 조정
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 스크롤 애니메이션 =====
    
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1, // 요소가 10% 보일 때 트리거
        rootMargin: '0px 0px -50px 0px' // 하단 50px 마진
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 나타날 때 애니메이션 클래스 추가
                entry.target.classList.add('animated');
                
                // 스킬 바 애니메이션 특별 처리
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // 타임라인 아이템들 순차적 애니메이션
                if (entry.target.classList.contains('timeline')) {
                    animateTimelineItems();
                }
                
                // 프로젝트 카드들 순차적 애니메이션
                if (entry.target.classList.contains('projects-grid')) {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰 시작
    const animateElements = document.querySelectorAll('.skills, .timeline, .projects-grid, .contact-content');
    animateElements.forEach(el => observer.observe(el));
    
    // ===== 스킬 바 애니메이션 함수 =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            // 각 스킬 바를 순차적으로 애니메이션
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200); // 200ms 간격으로 순차 실행
        });
    }
    
    // ===== 타임라인 애니메이션 함수 =====
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300); // 300ms 간격으로 순차 실행
        });
    }
    
    // ===== 프로젝트 카드 애니메이션 함수 =====
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150); // 150ms 간격으로 순차 실행
        });
    }
    
    // ===== 타이핑 애니메이션 =====
    
    // 타이핑 효과를 위한 함수
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
    
    // 히어로 섹션이 보일 때 타이핑 애니메이션 시작
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const typingElement = entry.target.querySelector('.typing-text');
                if (typingElement && !typingElement.classList.contains('typed')) {
                    typingElement.classList.add('typed');
                    // CSS 애니메이션 대신 JavaScript로 타이핑 효과 구현 가능
                }
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ===== 현재 섹션 하이라이트 =====
    
    // 스크롤 위치에 따라 현재 섹션의 네비게이션 링크 하이라이트
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 모든 네비게이션 링크에서 active 클래스 제거
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 스크롤 이벤트에 현재 섹션 하이라이트 함수 추가
    window.addEventListener('scroll', highlightCurrentSection);
    
    // ===== 성능 최적화를 위한 스크롤 이벤트 쓰로틀링 =====
    
    let ticking = false;
    
    function updateOnScroll() {
        // 네비게이션 바 스타일 업데이트
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // 현재 섹션 하이라이트 업데이트
        highlightCurrentSection();
        
        ticking = false;
    }
    
    // 쓰로틀링된 스크롤 이벤트
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // ===== 폼 유효성 검사 및 제출 (Contact 폼이 있다면) =====
    
    // Contact 폼 처리 (실제 폼이 추가될 경우)
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // 여기서 실제 폼 제출 로직 구현
            console.log('Form submitted:', formObject);
            
            // 성공 메시지 표시
            showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
        });
    }
    
    // ===== 알림 메시지 함수 =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 스타일 적용
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 애니메이션으로 표시
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 3초 후 자동 제거
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // ===== 키보드 네비게이션 지원 =====
    
    // 키보드로 섹션 간 이동 (화살표 키 사용)
    document.addEventListener('keydown', function(e) {
        const sections = ['home', 'about', 'experience', 'projects', 'contact'];
        const currentHash = window.location.hash.replace('#', '') || 'home';
        const currentIndex = sections.indexOf(currentHash);
        
        let targetIndex = currentIndex;
        
        // 위 화살표 키 - 이전 섹션
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            targetIndex = currentIndex - 1;
            e.preventDefault();
        }
        // 아래 화살표 키 - 다음 섹션
        else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            targetIndex = currentIndex + 1;
            e.preventDefault();
        }
        
        // 섹션 이동
        if (targetIndex !== currentIndex) {
            const targetSection = document.querySelector(`#${sections[targetIndex]}`);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // URL 해시 업데이트
                history.pushState(null, null, `#${sections[targetIndex]}`);
            }
        }
    });
    
    // ===== 페이지 로드 시 초기화 =====
    
    // 페이지 로드 완료 후 초기 애니메이션 시작
    window.addEventListener('load', function() {
        // 로딩 스피너가 있다면 제거
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // 초기 스크롤 위치 확인 및 네비게이션 하이라이트
        highlightCurrentSection();
    });
    
    // ===== 디버깅 및 개발용 함수 =====
    
    // 개발 모드에서 유용한 디버깅 정보
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎨 Kim Jieon Portfolio - Development Mode');
        console.log('📱 Viewport:', window.innerWidth + 'x' + window.innerHeight);
        
        // 성능 모니터링
        window.addEventListener('load', function() {
            console.log('⚡ Page Load Time:', performance.now().toFixed(2) + 'ms');
        });
    }
});

// ===== 유틸리티 함수들 =====

// 요소가 뷰포트에 있는지 확인하는 함수
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 디바운스 함수 - 이벤트 최적화용
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// 쓰로틀 함수 - 스크롤 이벤트 최적화용
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
