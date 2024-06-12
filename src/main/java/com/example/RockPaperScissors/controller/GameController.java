package com.example.RockPaperScissors.controller;

import JavaCode.RockPaperScissor;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

import static JavaCode.RockPaperScissor.*;


@RestController
@RequestMapping("/api")
public class GameController
{

	@PostMapping("/hello")
	public ArrayList<String> sayHello(@RequestBody String message)
	{
		ArrayList<String> gameInfo = new ArrayList<String>();
		RockPaperScissor game = new RockPaperScissor();
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
