document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    const categoryId = params.get("categoryId");
    const subcategory = params.get("subcategory");
    const lista = filtrarProdutos({ q, categoryId, subcategory });

    const titulo = document.getElementById("produtosTitulo");
    const descricao = document.getElementById("produtosDescricao");
    const grelha = document.getElementById("produtosGrelha");
    const pesquisa = document.getElementById("headerSearch");

    if (pesquisa && q) pesquisa.value = q;

    let heading = "Catálogo de produtos";
    if (subcategory) heading = subcategory;
    else if (categoryId && CATEGORIAS[categoryId]) heading = CATEGORIAS[categoryId].nome;
    else if (q) heading = `Resultados para “${q}”`;

    titulo.textContent = heading;
    descricao.textContent = `${lista.length} produto${lista.length === 1 ? "" : "s"} encontrado${lista.length === 1 ? "" : "s"}`;
    document.title = `${heading} | Farmácia`;

    if (!lista.length) {
        grelha.innerHTML = `
            <div class="produtos-vazio">
                <p>Não encontrámos produtos com estes critérios.</p>
                <p><a href="produtos.html">Ver todo o catálogo</a> · <a href="categorias.html">Explorar categorias</a></p>
            </div>`;
        return;
    }

    grelha.innerHTML = lista.map((p) => cardProdutoHTML(p)).join("");
});
