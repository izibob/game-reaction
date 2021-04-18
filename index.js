let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $gameTime = document.querySelector('#game-time')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $result = document.querySelector('#result')

let isGame = false
let score = 0
const colorArray = ['red', 'blue', 'orange', 'purple', 'white', 'green']

function addHide(event) {
  event.classList.add('hide')
  }
  
function removeHide(event) {
  event.classList.remove('hide')
}

function startGame(event) {
  isGame = true
  event.target.children ? renderBox() : ''
  event.target.children 
  ? $game.style.backgroundColor = colorArray[getRandom(0, colorArray.length + 1)]
  : ''
  $gameTime.setAttribute('disabled', true)
  addHide($result.closest('#result-header'))
  addHide($start)
  removeHide($timeHeader)
}

function getRandom(min, max) {
  return parseInt(Math.random() *  (max - min) + min)
}

function renderBox() {
  $game.innerHTML = ''

  let boxSize = getRandom(30, 100)
  let gameSize = $game.getBoundingClientRect()
  let topSize = getRandom(0, gameSize.height - boxSize)
  let leftSize = getRandom(0, gameSize.width - boxSize)

  let box = document.createElement('span')
  box.style.height = boxSize + 'px'
  box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = 'black'
  box.style.top = topSize + 'px'
  box.style.left = leftSize + 'px'
  box.setAttribute('data-box', true)

  $game.insertAdjacentElement('afterbegin', box)
}

function stopGame() {
  isGame = false
  $gameTime.removeAttribute('disabled')
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  $result.textContent = score
  removeHide($result.closest('#result-header'))
  addHide($timeHeader)
  removeHide($start)
  $time.textContent = $gameTime.value
  score = 0
}

$start.addEventListener('click', function(event) { 
  startGame(event)

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent)

    if(time <= 0) {
      clearInterval(interval)
      stopGame()
      return
    }
    $time.textContent = (time - 0.1).toFixed(1)
  }, 100)
})

$game.addEventListener('click', function(event) {
  
  if(!isGame) {
    return
  }

  if(event.target.dataset.box) {
    renderBox() 
    score++
  }
  
})

$gameTime.addEventListener('input', function(event) {
  $time.textContent = event.target.value
 removeHide($timeHeader)
})





