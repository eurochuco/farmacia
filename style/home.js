document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       SLIDESHOW AUTOMÁTICO
    ========================================= */

    // Seleciona todos os slides da página
    const slides = document.querySelectorAll('.slide');
    let indexAtual = 0;

    function proximoSlide() {
        // Remove a classe 'atual' do slide visível
        slides[indexAtual].classList.remove('atual');

        // Avança para o próximo slide (e retorna ao primeiro após o último)
        indexAtual = (indexAtual + 1) % slides.length;

        // Adiciona a classe 'atual' ao novo slide visível
        slides[indexAtual].classList.add('atual');
    }

    // Alterna os slides automaticamente a cada 5000 (5 segundos)
    setInterval(proximoSlide, 5000);


    /* =========================================
       LOOP INFINITO DAS CATEGORIAS
    ========================================= */

    const container = document.getElementById('categoriasContainer');

    // 1. Clona todos os itens originais e adiciona no fim (para scroll para a direita)
    const originalItems = Array.from(container.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });

    // 2. Clona novamente e adiciona no início (para scroll para a esquerda)
    originalItems.slice().reverse().forEach(item => {
        const clone = item.cloneNode(true);
        container.insertBefore(clone, container.firstChild);
    });

    // 3. Calcula a largura de um "bloco" original (itens + gaps)
    const itemWidth = originalItems[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    const blockWidth = (itemWidth + gap) * originalItems.length;

    // 4. Posiciona o scroll no início do bloco "do meio" (o original)
    container.scrollLeft = blockWidth;

    // 5. Ao chegar perto das pontas, "teleporta" de volta sem o utilizador notar
    let isJumping = false;

    container.addEventListener('scroll', () => {
        if (isJumping) return;

        // Chegou perto do fim (bloco clonado à direita)
        if (container.scrollLeft >= blockWidth * 2) {
            isJumping = true;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft -= blockWidth;
            requestAnimationFrame(() => {
                container.style.scrollBehavior = 'smooth';
                isJumping = false;
            });
        }

        // Chegou perto do início (bloco clonado à esquerda)
        if (container.scrollLeft <= 0) {
            isJumping = true;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft += blockWidth;
            requestAnimationFrame(() => {
                container.style.scrollBehavior = 'smooth';
                isJumping = false;
            });
        }
    });

    // Recalcula posição se a janela for redimensionada
    window.addEventListener('resize', () => {
        const newItemWidth = originalItems[0].getBoundingClientRect().width;
        const newBlockWidth = (newItemWidth + gap) * originalItems.length;
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = newBlockWidth;
        container.style.scrollBehavior = 'smooth';
    });

    /* =========================================
PROMOÇÕES — Loop infinito + autoplay 5s
(mesma lógica dos Produtos Patrocinados)
========================================= */

    const promoTrack = document.getElementById('promoTrack');
    const promoDotsContainer = document.getElementById('promoDots');

    // 1. Clona todos os slides originais e adiciona no fim
    const originalPromoSlides = Array.from(promoTrack.children);
    originalPromoSlides.forEach(item => {
        const clone = item.cloneNode(true);
        promoTrack.appendChild(clone);
    });

    // 2. Clona novamente e adiciona no início
    originalPromoSlides.slice().reverse().forEach(item => {
        const clone = item.cloneNode(true);
        promoTrack.insertBefore(clone, promoTrack.firstChild);
    });

    // 3. Calcula a largura de um "bloco" original
    function getPromoBlockWidth() {
        const slideWidth = originalPromoSlides[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(promoTrack).gap) || 0;
        return (slideWidth + gap) * originalPromoSlides.length;
    }

    let promoBlockWidth = getPromoBlockWidth();

    // 4. Posiciona o scroll no bloco do meio
    promoTrack.scrollLeft = promoBlockWidth;

    // 5. Teleporte invisível ao chegar nas pontas
    let isPromoJumping = false;

    function checkPromoLoop() {
        if (isPromoJumping) return;

        if (promoTrack.scrollLeft >= promoBlockWidth * 2) {
            isPromoJumping = true;
            promoTrack.style.scrollBehavior = 'auto';
            promoTrack.scrollLeft -= promoBlockWidth;
            requestAnimationFrame(() => {
                promoTrack.style.scrollBehavior = 'smooth';
                isPromoJumping = false;
            });
        }

        if (promoTrack.scrollLeft <= 0) {
            isPromoJumping = true;
            promoTrack.style.scrollBehavior = 'auto';
            promoTrack.scrollLeft += promoBlockWidth;
            requestAnimationFrame(() => {
                promoTrack.style.scrollBehavior = 'smooth';
                isPromoJumping = false;
            });
        }

        atualizarDotsPorScroll();
    }

    promoTrack.addEventListener('scroll', checkPromoLoop);

    // 6. Largura de avanço (1 slide)
    function getPromoScrollStep() {
        const slide = promoTrack.querySelector('.promo-slide');
        const gap = parseFloat(getComputedStyle(promoTrack).gap) || 0;
        return slide.getBoundingClientRect().width + gap;
    }

    // 7. Dots — criação e clique
    function criarDots() {
        promoDotsContainer.innerHTML = '';
        for (let i = 0; i < originalPromoSlides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('promo-dot');
            if (i === 0) dot.classList.add('ativo');

            dot.addEventListener('click', () => {
                const destino = promoBlockWidth + i * getPromoScrollStep();
                promoTrack.scrollTo({ left: destino, behavior: 'smooth' });
                reiniciarAutoplayPromo();
            });

            promoDotsContainer.appendChild(dot);
        }
    }

    function atualizarDotsPorScroll() {
        const step = getPromoScrollStep();
        const posicaoRelativa = promoTrack.scrollLeft - promoBlockWidth;
        let indiceAtual = Math.round(posicaoRelativa / step) % originalPromoSlides.length;
        if (indiceAtual < 0) indiceAtual += originalPromoSlides.length;

        const dots = document.querySelectorAll('.promo-dot');
        dots.forEach((dot, i) => dot.classList.toggle('ativo', i === indiceAtual));
    }

    criarDots();

    // 8. Autoplay a cada 5 segundos
    let autoplayPromo = setInterval(avancarPromoAuto, 5000);

    function avancarPromoAuto() {
        promoTrack.scrollBy({
            left: getPromoScrollStep(),
            behavior: 'smooth'
        });
    }

    // Reinicia o autoplay sempre que o utilizador clica num dot
    function reiniciarAutoplayPromo() {
        clearInterval(autoplayPromo);
        autoplayPromo = setInterval(avancarPromoAuto, 5000);
    }

    // 9. Recalcula tudo se a janela mudar de tamanho
    window.addEventListener('resize', () => {
        promoBlockWidth = getPromoBlockWidth();
        promoTrack.style.scrollBehavior = 'auto';
        promoTrack.scrollLeft = promoBlockWidth;
        promoTrack.style.scrollBehavior = 'smooth';
    });

    /* =========================================
   LOOP INFINITO DAS MARCAS
========================================= */

    const marcasContainer = document.getElementById('marcasContainer');

    // 1. Clona todos os itens originais e adiciona no fim
    const originalMarcas = Array.from(marcasContainer.children);
    originalMarcas.forEach(item => {
        const clone = item.cloneNode(true);
        marcasContainer.appendChild(clone);
    });

    // 2. Clona novamente e adiciona no início
    originalMarcas.slice().reverse().forEach(item => {
        const clone = item.cloneNode(true);
        marcasContainer.insertBefore(clone, marcasContainer.firstChild);
    });

    // 3. Calcula a largura de um "bloco" original
    const marcaItemWidth = originalMarcas[0].getBoundingClientRect().width;
    const marcaGap = parseFloat(getComputedStyle(marcasContainer).gap) || 0;
    const marcaBlockWidth = (marcaItemWidth + marcaGap) * originalMarcas.length;

    // 4. Posiciona o scroll no bloco do meio
    marcasContainer.scrollLeft = marcaBlockWidth;

    // 5. Teleporte invisível ao chegar nas pontas
    let isMarcaJumping = false;

    marcasContainer.addEventListener('scroll', () => {
        if (isMarcaJumping) return;

        if (marcasContainer.scrollLeft >= marcaBlockWidth * 2) {
            isMarcaJumping = true;
            marcasContainer.style.scrollBehavior = 'auto';
            marcasContainer.scrollLeft -= marcaBlockWidth;
            requestAnimationFrame(() => {
                marcasContainer.style.scrollBehavior = 'smooth';
                isMarcaJumping = false;
            });
        }

        if (marcasContainer.scrollLeft <= 0) {
            isMarcaJumping = true;
            marcasContainer.style.scrollBehavior = 'auto';
            marcasContainer.scrollLeft += marcaBlockWidth;
            requestAnimationFrame(() => {
                marcasContainer.style.scrollBehavior = 'smooth';
                isMarcaJumping = false;
            });
        }
    });

    // Recalcula posição se a janela for redimensionada
    window.addEventListener('resize', () => {
        const newMarcaItemWidth = originalMarcas[0].getBoundingClientRect().width;
        const newMarcaBlockWidth = (newMarcaItemWidth + marcaGap) * originalMarcas.length;
        marcasContainer.style.scrollBehavior = 'auto';
        marcasContainer.scrollLeft = newMarcaBlockWidth;
        marcasContainer.style.scrollBehavior = 'smooth';
    });

    /* =========================================
   PRODUTOS PATROCINADOS — Loop infinito + autoplay 5s
========================================= */

    const patrocinadosContainer = document.getElementById('patrocinadosContainer');
    const setaEsquerda = document.getElementById('setaEsquerda');
    const setaDireita = document.getElementById('setaDireita');

    // 1. Clona todos os cards originais e adiciona no fim
    const originalProdutos = Array.from(patrocinadosContainer.children);
    originalProdutos.forEach(item => {
        const clone = item.cloneNode(true);
        patrocinadosContainer.appendChild(clone);
    });

    // 2. Clona novamente e adiciona no início
    originalProdutos.slice().reverse().forEach(item => {
        const clone = item.cloneNode(true);
        patrocinadosContainer.insertBefore(clone, patrocinadosContainer.firstChild);
    });

    // 3. Calcula a largura de um "bloco" original
    function getProdutoBlockWidth() {
        const cardWidth = originalProdutos[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(patrocinadosContainer).gap) || 0;
        return (cardWidth + gap) * originalProdutos.length;
    }

    let produtoBlockWidth = getProdutoBlockWidth();

    // 4. Posiciona o scroll no bloco do meio
    patrocinadosContainer.scrollLeft = produtoBlockWidth;

    // 5. Teleporte invisível ao chegar nas pontas
    let isProdutoJumping = false;

    function checkProdutoLoop() {
        if (isProdutoJumping) return;

        if (patrocinadosContainer.scrollLeft >= produtoBlockWidth * 2) {
            isProdutoJumping = true;
            patrocinadosContainer.style.scrollBehavior = 'auto';
            patrocinadosContainer.scrollLeft -= produtoBlockWidth;
            requestAnimationFrame(() => {
                patrocinadosContainer.style.scrollBehavior = 'smooth';
                isProdutoJumping = false;
            });
        }

        if (patrocinadosContainer.scrollLeft <= 0) {
            isProdutoJumping = true;
            patrocinadosContainer.style.scrollBehavior = 'auto';
            patrocinadosContainer.scrollLeft += produtoBlockWidth;
            requestAnimationFrame(() => {
                patrocinadosContainer.style.scrollBehavior = 'smooth';
                isProdutoJumping = false;
            });
        }
    }

    patrocinadosContainer.addEventListener('scroll', checkProdutoLoop);

    // 6. Função para calcular quanto avançar (largura de 1 card)
    function getScrollStep() {
        const card = patrocinadosContainer.querySelector('.produto-card');
        const gap = parseFloat(getComputedStyle(patrocinadosContainer).gap) || 0;
        return card.getBoundingClientRect().width + gap;
    }

    // 7. Navegação manual pelas setas
    setaDireita.addEventListener('click', () => {
        patrocinadosContainer.scrollBy({
            left: getScrollStep(),
            behavior: 'smooth'
        });
        reiniciarAutoplayProdutos();
    });

    setaEsquerda.addEventListener('click', () => {
        patrocinadosContainer.scrollBy({
            left: -getScrollStep(),
            behavior: 'smooth'
        });
        reiniciarAutoplayProdutos();
    });

    // 8. Autoplay a cada 5 segundos
    let autoplayProdutos = setInterval(avancarProdutoAuto, 5000);

    function avancarProdutoAuto() {
        patrocinadosContainer.scrollBy({
            left: getScrollStep(),
            behavior: 'smooth'
        });
    }

    // Reinicia o autoplay sempre que o utilizador interage manualmente,
    // para não "brigar" com o clique do utilizador
    function reiniciarAutoplayProdutos() {
        clearInterval(autoplayProdutos);
        autoplayProdutos = setInterval(avancarProdutoAuto, 5000);
    }

    // 9. Recalcula tudo se a janela for redimensionada
    window.addEventListener('resize', () => {
        produtoBlockWidth = getProdutoBlockWidth();
        patrocinadosContainer.style.scrollBehavior = 'auto';
        patrocinadosContainer.scrollLeft = produtoBlockWidth;
        patrocinadosContainer.style.scrollBehavior = 'smooth';
    });

});