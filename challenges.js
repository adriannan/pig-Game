var totalScore, scores, roundScore, activePlayer, gamePlaying, prevDice;
// var dices = document.querySelectorAll('.dice');

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Random number
        var dice = Math.floor(Math.random()*6)+1;
        var diceSec = Math.floor(Math.random()*6)+1;

        // 2. display the result
        var diceDOM = document.querySelector('.dice-1');
        var diceSecDOM = document.querySelector('.dice-2');
        diceDOM.style.display = 'block';
        diceSecDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice +'.png'
        diceSecDOM.src = 'img/dice-' + diceSec +'.png'

        if(dice === prevDice && dice === 6){
            alert('Twice 6!!! You loose entire score');
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        // 3. update the round score if the rolled number was NOT a 1
           else if(dice !== 1){
                // add score
                roundScore = roundScore + dice + diceSec;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
      
            } else {

            // next player
            nextPlayer()
        }

    }
    prevDice = dice;
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        var scoreInput = document.getElementById('score-input').value;
        if(scoreInput){
            totalScore = scoreInput;
        } else {
            totalScore = 20;
        }
        


        // check if player won the game
        if(scores[activePlayer] >= totalScore){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            // for(i=0;i<dices.length;i++){
            //     dices[i].style.display = 'none';
            // };
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player 
            nextPlayer()
        }
    }

})

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    // for(i=0;i<dices.length;i++){
    //     dices[i].style.display = 'none';
    // }
}

document.querySelector('.btn-new').addEventListener('click', init)

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // for(i=0;i<dices.length;i++){
    //     dices[i].style.display = 'none';
    // }
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}