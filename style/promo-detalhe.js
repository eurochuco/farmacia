document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const promoId = params.get("promoId");
    const promoAtual = PROMOCOES[promoId];

    const pageTitle = document.getElementById("pageTitle");
    const promoTitulo = document.getElementById("promoTitulo");
    const promoDescricao = document.getElementById("promoDescricao");
    const promoImagem = document.getElementById("promoImagem");
    const promoDescontoBadge = document.getElementById("promoDescontoBadge");
    const promoPreco = document.getElementById("promoPreco");
    const promoDetalhesLista = document.getElementById("promoDetalhesLista");
    const promoProdutosGrid = document.getElementById("promoProdutosGrid");
    const promoErroEl = document.getElementById("promoErro");
    const promoDetalheEl = document.querySelector(".promo-detalhe");
    const promoBreadcrumbEl = document.querySelector(".promo-breadcrumb");

    if (!promoId || !promoAtual) {
        promoDetalheEl.style.display = "none";
        promoBreadcrumbEl.style.display = "none";
        promoErroEl.style.display = "block";
        pageTitle.textContent = "Promoção não encontrada | Farmácia";
        return;
    }

    pageTitle.textContent = `${promoAtual.titulo} | Farmácia`;
    promoTitulo.textContent = promoAtual.titulo;
    promoDescricao.textContent = promoAtual.descricao;
    promoImagem.src = promoAtual.imagem;
    promoImagem.alt = promoAtual.titulo;
    promoDescontoBadge.textContent = promoAtual.desconto || "";
    promoPreco.textContent = formatarPreco(promoAtual.preco);

    promoAtual.detalhes.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        promoDetalhesLista.appendChild(li);
    });

    const produtos = filtrarProdutos({ promoId });
    promoProdutosGrid.innerHTML = produtos.length
        ? produtos.map((p) => cardProdutoHTML(p)).join("")
        : "<p>Não há produtos associados a esta promoção.</p>";
});
