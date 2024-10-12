# Context API in React

## What is the Context API?

The **Context API** in React is a system that allows us to pass data throughout an application without having to manually pass props down the component tree. It essentially provides a way to broadcast global state that should be available to child components of a certain context.

### The Problem It Solves: Prop Drilling

Prop drilling is the issue that arises when we need to pass state through multiple levels of a component tree, just to make it available to deeply nested components. This can make the code cumbersome and inconvenient to manage.

Example problem:

- Suppose components `B` and `F` both need access to a state variable, such as `count`. Without the Context API, we would have to pass this `count` prop down from a parent to all the intermediary components until it reaches `B` and `F`.
- EG: A
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

### Benefits of the Context API

- Solves the prop drilling problem by allowing state to be shared across many levels of components.
- Provides flexibility to create as many contexts as needed, and to place them at different locations in the component tree.

## Steps for Using Context API to Pass Props to Child Components

### Step 1: Create a New Context

First, you need to create a context using the `createContext` function. This establishes a "Context" that you can use to share values across multiple components without passing props down manually at every level.

```jsx
import { createContext } from 'react';

// Create a new context
export const PostContext = createContext();
```

### Step 2: Provide Values to Child Components

To make the props available to all child components, use the `Provider` component of the created context. Inside the `Provider`, declare the `value` property, which holds all the values you want the child components to access. The `value` property accepts an object where you list the props.

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
  {/* Child components will be wrapped here */}
</PostContext.Provider>
```

**In this example**, the **value** object contains the following props, which are made available to all child components wrapped within the `Provider`:

- **`posts`**
- **`onAddPosts`**
- **`onClearPosts`**
- **`searchQuery`**
- **`setSearchQuery`**

**IMPORTANT**: _We can use different contexts for handling different things; for instance, we could have one context for managing posts and another for handling search queries. However, in this example, we are learning how to use the Context API, so we consolidate everything into one context_.
