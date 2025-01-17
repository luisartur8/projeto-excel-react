export function manterCelulaSelecionadaVisivel(celula) {
    const posicoes = celula.getBoundingClientRect();
    const top = posicoes.top;
    const bottom = posicoes.bottom;
    const right = posicoes.right;
    const left = posicoes.left;

    const viewHeight = window.innerHeight;
    const viewWidth = window.innerWidth;

    if (top < 0) {
        celula.scrollIntoView({ block: "start" });
    }

    if (left < 0) {
        celula.scrollIntoView({ block: "nearest", inline: "start" });
    }

    if (bottom > viewHeight) {
        celula.scrollIntoView({ block: "end" });
    }

    if (right > viewWidth) {
        celula.scrollIntoView({ block: "nearest", inline: "end" });
    }
}

export function moverCursorParaFinal(celula) {
    const range = document.createRange(); // Cria um novo intervalo
    const sel = window.getSelection(); // Obtém o objeto Selection (onde o cursor está)

    range.selectNodeContents(celula); // Seleciona todo o conteúdo do elemento
    range.collapse(false); // Colapsa o intervalo para o final do conteúdo

    sel.removeAllRanges(); // Remove qualquer seleção anterior
    sel.addRange(range); // Define o novo intervalo, movendo o cursor para o final
}