# Elixir functions
defmodule BullsWeb.Game do
    # Sets the state based on the single state from the app.js
    def new do
        %{
            attempts: 7,
            guess: "",
            guesses: [],
            results: [],
            randCombo: secret(MapSet.new([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), ""),
            status: false,
            error: ""
        }
    end

    # Creates the secret code
    def secret(set, result) do
        cond do
            String.length(result) == 4 ->
                result
            true ->
                rand = Enum.random(set)
                set = MapSet.delete(set, rand)
                result = result <> Integer.to_string(rand)
                secret(set, result)
        end
    end

    # Shows what the state currently looks like to user
    def view(state) do
        %{
            attempts: state.attempts,
            guess: state.guess,
            guesses: state.guesses,
            results: state.results,
            error: state.error,
        }
    end

    # Checks whether the input is valid
    def checkGuess(state, guess) do
        guessArr = String.split(guess, "", trim: true)
        cond do
            length(guessArr) > 4 ->
                %{state | error: "Guess can only be 4 digits"}
            String.match?(guess, ~r/[^\d]/) ->
                %{state | error: "Guess is only made up of 4 numbers"}
            MapSet.size(MapSet.new(guessArr)) != length(guessArr) ->
                %{state | error: "Guess is 4 unique digits"}
            true ->
                %{state | guess: guess}
        end
    end

    # Takes in the user's input and adds it to the game state
    def eval(state, guess) do
        if String.length(guess) == 4 do
            result = getResult(state.randCombo, state.guess, 0, 0, 0)
            state1 = %{ state | 
                guess: "",
                attempts: state.attempts - 1,
                guesses: state.guesses ++ [guess],
                results: state.results ++ [result]
            }
            cond do
                state.randCombo == guess -> %{state1 | error: "You won", status: true}
                state.attempts == 0 -> %{state1 | error: "You lost", status: true}
                true ->
                    state1
            end
        else
            state
        end
    end

    # Returns the cow and bull result
    def getResult(randCombo, guess, index, bulls, cows) do
        guesses = String.split(guess, "")
        answers = String.split(randCombo, "")
        if (index < 4) do
            cond do
                Enum.at(guesses, index) == Enum.at(answers, index) ->
                    getResult(randCombo, guess, index+1, bulls+1, cows)
                Enum.member?(answers, Enum.at(guesses, index)) ->
                    getResult(randCombo, guess, index+1, bulls, cows+1)
                true ->
                    getResult(randCombo, guess, index+1, bulls, cows)
            end
        else
            Integer.to_string(bulls) <> "B" <> Integer.to_string(cows) <> "C"            
        end
    end

    # Returns status of game
    def status(state) do
        state.status
    end
end