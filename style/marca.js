const opcoesOrdenar = [
    { valor: "padrao", label: "Ordenar por:" },
    { valor: "preco-asc", label: "Preço: baixo a alto" },
    { valor: "preco-desc", label: "Preço: alto a baixo" },
    { valor: "nome-asc", label: "Nome: A-Z" },
    { valor: "nome-desc", label: "Nome: Z-A" }
];

let ordenarAtual = "padrao";
let paginaAtual = 1;
const porPagina = 8;

const params = new URLSearchParams(window.location.search);
const brandId = parseInt(params.get("brands"), 10);
const marca = MARCAS[brandId];

function renderCabecalhoMarca() {
    if (!marca) {
        document.getElementById("marcaNome").textContent = "Marca não encontrada";
        document.getElementById("marcaDescricao").textContent = "Verifica o link ou volta à página inicial.";
        return;
    }
    document.title = marca.nome + " — Farmácia";
    document.getElementById("marcaNome").textContent = marca.nome;
    document.getElementById("marcaDescricao").textContent = marca.descricao;
    document.getElementById("marcaBannerTexto").textContent = marca.logoTexto;
    document.getElementById("marcaBanner").style.backgroundColor = marca.corFundo;
    document.getElementById("marcaLogo").textContent = marca.logoTexto;
}

function getProdutosOrdenados() {
    let lista = filtrarProdutos({ marcaId: brandId });
    const min = parseFloat(document.getElementById("precoMin").value);
    const max = parseFloat(document.getElementById("precoMax").value);
    if (!Number.isNaN(min)) lista = lista.filter((p) => p.preco >= min);
    if (!Number.isNaN(max)) lista = lista.filter((p) => p.preco <= max);

    switch (ordenarAtual) {
        case "preco-asc": lista.sort((a, b) => a.preco - b.preco); break;
        case "preco-desc": lista.sort((a, b) => b.preco - a.preco); break;
        case "nome-asc": lista.sort((a, b) => a.nome.localeCompare(b.nome)); break;
        case "nome-desc": lista.sort((a, b) => b.nome.localeCompare(a.nome)); break;
    }
    return lista;
}

function renderContador(total) {
    document.getElementById("marcaTotalResultados").textContent = `${total} resultados encontrados`;
}

function renderGrelha() {
    const todos = getProdutosOrdenados();
    renderContador(todos.length);

    const inicio = (paginaAtual - 1) * porPagina;
    const pagina = todos.slice(inicio, inicio + porPagina);
    const grelha = document.getElementById("marcaGrelha");

    if (pagina.length === 0) {
        grelha.innerHTML = `<p style="grid-column: 1 / -1; color:#888; text-align:center; padding: 40px 0;">Nenhum produto encontrado para esta marca.</p>`;
        renderPaginacao(0);
        return;
    }

    grelha.innerHTML = pagina.map((p) => `
        <div class="marca-produto-card">
            <div class="marca-produto-topo">
                ${p.desconto ? '<span class="marca-badge-desconto">%</span>' : ""}
            </div>
            <img class="marca-produto-imagem" src="${p.imagem}" alt="${p.nome}">
            <div class="marca-produto-info">
                <h3 class="marca-produto-nome">${p.nome}</h3>
                <p class="marca-produto-detalhe">${p.detalhe}</p>
                <span class="marca-a-partir-de">A PARTIR DE</span>
                <span class="marca-preco-valor">${formatarPreco(p.preco)}</span>
                <a class="marca-btn-ver" href="produto.html?id=${p.id}">Ver produto</a>
            </div>
        </div>
    `).join("");

    renderPaginacao(todos.length);
}

function renderPaginacao(totalItens) {
    const totalPaginas = Math.max(1, Math.ceil(totalItens / porPagina));
    const html = `
        <button class="pag-btn" id="pagAnterior" ${paginaAtual === 1 ? "disabled" : ""}>‹</button>
        ${gerarNumerosPagina(totalPaginas)}
        <button class="pag-btn" id="pagProximo" ${paginaAtual === totalPaginas ? "disabled" : ""}>›</button>
    `;
    document.getElementById("marcaPaginacaoTopo").innerHTML = html;
    document.getElementById("marcaPaginacaoBaixo").innerHTML = html;

    document.querySelectorAll("#marcaPaginacaoTopo .pag-btn, #marcaPaginacaoBaixo .pag-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const alvo = e.currentTarget;
            if (alvo.id.includes("Anterior") && paginaAtual > 1) paginaAtual--;
            else if (alvo.id.includes("Proximo") && paginaAtual < totalPaginas) paginaAtual++;
            else if (alvo.dataset.pagina) paginaAtual = parseInt(alvo.dataset.pagina, 10);
            renderGrelha();
        });
    });
}

function gerarNumerosPagina(total) {
    let html = "";
    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || Math.abs(i - paginaAtual) <= 1) {
            html += `<button class="pag-btn ${i === paginaAtual ? "ativo" : ""}" data-pagina="${i}">${i}</button>`;
        } else if (i === 2 || i === total - 1) {
            html += `<span class="pag-dots">…</span>`;
        }
    }
    return html;
}

function renderOrdenarDesktop() {
    const lista = document.getElementById("ordenarListaDesktop");
    lista.innerHTML = opcoesOrdenar.map((op) => `
        <div class="marca-ordenar-opcao ${op.valor === ordenarAtual ? "selecionada" : ""}" data-valor="${op.valor}">
            ${op.label}
        </div>
    `).join("");

    lista.querySelectorAll(".marca-ordenar-opcao").forEach((opcao) => {
        opcao.addEventListener("click", () => {
            ordenarAtual = opcao.dataset.valor;
            document.getElementById("ordenarLabelDesktop").textContent =
                opcoesOrdenar.find((o) => o.valor === ordenarAtual).label;
            lista.classList.remove("aberta");
            paginaAtual = 1;
            renderOrdenarDesktop();
            renderGrelha();
        });
    });
}

document.getElementById("btnOrdenarDesktop").addEventListener("click", () => {
    document.getElementById("ordenarListaDesktop").classList.toggle("aberta");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest("#marcaOrdenarDesktop")) {
        document.getElementById("ordenarListaDesktop").classList.remove("aberta");
    }
});

function renderOrdenarMobile() {
    const corpo = document.getElementById("ordenarMobileCorpo");
    corpo.innerHTML = opcoesOrdenar.map((op) => `
        <div class="ordenar-mobile-opcao ${op.valor === ordenarAtual ? "selecionada" : ""}" data-valor="${op.valor}">
            ${op.label} ${op.valor === ordenarAtual ? "✓" : ""}
        </div>
    `).join("");

    corpo.querySelectorAll(".ordenar-mobile-opcao").forEach((opcao) => {
        opcao.addEventListener("click", () => {
            ordenarAtual = opcao.dataset.valor;
            paginaAtual = 1;
            document.getElementById("modalOrdenarOverlay").classList.remove("aberto");
            renderOrdenarDesktop();
            renderOrdenarMobile();
            renderGrelha();
        });
    });
}

document.getElementById("btnAbrirFiltrosMobile").addEventListener("click", () => {
    document.getElementById("modalFiltrosOverlay").classList.add("aberto");
});
document.getElementById("btnFecharFiltrosMobile").addEventListener("click", () => {
    document.getElementById("modalFiltrosOverlay").classList.remove("aberto");
});
document.getElementById("btnAplicarFiltrosMobile").addEventListener("click", () => {
    document.getElementById("modalFiltrosOverlay").classList.remove("aberto");
    paginaAtual = 1;
    renderGrelha();
});

document.getElementById("btnAbrirOrdenarMobile").addEventListener("click", () => {
    document.getElementById("modalOrdenarOverlay").classList.add("aberto");
});
document.getElementById("btnFecharOrdenarMobile").addEventListener("click", () => {
    document.getElementById("modalOrdenarOverlay").classList.remove("aberto");
});

document.querySelectorAll(".filtro-grupo-titulo").forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.closest(".filtro-grupo").classList.toggle("fechado");
    });
});

document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        document.getElementById("marcaGrelha").classList.toggle("vista-lista", btn.dataset.view === "lista");
    });
});

document.getElementById("btnLimparFiltros").addEventListener("click", () => {
    document.getElementById("precoMin").value = "";
    document.getElementById("precoMax").value = "";
    document.getElementById("marcaTags").innerHTML = "";
    paginaAtual = 1;
    renderGrelha();
});

["precoMin", "precoMax"].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
        paginaAtual = 1;
        renderGrelha();
    });
});

renderCabecalhoMarca();
renderOrdenarDesktop();
renderOrdenarMobile();
renderGrelha();

document.getElementById("filtrosMobileCorpo").innerHTML =
    document.getElementById("marcaFiltrosDesktop").innerHTML;
