# Hello Vue.js

This monorepo contains multiple workshops and packages related to `Vue.js` development. It
is designed to help me learn and practice various aspects of `Vue.js`, including component
development, state management, and unit testing.

These workshops come from an **Udemy** course by Fernando Herrera called "[Vue.js: De cero
a experto](https://viewnext.udemy.com/course/vuejs-fh)". This course covers everything
from the basics of `Vue.js` to advanced topics. The professor's GitHub page is
[https://github.com/Klerith](https://github.com/Klerith).

## Structure

The monorepo is organized into the following directories:

- **packages/**: Shared packages used across different workshops.
- **workshops/**: Individual workshop that demonstrates the use of `composables`,
  `components`, and `unit testing` with `Vitest`.

## Technologies Used

- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for
  modern web projects.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vitest**: A Vite-native testing framework.

## Getting Started

To get started with this monorepo, follow these steps:

1. **Install dependencies**:

    ```sh
    npm install
    ```

1. **Navigate to a workshop directory**:

    ```sh
    cd workshops/<project-name>
    ```

1. **Run the development server**:

    ```sh
    npm run dev
    ```

1. **Build the project**:

    ```sh
    npm run build
    ```

1. **Run unit tests**:

    ```sh
    npm run test
    ```

## Contribute

If you notice any mistakes or have suggestions, I'm all ears! I appreciate any feedback so
don't hesitate to [open an Issue on
GitHub](https://github.com/pablocru/hello-vuejs/issues) or submit a `Pull Request`.

### Contribution Guidelines

1. `Fork` the repository and make your changes in a `new branch`.
1. Document your additions.
1. Use [Conventional Commits](https://www.conventionalcommits.org).
1. Submit a `Pull Request` with a clear description of your changes.

Thank you for helping improve this project!
