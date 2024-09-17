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
