/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore,activePlayer,dice;

scores=[0,0];
roundScore=0;
activePlayer=0;



//setter we set a value
// document.querySelector('#current-'+activePlayer).textContent=dice;
// document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>'
//for a id add # in ''
// var x=document.querySelector('#current-0').textContent;

// console.log(x,'here is the x');//getter we get a value
//for a class add . in ''
document.querySelector('.dice').style.display='none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';

// function btn(){

// }


// //call back function
// document.querySelector('.btn-roll').addEventListener('click',btn);

document.querySelector('.btn-roll').addEventListener('click',function(){
    //geenrate random number
    var dice = Math.floor(Math.random()*6)+1;
    //display the dice
    var diceDOM=document.querySelector('.dice');

    diceDOM.style.display='block';
    diceDOM.src = 'dice-'+dice+'.PNG'
    //upadte the round score if the rolled number is not a 1
    if (dice === 1){
        // document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
        document.getElementById('current-'+activePlayer).textContent ='0';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore=0;
        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')
        document.querySelector('.dice').style.display='none';
    }else{
        roundScore+=dice
        document.getElementById('current-'+activePlayer).textContent =roundScore;
    }
    

})