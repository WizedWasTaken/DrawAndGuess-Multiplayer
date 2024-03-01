# Todo List for the "Draw and guess" multiplayer, browser-based game. 💪🏿💪🏿

## Client / Server

- **Start game feature** 🚀

  - Add a button in the lobby menu to start the game.
  - Only the host 👑 can start the game.
  - Minimum 3 players required to start the game. 👥👥👥

- **Kick players** 👢

  - Allow the host 👑 to kick players from the game.
  - Ensure a nice and fabulous user experience. 🌈💅🏼

- **Delete message** ❌

  - Rework the "messages" logic to support message deletion.
  - Evaluate the necessity of this feature. 👀

- **Account System** 📝

  - Create a new account ✨
    - Collect username, password, and IP.
  - Log in to an existing account 🔒
    - Collect username, password, and IP.
    - Enhance security by checking for IP differences on login.
      - If different, ask for OTP (research the ability to use Authy, Google Auth, etc.)

- **Implement chat feature** 💬 (✅ **Finished**)

  - Allow players to communicate during the game.
  - Display messages in real-time.
  - Add support for emojis. 😄🎉🔥🤣

- **Implement scoring system** 🏆

  - Assign points to players based on their performance.
  - Display a leaderboard at the end of each game.

- **Implement drawing tools** 🖌️

  - Allow players to draw on the canvas. (✅ **Finished**)
    - Create a component with props:
      - Multiplayer (defines if the canvas drawings on the client should show to other players)
      - Drawable (determines if the canvas should be drawable or just viewable)
      - ShowControls (controls visibility for the user)
        - Evaluate if Drawable should be possible without ShowControls.
  - Provide a variety of colors and brush sizes.
    - Implement color changing. (✅ **Finished**)
    - Explore adding different brushes.

- **Implement guessing mechanism** ❓

  - Enable players to guess the drawn word.
  - Validate guesses and award points accordingly.
    - Consider reducing points for each wrong guess.

- **Implement game timer** ⏰

  - Set a time limit for each round.
    - Allow host to adjust round duration in game settings.
  - Notify players when time is running out.
    - Explore alternative UX options instead of a loading bar.

- **Implement game settings** ⚙️
  - **Allow customization of game parameters.**
    - Determine which game parameters to include.
  - Provide options to adjust round duration, word difficulty, etc.
    - Consider allowing the host to add custom words.
      - Decide if custom words should overwrite the "normal" words used in the game. (skribbl.io)

## Client

- **Redesign**

  - Update color scheme.
    - Use variables for colors throughout the code.
    - Brighten and make colors more engaging.
    - Consider adding color customization feature.
  - Improve UI/UX.
    - Make the interface less blocky and sharp.
      - Add rounded corners for a more visually appealing look.
    - Enhance clarity for potentially confusing aspects of the app.

- **Code Comments**

  - Add comprehensive code comments to each component/view.
  - Use JSDoc for code comments.
    - Assume the developer has the "Better Comments" VS Code extension for enhanced comment formatting (e.g., "TODO:", "!").

- **Clean up code**
  - Organize and refactor messy code.
  - Create reusable components for relevant code sections (e.g., Button component).
    - Move reusable components to a separate components folder.
      - Commit the reusable components to GitHub for potential use in other projects.
    - Ensure reusable components have customizable props with default values.

## Server

- **Code Comments**

  - Add comprehensive code comments to each component/view.
  - Use JSDoc for code comments.
    - Assume the developer has the "Better Comments" VS Code extension for enhanced comment formatting (e.g., "TODO:", "!").

- **Clean up code**
  - Organize and refactor messy code.

## General

- **Add more TODO points** 📝
  - Identify additional tasks and add them to the TODO list.
  - Clearly explain the purpose and requirements of each new task.
  - Have fun while doing it! 😄🎉🔥🤣🚀💪🏿💅🏼🌈⚙️🖌️🏆❓⏰
- Look into adding automated JSDoc
  - Is this effective
    - https://github.com/jsdoc/jsdoc
    - https://medium.com/@kevinast/integrate-gitbook-jsdoc-974be8df6fb3
      - Does this work with Vue???
  - Is it possible with Vue and TypeScript?
