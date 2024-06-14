document.addEventListener("DOMContentLoaded", function() {
  let btn = document.getElementById('startButton');
  btn.addEventListener('click', function() {
    btn.style.backgroundColor = 'black';
    btn.style.color = 'white';
    btn.classList.add('hidden');
  });
  btn.addEventListener('transitionend', function(event) {
    if (event.propertyName === 'opacity' && btn.classList.contains('hidden')) {
      btn.style.display = 'none';
      document.querySelector('.chooseButtons').style.display = 'flex';

    }
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
            displayRoundWinner(gameInfo[2]);
          }, 10200);
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
        let numbercase = 0;
        switch (winState) {
          case "You Win!":
            numbercase = 0;
            break;
          case "You Lose!":
            numbercase = 1;
            break;
          default:
            numbercase = 2;
            break;
        }
        let gameCase = numbercase;

        if (numbercase === 2){
          numbercase = Math.floor(Math.random()*2)
        }
        document.getElementById('userChoiceIMG').src = "/images/" + numbercase +userChoiceIMG + ".png";
        if (gameCase === 1) {
          document.getElementById('userChoiceIMG').classList.add('fadeinL')
        }
        else{
          document.getElementById('userChoiceIMG').classList.add('fadeinWD')
        }
        if (gameCase === 2) {
          document.getElementById('vs').classList.add('fadeinD')
          document.getElementById('vs').src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png";
        }
        else{
          document.getElementById('vs').classList.add('fadeinWL')
          document.getElementById('vs').src = "/images/vs.png";
        }

        numbercase = ++numbercase % 2;
        document.getElementById('pcChoiceIMG').src = "/images/" + numbercase +pcChoiceIMG + ".png";
        document.getElementById('pcChoiceIMG').classList.add('fadein');
        if (gameCase === 0) {
          document.getElementById('pcChoiceIMG').classList.add('fadeinW')
        }
        else{
          document.getElementById('pcChoiceIMG').classList.add('fadeinLD')
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
    document.querySelectorAll('.fadein, .fadeinW, .fadeinWD, .fadeinLD, .fadeinD, .fadeinL').forEach(function(el) {
      el.src = ''
      el.classList.remove('fadein', 'fadeinW', 'fadeinWD', 'fadeinLD', 'fadeinD', 'fadeinL');
    });
    document.getElementById('roundResult').innerHTML = '';
    if(endResult === "false"){
      document.querySelector('.chooseButtons').style.display = 'flex';
    } else document.getElementById("endResult").innerHTML = endResult;

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
