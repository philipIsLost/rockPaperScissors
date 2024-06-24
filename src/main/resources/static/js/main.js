document.addEventListener("DOMContentLoaded", function () {
  const playAgainButton = document.getElementById('playAgainButton');
  playAgainButton.style.display = 'none';

  document.querySelectorAll('#startButton, #playAgainButton').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
      btn.classList.add('hidden');
    });

    btn.addEventListener('transitionend', function (event) {
      if (event.propertyName === 'opacity' && btn.classList.contains('hidden')) {
        btn.style.display = 'none';
        const chooseButtons = document.querySelector('.chooseButtons');
        chooseButtons.style.animation = 'fadein 0.4s forwards';
        chooseButtons.style.display = 'flex';
        document.querySelector('#endResult').style.display = 'none';
      }
    });
  });
  const sendRequest = (data) => {
    return fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(data => {
        setTimeout(function () {
          console.log(data);
          const gameInfo = JSON.parse(data);
          displayChoices(gameInfo[0], gameInfo[1], gameInfo[2]);
          console.log(gameInfo[3]);
          console.log(gameInfo[4]);
          displayCurrentScore(gameInfo[3], gameInfo[4]);
          setTimeout(() => {
            const vs = document.getElementById('vs')
            vs.style.filter = 'none';
            vs.src = "/images/peace.png";
          }, 6000);

          setTimeout(() => displayRoundWinner(gameInfo[2]), 8400);

          setTimeout(() => chooseAgainForNextRound(gameInfo[5]), 11300);

          return gameInfo;
        }, 400);
      })
      .catch(error => {
        console.error('Error:', error);
        return ["Error"];
      });
  };

  const choiceButtons = ["stein", "papier", "schere"];
  choiceButtons.forEach(choice => {
    document.getElementById(choice).addEventListener("click", function () {
      choiceEvaluation(sendRequest(choice));
    });
  });

  const choiceEvaluation = () => {
    const chooseButtons = document.querySelector('.chooseButtons');
    chooseButtons.style.animation = 'fadeout 0.4s forwards';
    setTimeout(() => chooseButtons.style.display = 'none', 400);
  };

  const displayChoices = (user, pc, winState) => {
    const userChoiceIMG = user.toLowerCase() + Math.floor(Math.random() * 3);
    const pcChoiceIMG = pc.toLowerCase() + Math.floor(Math.random() * 3);
    const winStates = ["Victory!", "Defeat!", "Draw"];
    let numberCase = winStates.indexOf(winState);
    let gameCase = numberCase

    if (gameCase === 2) {
      numberCase = Math.floor(Math.random() * 2);
    }
    const userChoiceImage = document.getElementById('userChoiceIMG')
    userChoiceImage.src = "/images/" + numberCase + userChoiceIMG + ".png";
    if (gameCase === 1) {
      userChoiceImage.classList.add('fadeinL');
    } else {
      userChoiceImage.classList.add('fadeinWD');
    }
    const vs = document.getElementById('vs')
    if (gameCase === 2) {
      vs.classList.add('fadeinD');
      vs.style.filter = 'invert(1) hue-rotate(270deg)';
      vs.src = "/images/vs.png";
    } else {
      vs.classList.add('fadeinWL');
      vs.style.filter = 'invert(1) hue-rotate(270deg)';
      vs.src = "/images/vs.png";
    }
    if (gameCase === 2) {
      numberCase = Math.floor(Math.random() * 2);
    }
    numberCase = ++numberCase % 2;
    const pcChoiceImage = document.getElementById('userChoiceIMG')
    pcChoiceImage.src = "/images/" + numberCase + pcChoiceIMG + ".png";
    pcChoiceImage.classList.add('fadein');
    if (gameCase === 0) {
      pcChoiceImage.classList.add('fadeinW');
    } else {
      pcChoiceImage.classList.add('fadeinLD');
    }
    document.getElementById('pcWinCount').classList.add('fadein');
    document.getElementById('userWinCount').classList.add('fadein');

  }

  const displayRoundWinner = (roundResult) => {
    const roundResultElement = document.getElementById('roundResult')
    roundResultElement.classList.add('fadein');
    roundResultElement.innerHTML = roundResult;
  }

  const displayCurrentScore = (userWinCount = 0, computerWinCount = 0) => {
    document.getElementById("userWinCount").innerHTML = "Your Score: " + userWinCount;
    document.getElementById("pcWinCount").innerHTML = "PC's Score: " + computerWinCount;
  }

  const chooseAgainForNextRound = (endResult) => {
    document.querySelectorAll('.fadein, .fadeinW, .fadeinWD, .fadeinLD, .fadeinD, .fadeinL, .fadeinWL').forEach(function (el) {
      el.src = '';
      el.classList.remove('fadein', 'fadeinW', 'fadeinWD', 'fadeinLD', 'fadeinD', 'fadeinL', 'fadeinWL');
    });

    document.getElementById('roundResult').innerHTML = '';

    if (endResult === "false") {
      const chooseButtons = document.querySelector('.chooseButtons');
      chooseButtons.style.animation = 'fadein 0.4s forwards';
      chooseButtons.style.display = 'flex';
    } else {
      const endResultEl = document.getElementById("endResult");
      endResultEl.innerHTML = endResult;
      endResultEl.style.display = 'block';
      endResultEl.classList.add('animate');

      playAgainButton.style.opacity = '0';
      playAgainButton.classList.add('fadein');

      setTimeout(() => {
        playAgainButton.style.cssText = "";
        playAgainButton.className = "";
      }, 3000);

      playAgainButton.style.display = 'block';
      playAgainButton.style.marginLeft = 'auto';
      playAgainButton.style.marginRight = 'auto';
    }
  }
});



