import { Socket } from "phoenix"
let socket = new Socket("/socket", { params: { token: "" } })
socket.connect()

// Channel for game
let channel = socket.channel("game:1", {})

// State for the user
let state = {
  attempts: 8,
  guess: "",
  guesses: [],
  results: [],
  error: ""
};

let callback = null;

// The server sent us a new state.
// TAKEN FROM PROF TUCK SCRATCH REPO :)
function state_update(st) {
  console.log("New state", st);
  state = st;
  if (callback) {
    callback(st);
  }
}

// TAKEN FROM PROF TUCK SCRATCH REPO :)
export function ch_join(cb) {
  callback = cb;
  callback(state);
}

// TAKEN FROM PROF TUCK SCRATCH REPO :)
export function ch_push(guess) {
  channel.push("guess", { guess: guess })
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    })
}

// Evaluates the user's valid guess and returns a new view
// TAKEN FROM PROF TUCK SCRATCH REPO :)
export function ch_display(display = "temp") {
  channel.push("display", { display: display })
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to display", resp)
    });
}

// Handles "guess" and updates game state
// TAKEN FROM PROF TUCK SCRATCH REPO :)
export function ch_reset() {
  channel.push("reset", {})
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to reset", resp)
    });
}

// Now that you are connected, you can join channels with a topic:
channel.join()
  .receive("ok", state_update)
  .receive("error", resp => {
    console.log("Unable to join", resp)
  });

export default socket;