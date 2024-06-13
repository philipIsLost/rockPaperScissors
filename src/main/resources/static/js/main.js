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
      document.querySelector('.chooseButton').style.display = 'flex';

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
        displayChoices(gameInfo[0], gameInfo[1],gameInfo[2]);
        console.log(gameInfo[3]);
        console.log(gameInfo[4]);
        displayCurrentScore(gameInfo[3], gameInfo[4]);
        displayRoundWinner(gameInfo[2]);
       // document.getElementById("roundResult").innerHTML = gameInfo[2];
      //  document.getElementById("endResult").innerHTML = gameInfo[5];
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
    document.querySelector('.chooseButton').style.display = 'none';
  }

  const displayChoices = (user, pc,winState) => {
        let userChoiceIMG = user.toLowerCase() + Math.floor(Math.random()*2);
        let pcChoiceIMG = pc.toLowerCase() +  Math.floor(Math.random()*2);
        let numbercase = 0;
        switch (winState) {
          case "You Win!":
            numbercase = 0;
            break;
          case "You Loose!":
            numbercase = 1;
            break;
          default:
            numbercase = Math.floor(Math.random()*2);
            break;
        }


        document.getElementById('userChoiceIMG').src = "/images/" + numbercase +userChoiceIMG + ".png";
        document.getElementById('userChoiceIMG').classList.add('fadein')
        document.getElementById('vs').src = "/images/vs.png";
        document.getElementById('vs').classList.add('fadein')

        numbercase = ++numbercase % 2;
        document.getElementById('pcChoiceIMG').src = "/images/" + numbercase +pcChoiceIMG + ".png";
        document.getElementById('pcChoiceIMG').classList.add('fadein')
  }

  const displayRoundWinner = (roundResult) => {
    document.getElementById("roundResult").innerHTML = roundResult;
  }

  const displayCurrentScore = (userWinCount = 0, computerWinCount = 0) => {
    document.getElementById("userWinCount").innerHTML = "Your Score: " + userWinCount;
    document.getElementById("pcWinCount").innerHTML = "PC's Score: " + computerWinCount;
  }

});
