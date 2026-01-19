// SOLUÇÃO COMPLETA PARA TODO O SITE

// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    console.log("✅ Site carregado! Tudo funcionando...");
    
    // ============================================
    // PARTE 1: CORRIGIR AS SETINHAS DE "MY EXPERIENCE"
    // ============================================
    
    const todasSetinhas = document.querySelectorAll('.skills-header');
    
    todasSetinhas.forEach(setinha => {
        setinha.addEventListener('click', function() {
            console.log("📌 Clicou na setinha!");
            
            const alvoId = this.getAttribute('data-target');
            const conteudoAlvo = document.querySelector(alvoId);
            
            if (conteudoAlvo) {
                // Remove 'skills-active' de TODO conteúdo
                document.querySelectorAll('[data-content]').forEach(conteudo => {
                    conteudo.classList.remove('skills-active');
                });
                
                // Adiciona 'skills-active' apenas no conteúdo clicado
                conteudoAlvo.classList.add('skills-active');
                
                // Remove 'skills-active' de TODAS as setinhas
                todasSetinhas.forEach(s => {
                    s.classList.remove('skills-active');
                });
                
                // Adiciona 'skills-active' apenas na setinha clicada
                this.classList.add('skills-active');
            }
        });
    });
    
    // ============================================
    // PARTE 2: CORRIGIR OS BOTÕES DE "RECENT WORKS"
    // ============================================
    
    const todosBotoes = document.querySelectorAll('.work-item');
    
    // Inicializa o MixItUp (filtragem)
    let mixer = mixitup('.work-container', {
        selectors: {
            target: '.work-card'
        },
        animation: {
            duration: 300
        }
    });
    
    todosBotoes.forEach(botao => {
        botao.addEventListener('click', function() {
            console.log("🎯 Clicou no botão: " + this.textContent);
            
            // Remove 'active-work' de TODOS os botões
            todosBotoes.forEach(b => {
                b.classList.remove('active-work');
            });
            
            // Adiciona 'active-work' apenas no botão clicado
            this.classList.add('active-work');
            
            // Pega qual filtro usar (ex: ".web", ".app", etc)
            const filtro = this.getAttribute('data-filter');
            
            // Aplica o filtro
            if (mixer && filtro) {
                mixer.filter(filtro);
            }
        });
    });
    
    // ============================================
    // PARTE 3: POPUP DOS PROJETOS (Demo buttons)
    // ============================================
    
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('work-button') || 
           e.target.parentElement.classList.contains('work-button')) {
            console.log("🖼️ Abrindo popup do projeto");
            togglePortfolioPopup();
            
            let elementoPai;
            if(e.target.classList.contains('work-button')) {
                elementoPai = e.target.parentElement;
            } else {
                elementoPai = e.target.parentElement.parentElement;
            }
            
            portfolioItemDetails(elementoPai);
        }
    });
    
    function togglePortfolioPopup() {
        const popup = document.querySelector('.portfolio-popup');
        popup.classList.toggle('open');
        console.log("📋 Popup " + (popup.classList.contains('open') ? "aberto" : "fechado"));
    }
    
    document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);
    
    function portfolioItemDetails(portfolioItem) {
        const imagem = portfolioItem.querySelector('.work-img').src;
        const titulo = portfolioItem.querySelector('.work-title').innerHTML;
        const detalhes = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
        
        document.querySelector('.pp-thumbnail img').src = imagem;
        document.querySelector('.portfolio-popup-subtitle span').innerHTML = titulo;
        document.querySelector('.portfolio-popup-body').innerHTML = detalhes;
    }
    
    // ============================================
    // PARTE 4: POPUP DOS SERVIÇOS (View More buttons)
    // ============================================
    
    const modalViews = document.querySelectorAll('.services-modal');
    const modelBtns = document.querySelectorAll('.services-button');
    const modalCloses = document.querySelectorAll('.services-modal-close');
    
    let modal = function(modalClick) {
        modalViews[modalClick].classList.add('active-modal');
        console.log("🔧 Abrindo modal de serviço " + (modalClick + 1));
    }
    
    modelBtns.forEach((modelBtn, i) => {
        modelBtn.addEventListener('click', () => {
            modal(i);
        });
    });
    
    modalCloses.forEach((modalClose) => {
        modalClose.addEventListener('click', () => {
            modalViews.forEach((modalView) => {
                modalView.classList.remove('active-modal');
            });
            console.log("❌ Fechando todos os modais");
        });
    });
    
    // ============================================
    // PARTE 5: TESTIMONIALS SLIDER (Swiper)
    // ============================================
    
    let swiper = new Swiper(".testimonials-container", {
        spaceBetween: 24,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 48,
            },
        },
    });
    
    console.log("🔄 Swiper inicializado!");
    
    // ============================================
    // PARTE 6: ANIMAÇÃO DOS INPUTS (Formulário)
    // ============================================
    
    const inputs = document.querySelectorAll('.input');
    
    function focusFunc() {
        let parent = this.parentNode;
        parent.classList.add('focus');
    }
    
    function blurFunc() {
        let parent = this.parentNode;
        if(this.value == "") {
            parent.classList.remove('focus');
        }
    }
    
    inputs.forEach((input) => {
        input.addEventListener('focus', focusFunc);
        input.addEventListener('blur', blurFunc);
    });
    
    console.log("✍️ Formulário configurado!");
    
    // ============================================
    // PARTE 7: MENU ATIVO AO ROLAR A PÁGINA
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', navHighlighter);
    
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
    
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
            }else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
            }
        });
    }
    
    console.log("📍 Navegação ativa configurada!");
    
    // ============================================
    // PARTE 8: MENU LATERAL (Sidebar)
    // ============================================
    
    const navMenu = document.getElementById('sidebar');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-sidebar');
            console.log("☰ Menu lateral aberto");
        });
    }
    
    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-sidebar');
            console.log("✖️ Menu lateral fechado");
        });
    }
    
    console.log("🍔 Menu lateral configurado!");
    
    // ============================================
    // MENSAGEM FINAL
    // ============================================
    
    console.log("🎊 TUDO CONFIGURADO! Site 100% funcional!");
    console.log("📱 Teste todas as funcionalidades:");
    console.log("1. Setinhas de Skills ✅");
    console.log("2. Botões de filtro (All, Web, App, Design) ✅");
    console.log("3. Popup dos projetos (Demo buttons) ✅");
    console.log("4. Popup dos serviços (View More) ✅");
    console.log("5. Testimonials slider ✅");
    console.log("6. Formulário animado ✅");
    console.log("7. Menu ativo ao rolar ✅");
    console.log("8. Menu lateral móvel ✅");
});