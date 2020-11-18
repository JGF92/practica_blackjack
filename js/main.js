let deck = []
let playerHand = []
let dealerHand = []


//Genera la baraja. 
function initDeck() {
    let numbers = ['H','D','S','C']
    let letters = [2,3,4,5,6,7,8,9,'J','Q','K','A']

    for(let i of letters) {
        for(let j of numbers) {
            deck.push(i + j)
        }
    }
    return deck 
}

//Robar una carta aleatoria y sacarla de la baraja. 
function drawCard() {
    let random = Math.round(Math.random() * (deck.length - 1))
    let card = deck[random]
    deck.splice(random, 1)

    return card
}


//Añade una carta a la mano del player. 
function addCardToPlayerHand(card) {
    let num = playerHand.length
    let img = document.createElement('img')
    let parent = document.querySelector('.player-container')

    img.setAttribute('class','cardPlayer' + (num + 1))
    img.setAttribute('src','images/cards/' + card + '.png')

    parent.appendChild(img)
    playerHand.push(card)
    
}

//Añade una carta a la mano del dealer. 
function addCardToDealerHand(card) {
    let num = dealerHand.length
    let img = document.createElement('img')
    let parent = document.querySelector('.dealer-container')

    img.setAttribute('class','cardDealer' + (num + 1))
    img.setAttribute('src','images/cards/' + card + '.png')

    parent.appendChild(img)
    dealerHand.push(card)
    
}

//Separa el valor de la letra de la carta. 
//Al sumar el As (11) que el programa elija lo que más le convenga. si el AS siendo 10 hace que me pase de 21 será 1, sino al revés. 
function getCardValue(card) {
    let digit = card[0]

    if(digit === 'K') {
        return 10
    } else if(digit === 'J'){
        return 10 
    } else if(digit === 'Q') {
        return 10
    } else if(digit === 'A') {
        return 1
    } else {
        return parseInt(digit)
    }
}

//Suma el valor de la mano. 
function getHandValue(hand) {
    let value = 0
    for(let item of hand) {
        value = value + getCardValue(item)
    }
    return value
}


//Limpiar chat.
function clearChat() {
    let p = document.querySelectorAll('.paragraph')
    let parrafo = [...document.querySelectorAll('.paragraph')]

    for(let item in parrafo){
        item.remove()   
    }
}

//Imprimir texto en el chat.
function showMessage(text) {
    let p = document.createElement('p')
    let parent = document.querySelector('.chat')
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    parent.appendChild(p)
    p.setAttribute('class','paragraph')
    p.innerHTML = hours + ":" + minutes + ":" + seconds + "  " + text
}

//Baraja el deck. 
function shuffleDeck() {
    let shuffle = []
    while (deck.length > 0) {   
      shuffle.push(drawCard())
    }
    return shuffle 
}


// Continuar ronda
function continueRound() {
    if(getHandValue(playerHand) > 21) {
        showMask("¡HAS PERDIDO!")
        return
    }

    addCardToDealerHand(drawCard())

    if(getHandValue(dealerHand) < 16) {
        addCardToDealerHand(drawCard())
    }

    if(getHandValue(dealerHand) > 21) {
        showMask("¡HAS GANADO!")
        return
    } 

    if(getHandValue(playerHand) >= getHandValue(dealerHand)) {
        showMask("¡HAS GANADO!")
        return
    } else {
        showMask("¡HAS PERDIDO!")
        return
    }
}

//Oculta los botones
function showOptions() {
    button = document.querySelector('.buttons')
    button.classList.remove("hidden")

    let hit = document.querySelector('#hit')
    let numeroClicks = 0

    function clickHit(event) {
        numeroClicks = numeroClicks + 1
        if(numeroClicks === 2) {
            continueRound()
        }
        addCardToPlayerHand(drawCard())
    }

    hit.onclick = clickHit

    let stand = document.querySelector('#stand')
    stand.onclick = function() {
        continueRound()
    }
}

function hide(element) {
  element.style.display = "none" 
}

function showMask(mensaje) {
    modal = document.querySelector(".mask")
    modal.classList.remove("hidden")

    p = document.querySelector('.winnerText')
    p.innerHTML = mensaje

    button = document.querySelector('.winnerButton')
    mask = document.querySelector('.mask')
    button.onclick = function(){
        hide(mask)
    }
}

function startRound() {
    initDeck()
    addCardToPlayerHand(drawCard())
    addCardToPlayerHand(drawCard())
    addCardToDealerHand(drawCard())
    showOptions()
}

startRound()

