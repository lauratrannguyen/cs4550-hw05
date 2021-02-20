import "../css/app.css"
import "phoenix_html"

import React, { useState, useEffect } from 'react';
import { randomCombo, isItValid, gameCondition } from './game';
import { ch_join, ch_push, ch_reset, ch_display } from './socket'
import ReactDOM from 'react-dom';

// React
function App() {

    // Initializes the state
    const [state, setState] = useState({
        // Only 8 tries available
        attempts: 0,
        // User's current guess input
        guess: "",
        // All the past guesses
        guesses: [],
        // All the past results
        results: [],
        // Error Message
        error: ""
    });

    // Initializes the state
    useEffect(() => {
        ch_join(setState);
    })

    // The user's guess
    function userInput() {
        //push the guess
        ch_push(state.guess)
    }

    // Adds the guess to the guesses field
    function addGuess(ev) {
        let input = ev.target.value;
        ch_display(input);
    }


    // Enter key
    function keyPressed(ev) {
        if (ev.key == 'Enter') {
            userInput();
        }
    }

    // Old guesses and results
    let rows = [];
    for (let x = 0; x < 8; x++) {
        rows.push(<tr key={x}>
            <td key={x}>{state.guesses[x]}</td>
            <td key={x}>{state.results[x]}</td>
        </tr>)
    }

    // Table of all the guesses
    function UpdateTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th><center>Guesses</center></th>
                        <th><center>Results</center></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    // Restarts the game
    function restart() {
        ch_reset();
    }

    return (
        <div className="Bulls">
            <center><h1>Bulls and Cows</h1></center>
            <div>Instructions:</div>
            <div>Guess the secret 4 digit combo.</div>
            <div>Once a guess has been made, it will be evaluated in the results column.</div>
            <div>B means you have a right digit in the right place.</div>
            <div>C means you have a right digit in the wrong place.</div>
            <div>You have 8 attempts</div>
            <div>Good Luck!</div>
            <h2>{state.error}</h2>
            <div>
                <div>
                    <span><input value={state.guess} type="text" onChange={addGuess} onKeyPress={keyPressed} /></span>
                    <span><center><button onClick={userInput}>Guess!</button></center></span>
                </div>
                <center>
                    <UpdateTable></UpdateTable>
                </center>
                <div>
                    <center><button onClick={restart}>Restart</button></center>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);