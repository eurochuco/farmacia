/* =====================================================
   marca-detalhe.js
   Lê ?marca=<slug> do URL e desenha a página da marca.
   Exemplo: marca-detalhe.html?marca=fenty-beauty
   Sem ?marca= mostra a lista de todas as marcas.
   ===================================================== */
(function () {
    'use strict';

    /* =====================================================================
       1) DADOS  —  edita aqui as marcas e os produtos
       Marca:   slug, name, desc, logo, banner, color, dark, tint, items
                logo   -> ex.: '../style/img/marcas/fenty-logo.png'
                banner -> ex.: '../style/img/marcas/fenty-banner.jpg' (opcional)
       Produto: [nome, tipo, categoria, preço, preço antigo (0 = sem desconto),
                 estabelecimentos (índices de ESTAB), forma do ícone, imagem]
                forma: tube | bottle | jar | stick | compact | tub
                imagem (opcional): ex.: '../style/img/produtos/concealer.png'
       ===================================================================== */
    var ESTAB = ['Farmácia Central', 'Farmácia Vida', 'Parafarmácia Bem-Estar'];

    var BRANDS = [
        {
            slug: 'avene', name: 'Avène',
            desc: 'Cuidados dermatológicos com água termal de Avène para peles sensíveis, reativas e com tendência atópica.',
            logo: '', banner: '', color: '#4a90c9', dark: '#245a8a', tint: '#e2eff9',
            items: [
                ['Cicalfate+ Creme Reparador Protetor', 'Creme reparador 40 ml', 'Cuidados de pele', 21450, 0, [0, 1], 'tube'],
                ['Eau Thermale Spray Água Termal', 'Água termal 300 ml', 'Cuidados de pele', 14800, 17200, [0, 1, 2], 'bottle'],
                ['Cleanance Gel de Limpeza', 'Gel de limpeza 400 ml', 'Higiene', 19900, 0, [1], 'bottle'],
                ['Tolérance Control Creme Calmante', 'Creme calmante 40 ml', 'Cuidados de pele', 27300, 0, [0], 'tube'],
                ['Hydrance Rica Creme Hidratante', 'Creme hidratante 40 ml', 'Cuidados de pele', 24750, 0, [0, 2], 'jar'],
                ['Solar Fluido Muito Alta Proteção SPF 50+', 'Protetor solar facial 50 ml', 'Solares', 26900, 0, [1, 2], 'tube'],
                ['XeraCalm A.D Bálsamo Relipidante', 'Bálsamo corporal 400 ml', 'Cuidados de pele', 32500, 37000, [0], 'bottle'],
                ['Cold Cream Bálsamo para Lábios', 'Bálsamo labial 4 g', 'Cuidados de pele', 8900, 0, [0, 1], 'stick']
            ]
        },
        {
            slug: 'a-derma', name: 'A-Derma',
            desc: 'Dermocosmética inspirada na aveia Rhealba® para peles frágeis, secas e atópicas de toda a família.',
            logo: '', banner: '', color: '#6bb04d', dark: '#38702a', tint: '#e8f4e0',
            items: [
                ['Exomega Control Creme Emoliente', 'Creme emoliente 200 ml', 'Cuidados de pele', 24900, 0, [0, 1], 'tube'],
                ['Dermalibour+ Creme Reparador', 'Creme reparador 40 ml', 'Cuidados de pele', 19500, 0, [1], 'tube'],
                ['Primalba Gel de Banho Suave', 'Gel de banho 250 ml', 'Higiene', 12800, 0, [0, 2], 'bottle'],
                ['Epitheliale A.H Ultra Creme', 'Creme cicatrizante 100 ml', 'Cuidados de pele', 22300, 25500, [0], 'tube'],
                ['Phys-AC Hydra Creme Hidratante', 'Creme hidratante 40 ml', 'Cuidados de pele', 17600, 0, [2], 'jar'],
                ['Protect AH Fluido Ultra-Protetor SPF 50+', 'Protetor solar 40 ml', 'Solares', 23400, 0, [0, 1], 'tube']
            ]
        },
        {
            slug: 'fenty-beauty', name: 'Fenty Beauty',
            desc: 'Maquilhagem criada para todos os tons de pele, para realçar a sua beleza sem limites nem regras.',
            logo: '', banner: '', color: '#d99a88', dark: '#7d3f34', tint: '#fbe3e5',
            items: [
                ["Fenty Beauty Pro Filt'r Instant Retouch Concealer", 'Corretivo líquido: 440', 'Rosto', 34680, 0, [0], 'tube'],
                ['Fenty Eaze Drop Lit (Pink Pearl)', 'Iluminador líquido', 'Rosto', 42096, 0, [0, 1], 'bottle'],
                ['Fenty Plush Puddin Intensive Lip Recovery Mask', 'Máscara labial', 'Lábios', 33312, 0, [1], 'jar'],
                ["Fenty Trace'd Out Pencil Lip Liner RiRi", 'Lápis de contorno labial', 'Lábios', 29712, 0, [0], 'stick'],
                ['Gloss Bomb Universal Lip Luminizer', 'Gloss labial', 'Lábios', 24960, 29952, [0, 1, 2], 'tube'],
                ["Soft'lit Naturally Luminous Foundation", 'Base fluida', 'Rosto', 46800, 0, [1], 'bottle'],
                ['Match Stix Matte Contour Skinstick', 'Stick de contorno', 'Rosto', 38400, 0, [0], 'stick'],
                ['Killawatt Freestyle Highlighter', 'Iluminador em pó', 'Rosto', 41280, 0, [2], 'compact'],
                ["Pro Filt'r Soft Matte Setting Powder", 'Pó compacto', 'Rosto', 36480, 0, [0, 1], 'compact'],
                ['Cheeks Out Freestyle Cream Blush', 'Blush em creme', 'Rosto', 31200, 36000, [1], 'stick'],
                ['Body Lava Body Luminizer', 'Iluminador corporal', 'Corpo', 44160, 0, [0], 'bottle'],
                ['Hydra Vizor Huez SPF 30', 'Protetor solar facial', 'Cuidados de pele', 39840, 0, [2], 'tube'],
                ['Stunna Lip Paint Longwear Fluid Lip Color', 'Batom líquido', 'Lábios', 28800, 0, [0, 1], 'tube'],
                ['Butta Drop Whipped Oil Body Cream', 'Creme corporal', 'Corpo', 43200, 0, [1, 2], 'jar'],
                ['Icon Refillable Semi-Matte Lipstick', 'Batom semi-mate', 'Lábios', 32640, 0, [0], 'stick']
            ]
        },
        {
            slug: 'myprotein', name: 'Myprotein',
            desc: 'Nutrição desportiva e suplementos para acompanhar o teu treino, da proteína às vitaminas do dia a dia.',
            logo: '', banner: '', color: '#3d4fb5', dark: '#1d2a75', tint: '#e5e9fb',
            items: [
                ['Impact Whey Protein 1 kg', 'Proteína em pó · Chocolate', 'Proteínas', 42500, 48000, [0, 1], 'tub'],
                ['Creatina Monohidratada 250 g', 'Creatina em pó', 'Desempenho', 21900, 0, [0], 'tub'],
                ['BCAA Essential 250 g', 'Aminoácidos', 'Desempenho', 26400, 0, [1, 2], 'tub'],
                ['Ómega 3 (250 cápsulas)', 'Suplemento de ácidos gordos', 'Vitaminas', 18700, 0, [0, 1, 2], 'bottle'],
                ['Alpha Men Multivitamínico', 'Multivitamínico · 240 comprimidos', 'Vitaminas', 23800, 0, [2], 'bottle'],
                ['THE Pre-Workout', 'Pré-treino em pó', 'Desempenho', 32000, 0, [0], 'tub'],
                ['Vitamina D3 + K2', 'Suplemento · 180 cápsulas', 'Vitaminas', 16500, 0, [1], 'bottle'],
                ['Barras de Proteína (12 unid.)', 'Snack proteico', 'Proteínas', 29900, 33000, [0, 2], 'tub']
            ]
        },
        {
            slug: 'medicube', name: 'Medicube',
            desc: 'Skincare coreano de alta performance, com tecnologia dermatológica para uma pele limpa, firme e luminosa.',
            logo: '', banner: '', color: '#d24a5a', dark: '#7a1f2b', tint: '#fde7e9',
            items: [
                ['Zero Pore Pad 2.0', 'Discos esfoliantes · 70 unid.', 'Cuidados de pele', 31500, 0, [0, 1], 'jar'],
                ['Collagen Jelly Cream', 'Creme de colagénio', 'Cuidados de pele', 28900, 0, [1], 'jar'],
                ['PDRN Pink Peptide Serum', 'Sérum facial', 'Cuidados de pele', 45200, 52000, [0], 'bottle'],
                ['Deep Vita C Capsule Cream', 'Creme de vitamina C', 'Cuidados de pele', 34800, 0, [2], 'jar'],
                ['Collagen Night Wrapping Mask', 'Máscara de noite', 'Cuidados de pele', 26400, 0, [0, 2], 'tube'],
                ['Age-R Booster Pro', 'Dispositivo de beleza', 'Dispositivos', 289000, 320000, [1], 'compact']
            ]
        },
        {
            slug: 'the-body-shop', name: 'The Body Shop',
            desc: 'Beleza com ingredientes de origem natural e comércio justo, para cuidar do corpo, do rosto e do planeta.',
            logo: '', banner: '', color: '#3a9b5c', dark: '#1d5c36', tint: '#e2f3e8',
            items: [
                ['Tea Tree Skin Clearing Facial Wash', 'Gel de limpeza facial', 'Cuidados de pele', 14200, 0, [0, 1], 'bottle'],
                ['Body Butter Shea 200 ml', 'Manteiga corporal', 'Corpo', 21800, 24500, [0], 'jar'],
                ['Vitamin C Glow Boosting Serum', 'Sérum facial', 'Cuidados de pele', 30500, 0, [2], 'bottle'],
                ['Hemp Hand Protector', 'Creme de mãos', 'Corpo', 11900, 0, [0, 1, 2], 'tube'],
                ['Edelweiss Creme Hidratante', 'Creme facial 50 ml', 'Cuidados de pele', 26700, 0, [1], 'jar'],
                ['Moringa Gel de Banho 250 ml', 'Gel de banho', 'Corpo', 12400, 0, [0], 'bottle'],
                ['British Rose Eau de Toilette 50 ml', 'Perfume', 'Fragrâncias', 38900, 0, [2], 'bottle'],
                ['Born Lippy Bálsamo Labial', 'Bálsamo labial', 'Corpo', 6800, 0, [0, 1], 'stick']
            ]
        }
    ];

    /* páginas para onde os botões apontam (muda se os teus ficheiros tiverem outro nome) */
    var PAGE_PRODUTO = 'produto-detalhe.html';   // "Ver oferta" -> produto-detalhe.html?id=...
    var PAGE_CARRINHO = 'carrinho.html';
    var PAGE_MARCA = 'marca-detalhe.html';

    /* =====================================================================
       2) UTILITÁRIOS
       ===================================================================== */
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var norm = function (s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
    var fmtN = function (n) { return n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
    var fmt = function (n) { return fmtN(n) + ' AOA'; };
    var plural = function (n, a, b) { return n === 1 ? a : b; };
    var debounce = function (fn, ms) { var t; return function () { var a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, a); }, ms); }; };

    var store = {
        get: function (k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
        set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
    };
    var cart = store.get('fa_cart', {});   // { idProduto: quantidade }
    var wish = store.get('fa_wish', {});   // { idProduto: true }

    /* prepara os dados */
    var BR = {};
    BRANDS.forEach(function (b) {
        BR[b.slug] = b;
        b.products = b.items.map(function (r, i) {
            return {
                id: b.slug + '-' + (i + 1), brand: b.slug, name: r[0], type: r[1], cat: r[2],
                price: r[3], old: r[4] || 0, est: r[5], shape: r[6], img: r[7] || ''
            };
        });
    });
    var PROD = {};
    BRANDS.forEach(function (b) { b.products.forEach(function (p) { PROD[p.id] = p; }); });
    var discOf = function (p) { return p.old ? Math.round((1 - p.price / p.old) * 100) : 0; };

    /* ícones */
    var I = {
        share: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
        heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
        cart: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6"/></svg>',
        grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
        list: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
        filter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
        x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
        prev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
        next: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
    };

    /* ícone de produto gerado (usado quando o produto não tem imagem) */
    function art(p) {
        var b = BR[p.brand], c = b.color, d = b.dark;
        var shapes = {
            tube: '<rect x="76" y="22" width="48" height="12" rx="3" fill="' + d + '"/><path d="M76 34h48l-4 118H80z" fill="' + c + '"/><rect x="82" y="152" width="36" height="26" rx="5" fill="' + d + '"/><rect x="86" y="72" width="28" height="44" rx="4" fill="#fff" opacity=".88"/>',
            bottle: '<rect x="84" y="18" width="32" height="30" rx="5" fill="' + d + '"/><rect x="90" y="48" width="20" height="14" fill="' + c + '" opacity=".7"/><rect x="60" y="62" width="80" height="118" rx="16" fill="' + c + '"/><rect x="72" y="104" width="56" height="46" rx="5" fill="#fff" opacity=".88"/>',
            jar: '<rect x="50" y="88" width="100" height="28" rx="7" fill="' + d + '"/><rect x="56" y="116" width="88" height="62" rx="12" fill="' + c + '"/><rect x="72" y="128" width="56" height="32" rx="4" fill="#fff" opacity=".88"/>',
            stick: '<rect x="90" y="24" width="20" height="16" rx="3" fill="' + d + '"/><rect x="90" y="40" width="20" height="108" rx="3" fill="' + c + '"/><path d="M90 148h20l-10 28z" fill="' + d + '"/><rect x="94" y="70" width="12" height="40" rx="2" fill="#fff" opacity=".88"/>',
            compact: '<rect x="44" y="62" width="112" height="112" rx="24" fill="' + d + '"/><circle cx="100" cy="118" r="40" fill="' + c + '"/><circle cx="100" cy="118" r="22" fill="#fff" opacity=".35"/>',
            tub: '<rect x="48" y="40" width="104" height="26" rx="8" fill="' + d + '"/><rect x="54" y="66" width="92" height="112" rx="12" fill="' + c + '"/><rect x="64" y="90" width="72" height="60" rx="6" fill="#fff" opacity=".9"/><rect x="72" y="102" width="56" height="9" rx="2" fill="' + d + '"/><rect x="72" y="120" width="38" height="6" rx="2" fill="' + d + '" opacity=".55"/>'
        };
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><ellipse cx="100" cy="182" rx="46" ry="5" fill="#000" opacity=".08"/>' + (shapes[p.shape] || shapes.bottle) + '</svg>';
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }
    var imgOf = function (p) { return p.img || art(p); };
    var prodHref = function (p) { return PAGE_PRODUTO + '?id=' + encodeURIComponent(p.id); };

    /* logótipo: imagem se existir, senão monograma com as iniciais */
    function logoHTML(b) {
        if (b.logo) return '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '">';
        var ini = b.name.split(/\s+/).filter(function (w) { return !/^(the|de|da|do)$/i.test(w); }).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
        return '<span class="marca-monograma" aria-hidden="true">' + esc(ini) + '</span>';
    }

    /* aviso no fundo do ecrã */
    var toastT;
    function toast(msg, href, label) {
        var t = $('#marca-toast'); if (!t) return;
        t.innerHTML = '<span>' + esc(msg) + '</span>' + (href ? '<a href="' + href + '">' + esc(label) + '</a>' : '');
        t.classList.add('is-ativo');
        clearTimeout(toastT);
        toastT = setTimeout(function () { t.classList.remove('is-ativo'); }, 3200);
    }

    /* carrinho */
    function cartCount() { return Object.keys(cart).reduce(function (s, k) { return s + cart[k]; }, 0); }
    function paintCart() {
        var el = $('#marca-cart-n'); if (!el) return;
        var n = cartCount();
        el.textContent = n > 99 ? '99+' : n;
        el.hidden = n === 0;
    }
    function addToCart(id, btn) {
        cart[id] = (cart[id] || 0) + 1;
        store.set('fa_cart', cart);
        paintCart();
        toast('«' + PROD[id].name + '» adicionado ao carrinho', PAGE_CARRINHO, 'Ver carrinho');
        if (btn) {
            var span = $('span', btn), old = span.textContent;
            btn.classList.add('is-feito'); span.textContent = 'Adicionado';
            setTimeout(function () { btn.classList.remove('is-feito'); span.textContent = old; }, 1400);
        }
    }
    function toggleWish(id, btn) {
        if (wish[id]) delete wish[id]; else wish[id] = true;
        store.set('fa_wish', wish);
        btn.classList.toggle('is-ativo', !!wish[id]);
        btn.setAttribute('aria-pressed', !!wish[id]);
        toast(wish[id] ? 'Guardado nos favoritos' : 'Removido dos favoritos');
    }
    function shareProd(id) {
        var p = PROD[id], url = new URL(prodHref(p), location.href).href;
        function fallback() {
            var ta = document.createElement('textarea'); ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); toast('Link copiado'); } catch (e) { toast('Não foi possível copiar o link'); }
            ta.remove();
        }
        function copy() {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { toast('Link copiado'); }, fallback);
            else fallback();
        }
        if (navigator.share) navigator.share({ title: p.name, url: url }).catch(function (e) { if (e && e.name !== 'AbortError') copy(); });
        else copy();
    }

    /* =====================================================================
       3) PÁGINA
       ===================================================================== */
    var main = $('#marca-app');
    var qInput = $('#marca-q');
    var params = new URLSearchParams(location.search);
    var slug = (params.get('marca') || '').toLowerCase();
    var brand = BR[slug];
    var onSearch = function () { };

    if (qInput) qInput.addEventListener('input', debounce(function (e) { onSearch(e.target.value); }, 180));
    paintCart();
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFilters(); });
    var ov = $('#marca-overlay'); if (ov) ov.addEventListener('click', closeFilters);

    if (brand) renderBrand(brand); else renderList(slug);

    function openFilters() { var f = $('#marca-filtros'); if (f) { f.classList.add('is-aberto'); ov.classList.add('is-ativo'); } }
    function closeFilters() { var f = $('#marca-filtros'); if (f) f.classList.remove('is-aberto'); if (ov) ov.classList.remove('is-ativo'); }

    /* ---------- lista de marcas (sem ?marca=, ou marca que não existe) ---------- */
    function renderList(missing) {
        document.title = 'Marcas | Farmácia';
        main.innerHTML =
            '<div class="marca-wrap marca-lista-pagina"><h1 class="marca-titulo">' + (missing ? 'Marca não encontrada' : 'Todas as marcas') + '</h1>' +
            (missing ? '<p class="marca-desc">Não existe nenhuma marca «' + esc(missing) + '». Escolhe uma das marcas abaixo.</p>' : '') +
            '<div class="marca-lista" id="marca-marcas"></div></div>';
        var draw = function (t) {
            var q = norm(t || '');
            var list = BRANDS.filter(function (b) { return !q || norm(b.name).indexOf(q) > -1; });
            $('#marca-marcas').innerHTML = list.length ? list.map(function (b) {
                return '<a class="marca-lista-item" href="' + PAGE_MARCA + '?marca=' + b.slug + '" style="--m-bc:' + b.color + ';--m-bd:' + b.dark + ';--m-bt:' + b.tint + '">' +
                    '<span class="marca-logo-circulo">' + logoHTML(b) + '</span>' + esc(b.name) + '</a>';
            }).join('') : '<p class="marca-desc">Nenhuma marca encontrada.</p>';
        };
        onSearch = draw; draw();
    }

    /* ---------- página da marca ---------- */
    function renderBrand(b) {
        document.title = b.name + ' | Farmácia';
        var root = document.documentElement.style;
        root.setProperty('--m-bc', b.color); root.setProperty('--m-bd', b.dark); root.setProperty('--m-bt', b.tint);
        if (qInput) qInput.placeholder = 'Pesquisar em ' + b.name + '...';

        var PAGE = 12;   // produtos por página
        var prices = b.products.map(function (p) { return p.price; });
        var pMin = Math.min.apply(null, prices), pMax = Math.max.apply(null, prices);
        var cats = {}, estc = {};
        b.products.forEach(function (p) { cats[p.cat] = (cats[p.cat] || 0) + 1; p.est.forEach(function (i) { estc[i] = (estc[i] || 0) + 1; }); });
        var S = { q: '', qRaw: '', min: null, max: null, desc: 0, cats: new Set(), est: new Set(), sort: 'rel', page: 1, view: 'grid' };

        /* banner: imagem própria da marca, ou composição gerada com os produtos */
        var heights = [190, 250, 220, 270, 210];
        var banner = b.banner
            ? '<section class="marca-banner tem-imagem"><img class="marca-banner-img" src="' + esc(b.banner) + '" alt=""></section>'
            : '<section class="marca-banner" aria-hidden="true"><div class="marca-banner-in"><div class="marca-banner-nome">' + esc(b.name) + '</div><div class="marca-banner-prods">' +
            b.products.slice(0, 5).map(function (p, i) {
                return '<img src="' + esc(imgOf(p)) + '" alt="" style="--h:' + heights[i] + 'px" data-id="' + p.id + '">';
            }).join('') + '</div></div></section>';

        var others = BRANDS.map(function (o) {
            return '<a class="marca-link" href="' + PAGE_MARCA + '?marca=' + o.slug + '"' + (o === b ? ' aria-current="page"' : '') + '>' + esc(o.name) + '</a>';
        }).join('');

        main.innerHTML = banner +
            '<div class="marca-wrap">' +
            '<section class="marca-cabecalho"><div class="marca-logo-circulo">' + logoHTML(b) + '</div><div><h1 class="marca-titulo">' + esc(b.name) + '</h1><p class="marca-desc">' + esc(b.desc) + '</p></div></section>' +
            '<section class="marca-loja" id="marca-produtos">' +
            '<div class="marca-loja-topo"><h2>Todos os Produtos</h2><p id="marca-count" aria-live="polite"></p></div>' +
            '<div class="marca-loja-grid">' +
            '<aside class="marca-filtros" id="marca-filtros" aria-label="Filtros">' +
            '<div class="marca-filtros-topo"><h2>Filtros</h2>' +
            '<button class="marca-limpar" id="marca-limpar-tudo" type="button">' + I.x + ' Limpar tudo</button>' +
            '<button class="marca-filtros-fechar marca-so-mobile" id="marca-fechar" type="button" aria-label="Fechar filtros">' + I.x + '</button></div>' +
            '<details class="marca-sec" open><summary>Faixa de preço (AOA)</summary><div class="marca-sec-corpo"><div class="marca-faixa">' +
            '<input id="marca-pmin" inputmode="numeric" placeholder="' + Math.floor(pMin) + '" aria-label="Preço mínimo"><span>-</span>' +
            '<input id="marca-pmax" inputmode="numeric" placeholder="' + Math.ceil(pMax) + '" aria-label="Preço máximo"></div></div></details>' +
            '<details class="marca-sec"><summary>Desconto</summary><div class="marca-sec-corpo">' +
            [[0, 'Qualquer'], [10, '10% ou mais'], [20, '20% ou mais'], [30, '30% ou mais']].map(function (o) {
                return '<label class="marca-opcao"><input type="radio" name="marca-desc" value="' + o[0] + '"' + (o[0] === 0 ? ' checked' : '') + '>' + o[1] + '</label>';
            }).join('') + '</div></details>' +
            '<details class="marca-sec" open><summary>Categoria</summary><div class="marca-sec-corpo">' +
            Object.keys(cats).map(function (c) { return '<label class="marca-opcao"><input type="checkbox" data-cat="' + esc(c) + '">' + esc(c) + '<span class="c">' + cats[c] + '</span></label>'; }).join('') + '</div></details>' +
            '<details class="marca-sec"><summary>Estabelecimentos</summary><div class="marca-sec-corpo">' +
            Object.keys(estc).map(function (i) { return '<label class="marca-opcao"><input type="checkbox" data-est="' + i + '">' + esc(ESTAB[i]) + '<span class="c">' + estc[i] + '</span></label>'; }).join('') + '</div></details>' +
            '<details class="marca-sec"><summary>Marcas</summary><div class="marca-sec-corpo">' + others + '</div></details>' +
            '</aside>' +
            '<div class="marca-resultados">' +
            '<div class="marca-barra">' +
            '<button class="marca-btn-filtros marca-so-mobile" id="marca-abrir" type="button">' + I.filter + ' Filtros</button>' +
            '<nav class="marca-pager" id="marca-pager-topo" aria-label="Paginação"></nav>' +
            '<div class="marca-ferramentas">' +
            '<label class="marca-ordenar">Ordenar por: <select id="marca-ordenar">' +
            '<option value="rel">Relevância</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option>' +
            '<option value="az">Nome (A–Z)</option><option value="disc">Maior desconto</option></select></label>' +
            '<div class="marca-vistas"><button id="marca-v-grid" type="button" aria-label="Vista em grelha" aria-pressed="true">' + I.grid + '</button>' +
            '<button id="marca-v-lista" type="button" aria-label="Vista em lista" aria-pressed="false">' + I.list + '</button></div>' +
            '</div>' +
            '</div>' +
            '<div class="marca-chips" id="marca-chips"></div>' +
            '<div class="marca-grid" id="marca-grid"></div>' +
            '<nav class="marca-pager marca-pager-baixo" id="marca-pager-baixo" aria-label="Paginação"></nav>' +
            '</div>' +
            '</div>' +
            '</section>' +
            '</div>';

        /* se uma imagem não carregar, usa o ícone gerado */
        main.addEventListener('error', function (e) {
            var im = e.target;
            if (im.tagName === 'IMG' && im.dataset.id && !im.dataset.fb) { im.dataset.fb = '1'; im.src = art(PROD[im.dataset.id]); }
        }, true);

        /* ----- filtragem e ordenação ----- */
        function result() {
            var r = b.products.filter(function (p) {
                if (S.q && norm(p.name + ' ' + p.type + ' ' + p.cat).indexOf(S.q) < 0) return false;
                if (S.min != null && p.price < S.min) return false;
                if (S.max != null && p.price > S.max) return false;
                if (S.desc && discOf(p) < S.desc) return false;
                if (S.cats.size && !S.cats.has(p.cat)) return false;
                if (S.est.size && !p.est.some(function (i) { return S.est.has(String(i)); })) return false;
                return true;
            });
            var by = {
                asc: function (x, y) { return x.price - y.price; },
                desc: function (x, y) { return y.price - x.price; },
                az: function (x, y) { return x.name.localeCompare(y.name, 'pt'); },
                disc: function (x, y) { return discOf(y) - discOf(x); }
            }[S.sort];
            return by ? r.slice().sort(by) : r;
        }

        /* ----- cartão de produto ----- */
        function cardHTML(p) {
            var d = discOf(p), n = p.est.length, href = prodHref(p), liked = !!wish[p.id];
            return '<article class="marca-card">' +
                '<div class="marca-card-img">' + (d ? '<span class="marca-etiqueta">-' + d + '%</span>' : '') +
                '<div class="marca-card-acoes">' +
                '<button class="marca-icone-btn" type="button" data-share="' + p.id + '" aria-label="Partilhar ' + esc(p.name) + '">' + I.share + '</button>' +
                '<button class="marca-icone-btn' + (liked ? ' is-ativo' : '') + '" type="button" data-wish="' + p.id + '" aria-pressed="' + liked + '" aria-label="Guardar ' + esc(p.name) + ' nos favoritos">' + I.heart + '</button>' +
                '</div>' +
                '<a class="marca-card-pic" href="' + href + '" tabindex="-1" aria-hidden="true"><img src="' + esc(imgOf(p)) + '" alt="" loading="lazy" data-id="' + p.id + '"></a>' +
                '</div>' +
                '<div class="marca-card-info">' +
                '<h3 class="marca-card-nome"><a href="' + href + '">' + esc(p.name) + '</a></h3>' +
                '<p class="marca-card-tipo">' + esc(p.type) + '</p>' +
                '<div class="marca-preco"><span class="marca-preco-de">A partir de</span><span class="marca-preco-atual">' + fmtN(p.price) + '<span class="marca-preco-moeda">AOA</span></span>' + (p.old ? '<s>' + fmt(p.old) + '</s>' : '') + '</div>' +
                '<div class="marca-btns">' +
                '<a class="marca-btn marca-btn-cinza" href="' + href + '">Ver ' + n + ' ' + plural(n, 'oferta', 'ofertas') + '</a>' +
                '<button class="marca-btn marca-btn-verde" type="button" data-add="' + p.id + '">' + I.cart + '<span>Adicionar ao carrinho</span></button>' +
                '</div>' +
                '</div></article>';
        }

        /* ----- paginação ----- */
        function pageList(c, t) {
            if (t <= 7) return Array.apply(null, Array(t)).map(function (_, i) { return i + 1; });
            var s = {};[1, t, c - 1, c, c + 1].forEach(function (n) { if (n >= 1 && n <= t) s[n] = 1; });
            if (c <= 3) { s[2] = 1; s[3] = 1; }
            if (c >= t - 2) { s[t - 1] = 1; s[t - 2] = 1; }
            var arr = Object.keys(s).map(Number).sort(function (a, b) { return a - b; }), out = [];
            arr.forEach(function (n, i) { if (i && n - arr[i - 1] > 1) out.push('…'); out.push(n); });
            return out;
        }
        function pagerHTML(total) {
            if (total <= 1) return '';
            var h = '<button class="marca-pg" type="button" data-page="' + (S.page - 1) + '" aria-label="Página anterior"' + (S.page === 1 ? ' disabled' : '') + '>' + I.prev + '</button>';
            pageList(S.page, total).forEach(function (n) {
                h += n === '…' ? '<span class="marca-pg-pontos" aria-hidden="true">…</span>'
                    : '<button class="marca-pg" type="button" data-page="' + n + '"' + (n === S.page ? ' aria-current="page"' : '') + ' aria-label="Página ' + n + '">' + n + '</button>';
            });
            return h + '<button class="marca-pg" type="button" data-page="' + (S.page + 1) + '" aria-label="Página seguinte"' + (S.page === total ? ' disabled' : '') + '>' + I.next + '</button>';
        }

        /* ----- chips dos filtros ativos ----- */
        function chipList() {
            var c = [];
            if (S.q) c.push(['q', '', 'Pesquisa: ' + S.qRaw]);
            if (S.min != null || S.max != null) {
                c.push(['price', '', 'Preço: ' + (S.min != null && S.max != null ? fmtN(S.min) + ' – ' + fmtN(S.max) : S.min != null ? 'desde ' + fmtN(S.min) : 'até ' + fmtN(S.max))]);
            }
            if (S.desc) c.push(['desc', '', 'Desconto: ' + S.desc + '% ou mais']);
            S.cats.forEach(function (v) { c.push(['cat', v, v]); });
            S.est.forEach(function (v) { c.push(['est', v, ESTAB[v]]); });
            return c;
        }

        /* ----- desenha tudo ----- */
        function update(keepPage) {
            var list = result(), total = Math.max(1, Math.ceil(list.length / PAGE));
            if (!keepPage) S.page = 1;
            if (S.page > total) S.page = total;
            var slice = list.slice((S.page - 1) * PAGE, S.page * PAGE);

            $('#marca-count').textContent = list.length + ' ' + plural(list.length, 'resultado encontrado', 'resultados encontrados');
            var g = $('#marca-grid');
            g.className = 'marca-grid' + (S.view === 'list' ? ' is-lista' : '');
            g.innerHTML = slice.length ? slice.map(cardHTML).join('')
                : '<div class="marca-vazio"><h3>Nenhum produto encontrado</h3><p>Experimenta alterar ou remover alguns filtros.</p><button class="marca-btn" type="button" id="marca-vazio-limpar">Limpar filtros</button></div>';
            $('#marca-pager-topo').innerHTML = pagerHTML(total);
            $('#marca-pager-baixo').innerHTML = pagerHTML(total);

            $('#marca-chips').innerHTML = chipList().map(function (c) {
                return '<button class="marca-chip" type="button" data-chip="' + c[0] + '" data-v="' + esc(c[1]) + '" aria-label="Remover filtro ' + esc(c[2]) + '">' + esc(c[2]) + ' ' + I.x + '</button>';
            }).join('');
        }

        function syncControls() {
            $('#marca-pmin').value = S.min != null ? S.min : '';
            $('#marca-pmax').value = S.max != null ? S.max : '';
            $$('input[name="marca-desc"]').forEach(function (r) { r.checked = Number(r.value) === S.desc; });
            $$('[data-cat]').forEach(function (i) { i.checked = S.cats.has(i.dataset.cat); });
            $$('[data-est]').forEach(function (i) { i.checked = S.est.has(i.dataset.est); });
            $('#marca-ordenar').value = S.sort;
            if (qInput) qInput.value = S.qRaw;
        }
        function clearAll() {
            S.q = ''; S.qRaw = ''; S.min = S.max = null; S.desc = 0; S.cats.clear(); S.est.clear();
            syncControls(); update();
        }
        function goTop() {
            var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            $('#marca-produtos').scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'start' });
        }

        /* ----- eventos ----- */
        var num = function (v) { var d = String(v).replace(/\D/g, ''); return d ? parseInt(d, 10) : null; };
        var onPrice = debounce(function () { S.min = num($('#marca-pmin').value); S.max = num($('#marca-pmax').value); update(); }, 250);
        $('#marca-pmin').addEventListener('input', onPrice);
        $('#marca-pmax').addEventListener('input', onPrice);

        $('#marca-filtros').addEventListener('change', function (e) {
            var t = e.target;
            if (t.name === 'marca-desc') S.desc = Number(t.value);
            else if (t.dataset.cat != null) { if (t.checked) S.cats.add(t.dataset.cat); else S.cats.delete(t.dataset.cat); }
            else if (t.dataset.est != null) { if (t.checked) S.est.add(t.dataset.est); else S.est.delete(t.dataset.est); }
            else return;
            update();
        });
        $('#marca-ordenar').addEventListener('change', function (e) { S.sort = e.target.value; update(); });
        $('#marca-limpar-tudo').addEventListener('click', clearAll);
        onSearch = function (v) { S.qRaw = v.trim(); S.q = norm(S.qRaw); update(); };

        function setView(v) {
            S.view = v;
            $('#marca-v-grid').setAttribute('aria-pressed', v === 'grid');
            $('#marca-v-lista').setAttribute('aria-pressed', v === 'list');
            update(true);
        }
        $('#marca-v-grid').addEventListener('click', function () { setView('grid'); });
        $('#marca-v-lista').addEventListener('click', function () { setView('list'); });

        function pagerClick(e) {
            var btn = e.target.closest('[data-page]');
            if (!btn || btn.disabled) return;
            S.page = Number(btn.dataset.page); update(true); goTop();
        }
        $('#marca-pager-topo').addEventListener('click', pagerClick);
        $('#marca-pager-baixo').addEventListener('click', pagerClick);

        $('#marca-chips').addEventListener('click', function (e) {
            var c = e.target.closest('[data-chip]'); if (!c) return;
            var t = c.dataset.chip, v = c.dataset.v;
            if (t === 'q') { S.q = ''; S.qRaw = ''; }
            if (t === 'price') { S.min = S.max = null; }
            if (t === 'desc') S.desc = 0;
            if (t === 'cat') S.cats.delete(v);
            if (t === 'est') S.est.delete(v);
            syncControls(); update();
        });

        $('#marca-grid').addEventListener('click', function (e) {
            var a = e.target.closest('[data-add]'), w = e.target.closest('[data-wish]'), s = e.target.closest('[data-share]');
            if (a) addToCart(a.dataset.add, a);
            else if (w) toggleWish(w.dataset.wish, w);
            else if (s) shareProd(s.dataset.share);
            else if (e.target.id === 'marca-vazio-limpar') clearAll();
        });

        /* gaveta de filtros (telemóvel) */
        $('#marca-abrir').addEventListener('click', openFilters);
        $('#marca-fechar').addEventListener('click', closeFilters);

        update();
    }

})();