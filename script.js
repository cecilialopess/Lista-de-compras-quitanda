// Passo 1: Capturar os elementos que vamos manipular na tela
const form = document.getElementById('form-adicionar');
const inputItem = document.getElementById('input-item');
const listaCompras = document.getElementById('lista-compras');
const alertaRemocao = document.getElementById('alerta-remocao');

// Passo 2: Função para ADICIONAR um novo item
form.addEventListener('submit', function(evento) {
    // Evita que a página recarregue ao enviar o formulário
    evento.preventDefault(); 

    // Pega o texto digitado e remove espaços vazios nas pontas (trim)
    const nomeItem = inputItem.value.trim();

    // Requisito: Se estiver vazio, não faz nada (ou mostra erro)
    if (nomeItem === '') {
        alert("Por favor, digite o nome do item!");
        return; // O 'return' para a execução da função aqui
    }

    // Cria a tag <li> que vai segurar nosso item
    const novoLi = document.createElement('li');
    novoLi.classList.add('item'); // Adiciona a classe que estilizamos no CSS

    // Monta a estrutura interna do <li> igualzinha à que fizemos no HTML
    novoLi.innerHTML = `
        <div class="item-info">
            <input type="checkbox" class="checkbox-concluido">
            <span class="texto-item">${nomeItem}</span>
        </div>
        <button class="btn-remover"><i class="ph ph-trash"></i></button>
    `;

    // Empurra o novo item para dentro da nossa <ul>
    listaCompras.appendChild(novoLi);

    // Limpa o campo de texto para o próximo item
    inputItem.value = '';
});

// Passo 3: Escutar cliques DENTRO da lista (Delegação de Eventos)
// Em vez de colocar um evento em cada botão ou checkbox, colocamos na lista toda.
listaCompras.addEventListener('click', function(evento) {
    const elementoClicado = evento.target;
    
    // Encontra o <li> (item) pai do elemento que foi clicado
    const itemPai = elementoClicado.closest('.item');

    // 3.1 - Lógica de REMOVER (se clicou no botão de lixeira ou no ícone dentro dele)
    if (elementoClicado.closest('.btn-remover')) {
        itemPai.remove(); // Remove o <li> inteiro do HTML
        mostrarAlerta();  // Chama a função que mostra a mensagem
    }

    // 3.2 - Lógica de CONCLUIR (se clicou no checkbox)
    if (elementoClicado.classList.contains('checkbox-concluido')) {
        // toggle: se tem a classe, ele tira. Se não tem, ele coloca.
        itemPai.classList.toggle('item-concluido');
    }
});

// Passo 4: Função para mostrar e esconder o alerta
function mostrarAlerta() {
    // Tira a classe 'oculto' para o alerta aparecer
    alertaRemocao.classList.remove('oculto');
    
    // Olha o setTimeout aqui! (Aquele que executa uma vez após um tempo)
    // Depois de 3 segundos (3000 milissegundos), ele esconde o alerta de novo.
    setTimeout(() => {
        alertaRemocao.classList.add('oculto');
    }, 3000);
}