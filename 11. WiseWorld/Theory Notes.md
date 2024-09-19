# Vite App Setup and ESLint Configuration

## Step 1: Install Node.js

Ensure Node.js is installed on your system. If it's not, download and install it from the official Node.js website. Once installed, verify by running the appropriate command to check the Node version.

```bash
node -v
```

## Step 2: Create a New Vite Project

- To create a new Vite project, use the command that initializes the Vite project.

```bash
npm create vite@latest
```

- Follow the prompts to name your project and choose the desired framework, such as React, Vue, or others.

- Once the project is created, navigate into the project folder and install dependencies.

```bash
cd your-project-name
npm install
```

## Step 3: Run the Vite Development Server

Start the Vite development server to verify that your setup works. Vite will start a local server, and you'll be able to view your project in the browser.

```bash
npm run dev
```

---

# ESLint Setup for Vite Project

## Step 4: Install ESLint and Necessary Plugins

To ensure code quality and catch potential issues, install ESLint along with the necessary plugins and configuration for your Vite project. Use a command to install `eslint`, `vite-plugin-eslint`, and `eslint-config-react-app` as development dependencies.

```bash
npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

## Step 5: Configure ESLint in the `.eslintrc.json` File

Once ESLint is installed, you need to configure it. In your ESLint configuration file (`.eslintrc.json`), extend the configuration by adding the recommended ESLint rules for React, ensuring your project follows best practices for React code.

```jsx
{
  "extends": "react-app"
}
```

## Step 6: Modify Vite Configuration

To integrate ESLint into the Vite build process, edit the Vite configuration file (`vite.config.js`). In the `plugins` array, add the `eslint` plugin alongside the default plugin for the chosen framework (such as React). This ensures that ESLint runs during development.

```jsx
export default defineConfig({
  plugins: [react(), eslint()],
});
```

## Step 7: Run ESLint

After configuring ESLint, you can manually run it on your project to check for any linting errors or warnings. This will help maintain code quality by following the set linting rules.

## React Router Integration Summary

### Introduction to React Router

- This section covers React Router and its role in single-page applications.

### What is Routing?

- Routing matches different URLs to different views in a web application.
- In React, each URL is matched to a specific React component, called a route.
- When a URL is visited, the corresponding React component is rendered.

### Examples of Routing

- For instance, visiting `example.com` might render a homepage component, while `/login` would render a login component.
- After logging in, the user might be redirected to `/app` to show the app screen.
- This setup enables users to navigate between different screens using links and URLs, keeping the UI in sync with the current browser URL.

### Client-Side vs Server-Side Routing

- The described routing works on the client side (in the browser) rather than on the server side.
- Most front-end frameworks have client-side routing built-in, but React relies on third-party packages for this functionality.

### React Router Package

- React Router is a third-party package used for routing in React applications.
- It is one of the most important and widely used libraries for React.

### Single-Page Applications (SPAs)

- SPAs are web applications that operate entirely on the client side, without reloading the page.
- They rely on routes to change views without a full page reload, providing a seamless user experience similar to native applications.

### How SPAs Work

- Clicking a link in an SPA changes the URL
- triggers the DOM update via JavaScript.
- The page updates without a complete reload, providing a smoother user experience.

### External Data and Communication

- SPAs can fetch additional data from servers using web APIs, but they do not load completely new pages.
- If they load a completely new page they dont remain a SPA
- React apps are inherently SPAs because they do not reload the entire page.
