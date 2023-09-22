#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


const sleep = ()=>{
    return new Promise((res)=>{
        setTimeout(res, 2000);
    })
}

async function welcome(){
    let rainbowTitle = chalkAnimation.rainbow(`
    _|              _|      _|                        _|                      
    _|    _|_|    _|_|_|_|      _|_|_|      _|_|_|    _|    _|_|_|  _|    _|  
    _|  _|_|_|_|    _|        _|_|          _|    _|  _|  _|    _|  _|    _|  
    _|  _|          _|            _|_|      _|    _|  _|  _|    _|  _|    _|  
    _|    _|_|_|      _|_|    _|_|_|        _|_|_|    _|    _|_|_|    _|_|_|  
                                            _|                            _|  
                                            _|                        _|_|    
    `);
    await sleep();
    rainbowTitle.stop();
    
}

type ansType = {
    userGuess: number
}

let maxTries:number = 4;
let tries:number = 0;

const genratedNumber = Math.floor(Math.random() * 10);

async function takeNumber(){
    console.log(chalk.green("You got only 4 tries"));
    while(tries < maxTries){        
        const answers:ansType = await inquirer.prompt([
            /* Pass your questions in here */
            {
                type: "number",
                name: "userGuess",
                message: "Guess a number between 0 to 10: "
            }
        ])
        
        const {userGuess} = answers;
        // console.log(userGuess, "userguess", genratedNumber, "num");
        
        if(userGuess == genratedNumber){
            console.log(chalk.green("Hooray, you win!!!!"));
            break;
        } else if(userGuess< 0 || userGuess > 10){
            console.log(chalk.red("Number out of range! Please guess a number between 1 to 10. \n You got only 4 tries."));
            tries = 0;
        }
        else {
            console.log("Try Again");
            tries++;
        }
    }
      if(tries == maxTries){
        console.log("Out of tries, better luck next time. \n The number was: ",chalk.green(genratedNumber));
    } 
}

// takeNumber();

async function start(){
    await welcome();
    await startAgain();
}

async function startAgain(){
    let restartAgain = 'y';
    
    while (restartAgain === 'y' || restartAgain === 'yes') {
        tries = 0;
        await takeNumber();
    
        restartAgain = await inquirer.prompt([
            {
                type: "input",
                name: "restart",
                message: "Do you want to try again? y or n: ",
            }
        ]).then(answer => answer.restart.toLowerCase());
    
        if (restartAgain === 'n' || restartAgain === 'no') {
            console.log(chalk.red(`
              /$$$$$$                            /$$       /$$$$$$$                     
             /$$__  $$                          | $$      | $$__  $$                    
            | $$  \__/  /$$$$$$   /$$$$$$   /$$$$$$$      | $$  \ $$ /$$   /$$  /$$$$$$ 
            | $$ /$$$$ /$$__  $$ /$$__  $$ /$$__  $$      | $$$$$$$ | $$  | $$ /$$__  $$
            | $$|_  $$| $$  \ $$| $$  \ $$| $$  | $$      | $$__  $$| $$  | $$| $$$$$$$$
            | $$  \ $$| $$  | $$| $$  | $$| $$  | $$      | $$  \ $$| $$  | $$| $$_____/
            |  $$$$$$/|  $$$$$$/|  $$$$$$/|  $$$$$$$      | $$$$$$$/|  $$$$$$$|  $$$$$$$
            \______/  \______/  \______/  \_______/       |_______/  \____  $$ \_______/
                                                                    /$$  | $$          
                                                                    |  $$$$$$/          
                                                                    \______/           
                                                                        `));
            break; // Exit the loop if the user chooses not to play again
        }
    }
}

start();