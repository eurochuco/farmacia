document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       BASE DE DADOS DAS PROMOÇÕES (temporária)
    ========================================= */
    const promocoes = {
        1: {
            titulo: "Descontos imperdíveis em fórmulas personalizadas",
            imagem: "../style/img/promo1.jpg",
            descricao: "Aproveite as nossas promoções e cuide da sua saúde com fórmulas personalizadas feitas à medida das tuas necessidades.",
            preco: "R$ 44,90",
            desconto: "20% OFF",
            detalhes: [
                "Entrega em até 48 horas",
                "Aconselhamento farmacêutico incluído",
                "Fórmulas certificadas"
            ],
            produtos: [
                { nome: "Vitamina C 1000mg", detalhe: "Comprimidos: (60) x 1", preco: "R$ 44,90", desconto: true, imagem: "../style/img/prod1.jpg" },
                { nome: "Complexo B", detalhe: "Cápsulas: (30) x 1", preco: "R$ 38,50", desconto: true, imagem: "../style/img/prod2.jpg" },
                { nome: "Ómega 3", detalhe: "Cápsulas: (60) x 1", preco: "R$ 52,00", desconto: false, imagem: "../style/img/prod3.jpg" },
                { nome: "Colágeno Hidrolisado", detalhe: "Pó: (300g) x 1", preco: "R$ 61,90", desconto: false, imagem: "../style/img/prod4.jpg" },
                { nome: "Zinco Quelato", detalhe: "Comprimidos: (60) x 1", preco: "R$ 29,90", desconto: false, imagem: "../style/img/prod11.jpg" },
                { nome: "Vitamina D3", detalhe: "Cápsulas: (60) x 1", preco: "R$ 33,50", desconto: true, imagem: "../style/img/prod12.jpg" },
                { nome: "Multivitamínico Completo", detalhe: "Comprimidos: (90) x 1", preco: "R$ 68,00", desconto: false, imagem: "../style/img/prod13.jpg" },
                { nome: "Probiótico Digestivo", detalhe: "Cápsulas: (30) x 1", preco: "R$ 55,90", desconto: false, imagem: "../style/img/prod14.jpg" },
                { nome: "Magnésio Quelato", detalhe: "Comprimidos: (60) x 1", preco: "R$ 42,00", desconto: false, imagem: "../style/img/prod15.jpg" },
                { nome: "Ferro Bisglicinato", detalhe: "Cápsulas: (30) x 1", preco: "R$ 39,90", desconto: true, imagem: "../style/img/prod16.jpg" }
            ]
        },
        2: {
            titulo: "3 formas de magnésio + vitamina B6",
            imagem: "../style/img/promo2.jpg",
            descricao: "Suporte para o sistema nervoso com padrão de qualidade GMP ISO. 120 cápsulas por embalagem.",
            preco: "R$ 89,90",
            desconto: "15% OFF",
            detalhes: [
                "120 cápsulas por frasco",
                "Padrão de qualidade GMP ISO",
                "Suporte ao sistema nervoso"
            ],
            produtos: [
                { nome: "Magnésio + B6", detalhe: "Cápsulas: (120) x 1", preco: "R$ 89,90", desconto: true, imagem: "../style/img/prod5.jpg" },
                { nome: "Magnésio Quelato", detalhe: "Comprimidos: (60) x 1", preco: "R$ 72,00", desconto: false, imagem: "../style/img/prod6.jpg" },
                { nome: "Magnésio Bisglicinato", detalhe: "Cápsulas: (90) x 1", preco: "R$ 65,00", desconto: false, imagem: "../style/img/prod17.jpg" },
                { nome: "Vitamina B Complex", detalhe: "Comprimidos: (60) x 1", preco: "R$ 48,90", desconto: false, imagem: "../style/img/prod18.jpg" },
                { nome: "Ashwagandha", detalhe: "Cápsulas: (60) x 1", preco: "R$ 58,00", desconto: true, imagem: "../style/img/prod19.jpg" },
                { nome: "Melatonina 3mg", detalhe: "Comprimidos: (30) x 1", preco: "R$ 35,50", desconto: false, imagem: "../style/img/prod20.jpg" },
                { nome: "L-Teanina", detalhe: "Cápsulas: (60) x 1", preco: "R$ 62,90", desconto: false, imagem: "../style/img/prod21.jpg" },
                { nome: "Óleo de Peixe Ómega 3", detalhe: "Cápsulas: (90) x 1", preco: "R$ 54,00", desconto: false, imagem: "../style/img/prod22.jpg" },
                { nome: "Taurina", detalhe: "Cápsulas: (60) x 1", preco: "R$ 40,00", desconto: false, imagem: "../style/img/prod23.jpg" },
                { nome: "Complexo Relax", detalhe: "Comprimidos: (30) x 1", preco: "R$ 47,90", desconto: true, imagem: "../style/img/prod24.jpg" }
            ]
        },
        3: {
            titulo: "Conforto e estilo para o teu dia a dia",
            imagem: "../style/img/promo3.jpg",
            descricao: "Uma seleção de calçado confortável e resistente, pensada para acompanhar o teu ritmo diário.",
            preco: "R$ 129,90",
            desconto: "",
            detalhes: [
                "Material resistente e leve",
                "Disponível em vários tamanhos"
            ],
            produtos: [
                { nome: "Sandália Confort", detalhe: "Par: 1 unidade", preco: "R$ 129,90", desconto: false, imagem: "../style/img/prod7.jpg" },
                { nome: "Chinelo Ortopédico", detalhe: "Par: 1 unidade", preco: "R$ 89,90", desconto: false, imagem: "../style/img/prod25.jpg" },
                { nome: "Meia Compressiva", detalhe: "Par: 1 unidade", preco: "R$ 45,00", desconto: true, imagem: "../style/img/prod26.jpg" },
                { nome: "Palmilha Gel", detalhe: "Par: 1 unidade", preco: "R$ 32,50", desconto: false, imagem: "../style/img/prod27.jpg" },
                { nome: "Tênis Casual", detalhe: "Par: 1 unidade", preco: "R$ 159,90", desconto: false, imagem: "../style/img/prod28.jpg" },
                { nome: "Sapatilha Antiderrapante", detalhe: "Par: 1 unidade", preco: "R$ 99,00", desconto: false, imagem: "../style/img/prod29.jpg" },
                { nome: "Bota Ortopédica", detalhe: "Par: 1 unidade", preco: "R$ 189,90", desconto: true, imagem: "../style/img/prod30.jpg" },
                { nome: "Meia Antiderrapante", detalhe: "Par: 1 unidade", preco: "R$ 28,00", desconto: false, imagem: "../style/img/prod31.jpg" },
                { nome: "Sandália Terapêutica", detalhe: "Par: 1 unidade", preco: "R$ 119,90", desconto: false, imagem: "../style/img/prod32.jpg" },
                { nome: "Chinelo de Praia", detalhe: "Par: 1 unidade", preco: "R$ 39,90", desconto: false, imagem: "../style/img/prod33.jpg" }
            ]
        },
        4: {
            titulo: "Kit completo de cuidados essenciais",
            imagem: "../style/img/promo4.jpg",
            descricao: "Um kit pensado para o teu dia a dia, com produtos selecionados para hidratação, proteção e bem-estar.",
            preco: "R$ 59,90",
            desconto: "10% OFF",
            detalhes: [
                "Ideal para uso diário",
                "Testado dermatologicamente",
                "Embalagem económica"
            ],
            produtos: [
                { nome: "Creme Hidratante Facial", detalhe: "Tubo: (50ml) x 1", preco: "R$ 29,90", desconto: true, imagem: "../style/img/prod8.jpg" },
                { nome: "Protetor Solar FPS 50", detalhe: "Tubo: (60ml) x 1", preco: "R$ 45,00", desconto: false, imagem: "../style/img/prod9.jpg" },
                { nome: "Sabonete Líquido", detalhe: "Frasco: (250ml) x 1", preco: "R$ 18,50", desconto: false, imagem: "../style/img/prod10.jpg" },
                { nome: "Shampoo Suave", detalhe: "Frasco: (300ml) x 1", preco: "R$ 24,90", desconto: false, imagem: "../style/img/prod34.jpg" },
                { nome: "Condicionador Nutritivo", detalhe: "Frasco: (300ml) x 1", preco: "R$ 26,90", desconto: false, imagem: "../style/img/prod35.jpg" },
                { nome: "Loção Corporal", detalhe: "Frasco: (400ml) x 1", preco: "R$ 32,00", desconto: true, imagem: "../style/img/prod36.jpg" },
                { nome: "Desodorizante Roll-on", detalhe: "Frasco: (50ml) x 1", preco: "R$ 15,90", desconto: false, imagem: "../style/img/prod37.jpg" },
                { nome: "Gel de Banho", detalhe: "Frasco: (250ml) x 1", preco: "R$ 20,00", desconto: false, imagem: "../style/img/prod38.jpg" },
                { nome: "Creme para Mãos", detalhe: "Tubo: (75ml) x 1", preco: "R$ 16,50", desconto: false, imagem: "../style/img/prod39.jpg" },
                { nome: "Bálsamo Labial", detalhe: "Tubo: (10ml) x 1", preco: "R$ 9,90", desconto: true, imagem: "../style/img/prod40.jpg" }
            ]
        }
    };

    /* =========================================
       LÊ O promoId DA URL
    ========================================= */
    const params = new URLSearchParams(window.location.search);
    const promoId = params.get('promoId');
    const promoAtual = promocoes[promoId];

    /* =========================================
       ELEMENTOS DO DOM
    ========================================= */
    const pageTitle = document.getElementById('pageTitle');
    const promoTitulo = document.getElementById('promoTitulo');
    const promoDescricao = document.getElementById('promoDescricao');
    const promoImagem = document.getElementById('promoImagem');
    const promoDescontoBadge = document.getElementById('promoDescontoBadge');
    const promoPreco = document.getElementById('promoPreco');
    const promoDetalhesLista = document.getElementById('promoDetalhesLista');
    const promoProdutosGrid = document.getElementById('promoProdutosGrid');
    const promoErroEl = document.getElementById('promoErro');
    const promoDetalheEl = document.querySelector('.promo-detalhe');
    const promoBreadcrumbEl = document.querySelector('.promo-breadcrumb');

    /* =========================================
       CASO A PROMOÇÃO NÃO EXISTA
    ========================================= */
    if (!promoId || !promoAtual) {
        promoDetalheEl.style.display = 'none';
        promoBreadcrumbEl.style.display = 'none';
        promoErroEl.style.display = 'block';
        pageTitle.textContent = 'Promoção não encontrada | Farmácia';
        return;
    }

    /* =========================================
       PREENCHE O CONTEÚDO PRINCIPAL
    ========================================= */
    pageTitle.textContent = `${promoAtual.titulo} | Farmácia`;
    promoTitulo.textContent = promoAtual.titulo;
    promoDescricao.textContent = promoAtual.descricao;
    promoImagem.src = promoAtual.imagem;
    promoImagem.alt = promoAtual.titulo;
    promoDescontoBadge.textContent = promoAtual.desconto || "";
    promoPreco.textContent = promoAtual.preco;

    /* =========================================
       GERA A LISTA DE DETALHES
    ========================================= */
    promoAtual.detalhes.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        promoDetalhesLista.appendChild(li);
    });

    /* =========================================
       GERA OS 10 CARDS DE PRODUTO (VITRINE COMPLETA)
    ========================================= */
    promoAtual.produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('promo-produto-card');

        card.innerHTML = `
            <div class="promo-produto-topo">
                ${produto.desconto ? '<span class="promo-badge-desconto">%</span>' : ''}
                <div class="promo-produto-icones">
                    <button class="promo-icone-btn" aria-label="Partilhar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                    <button class="promo-icone-btn" aria-label="Favorito">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <img class="promo-produto-imagem" src="${produto.imagem}" alt="${produto.nome}">

            <div class="promo-produto-info">
                <h3 class="promo-produto-nome">${produto.nome}</h3>
                <p class="promo-produto-detalhe">${produto.detalhe}</p>

                <div class="promo-produto-preco-box">
                    <span class="promo-a-partir-de-small">A PARTIR DE</span>
                    <span class="promo-produto-preco">${produto.preco}</span>
                </div>

                <button class="promo-btn-ofertas">Ver ofertas</button>
                <button class="promo-btn-carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Adicionar ao carrinho
                </button>
            </div>
        `;

        promoProdutosGrid.appendChild(card);
    });

});