This project was bootstrapped with [Create React App with Cypress TypeScript](https://github.com/cypress-io/cra-template-cypress-typescript).

## Developer notes

### Time spent

I spent around 4.5 hours on this in total

### Run steps

This uses create-react-app and steps are outlined below

For brevity:

```shell
npm i && npm run dev
```

### Assumptions

- Targeting modern browsers
- Persistence not required (across refreshes or similar)

### Technical design

- Used a simple React SPA as recommended by the requirements
- Used a reducer to manage the state in memory as it provides a predictable way to update the state
- Used a single during development for speed and planned to break it down once it became large (~200 lines)
- Used a simple css framework to reduce time spent on trivial styling

### Notes

- First story didn't follow YAGNI: the requirements mentioned todo data that couldn't be rendered to the screen. Would have likely either included an example todo, instead of an empty list, or included the todo statuses as part of the 2nd story. For this reason, I didn't included any tests for the todo statuses or rendering of todos for this story as there wasn't any way to accomplish/test this via the UI.
- Ran out of time to add test coverage for the last story
- Considered redux as I'm aware NovaFori use it, but the requirement of limiting libs meant I went with react only
- Would normally use something like immer or immutablejs to ensure immutability when updating the reducer

### Outstanding

- Break down Todos component
- Add test coverage for:
- toggle todo state
- grouping of todos
- Add axe accessiblity tool
- Update packages as cra template is a little out of date and getting a warning in jest tests

### Possible next steps

- Edit todos
- Delete todos
- Add date created
- Add tabs for status groups

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm cy:open`

Opens the Cypress GUI

### `npm cy:run`

Runs Cypress CLI

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
