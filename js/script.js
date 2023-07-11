var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H']; // Pares de cartas
var flippedCards = []; // Armazena as cartas viradas
var matchedCards = []; // Armazena os pares de cartas encontrados

// Função para embaralhar as cartas
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Função para criar o tabuleiro do jogo
// Função para criar o tabuleiro do jogo
function createBoard() {
    var gameBoard = document.getElementById('game-board');
    cards = shuffle(cards);

    for (var i = 0; i < cards.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card'); // Adiciona a classe 'card'
        card.dataset.card = cards[i];
        card.innerHTML = '&nbsp;';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}


// Função para virar uma carta
function flipCard() {
    if (matchedCards.includes(this)) {
        return; // A carta já foi encontrada, não faz nada
    }

    if (flippedCards.length < 2) {
        this.innerHTML = this.dataset.card;
        this.style.backgroundColor = '#FFF';
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    } else {
        // Duas cartas já estão viradas, vira todas de volta após 1 segundo
        setTimeout(function() {
            flippedCards.forEach(function(card) {
                card.innerHTML = '&nbsp;';
                card.style.backgroundColor = '#CCC';
            });

            flippedCards = [];
        }, 1000);
    }
}

// Função para verificar se as duas cartas viradas são iguais
function checkForMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];

    if (card1.dataset.card === card2.dataset.card) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(function() {
                alert('Parabéns, você ganhou o jogo!');
            }, 500);
        }
    }
}

// Chama a função para criar o tabuleiro do jogo quando a página for carregada
window.onload = createBoard;
