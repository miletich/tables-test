# Tables FE Test

## Running the project

`yarn install`

`yarn start`

`yarn build`

or:

`npm install`

`npm start`

`npm run build`

## Comments

Note that everything is uglyfied and minified (Webpack 4 does that out-of-box). The code is AirBnB style guide compliant, and everything is autoformatted by `prettier`. I've only used dependencies I was instructed to use and those that were absolutely necessary. Also, multiple filters can be used together, while textual searches are case and "accented" charter insensitive.

In a real-world project, I would have:

* Coded more defensively to allow for API errors and inconsistencies. Here, this was not an issue.
* Written tests.
* Used my favourite JS library - `redux` to:
  * Capture API-related side-effects, thus keeping the React part of the app as pure as possible.
  * Avoid passing `props` more than one level down the component tree. This terrible for both performance and maintainability of the app. The only alternative - React's Context API - is still considered unstable, though that will change within a few days/weeks, when React 16.3 is out.
  * Normalise the state. This is by far the biggest win enabled by `redux` both in terms of performance and maintainability, as it ensures many of the best practices. It guarantees single source of truth (in the store), minimal state (in components and containers), and is particularity great for a team with many junior developers since it makes writing low quality code much harder than the alternative.
* Used `recompose` and `reselect`, again to achieve greater performance and code quality. `reselect` comes with memoisation out of box, while `recompose`'s eager approach to component rendering reduces the performance overhead of using many higher-order components. Together, they allow for highly maintainable and readable codebase where it's possible to set the linting rule that no component or container should exceed 50 lines of code.
