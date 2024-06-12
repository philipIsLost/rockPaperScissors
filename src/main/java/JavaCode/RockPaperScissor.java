package JavaCode;

import java.util.ArrayList;
import java.util.Random;


public class RockPaperScissor
{

	public static String[] choices = { "Schere", "Stein", "Papier" };
	public static String computerChoice;

	// win-counter variables for player and computer
	static int computerWinCount = 0;
	static int userWinCount = 0;


	// checks user input/decision
	public static String checkUserChoice(String choiceOfUser)
	{
		System.out.println("\nBitte wählen Sie \"Schere\", \"Stein\" oder \"Papier\":");
		//Arrays.stream(choices).anyMatch(choice -> choiceOfUser.equalsIgnoreCase(choice));
		if (choiceOfUser.equalsIgnoreCase("Schere") || choiceOfUser.equalsIgnoreCase("Stein") || choiceOfUser.equalsIgnoreCase("Papier"))
		{
			System.out.println("Sie haben sich für " + choiceOfUser + " entschieden.");
			return choiceOfUser;
		}
		// hint that the input is invalid

		else
		{
			System.out.println("Error: " + "\"" + choiceOfUser + "\"" + " steht nicht zur Auswahl! Bitte prüfen Sie ihre Eingabe.");
			return "Error";
		}
	}

	// generates computer decision
	public static String generateComputerChoice(String[] choices)
	{
		Random random = new Random();
		computerChoice = choices[random.nextInt(choices.length)];
		System.out.println("Der Computer wählte " + computerChoice + ".\n");

		return computerChoice;
	}

	// checks who won a round of 3
	public static ArrayList<String> checkWhoWon(String choiceOfUser, String ComputerChoice)
	{
		ArrayList<String> score = new ArrayList<String>();
		// check draw
		if (choiceOfUser.equalsIgnoreCase(ComputerChoice))
		{
			score.add("Draw");
		}
		// check win (user)
		else if (choiceOfUser.equalsIgnoreCase("Schere") && ComputerChoice.equals("Papier") ||
				choiceOfUser.equalsIgnoreCase("Stein") && ComputerChoice.equals("Schere") ||
				choiceOfUser.equalsIgnoreCase("Papier") && ComputerChoice.equals("Stein"))
		{
			userWinCount++;
			score.add("You Win!");
		}
		// check win (computer)
		else
		{
			computerWinCount++;
			score.add("You Loose!");


		}
		score.add(String.valueOf(userWinCount));
		score.add(String.valueOf(computerWinCount));
		return score;
	}

	// ends game if user or player won 3 times

	public static String endGame()
	{
		// win-message
		if (userWinCount >= 3)
		{
			return "You WON!";
		}
		// lose-message
		else if (computerWinCount >= 3)
		{
			System.out.println("Sie haben verloren!");
			return "You LOST!";
		}
		return String.valueOf(false);
	}

}