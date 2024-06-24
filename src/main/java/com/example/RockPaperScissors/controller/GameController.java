package com.example.RockPaperScissors.controller;

import JavaCode.RockPaperScissor;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

import static JavaCode.RockPaperScissor.*;


@RestController
@RequestMapping("/api")
public class GameController {

	private final RockPaperScissor game = new RockPaperScissor();

	@PostMapping("/reset")
	public String resetGame() {
		RockPaperScissor.userWinCount = 0;
		RockPaperScissor.computerWinCount = 0;
		return "Game has been reset!";
	}

	@PostMapping("/calculateGameInfo")
	public ArrayList<String> sayHello(@RequestBody String message)
	{
		ArrayList<String> gameInfo = new ArrayList<String>();
		String choiceOfUser = game.checkUserChoice(message.replace("\"", ""));
		gameInfo.add(choiceOfUser);
		if (!choiceOfUser.equals("Error")){
			game.generateComputerChoice(game.choices);
			gameInfo.add(computerChoice);
			gameInfo.addAll(game.checkWhoWon(choiceOfUser, game.computerChoice));
			gameInfo.add(game.endGame());
		}
		return gameInfo;
	}

}
