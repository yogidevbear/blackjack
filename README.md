# Blackjack Card Game

Let's play! This is a Blackjack 21 app, written using a mixture of OOP JavaScript and React for some of the rendering. I have made the choice in the code to use a HTML string literals approach for rendering some portions of the UI as a trade-off to minimise some of the complexity that resulted when using the OOP classes alongside React methods like `useState()` and `useEffect()`.

## The Rules of Blackjack

- Blackjack hands are scored by their point total.
- The hand with the highest total wins, if it doesn't exceed 21. A hand with a higher total than 21 is considered a bust.
- Cards numbered 2 through 10 are worth their face value.
- Face cards (jack, queen, king) are each worth 10 points.
- An ace can be worth 11 points if it doesn't cause the player to bust. If it would cause a bust, it is worth 1 point.

## Requirements

Create a simple user interface (UI) for the game. The UI should allow the player to:

- Start a new game.
- See their current hand and point total.
- Draw additional cards (Hit) or end their turn (Stand).
- Display the dealer's hand, keeping one card hidden (the hole card).
- Announce the winner (player or dealer) at the end of the game.
- Implement a service or backend logic to support the game. This includes the game rules, scoring, and the reason for determining the winner.
- Write tests to ensure the functionality of your code. Test coverage is essential.
- Create clean and maintainable code focusing on object-oriented programming (OOP) principles.
- Use proper code organisation and comments to make your code easy to understand.

## Available Scripts

In the project directory, you must run:

### `npm install`

This will ensure that all package dependencies needed to run, test and build the app are downloaded from the internet first.

Once done, you can run any of the following commands:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner to run unit tests with Jest, as well as React testing-library Jest tests for the UI. 

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

You can check that the build works locally by starting a local Python server in the `/build/` directory.\
For example: `cd build && python3 -m http.server`\
Then open [http://localhost:8000](http://localhost:8000) in your browser

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Credits

I made use of the following resource for the card images used in the game: [Tek Eye: SVG Playing Cards, A Public Domain Full Deck](https://tekeye.uk/playing_cards/svg-playing-cards)
