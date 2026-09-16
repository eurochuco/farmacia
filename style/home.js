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
       CARROSSEL DE PROMOÇÕES — LOOP INFINITO (autoplay 5s)
    ========================================= */

    const promoTrack = document.getElementById('promoTrack');
    const promoDotsContainer = document.getElementById('promoDots');
    const originalPromoSlides = Array.from(promoTrack.children);
    const totalOriginais = originalPromoSlides.length;

    let slidesVisiveis = getSlidesVisiveis();
    let promoIndex = 0; // sempre relativo aos slides ORIGINAIS
    let isPromoJumping = false;

    function getSlidesVisiveis() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    // Clona os primeiros "slidesVisiveis" slides e coloca-os no fim,
    // para que ao chegar ao fim ainda existam slides seguintes para mostrar
    function clonarSlides() {
        // remove clones antigos, se existirem (útil ao redimensionar a janela)
        promoTrack.querySelectorAll('.promo-slide.clone').forEach(el => el.remove());

        for (let i = 0; i < slidesVisiveis; i++) {
            const clone = originalPromoSlides[i].cloneNode(true);
            clone.classList.add('clone');
            promoTrack.appendChild(clone);
        }
    }

    function criarDots() {
        promoDotsContainer.innerHTML = '';
        for (let i = 0; i < totalOriginais; i++) {
            const dot = document.createElement('div');
            dot.classList.add('promo-dot');
            if (i === 0) dot.classList.add('ativo');

            dot.addEventListener('click', () => {
                promoIndex = i;
                moverPara(promoIndex, true);
            });

            promoDotsContainer.appendChild(dot);
        }
    }

    function atualizarDots() {
        const dots = document.querySelectorAll('.promo-dot');
        dots.forEach((dot, i) => dot.classList.toggle('ativo', i === promoIndex));
    }

    // Move o track para o slide de índice "index" (com ou sem animação)
    function moverPara(index, animado = true) {
        const larguraSlide = promoTrack.children[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(promoTrack).gap) || 0;
        const deslocamento = (larguraSlide + gap) * index;

        promoTrack.style.transition = animado ? 'transform 0.6s ease-in-out' : 'none';
        promoTrack.style.transform = `translateX(-${deslocamento}px)`;

        atualizarDots();
    }

    // Avança sempre em loop infinito, da esquerda para a direita
    function proximoPromo() {
        if (isPromoJumping) return;

        promoIndex++;
        moverPara(promoIndex, true);

        // Quando chega ao último slide original (entrando na zona dos clones),
        // espera a animação acabar e "salta" de volta ao início sem se notar
        if (promoIndex >= totalOriginais) {
            isPromoJumping = true;

            promoTrack.addEventListener('transitionend', function handler() {
                promoTrack.removeEventListener('transitionend', handler);
                promoIndex = 0;
                moverPara(promoIndex, false); // sem animação, salto instantâneo
                isPromoJumping = false;
            });
        }
    }

    // Inicializa tudo
    function iniciarPromoCarrossel() {
        clonarSlides();
        criarDots();
        promoIndex = 0;
        moverPara(promoIndex, false);
    }

    iniciarPromoCarrossel();

    // Autoplay a cada 5 segundos
    setInterval(proximoPromo, 5000);

    // Recalcula tudo se a janela mudar de tamanho
    window.addEventListener('resize', () => {
        const novoSlidesVisiveis = getSlidesVisiveis();
        if (novoSlidesVisiveis !== slidesVisiveis) {
            slidesVisiveis = novoSlidesVisiveis;
            iniciarPromoCarrossel();
        } else {
            moverPara(promoIndex, false);
        }
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