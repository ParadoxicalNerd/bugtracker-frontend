# bugtracker-frontend

Empty project.

Change '/' route to '/home' so that all logins are correctly forwarded to the backend

# TODO

1. Convert all <Link> component to on Formsubmit as seen in TicketEditorView

2. Export as excel

3. Integration in and integration out -> Prisma

4. Pivot Table

5. Export as reports

6. Filtering data

7. Success Ratio

8. User info by management

9. Either turn all controller exports to *accesors or *query

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Running

Open the file `dist/index.html` in your browser

## Credits

Made with [createapp.dev](https://createapp.dev/)

## Tooling

-   GraphQL : When I initially tried this project, I had a very hard time figuring out which api's did I need to create. No amount of planning helped me prepare for the problems I faced when building the frontend (aka over and under info). I finally got too sick of it so I'm gonna try GraphQL this time

-   Urql : Apollo client seemed to be throwing a lot of unnecessary warnings in the developer console regarding the fact that it could not fetch certain files. This made it hard to focus on what actually needed debugging. Therefore I switched over to the lighter weight Urql library and the experience has been better

-   Chart.js : I'm not super comfortable with charting, graphing and such. I really like Chart.js's declerative way defining chat properties upfront

-   React Router : I've wanted to build an SPA since quite some time and this allows me to do it without worrying about a lot of the route handling.

-   NO Redux (yet) : When originally planning this project, I was thinking of using redux. But as I've been implementing it, I realized that my interface does not really need any complex state management. Just some global variables which I plan to be passing React Context. If I later do need to use state mangement, I wanna try my hand at something else too

-   React Bootstrap : Cause I suck at SCSS and this makes my job a billion times easier

-   Preact? : So tihs is a maybe but later I plan to drop this in as an alternative to react. Could be fun

-   Nextjs? : Okay, so I'm just spitballing here, but why not? If I'm already going crazy, I'd better go all the way
