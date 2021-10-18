/* Assignment: Professional 07 - JavaScript assignment 2
Name: Giao Ngo */

const game = () => {
    let pScore = 0;
    let cScore = 0;
    const gameDisplay = document.querySelector(".gameDisplay");

    // Start the game
    const startGame = () => {
        const playButton = document.querySelector(".intro button");
        const intro = document.querySelector(".intro");
        const score = document.querySelector(".score");
        playButton.addEventListener("click", () => {
            intro.classList.add("layerHidden");
            score.classList.add("layerShow");
            gameDisplay.classList.add("layerShow");
        })
    }

    // Play the match 
    const playMatch = () => {
        const optionButtons = document.querySelectorAll(".option .btn");
        const gameResult = document.querySelector(".gameDisplay h2"); 
        const playerImage = document.querySelector(".image .player");
        const computerImage = document.querySelector(".image .computer");
        const gameOver = document.querySelector(".gameOver");
        const winnerAnnounce = document.querySelector(".gameOver p:nth-child(2)");
        let resultHistory = [];
        for(let button of optionButtons) {
            button.addEventListener("click", ()=> {
                const playerChoice = button.innerText;
                console.log("player choice is:", playerChoice);            
                // Generate random computer's choice 
                const computerNum = Math.floor(Math.random() * 3)
                const option = ["Rock","Paper","Scissors"];
                const computerChoice = option[computerNum];
                console.log("computer choice is:", computerChoice);

                shakeHand();                   
                setTimeout(() => {
                    playerImage.src = `./image/${playerChoice}.png`;
                    computerImage.src = `./image/${computerChoice}.png`;
                    playerImage.style.animation = "none"; 
                    computerImage.style.animation = "none";
                    optionButtons.forEach(button => {
                        button.classList.remove("disabled");
                        button.disabled = false;
                    });
                    compareChoice(playerChoice,computerChoice);   
                    endGame();
                },1500);
            })
        }

        // Define function to execute handshake animation, button disabled during animation
        function shakeHand() {
            playerImage.src = "./image/Rock.png";
            computerImage.src = "./image/Rock.png";
            optionButtons.forEach(button => {
                button.classList.add("disabled");
                button.disabled = true; 
            })
            playerImage.style.animation = "playerHand 1.5s linear"; 
            computerImage.style.animation = "computerHand 1.5s linear";
            gameResult.innerText = "Waiting...";
            return;
        }

        // Define function to update score
        const updateScore = () => {
            const playerScore = document.querySelector(".playerScore p");
            const computerScore = document.querySelector(".computerScore p");
            playerScore.innerText = `${pScore}`;
            computerScore.innerText = `${cScore}`;
        } 

        // Define function to compare playerChoice and computerChoice
        function compareChoice(playerChoice,computerChoice) {
            if (playerChoice === computerChoice) {
                gameResult.innerText = "It's a tie";
                return;
            }
            if (playerChoice === "Rock") {
                if(computerChoice === "Paper") {
                    gameResult.innerText = "Computer wins!!";
                    cScore++;
                    updateScore();
                    return;
                } else {
                    gameResult.innerText = "You win!!";
                    pScore++;
                    updateScore();
                    return;                   
                }
            }
            if (playerChoice === "Paper") {
                if(computerChoice === "Rock") {
                    gameResult.innerText = "You win!!";
                    pScore++;
                    updateScore();
                    return;
                } else {
                    gameResult.innerText = "Computer wins!!";
                    cScore++;
                    updateScore();
                    return;
                }
            }
            if (playerChoice === "Scissors") {
                if(computerChoice === "Rock") {
                    gameResult.innerText = "Computer wins!!";
                    cScore++;
                    updateScore();
                    return;
                } else {
                    gameResult.innerText = "You win!!";
                    pScore++;
                    updateScore();
                    return;
                }
            }
        }

        // Define function to show game-over screen when game ends
        const displayGameOver = () => {
            const gameOverText = document.querySelector(".gameOver h1")
            gameDisplay.classList.remove("layerShow");
            gameOver.classList.add("layerShow");
            gameOverText.style.animation = "gameOverText 3s 3 linear";
        }

        // Define function to check 3-time winnings in a row
        function trippleVictory(gameResult) {
            // Push game result to history array and turn that array to string
            resultHistory.push(gameResult.innerText);
            console.log(resultHistory);
            let newArray = resultHistory.join();
            // Check if 3 consecutive winning results appears in the string  
            if (newArray.includes("You win!!,You win!!,You win!!")) {
                displayGameOver();
                winnerAnnounce.innerText = "Wow! You won 3 times in a row";
                return;
            } else if (newArray.includes("Computer wins!!,Computer wins!!,Computer wins!!")) {
                displayGameOver();
                winnerAnnounce.innerText = "Computer won 3 times in a row";
                return;
            }
        }

        // Define function to announce victory after 10 wins
        function tenTotalWins() {
            if (pScore === 10 || cScore === 10) {
                displayGameOver();
                if (pScore > cScore) {
                    winnerAnnounce.innerText = "Congratulations! You won the match";
                    return;
                } else if (pScore < cScore) {
                    winnerAnnounce.innerText = "Oh no! You lost the match";
                    return;
                } else if (pScore === cScore) {
                    winnerAnnounce.innerText = "Surprise! It is a tie";
                    return;
                }
            }
        }

        // End the game
        function endGame() {
            trippleVictory(gameResult);
            tenTotalWins();
        }
    }

    // Restart the game with button click on game-over screen
    const restartGame = () => {
        const restartButton = document.querySelector(".gameOver .restartButton");
        restartButton.addEventListener("click", () => location.reload());
    }
    
    startGame();
    playMatch(); 
    restartGame();
}
game();
