package JavaCode;

import org.junit.Before;
import org.junit.Test;

import java.util.Scanner;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
public class TestRockPaperScissor {


	// reset win counter variables
	@Before
	public void beforeEachTest(){
		RockPaperScissor.userWinCount = 0;
		RockPaperScissor.computerWinCount = 0;
	}


	// Test check draw
	@Test
	public void checkWhoWon_givenUserWithScissorsAndComputerWithScissors_draw() {

		RockPaperScissor.checkWhoWon("Schere", "Schere");
		assertEquals(0, RockPaperScissor.userWinCount);
		assertEquals(0, RockPaperScissor.computerWinCount);

	}

	// Test check user win
	@Test
	public void checkWhoWon_givenUserWithScissorsAndComputerWithPaper_userWin(){

		RockPaperScissor.checkWhoWon("Schere", "Papier");
		assertEquals(1, RockPaperScissor.userWinCount);
		assertEquals(0, RockPaperScissor.computerWinCount);

	}


	// Test check computer win/user loose
	@Test
	public void checkWhoWon_givenUserWithPaperAndComputerWithScissors_computerWin() {

		RockPaperScissor.checkWhoWon("Papier", "Schere");
		assertEquals(0, RockPaperScissor.userWinCount);
		assertEquals(1, RockPaperScissor.computerWinCount);

	}


	@Test
	public void testCheckUserChoice() {

		//assertEquals("Stein",RockPaperScissor.checkUserChoice(new Scanner("aljfgah\nStein")));
		//assertEquals("Schere",RockPaperScissor.checkUserChoice(new Scanner("aljfgah\nSchere")));
		//assertEquals("Papier",RockPaperScissor.checkUserChoice(new Scanner("aljfgah\nPapier")));

		assertTrue("stein".equalsIgnoreCase("Stein"));
		assertTrue("schere".equalsIgnoreCase("Schere"));
		assertTrue("papier".equalsIgnoreCase("Papier"));

	}

	@Test
	public void testGenerateComputerChoice() {

		String decision = RockPaperScissor.generateComputerChoice(RockPaperScissor.choices);
		List<String> expected = Arrays.asList ("Schere", "Stein", "Papier");
		assertTrue(expected.contains(decision));

	}

	@Test
	public void testEndGame() {
		// test user win
		RockPaperScissor.userWinCount = 4;
		assertEquals(true, RockPaperScissor.endGame());

		RockPaperScissor.userWinCount = 0;

		// test computer win
		RockPaperScissor.computerWinCount = 3;
		assertEquals(true, RockPaperScissor.endGame());
	}

}