## Custom Hooks, Refs, and More State

### What are React Hooks?

React hooks are essentially **special functions** that are built into React, allowing us to **hook into some of React's internal mechanisms**.

In other words, hooks are APIs that expose some internal React functionality such as:

- Creating and accessing state from the fiber tree.
- Registering side effects in the fiber tree.
- DOM manipulation, etc.
- Hooks always start with "use" (e.g., `useState`, `useEffect`, etc.).
- Enable easy reuse of non-visual logic: we can compose multiple hooks into our own custom hooks.
- Give function components the ability to own state and run side effects at different lifecycle points.

### Overview of all Built-in Hooks

- All hooks in React **start with the word `use`** to make it easy for React and us to distinguish hooks from regular functions.
- We can even create our own custom hooks, which will also start with the word `use`. Custom hooks allow us to reuse non-visual logic, which is a big advantage of using hooks.

### Built-in Hooks

React comes with almost 20 built-in hooks, though we have only used two so far: `useState` and `useEffect`. Here's a list of some of the most commonly used ones:

- **useState**
- **useEffect**
- **useReducer**
- **useContext**

Some lesser-used but still important hooks include:

- **useRef**
- **useCallback**
- **useMemo**
- **useTransition**
- **useDeferredValue**

There are other hooks intended only for library authors that we won’t cover here.

### Rules of Hooks

There are two rules that must be followed to ensure hooks work properly:

1. **Hooks can only be called at the top level**:

   - This means hooks cannot be called inside conditionals (e.g., `if` statements), loops, or nested functions inside a component.
   - Hooks should not be called after an early return.
   - **Why?** Hooks must always be called in the exact same order during each render. If hooks are called based on some condition, it might alter the order in which hooks are invoked, leading to bugs.
   - This rule ensures that hooks are always in the correct order and can track their state correctly.

2. **Hooks can only be called from React functions**:
   - Hooks can only be used inside React function components or custom hooks, not in regular functions or class components.

If we use a linter (like ESLint), it will automatically enforce these rules.

### Why Hooks Must Be Called in the Same Order

Let's break this down:

- Every time an application is rendered, React creates a **virtual DOM** tree of React elements.
- From this, React builds a **fiber tree**, where each element is a **fiber**.
- Each fiber contains **props**, **a list of hooks**, etc., for all hooks used in the component instance.
- The **list of hooks** is a linked list, where each hook stores information about itself and the next hook in the list.

#### The Problem with Conditional Hooks

If hooks are conditionally defined, this can break the linked list of hooks and disrupt the order between renders.

For example, consider the following hypothetical code:

(This code will not work as intended and violates the first rule of hooks - conditional hook usage.)

```jsx
const [A, setA] = useState(23); // State A
if (A === 23) {
  const [B, setB] = useState(10); // State B
}
useEffect(fnZ, []); // Effect Z
```

- Here, State A is linked to State B, and State B is indirectly linked to Effect Z in the hook list.
  - Hook order: A -> B -> Z.
- On re-render, if the value of A changes, say to 7, the condition becomes false, and the order of hooks breaks, leading to a problem.

```jsx
const [A, setA] = useState(7); // State A
if (A === 23) {
  const [B, setB] = useState(10); // State B
}
useEffect(fnZ, []); // Effect Z
```

- Since the condition is now false, State B is skipped and no longer created, breaking the order:

  - On this render, the hook order becomes: A -> Z.

- Problem: The A hook is still pointing to the place where State B used to be. However, now State B no longer exists, so React tries to assign the Z hook where B used to be, leading to errors.

- As a result, React's internal hook-tracking structure (the fiber tree and hook linked list) becomes corrupted, causing unpredictable behavior

### Conclusion

If hooks are conditionally used, it completely messes up the order of hooks in the linked list between renders. This would lead to React being unable to track the hooks correctly, which will ultimately result in runtime errors.

To prevent this, always use hooks at the top level and never inside conditional statements.

## More details of useState() Hook !!

Let's now look at the super important `useState` hook again and review some important details.

## Initial Values in useState

We've used `useState` in many different ways and have a good understanding of how it works. However, it's crucial to remember that the initial values we pass into `useState` only matter during the initial render only.

#### Example of Incorrect Implementation

We might try to create a state that depends on a condition, like this:

```javascript
const [isTop, setIsTop] = useState(IMDbRating > 8);
```

- This might seem correct, but it doesn't work as expected. If we log the state, we'll see that isTop remains false even when the IMDb rating is greater than 8

#### Why This Happens

- This occurs because React only considers the initial state on the **first render**.
- When the component mounts, the IMDb rating is still `undefined`, so the state remains `false`.
- React does **not** reevaluate this expression on subsequent renders, which is why the state stays `false` forever.

#### Fixing the Issue with useEffect

To fix this, we can use a `useEffect` hook, which will update the state when the IMDb rating changes:

```javascript
useEffect(() => {
  setIsTop(IMDbRating > 8);
}, [IMDbRating]);
```

This way, when the rating updates, the state is recalculated, and the UI reflects the correct state.

### Asynchronous State Updates in React Hooks

#### Why This Happens

- In React, state updates are **asynchronous** because React batches multiple state updates for performance optimization.
- When you call the `setState` function (like `setCount` in the example), React doesn't immediately apply the new state value.
- Instead, it schedules the state update and re-renders the component later.
- As a result, when you try to access the state value **immediately after** calling `setState`, you might still see the **old state value**. This occurs because React only considers the current value of the state during the current render cycle.

For example:

```javascript
const increment = () => {
  setCount(count + 1);
  console.log(count); // This logs the old count value
};
```

In this case, count is updated asynchronously, so it won’t reflect the new value immediately after calling setCount.

#### Fixing the Issue with Functional Updates

- To fix this issue, React provides functional updates in the setState function. This method allows you to pass a callback function to setState that receives the previous state as its argument.
- This ensures the state is updated based on the most recent value, avoiding issues caused by asynchronous behavior.

```jsx
const increment = () => {
  setCount((prevCount) => prevCount + 1); // Using functional update
  console.log(count); // Still logs the old value, but the state will update correctly
};
```

In this example, the function passed to setCount receives the previous state (prevCount). This approach guarantees that the update is based on the latest state, preventing errors caused by the asynchronous nature of state updates.

### Key Takeaway

- React state updates are asynchronous and batched for performance reasons, which means the updated state value is not immediately available after calling setState.
- To fix issues where the new state depends on the old state, always use functional updates. The callback function (prevState => newState) ensures that React handles the state update correctly, even when multiple updates occur in quick succession.

## `useState` Hook Summary

The `useState` hook is used to create and update state in a React component. Here’s a summary of how it works:

### Creating State

1. **Basic State Creation**:

   - Create a state variable and a setter function:
     ```jsx
     const [state, setState] = useState(initialValue);
     ```
   - The `initialValue` can be any value, like `0`, `''`, or an object.

2. **Lazy Initialization**:
   - When the initial state depends on a computation (e.g., reading from `localStorage`), then we pass a callback function:
     ```jsx
     const [state, setState] = useState(() => {
       return someExpensiveComputation();
     });
     ```
   - This callback is called **only on the initial render**.
   - The callback function needs to be pure & with no arguments.
   - **Lazy evaluation** is useful for performance optimization.

### Updating State

1. **Simple State Update**:

   - Pass a new value directly to the setter function to update the state:
     ```jsx
     setState(1000);
     ```

2. **State Update Based on Current State**:
   - When the next state depends on the current state (e.g., incrementing a counter), pass a callback function to the setter:
     ```jsx
     setState((count) => count + 1);
     ```
   - This is the **preferred method** when working with updates that rely on the current state.
   - This way we can read the newly updated value of state variable.

### Important Rules

1. **Do Not Mutate State**:
   - Avoid mutating objects or arrays directly.
   - Instead, create a new object or array that includes the changes:
     ```jsx
     setState((prevState) => {
       // Creating New Object based on the new Item adn the old items of the already existing prevState Array
       return {
         ...prevState,
         newProperty: value,
       };
     });
     ```

### Key Takeaways

- You can create state **with a value** or **with a callback** (lazy initialization).
- You can update state **with a value** or **with a callback** (based on current state).
- Always ensure objects and arrays are **not mutated**, but recreated.

## Introduction to `useRef` Hook

### What are a `refs`?

- `Ref` stands for **reference**.
- It acts as a "box" to store **any data** that we want to preserve between renders.
- React gives us an object with a **mutable `current` property** where we can read and write data.
- You can set an initial value for the `current` property.
- The `current` property is **mutable**, meaning it can be changed.
- `Refs` are **persisted across renders**, just like state.
- Refs are for data that is usually NOT rendered in the visual output of the Component
- They usually only appear in event handlers & effects, not in JSX (otherwise use state)
- Here too we are not allowed to write or read in the render logic(like State) as they will create side effects

### Main Use Cases for `useRef`

1. **Preserving values across renders**:  
   Used to preserve the previous state or storing the ID of a `setTimeout` function.
2. **Selecting and storing DOM elements**:  
   Useful when we want to select adn store DOM elements across renders.

### Differences Between `useRef` and `useState`

- **Persistence**: Both `refs` and `state` are persisted across renders.
- **Re-rendering**: Updating state triggers a component re-render, but updating a `ref` does **not**.
- **Immutability**:
  - State is **immutable**.
  - `Refs` are **mutable**.
- **Synchronous vs Asynchronous**:
  - State updates are **asynchronous**.
  - `Refs` are updated **synchronously** and can be accessed immediately after updating.

### When to Use `useRef` vs `useState`

- Use **state** when the value affects the **UI** and needs to trigger a re-render.
- Use **refs** for data that does not affect the UI directly or should not trigger a re-render (e.g., DOM elements or non-visual data).

### Rules of Using `useRef`

- You cannot directly read or write to the `current` property in render logic as it could create side effects.
- Mutations should be performed inside event handlers or `useEffect`.

## Using React's `useRef` to Select Dom Elements

### Steps to Select DOM using `ref`

### 1. Create a Ref

- Use the `useRef` hook to create a reference to the input element.
- The `useRef` hook provides a way to directly access a DOM element without causing re-renders.
- The initial value is passed ith the current property `useRef(currentProperty)`
- When we work with DOM elements the initial value in current property is `null`

```jsx
const inputEl = useRef(initialProperty);
```

### 2. Assign Ref to the Input Element

Assign the `ref` attribute to the input element, connecting the `inputRef` to the actual DOM element. This allows you to interact with the input field directly.

### 3. Automatically Focus the Input Element

Use the `useEffect` hook to automatically focus the input when the component is mounted. This runs after the component renders, ensuring the input is in focus when the page loads.

### 4. Handle "Enter" Key Press

Add an event listener to the input field that listens for the `key-down` event. Inside the event handler, check if the pressed key is the "Enter" key (key code 13) and trigger an action, such as submitting a form or performing some other logic.

### 5. Assign KeyDown Event Handler to Input

Attach the event handler for the "Enter" key press to the `onKeyDown` event of the input field.

### Complete Code Example

```javascript
import React, { useRef, useEffect } from 'react';

const AutoFocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the input field when the component mounts
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      // Perform the desired action here
    }
  };

  return (
    <input
      ref={inputRef}
      type='text'
      placeholder='Type something...'
      onKeyDown={handleKeyDown}
    />
  );
};

export default AutoFocusInput;
```

## Summary of Custom Hooks

### Reusing Logic with Custom Hooks

1. **Purpose of Custom Hooks**:

   - Custom hooks are designed for reusability. In React, you can reuse either a piece of UI (through components) or logic. Custom hooks allow you to reuse non-visual logic that contains one or more React hooks.

2. **When to Create a Custom Hook**:

   - If the logic you want to reuse contains React hooks, you should create a custom hook. For logic without React hooks, a regular function suffices.

3. **Characteristics of Custom Hooks**:

   - They are JavaScript functions that can receive and return any relevant data.
   - It is common to return an object or an array from a custom hook.
   - Unlike regular functions, custom hooks must use one or more React hooks.
   - Custom hooks must be named with the prefix `use` (e.g., `useFetch`) to be recognized by React as a hook.

4. **Rules**:

   - Custom hooks should have a single, well-defined purpose, just like components or regular functions.
   - They should not be used to group all hooks of a component together but rather to encapsulate specific logic that can be reused across different components or projects.

5. **Custom Hook Libraries**:

   - Many developers share their custom hooks, and there are various custom hook libraries available on NPM that you can use in your projects.

### When to use Custom hook ??

- When we want to re use some part of the Non-Visual logic
- Extract a huge part of a Component into some kind of Hook
