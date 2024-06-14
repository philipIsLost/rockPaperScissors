let playAgainButton = document.getElementById('playAgainButton');
playAgainButton.style.display = 'none';

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('#startButton, #playAgainButton').forEach(function(btn) {
    btn.addEventListener('click', function () {
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
      btn.classList.add('hidden');
    });
    btn.addEventListener('transitionend', function (event) {
      if (event.propertyName === 'opacity' && btn.classList.contains('hidden')) {
        btn.style.display = 'none';
        document.querySelector('.chooseButtons').style.display = 'flex';
        document.querySelector('#endResult').style.display = 'none';
      }
    });
  });
  let gameInfo;

  const sendRequest = (data) => {
    fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        let gameInfo = JSON.parse(data);
          displayChoices(gameInfo[0], gameInfo[1], gameInfo[2]);
          console.log(gameInfo[3]);
          console.log(gameInfo[4]);
          displayCurrentScore(gameInfo[3], gameInfo[4]);
          setTimeout(function () {
            document.getElementById('vs').style.filter = 'none';
            document.getElementById('vs').src = "/images/peace.png";
          }, 6000);
          setTimeout(function () {
            displayRoundWinner(gameInfo[2]);
          }, 8400);
          setTimeout(function () {
            chooseAgainForNextRound(gameInfo[5]);
          }, 15000);

        return gameInfo;
      })

      .catch((error) => {
        console.error('Error:', error);
        return ["Error"];
      });
  };

  document.getElementById("stein").addEventListener("click", function() {
    choiceEvaluation(sendRequest("Stein"));
  });

  document.getElementById("papier").addEventListener("click", function() {
    choiceEvaluation(sendRequest("Papier"));
  });
  document.getElementById("schere").addEventListener("click", function() {
    choiceEvaluation(sendRequest("Schere"));
  });


  const choiceEvaluation = (gameInfo) => {
    document.querySelector('.chooseButtons').style.display = 'none';
  }

  const displayChoices = (user, pc,winState) => {
        let userChoiceIMG = user.toLowerCase() + Math.floor(Math.random()*3);
        let pcChoiceIMG = pc.toLowerCase() +  Math.floor(Math.random()*3);
        let numberCase = 0;
        switch (winState) {
          case "You Win!":
            numberCase = 0;
            break;
          case "You Lose!":
            numberCase = 1;
            break;
          default:
            numberCase = 2;
            break;
        }
        let gameCase = numberCase;

        if (gameCase === 2){
          numberCase = Math.floor(Math.random()*2);
        }
        document.getElementById('userChoiceIMG').src = "/images/" + numberCase +userChoiceIMG + ".png";
        if (gameCase === 1) {
          document.getElementById('userChoiceIMG').classList.add('fadeinL');
        }
        else{
          document.getElementById('userChoiceIMG').classList.add('fadeinWD');
        }
        if (gameCase === 2) {
          document.getElementById('vs').classList.add('fadeinD');
          document.getElementById('vs').style.filter = 'invert(1) hue-rotate(270deg)';
          document.getElementById('vs').src = "/images/vs.png";
        }
        else{
          document.getElementById('vs').classList.add('fadeinWL');
          document.getElementById('vs').style.filter = 'invert(1) hue-rotate(270deg)';
          document.getElementById('vs').src = "/images/vs.png";
        }
        if (gameCase === 2){
          numberCase = Math.floor(Math.random()*2);
        }
        numberCase = ++numberCase % 2;
        document.getElementById('pcChoiceIMG').src = "/images/" + numberCase +pcChoiceIMG + ".png";
        document.getElementById('pcChoiceIMG').classList.add('fadein');
        if (gameCase === 0) {
          document.getElementById('pcChoiceIMG').classList.add('fadeinW');
        }
        else{
          document.getElementById('pcChoiceIMG').classList.add('fadeinLD');
        }
        document.getElementById('pcWinCount').classList.add('fadein');
        document.getElementById('userWinCount').classList.add('fadein');

  }

  const displayRoundWinner = (roundResult) => {
    document.getElementById('roundResult').classList.add('fadein');
    document.getElementById("roundResult").innerHTML = roundResult;
  }

  const displayCurrentScore = (userWinCount = 0, computerWinCount = 0) => {
    document.getElementById("userWinCount").innerHTML = "Your Score: " + userWinCount;
    document.getElementById("pcWinCount").innerHTML = "PC's Score: " + computerWinCount;
  }

  const chooseAgainForNextRound = (endResult) => {
    document.querySelectorAll('.fadein, .fadeinW, .fadeinWD, .fadeinLD, .fadeinD, .fadeinL, .fadeinWL').forEach(function(el) {
      el.src = '';
      el.classList.remove('fadein', 'fadeinW', 'fadeinWD', 'fadeinLD', 'fadeinD', 'fadeinL','fadeinWL');
    });
    document.getElementById('roundResult').innerHTML = '';
    if(endResult === "false"){
      document.querySelector('.chooseButtons').style.display = 'flex';
    } else {
      document.getElementById("endResult").innerHTML = endResult;
      document.querySelector('#endResult').style.display = 'block';
      document.getElementById('endResult').classList.add('animate');
      document.querySelector('#playAgainButton').style.display = 'block';
      document.querySelector('#playAgainButton').style.marginLeft = 'auto';
      document.querySelector('#playAgainButton').style.marginRight = 'auto';
    }
  }

});

document.getElementById('playAgainButton').addEventListener('click', function() {
  fetch('/api/reset', {
    method: 'POST',
  })
    .then(response => response.text())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
