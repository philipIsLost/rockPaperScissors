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
        displayChoices(gameInfo[0], gameInfo[1]);
        displayRoundWinner(gameInfo[2])
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

  const displayChoices = (user, pc) => {
        let userChoiceIMG = user.toLowerCase() + Math.floor(Math.random()*3);
        let pcChoiceIMG = pc.toLowerCase() +  Math.floor(Math.random()*3);

        document.getElementById('userChoiceIMG').src = "/images/" + userChoiceIMG + ".png";
        document.getElementById('pcChoiceIMG').src = "/images/" + pcChoiceIMG + ".png";
  }

  const displayRoundWinner = (roundResult) => {
    document.getElementById("roundResult").innerHTML = roundResult;
  }

  const displayCurrentScore = (userWinCount, computerWinCount) => {

  }

});
