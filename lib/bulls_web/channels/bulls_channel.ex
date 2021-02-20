# Game channel for the bulls game
defmodule BullsWeb.BullsChannel do
  use BullsWeb, :channel

  # Sets up the new state
  # TAKEN FROM PROF TUCK SCRATCH REPO :)
  @impl true
  def join("game:" <> _id, payload, socket) do
    if authorized?(payload) do
      game = BullsWeb.Game.new
      socket = assign(socket, :game, game)
      view = BullsWeb.Game.view(game)
      {:ok, view, socket}
    end
  end

  # Handles "guess" and updates game state
  # TAKEN FROM PROF TUCK SCRATCH REPO :)
  @impl true
  def handle_in("guess", %{"guess" => guess}, socket) do
    game0 = socket.assigns[:game]
    # If the game is still going on, do the following steps
    if (!BullsWeb.Game.status(game0)) do
      game1 = BullsWeb.Game.checkGuess(game0, guess)
      game2 = BullsWeb.Game.eval(game1, guess)
      view = BullsWeb.Game.view(game2)
      socket1 = assign(socket, :game, game2)
      {:reply, {:ok, view}, socket1}
    end
  end

  # Evaluates the user's valid guess and returns a new view
  @impl true
  def handle_in("display", %{"display" => display}, socket) do
    game0 = socket.assigns[:game]
    game1 = BullsWeb.Game.checkGuess(game0, display)
    view = BullsWeb.Game.view(game1)
    {:reply, {:ok, view}, socket}
  end

  # Restarts the web site
  # TAKEN FROM PROF TUCK SCRATCH REPO :)
  @impl true
  def handle_in("reset", _, socket) do
    game = BullsWeb.Game.new()
    socket1 = assign(socket, :game, game)
    view = BullsWeb.Game.view(game)
    {:reply, {:ok, view}, socket1}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end