//declaracao da variavel produtos, global
let produtos

window.onload = function(){
    var storedUser = localStorage.getItem("usuario")
    var user = JSON.parse(storedUser)
    document.getElementById("user").textContent = user.name;
    document.getElementById("perfil"). textContent = user.name;
    document.getElementById("idPerfil"). textContent = user.id;
}

document.addEventListener("DOMContentLoaded", function(){
    //fetch dos produtos e armanezamento na variavel global
fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      const produtosContainer = document.getElementById("produtos-container");

        produtos.forEach((produto, index) => {
            const card = document.createElement("div")
            card.className = "card"
            card.style.width = "18rem"
            card.style.margin = "10px"
            card.style.backgroundColor = "black"
            

            const Imagem = document.createElement("img")
            Imagem.src = produto.Imagem
            Imagem.className = "card-img-top"

            const cardBody = document.createElement("div")
            cardBody.className = "card-body"

            const cardTitle = document.createElement("h5")
            cardTitle.className = "card-title"
            cardTitle.textContent = produto.descricao

            const cardText = document.createElement("p")
            cardText.className = "card-text"
            cardText.textContent = "Preço: $" + produto.preco.toFixed(2)

            const btnAdicionarAoCarrinho = document.createElement("a")
            btnAdicionarAoCarrinho.href = '#'
            btnAdicionarAoCarrinho.className = "btn btn-primary btn-adicionar-ao-carrinho"
            btnAdicionarAoCarrinho.setAttribute("data-indice", index)
            btnAdicionarAoCarrinho.textContent = "Adicionar ao carrinho"
            btnAdicionarAoCarrinho.style.backgroundColor = "goldenrod"
            btnAdicionarAoCarrinho.style.border = "none"


            cardBody.appendChild(cardTitle)
            cardBody.appendChild(cardText)
            cardBody.appendChild(btnAdicionarAoCarrinho)

            card.appendChild(Imagem)
            card.appendChild(cardBody)

            produtosContainer.appendChild(card)
        })

    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error))

    //Manipulador de eventos para o botão "Adicionar ao carrinho"
    $("#produtos-container").on("click", ".btn-adicionar-ao-carrinho", function(){
        const indexDoProduto = $(this).data("indice")
        const produtoSelecionado = produtos[indexDoProduto]
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(produtoSelecionado)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        alert("Produto adicionado ao carrinho")
    })
})