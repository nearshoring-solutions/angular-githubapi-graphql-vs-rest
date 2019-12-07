# Angular GitHub API - GraphQL vs REST

Playground to compare GitHub API v3 vs GitHub GraphQL API.

## Environments

In order to run the app, you will need to add the environments files. They are not added to the repository in order to not share any secret data. In the `src/` folder create a new folder named `environments`. Then add this code to them, replacing it with the corresponding data.

````
export const environment = {
  production: false,
  githubToken: '{YOUR-GITHUB-TOKEN}',
  graphApiUri: 'https://api.github.com/graphql',
  restApiUri: ' https://api.github.com',
  useGraphQl: true
};
````
## Changing API

Changing the API (from GraphQL to v3) go to `src/environments/environment.ts`, or `src/environments/environment.prod.ts` for production, and change the `useGraphQl` property.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
