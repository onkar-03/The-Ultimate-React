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

# `useState` Hook Summary

The `useState` hook is used to create and update state in a React component. Here’s a summary of how it works:

## Creating State

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

## Updating State

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

## Important Rules

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

## Key Takeaways

- You can create state **with a value** or **with a callback** (lazy initialization).
- You can update state **with a value** or **with a callback** (based on current state).
- Always ensure objects and arrays are **not mutated**, but recreated.
