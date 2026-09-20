/* Página de produto — usa o catálogo em catalogo.js */
function obterIdDaUrl() {
  const id = parseInt(new URLSearchParams(window.location.search).get("id"), 10);
  return Number.isNaN(id) ? null : id;
}

function iconeWhatsApp() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.12h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.35c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.27.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.53-3.7 8.2-8.2 8.2zm4.51-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.15.16-.29.18-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.15-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.42.06-.64.31-.22.24-.85.83-.85 2.03 0 1.2.87 2.35 1 2.51.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28z"/>
  </svg>`;
}

function renderizarProduto(produto) {
  document.title = produto.nome + " — Farmácia";
  const raiz = document.getElementById("produto-raiz");
  const cat = CATEGORIAS[produto.categoriaId];
  const outros = PRODUTOS.filter((p) => p.id !== produto.id).slice(0, 8);

  raiz.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Início</a> /
      <a href="produtos.html${produto.categoriaId ? "?categoryId=" + produto.categoriaId : ""}">${cat ? cat.nome : produto.subcategoria || "Catálogo"}</a> /
      <span class="atual">${produto.nome}</span>
    </div>

    <div class="produto-principal">
      <div class="produto-imagem-wrap">
        ${produto.desconto ? `<span class="produto-badge-desconto">%</span>` : ""}
        <img src="${produto.imagem}" alt="${produto.nome}">
      </div>

      <div class="produto-info">
        <span class="produto-categoria">${cat ? cat.nome : ""}</span>
        <h1 class="produto-titulo">${produto.nome}</h1>
        <p class="produto-detalhe">${produto.detalhe}</p>

        <hr class="produto-divisor">

        <div class="produto-preco-bloco">
          <span class="produto-preco-rotulo">A PARTIR DE</span>
          <span class="produto-preco-valor">${formatarPreco(produto.preco)}</span>
        </div>

        <a class="btn-whatsapp" href="${gerarLinkWhatsApp(produto)}" target="_blank" rel="noopener">
          ${iconeWhatsApp()}
          Adquirir produto
        </a>
      </div>
    </div>

    <div class="produto-descricao">
      <h2>Descrição</h2>
      <p>${produto.descricao}</p>
    </div>

    <section class="relacionados">
      <h2>Também pode gostar</h2>
      <div class="relacionados-grid">
        ${outros.map((p) => `
          <a class="relacionado-card" href="produto.html?id=${p.id}">
            <div class="relacionado-imagem-wrap">
              <img src="${p.imagem}" alt="${p.nome}">
            </div>
            <span class="relacionado-nome">${p.nome}</span>
            <span class="relacionado-preco">${formatarPreco(p.preco)}</span>
            <span class="btn-ver-produto" style="margin-top:8px">Ver produto</span>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function renderizarNaoEncontrado() {
  document.getElementById("produto-raiz").innerHTML = `
    <div class="produto-nao-encontrado">
      <h1>Produto não encontrado</h1>
      <p>O produto que procura não existe ou foi removido.</p>
      <a href="produtos.html">&larr; Voltar ao catálogo</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const produto = obterProduto(obterIdDaUrl());
  if (produto) renderizarProduto(produto);
  else renderizarNaoEncontrado();
});
