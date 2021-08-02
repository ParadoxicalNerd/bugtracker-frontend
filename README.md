# bugtracker-frontend

Empty project.

TODO: Use cookie to manage user state

TODO: Redirect all requests to user auth

1. Convert all <Link> component to on Formsubmit as seen in TicketEditorView

2. Export as excel

3. Integration in and integration out -> Prisma

4. Pivot Table

5. Export as reports

6. Filtering data

7. Success Ratio

8. User info by management

9. Either turn all controller exports to *accesors or *query

## Tooling

-   GraphQL : When I initially tried this project, I had a very hard time figuring out which api's did I need to create. No amount of planning helped me prepare for the problems I faced when building the frontend (aka over and under info). I finally got too sick of it so I'm gonna try GraphQL this time

-   Urql : Apollo client seemed to be throwing a lot of unnecessary warnings in the developer console regarding the fact that it could not fetch certain files. This made it hard to focus on what actually needed debugging. Therefore I switched over to the lighter weight Urql library and the experience has been better

-   Chart.js : I'm not super comfortable with charting, graphing and such. I really like Chart.js's declerative way defining chat properties upfront

-   React Router : I've wanted to build an SPA since quite some time and this allows me to do it without worrying about a lot of the route handling.

-   NO Redux (yet) : When originally planning this project, I was thinking of using redux. But as I've been implementing it, I realized that my interface does not really need any complex state management. Just some global variables which I plan to be passing React Context. If I later do need to use state mangement, I wanna try my hand at something else too

-   React Bootstrap : Cause I suck at SCSS and this makes my job a billion times easier

-   Preact? : So tihs is a maybe but later I plan to drop this in as an alternative to react. Could be fun

-   Nextjs? : Okay, so I'm just spitballing here, but why not? If I'm already going crazy, I'd better go all the way

Webpack Config for dotenv: https://www.npmjs.com/package/dotenv-webpack

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
