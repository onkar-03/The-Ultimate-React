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

## Implementing React Router

### Installation Steps

1. **Open Terminal or Command Prompt**

   - Navigate to your project directory where you want to install the package using `cd` command.

2. **Install `react-router-dom`**

   - Run the following command to install `react-router-dom` using npm:
     ```bash
     npm install react-router-dom
     ```

3. **Verify Installation**

   - Once installed, you should see `react-router-dom` listed in your `package.json` file under `dependencies`.

### Creating Page Components

- Create a folder named `pages` to organize your page components.
- Example components to create:
  - `Product`
  - `Homepage`
  - `Pricing`
- These components represent different pages in your application.

### Defining Routes

- Import necessary components from `react-router-dom`.
- Use `BrowserRouter` to wrap your application and enable routing.
- Define routes using the `Routes` component, specifying each route with `Route`.

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

### Route Configuration

- **Configure routes** by specifying the URL (`path`) and the component (`element`) to render for each path.
  - **`path`**: Defines the URL path for which the route should render the component.
  - **`element`**: Specifies the React component to render when the URL matches the `path`.

### Understanding Route Matching

- **React Router** matches the URL to the defined routes and renders the corresponding component.

  - **`/` (Home Page Route)**:

    - Matches the root URL of the application (e.g., `http://example.com/`).
    - Typically renders the main or `Home` Page of the site.

  - **`/product`**:

    - Matches the URL for the product page (e.g., `http://example.com/product`).
    - Renders the `Product` component, which displays information related to products.

  - **`/pricing`**:

    - Matches the URL for the pricing page (e.g., `http://example.com/pricing`).
    - Renders the `Pricing` component, which provides details about pricing plans or options.

  - **`*` (Page Not Found Route)**:
    - Acts as a catch-all for any URL that doesn't match the other defined routes.
    - Used to display a `Page Not Found` or `404 error page` for unmatched URLs.

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Rendering Based on URL

1. **URL Navigation**:

   - React Router checks the current URL and compares it with the `path` values defined in the `Route` components.

2. **Component Rendering**:
   - When a URL matches a specified `path`, the corresponding `element` (component) for that route is displayed.
   - If no routes match the URL, the wildcard route (`path='*'`) is used to render a fallback component, such as a "Page Not Found" or 404 error page.

#### Examples:

- Navigating to `/` will display the `Home` component.
- Navigating to `/product` will display the `Product` component.

## Linking Between Routes in React Router

### Step 1: Adding Links to the Homepage

#### Creating an Anchor Element

To create a link to the pricing page on our homepage:

1. Wrap the link in an `<h1>` tag for styling.
2. Create an anchor element (`<a>`) with the `href` attribute pointing to the `/pricing` route.

```jsx
<h1>
  Welcome to Our App
  <a href='/pricing'>Pricing</a>
</h1>
```

#### Observing the Page Reload

When clicking the link, the page will reload, which is not the desired behavior for an SPA. We want seamless transitions between pages without reloading.

### Step 2: Using React Router's Link Component

#### Importing the Link Component

- Instead of using a traditional anchor element, we will use the `<Link/>` component provided by `react-router-dom`.

1. Import the Link component:

```jsx
import { Link } from 'react-router-dom';
```

2. Replace the anchor element: Use the to prop to specify the route.

- The Root path contains just `/`
- Other Pages go through the Root page and hence have a `/` at the start of there link

```jsx
<h1>
  Welcome to Our App
  <Link to='/pricing'>Pricing</Link>
</h1>
```

#### Behavior of the Link Component

When using the Link component the application navigates to the `/pricing` page without a full page reload. The DOM content is updated seamlessly, maintaining the SPA experience.

### Step 3: Implementing Navigation Across Pages

#### Creating a Navigation Component

- To allow navigation between multiple pages, we'll create a reusable navigation component say `PageNav`.

1. Create a folder called components.
2. Inside this folder, create a PageNav.jsx component.

```jsx
import { Link } from 'react-router-dom';

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pricing'>Pricing</Link>
        </li>
        <li>
          <Link to='/product'>Product</Link>
        </li>
      </ul>
    </nav>
  );
}
```

#### Including the Navigation Component

Integrate the PageNav component in each page (e.g., Home, Pricing, Product) to enable navigation.

```jsx
import PageNav from './components/PageNav';
```

### Advantages of Using NavLink Instead of Link

- The NavLink component automatically applies an active class to the link when its route matches the current URL.
- This is useful for highlighting the active page in navigation menus.
- It allows for more customizable styling based on the active state, improving user experience by providing clear visual feedback on which page is currently active
- So instead of using <Link></Link> we can use <NavLink><NavLink/> for our Navigation page component

```jsx
import { Link } from 'react-router-dom';

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

### Relative vs. Absolute Paths

#### Understanding Paths in React Router

When defining routes and links in React Router, it's essential to understand the difference between relative and absolute paths:

1. **Absolute Paths**:

   - Absolute paths start with a `/` and refer to a specific location from the root of the application.
   - They are useful when you want to link to a specific route from anywhere in the application.
   - For example, linking to `/pricing` will always navigate to the `/pricing` route, regardless of the current URL.

   ```jsx
   <Link to='/pricing'>Pricing</Link>
   ```

2. **Relative Paths**:

   - Relative paths do not start with a `/` and are resolved based on the current URL's context.
   - They are particularly useful for nested routes, allowing you to avoid repeating the base path.
   - For instance, if the current route is `/app`, linking to `product` will resolve to `/app/product`. If the current route is `/`, it will resolve to `/product`.

   ```jsx
   <NavLink to='product'>Product</NavLink>
   ```

#### When to Use Each Type of Path

- **Use Absolute Paths**:

  - When you need to link to a route from anywhere in the app.
  - When linking from components that may not have a consistent route context (e.g., from a footer or modal).

- **Use Relative Paths**:
  - When working with nested routes, as they make your code cleaner and reduce repetition.
  - When you're certain of the current route context and want to link to sibling routes.

### Summary

- We transformed traditional anchor elements into React Router Link components to avoid page reloads.
- A reusable navigation component was created to allow seamless transitions between pages.
- This setup enhances user experience by making the application feel like a single cohesive unit.

## Styling React Applications

### 1. Global External CSS

- **What it is**: Traditional CSS file linked to the app, where you use classes in JSX.
- **Pros**:
  - Simple and well-understood.
- **Cons**:
  - Styles are global, leading to potential conflicts across components in larger apps.

### 2. Inline CSS

- **What it is**: Styles are applied directly to JSX elements using the `style` prop.
- **Pros**:
  - Scoped to individual elements, reducing conflicts.
- **Cons**:
  - Not ideal for complex styles.
  - Lacks flexibility for large-scale styling.

### 3. CSS Modules

- **What it is**: Scoped CSS that applies only to a specific component by naming styles uniquely.
- **Pros**:
  - Prevents global conflicts.
  - Makes components more modular.
- **Cons**:
  - Requires slightly more setup compared to traditional CSS.

### 4. CSS-in-JavaScript (Styled Components)

- **What it is**: Write CSS directly in JavaScript files. Styles can be defined and used as React components.
- **Pros**:
  - Promotes a true modular approach by keeping styles within the component.
- **Cons**:
  - Adds additional complexity due to JavaScript-heavy styles.

### 5. Utility-First CSS (Tailwind CSS)

- **What it is**: Use predefined utility classes in JSX to style components directly.
- **Pros**:
  - Fast and efficient.
  - No need to write custom CSS, reducing bloat.
- **Cons**:
  - Steep learning curve for utility classes.
  - JSX can become cluttered with multiple classes.

### 6. Component Libraries (e.g., Material UI etc...)

- **What it is**: Use pre-built, styled components for faster development.
- **Pros**:
  - No need to write custom CSS.
  - Provides consistent UI components.
- **Cons**:
  - Limited customization options.
  - Not ideal for learning core CSS concepts.

## CSS Modules and Global CSS Summary Notes

### Problem with Global CSS

- Global CSS can lead to conflicts due to the cascade effect, where styles can unintentionally affect other elements in the application.
- Naming collisions occur when multiple components use the same class names, leading to unpredictable styling results.

### How CSS Modules Solve These Problems

- CSS Modules scope styles locally by generating unique class names. This prevents naming collisions and ensures that styles applied to one component do not affect others.
- This encapsulation helps maintain clean and manageable styles in large applications.

CSS Module:

```jsx
.nav{
  color:red;
}
```

Generated Class Name by React: (Using Hex Code)

```jsx
<button className='_nav_uue12_25'>
```

### How to Name CSS Modules

- Use the `.module.css` extension for CSS files to indicate that they are CSS Modules.
- Follow a consistent naming convention, such as `ComponentName.module.css`, to keep styles organized and easily identifiable.
  EG: `PageNav.jsx` will have CSS Module File as `PaveNav.module.css`

### Styling in CSS Modules

- CSS Modules allow you to define styles normally but ensure they are scoped to the component level.
- You can use standard CSS features such as nested rules, pseudo-classes, and media queries.

### Why Not to Use Generic Element Selectors

- Generic selectors (like div, h1, etc.) apply styles globally and can lead to unintended styling effects across different components.
- They reduce modularity and make it harder to manage styles as the application grows.

### Importing CSS Modules

- Import CSS Modules in your components using the following syntax:
  ```javascript
  import styles from './ComponentName.module.css';
  ```
- This import assigns the scoped styles to the styles object, which can be used to apply styles to elements

### How to Use the Styles Import to Style Component Elements

- Use the imported styles object to apply styles to elements:

  ```jsx
  <div className={styles.className}></div>
  ```

- This method ensures that the correct scoped class name is applied to the element, avoiding conflicts with other styles.

### What Global CSS is Included For

- Global CSS is generally used for base styles, typography, and styles that need to be consistent across the entire application.
- It is helpful for defining styles for elements that don't require scoping, such as body styles or resets.

### How to Create Own Global CSS Using :global() in CSS Modules

- You can define global styles within a CSS Module using the :global() pseudo-class:

  ```jsx
  :global .globalClass {
      color: red;
  }
  ```

- This allows you to apply styles globally while still using CSS Modules for component-specific styles.

### Why Use Global CSS for Active Class Added by NavLink Route

- Global CSS is useful for applying styles to active classes added by routing libraries like React Router.
- It ensures that the active state of navigation links is consistently styled across the application, enhancing user experience.

```jsx
.nav :global(.active) {
  background-color: green;
}
```
