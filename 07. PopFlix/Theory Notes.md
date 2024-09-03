## React Component Categories

In most React codebases, components generally fall into one of the following three categories:

1. **Stateless or Presentational Components**

   - **Definition:** These components do not have any state. They typically receive `props` and render content based on those `props`.
   - **Examples:** Logo, NumResults, and Movie components.
   - **Characteristics:**
     - Usually small and simple.
     - Focus on how things look.
     - Reusable across the application.

2. **Stateful Components**

   - **Definition:** Components that manage and maintain their own state.
   - **Examples:** The Search component that handles user input.
   - **Characteristics:**
     - Can still be highly reusable.
     - Focus on how things work.

3. **Structural Components**
   - **Definition:** Components that provide structure to the application, such as pages, layouts, or screens.
   - **Examples:** Page components, Layout components.
   - **Characteristics:** - Can be large or small. - Often the result of composing smaller components together. - Provide the overall framework of the app.

## Prop Drilling in React

Prop drilling refers to the process of passing data from a parent component down to deeply nested child components through multiple intermediary components. This occurs when a component deep in the component tree needs access to a piece of state or a function that is defined in a higher-level component.

### How Prop Drilling Works

In React, data flows in a unidirectional manner, meaning it moves from parent components to child components. When a deeply nested component requires access to certain data or functions, these must be passed down through each level of the component hierarchy, even if some of those intermediary components do not use the data themselves.

```jsx
function ParentComponent() {
  const [data, setData] = useState('Some data');

  return <ChildComponent data={data} />;
}

function ChildComponent({ data }) {
  return <GrandchildComponent data={data} />;
}

function GrandchildComponent({ data }) {
  return <div>{data}</div>;
}
```

In this example, the data prop is passed down from ParentComponent to GrandchildComponent via ChildComponent, even though ChildComponent does not use the data prop itself.

### Downsides of Prop Drilling

- **Increased Boilerplate Code:** Prop drilling often leads to repetitive and verbose code, as you must explicitly pass data or functions through multiple layers of components.
- **Tightly Coupled Components:** Intermediary components that merely pass down props become tightly coupled with the data, making them harder to reuse in different contexts without modifying the prop structure.

- **Complexity in Maintenance:** As the component tree grows, managing and understanding how data flows through the components becomes more challenging, leading to increased difficulty in maintaining the codebase.

## Component Composition in React

Component composition in React refers to the practice of combining multiple components to create more complex and reusable UI elements.

Instead of embedding specific components directly within others, composition allows for a more flexible and modular approach by using the `children` prop or by passing components explicitly as props.

### The Problem with Direct Inclusion

When a component is directly included inside another component, it becomes tightly coupled with it. This tight coupling limits the reusability of the parent component, as it is now bound to the specific child component. For example, if a parent component always includes a specific child component, it cannot be easily reused with a different child component.

#### Example

Let's say we have a `Modal` component that we want to reuse and a `Success` component that simply renders the message "Well done." If we directly include the `Success` component inside the `Modal` component, like this:

```jsx
function Modal() {
  return (
    <div className='modal'>
      <Success />
    </div>
  );
}

function Success() {
  return <p>Well done!</p>;
}
```

### The Solution: Component Composition

Component composition solves this problem by allowing components to be combined in a way that maintains flexibility. Instead of directly embedding child components, you can pass them as children or props. This approach leaves an "empty slot" in the parent component that can be filled with any child component when needed, making the parent component highly reusable.

#### Example with Composition

We can modify the Modal component to accept children through the children prop. This way, we can pass any component as a child, making the Modal reusable:

### How Composition Works

- **Children Prop:** One of the most common ways to achieve composition is by using the `children` prop. This allows any content, including other components, to be passed into the parent component, which can then render it appropriately.
- **Component Props:** Another way to compose components is by passing them as explicit props. This allows for even more control over which components are included and how they are rendered.

#### Example: Using the `children` prop

```jsx
function Modal({ children }) {
  return <div className='modal'>{children}</div>;
}

function Success() {
  return <p>Well done!</p>;
}

// Usage
<Modal>
  <Success />
</Modal>;
```

#### EG: Using the `component` prop

```jsx
function Modal({ content }) {
  return <div className='modal'>{content}</div>;
}

function Success() {
  return <p>Well done!</p>;
}

// Usage
<Modal content={<Success />} />;
```

### Addressing Prop Drilling with Composition

Prop drilling occurs when you need to pass data through multiple layers of components, which can make the code harder to maintain. Component composition can help alleviate this issue:

- **Avoiding Deep Prop Passing:** By using composition, you can pass down components that already encapsulate the necessary data, avoiding the need to pass props through multiple layers.

- **Centralizing Data:** Instead of drilling props, you can structure your components so that they receive the necessary data or components directly, simplifying the overall component structure.

### Benefits of Component Composition

1. **Reusability:** Components designed with composition in mind are more reusable because they are not tied to specific child components.

2. **Flexibility:** Composition provides the flexibility to combine components in different ways, allowing for dynamic and varied UI layouts.

3. **Simplified Maintenance:** Since components are not tightly coupled, maintaining and updating the codebase becomes easier. You can change or replace child components without affecting the parent component.

### Common Use Cases

- **Reusable Components:** Composition is often used to create highly reusable components, such as modal windows, where the content inside the modal can vary.
- **Layout Components:** Composition is also useful for creating layouts where the structure of the page remains the same, but the content within that structure can change.

## Props as Components API

### 1. Understanding the Component Lifecycle

- **Component Creation**:
  - A component is always created by someone (the creator).
  - The creator defines what props the component can accept.
- **Component Consumption**:

  - A component is consumed by someone (the consumer).
  - The consumer uses the component by specifying values for the props.

- **Team Dynamics**:
  - When working alone, the creator and consumer are the same person.
  - On a team, these roles might be fulfilled by different developers.

### 2. The Importance of Thinking in Terms of Creators and Consumers

- **Separation of Roles**:
  - Even when working solo, it’s beneficial to think of the creator and consumer as separate entities.
- **Public API**:
  - The props a component accepts act as its public API.
  - The creator defines this API, controlling what complexity is exposed to the consumer.

### 3. Balancing Prop Complexity

- **Defining Props**:
  - The creator needs to strike a balance in how many props are allowed for configuration.
- **Example Scenario**:

  - **Simple Component**: A weather component with only one prop (e.g., location).

    - Pros: Simple and easy to use.
    - Cons: Might lack flexibility or usefulness.

  - **Complex Component**: A weather component with many props (e.g., URL of weather data, number of days, temperature units, etc.).
    - Pros: Highly customizable.
    - Cons: Might be too complex and difficult to use.

- **Impact on Code**:
  - Allowing too many props can lead to complex code and a complicated API.

### 4. Best Practices for Prop Management

- **Balancing Props**:

  - Find a balance that works well for both the creator and the consumer based on project needs.

- **Providing Defaults**:
  - If many props are necessary, ensure good default values are provided.

### 5. Conclusion

- **Practice and Mindset**:
  - Developing a good understanding of prop management comes with practice.
  - Always consider the distinction between component creators and consumers when designing components.

## Prop Types

### 1. Introduction to Prop Types

- **Definition**:
  - Prop Types are a mechanism for checking the types of props that a component receives.
- **Purpose**:
  - They help ensure that components receive props of the correct type, preventing runtime errors and making code more robust.

### 2. Common Prop Types

- **Basic Types**:

  - **String**: Represents text.
  - **Number**: Represents numerical values.
  - **Boolean**: Represents `true` or `false` values.
  - **Function**: Represents a function passed as a prop.
  - **Array**: Represents an array of items.
  - **Object**: Represents an object.

- **Complex Types**:
  - **Array of Specific Type**: `PropTypes.arrayOf(PropTypes.number)` for an array of numbers.
  - **Object with Specific Shape**: `PropTypes.shape({ key: PropTypes.string })` for an object with specific keys.
  - **One of Specific Values**: `PropTypes.oneOf(['Option1', 'Option2'])` for an enumeration of values.

### 3. Applying Prop Types in a Component

- **Usage**:

  - Prop Types are defined as static properties in the component.
  - Example:
    ```javascript
    MyComponent.propTypes = {
      name: PropTypes.string,
      age: PropTypes.number,
      isAdmin: PropTypes.bool,
    };
    ```

- **Default Props**:
  - You can also define default values for props using `defaultProps`.
  - Example:
    ```javascript
    MyComponent.defaultProps = {
      isAdmin: false,
    };
    ```

### 4. Benefits of Using Prop Types

- **Type Checking**:

  - Ensures that props passed to components are of the expected type.

- **Documentation**:

  - Serves as a form of documentation for developers, making it clear what types of data are expected.

- **Error Prevention**:
  - Helps catch bugs early by warning when a prop of an incorrect type is passed.

### 5. Limitations of Prop Types

- **Only for Development**:
  - Prop Types only work during development; they don't enforce type checks in production.
- **Not a Complete Solution**:
  - They don't replace the need for other forms of testing or type systems like TypeScript.

### 6. Conclusion

- **Best Practice**:
  - Always define Prop Types for components to ensure type safety and clarity.
  - While Prop Types are useful, consider using TypeScript for more robust type checking in larger projects.

## Components Life Cycle

The COmponent Lifecycle refers to the different phases a component instance goes through over time.

### 1. Mounting (Initial Render)

- **Definition:** The phase where the component instance is created and rendered for the first time.
- **Key Points:**
  - The component is "born" during this phase.
  - Fresh state and props are initialized.
  - The component appears on the screen for the first time.

### 2. Re-rendering

- **Definition:** The phase where the component instance is rendered again due to changes in state, props, or context.
- **Key Points:**
  - Occurs when the component's state or props change.
  - Can also happen when the parent component re-renders.
  - Can also happen when the Context of Component changes
  - This phase is optional and may not occur for all components.
  - Enables the component to update its appearance or behavior based on new data.

### 3. Unmounting

- **Definition:** The phase where the component instance is removed from the screen and destroyed.
- **Key Points:**
  - The component "dies" in this phase i.e Components Instance is destroyed / removed
  - State and props associated with the component are discarded.
  - Commonly occurs when the user navigates away from the component or closes the application.
  - A new instance of the same component can be mounted later, but the specific instance is gone.

## Summary of useEffect and Side Effects in React

### Side Effect in React

- **Definition**:
  - A side effect is any interaction between a React component and the external world.
  - Examples include fetching data from an API or interacting with the browser DOM.

### Why Side Effects Matter

- **Importance**:
  - Side effects are essential in React apps to perform useful actions like data fetching.
  - Side effects should not be included in the render logic of a component.

### Where to Place Side Effects

- **Event Handlers**:
  - Functions triggered by specific user actions (e.g., button clicks).
  - Commonly used to initiate side effects when an event occurs.
- **useEffect Hook**:
  - Used for side effects that need to happen automatically during a component's lifecycle (e.g., after initial render, re-rendering, unmounting).

### useEffect Hook

- **Effect Execution**:

  - Runs code at different moments of a component’s lifecycle (mounting, rendering, unmounting).
  - Particularly useful for running code right after a component is first rendered.
  - It doesn't store anything hence we don't need to store the result

- **Effect Function**:

  - The first argument to useEffect is a function that contains the side effect logic. This function is executed after every render of the component, by default

- **Dependency Array**:

  - The second argument to useEffect is an array of dependencies. These dependencies are variables or props that the effect depends on.
  - The effect is re-run whenever any value in this array changes.
  - An empty array (`[]`) means the effect runs only after the first render.
  - Dependencies in the array trigger the effect when they change.

- **Cleanup Function**:

  - An optional function returned by the effect that runs before the component re-renders or unmounts.
  - The effect function can return a cleanup function.
  - This is useful for cleaning up subscriptions, timers, or any other resources that were set up in the effect

Example:

```jsx
useEffect(() =>  fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
  }, []); // Runs only once, after the initial render
```

### Comparison: Event Handlers vs. useEffect

- **Event Handlers**:
  - Trigger side effects in response to user actions / events.
  - Used to react to certain Events on the UI
- **useEffect**:
  - Used to run at different moments of a component lifecycle
  - Synchronizes the component with external systems, running code at specific points in the lifecycle.

### Best Practices

- **Prefer Event Handlers**:
  - Always use event handlers for side effects when possible.
- **Avoid Overusing useEffect**:
  - Reserve the useEffect hook for effects that cannot be handled by event handlers.

## Using Asynchronous Functions in useEffect Hook

- **Why Use Asynchronous Functions in useEffect**:

  - Side effects in React often involve operations that take time, such as fetching data from an API or performing other asynchronous tasks. Since `useEffect` is designed to manage side effects, it's crucial to know how to work with asynchronous functions within this hook.

- **Handling Asynchronous Code**:

  - `useEffect` cannot directly handle an asynchronous function as its callback because `useEffect` expects a cleanup function or nothing, but an asynchronous function returns a promise. To manage this, an asynchronous function is usually defined inside the `useEffect`, and then it is called immediately within the same hook.

- **Inner Async Function**:

  - The typical approach involves declaring an asynchronous function inside the `useEffect` hook. This function handles the asynchronous task, such as data fetching, and then it is invoked within the `useEffect`. This method allows the effect to run asynchronously without causing issues with React's expectations of the hook's return value.

```jsx
seEffect(function () {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=e2283e92&s=interstellar`,
    );
    const data = await res.json();
    setMovies(data.Search);
  }
  fetchMovies();
}, []);
```
