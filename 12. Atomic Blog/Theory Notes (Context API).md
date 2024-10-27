# Context API in React

## What is the Context API?

The **Context API** in React is a system that allows us to pass data throughout an application (to deeply nested child components) without having to manually pass props down the component tree.

It essentially provides a way to broadcast global state that should be available to child components of a certain context.

### The Problem It Solves: Prop Drilling

Prop drilling is the issue that arises when we need to pass state through multiple levels of a component tree, just to make it available to deeply nested components. This can make the code cumbersome and inconvenient to manage.

Example problem:

- Suppose components `B` and `F` both need access to a state variable, such as `count`. Without the Context API, we would have to pass this `count` prop down from a parent to all the intermediary components until it reaches `B` and `F`.
- EG:
  A
  / \
  B C
  / \
  D E
  /
  F

### Context API to the Rescue

Instead of prop drilling, the **Context API** allows for direct passing of state from a parent component to deeply nested child components, without the need to manually pass the props at each level.

### Key Components of the Context API

1. **Provider**:

   - The `Provider` is a special React component that gives child components access to a shared value, which is typically a state variable or functions.
   - The `Provider` is usually placed at the top of the component tree, but can be placed anywhere.

2. **Value**:

   - This is the data (such as state) that we want to provide to child components. The `Provider` broadcasts this value to its descendants.
   - Generally its an Object which contains all the values we want the child components to have

3. **Consumers**:
   - These are the components that subscribe to the context and can read the value provided by the `Provider`.
   - A component subscribed to a context becomes a **consumer** and can access the shared state.

### Re-rendering with the Context API

- When the context value (state) changes, all (consumer) components that are consuming that context will automatically re-render .
- This makes it a powerful tool for managing state updates across multiple components.
- When value changes the Provider tells the consumer about value change adn re renders the consumers

### Benefits of the Context API

- Solves the prop drilling problem by allowing state to be shared across many levels of components.
- Provides flexibility to create as many contexts as needed, and to place them at different locations in the component tree.

## Steps for Using Context API to Pass Props to Child Components

### Step 1: Create a New Context

- First, you need to create a context using the `createContext` function. This establishes a "Context" that you can use to share values across multiple components without passing props down manually at every level.

- The var 'PostContext' is in uppercase because its a component and the components are declared using Uppercase letters

```jsx
import { createContext } from 'react';

// Create a new context to store Pots Information
export const PostContext = createContext();
```

### Step 2: Provide Values to Child Components

- To make the values available to all child components, use the `Provider` component from the created context. Inside the `Provider`, declare the `value` prop, which holds the data and functions you want the child components to access.

- The `value` prop accepts an object where you list the values.

```jsx
<PostContext.Provider
  value={{
    posts: searchedPosts, // Data (array of posts)
    onAddPosts: handleAddPost, // Function to add new posts
    onClearPosts: handleClearPosts, // Function to clear posts
    searchQuery, // Search query string
    setSearchQuery, // Function to update search query
  }}
>
  {/* Components */}
  <ComponentA /> {/* Can access context values as consumers */}
  <ComponentB /> {/* Can access context values as consumers */}
  <ComponentC /> {/* Can access context values as consumers */}
  <ComponentD /> {/* Can access context values as consumers */}
</PostContext.Provider>
```

**In this example**, the **value** object contains the following props, which are made available to all child components wrapped within the `Provider`:

- Each component (ComponentA, ComponentB, ComponentC, and ComponentD) wrapped inside the PostContext.Provider can access the values provided through the context (such as posts, onAddPosts, searchQuery, etc.) as consumers
- **`posts`**
- **`onAddPosts`**
- **`onClearPosts`**
- **`searchQuery`**
- **`setSearchQuery`**

**IMPORTANT**: _We can use different contexts for handling different things; for instance, we could have one context for managing posts and another for handling search queries. However, in this example, we are learning how to use the Context API, so we consolidate everything into one context_.

### Step 3: Consuming Context in React

#### Key Steps

- The context provider and its value are established.
- The next step is to consume the context value across different components.

##### 1. Importing useContext Hook

- The `useContext` hook from React is introduced.
- This hook allows components to subscribe to React context without manually using the `Context.Consumer` component.
- The entire context object is passed into `useContext`, returning the context value.

```jsx
import { createContext, useContext, useEffect, useState }
```

##### 2. Accessing Context Values for different Components

###### Header Component

- The `Header` component requires the `onClearPosts` function, which is now accessed from the context.
- The context value, which includes necessary functions and data, is destructured for use in the component:

  ```jsx
  // The Header component needs the onClearPosts prop, hence we read it from the PostContext (Provider) we created using the useContext() Hook
  // The PostContext returns the exact Object that we described in it hence we destructure it and use what is required for different components
  const { onClearPosts } = useContext(PostContext);
  ```

###### SearchPosts Component

The `SearchPosts` component requires access to the `searchQuery` and `setSearchQuery` function to manage its internal state.

- Instead of passing these props down from a parent component, the `SearchPosts` component uses the `useContext` hook to access them directly from the `PostContext`.
- By utilizing the `useContext` hook, the component can consume the context values seamlessly, promoting a more modular architecture.

  ```jsx
  // The SearchPosts component needs the searchQuery and setSearchQuery props,
  // hence we read them from the PostContext (Provider) we created using the useContext() Hook
  const { searchQuery, setSearchQuery } = useContext(PostContext);
  ```

## React Advanced State Management

### 1. **Overview of Context API**

- **Purpose**: Context API enables state sharing across components without prop drilling.
- **Usage**: Particularly suited for **UI state** rather than **remote state** in large applications.

### 2. Types of State

#### 1. State Management Basics

- **Definition**: Organizing where state resides within an application.
- **Types**:
  - **Local State**: Used within a single component or its children.
  - **Global State**: Needed by multiple components across different parts of the component tree.

#### 2. Classifying State by Domain

- **UI State**: Manages interface elements like theme, filters, form inputs, and panel states.
- **Remote State**: Data fetched from external sources (e.g., API data).
  - **Management Needs**: Remote state often needs caching, revalidation, and frequent updates.

### 4. **Determining Local vs. Global State**

- **Guideline**: Ask if an update in one component should reflect in another instance of the same component:
  - **No**: Local State.
  - **Yes**: Global State.

### 5. **State Placement Options**

- **Local State**: Managed within the component using `useState`, `useReducer`, or `useRef`.
- **Parent Component**: Lift state to a shared parent if multiple related components need it.
- **Context**: Best for global UI state but requires `useState` or `useReducer` to manage updates.
- **3rd-Party Library**: Suitable for managing complex global state, especially with asynchronous data, and can handle caching, revalidation, and synchronization.
  - Examples: **Redux**, **React Query**, **SWR**, **Zustand**.
- **URL**: Useful for shareable, bookmarkable state across pages.
- **Browser Storage**: Store persistent data in **localStorage** or **sessionStorage** (does not trigger re-renders).

### 6. **State Management Tools by Type**

- **Local UI State**: Managed by `useState`, `useReducer`.
- **Global UI State**: Context API + `useState` / `useReducer`.
- **Local Remote State**: `fetch` + `useEffect` + `useReducer` / `useState`.
- **Global Remote State**: Consider third-party libraries or Context API for complex needs:
  - **Context API** (paired with `useReducer` or `useState` for state changes)
  - **Redux**
  - **React Query**
  - **SWR**
  - **Zustand**

### 7. **Selecting the Right Tools**

- UI State: Synchronous and stays within the app, managed by familiar hooks.
- Remote State: Asynchronous, often requires third-party libraries for handling caching, updates, and revalidation.
