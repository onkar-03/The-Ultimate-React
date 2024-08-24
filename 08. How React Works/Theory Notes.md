## Conceptual Difference Between React Components, Component Instances, and React Elements

### Introduction

In this section, we will explore the conceptual difference between React components, component instances, and React elements. Understanding this difference is crucial not only for grasping how components work in React but also because it's a common interview topic.

### What is a React Component?

- A React component is a JavaScript function that describes a piece of the user interface.
- This function returns React elements, often written using JSX syntax.
- A component can be thought of as a **blueprint** or **template** for the UI.

### Component Instances

When we use a component in our code, React creates one or multiple instances of that component. Each time a component is used, React calls the component function to create an instance.

- **Component Instance**: The actual / physical manifestation of a component within the component tree.
- **State & Props**: Each Instance has there own State and Props
- **Lifecycle**: Each component instance holds its own state and props and has its own lifecycle, similar to a living organism—it can be born, live for some time, and eventually die.

### React Elements

As React executes the code within each component instance, it returns one or more React elements.

- **Conversion**: JSX is converted into React Elements on function calls
- **React Element**: The result of using a component in the code, which is an immutable JavaScript object containing all necessary information to create DOM elements for the current component instance.

### Conversion to HTML DOM Elements

React elements are eventually converted to actual **HTML DOM elements** and painted onto the screen by the browser.

It’s important to note that React elements are not rendered directly to the DOM. They live inside the React app and are only converted to HTML DOM elements in the final step.

### Summary

The process begins with writing a single component and using it multiple times in our code as a blueprint. React then creates component instances, which generate React elements, and these are finally rendered as HTML elements in the DOM.

If you found this explanation interesting and useful, let's move on to the next video and take a look at this process in code.

## Why Shouldn't We Call Components Directly in React?

In React, components are typically rendered using JSX syntax, like `<MyComponent />`. When you write this, React internally calls the component function and creates a **React element**. This React element is then used by React to manage and update the DOM efficiently.

When you use JSX, like `<DifferentContent />`, React automatically calls the `DifferentContent` function behind the scenes. This function returns a React element, which is essentially an object containing important details about the component, such as its type (in this case, `DifferentContent`) and any props passed to it.

React relies on this information to manage how components are rendered and updated in the DOM. This process allows React to handle complex UI updates efficiently and ensure that components behave as expected.

If you directly call a component function instead of using JSX, React doesn’t recognize it as a component instance. Instead, it just treats the output as a plain React element, which can lead to issues such as the component not managing its state properly or hooks behaving incorrectly. Therefore, it’s important to always use JSX syntax to let React handle components correctly.

However, when you call a component directly as a function, like `DifferentContent()`, the following issues arise:

1. **Loss of Component Identity**:

   - The element returned is no longer treated as a React component but rather as a regular HTML element (e.g., a `div`).
   - This means React doesn't recognize it as a component instance, leading to loss of key features like component-specific state and lifecycle methods.

2. **State Management Issues**:

   - In React, each component instance can manage its own state. When you call a component directly, React can't associate the state with a specific component instance.
   - This is demonstrated in the transcript where the state of the `tabContent` component ends up being managed by its parent component, which is not the intended behavior.

3. **Violating the Rules of Hooks**:
   - React has strict rules around how hooks should be used, especially that they must be called at the top level of a component. Calling a component directly can lead to violations of these rules, causing unexpected behavior or errors.

In conclusion, always render components using JSX syntax (`<ComponentName />`). This ensures that React recognizes the component as an instance, correctly manages its state, and adheres to the rules of hooks.

## How React Rendering Works - Part 1 (Overview)

### Introduction

- This part sets the foundation to understand how React renders applications behind the scenes.
- The topic is extensive, so it's broken down into three parts.

### Recap: Components and React Elements

- **Components**: Building blocks in React applications.
  - Can be used inside other components multiple times.
  - React creates **component instances** for each usage.
  - These instances hold state and props.
- **JSX to React Elements**:
  - When React calls a component instance, the JSX is converted into a series of `react.createElement` function calls.
  - These function calls generate **React elements**.
- **React Elements to DOM Elements**:
  - Eventually, React elements are transformed into **DOM elements**.
  - These DOM elements are displayed on the screen as part of the user interface.

### Understanding the Rendering Process

- The rendering process consists of four main stages:
  1. **Render Triggered**
  2. **Render Phase**
  3. **Commit Phase**
  4. **Browser Paint**

#### The Render Process

- **Triggering a Render**:

  - A new render is triggered usually due to a state update.

- **Render Phase**:
  - React initiates the **render phase**.
  - During this phase, React calls the component functions.
  - Determines how the DOM should be updated based on the latest state changes.
  - **Important**: This phase does not update the DOM itself.
  - In React, "rendering" refers to this internal process, not directly producing visual changes.

#### The Commit Phase

- **Commit Phase**:
  - React moves to the **commit phase** after determining necessary updates.
  - This phase updates the DOM by:
    - Placing new elements in the DOM.
    - Updating or deleting existing elements.
  - The commit phase aligns the DOM with the current state of the application.
  - Traditionally corresponds to what we think of as "rendering."

#### Final Browser Repaint

- **Browser Repaint**:
  - After the DOM is updated, the browser:
    - Notices changes in the DOM.
    - Repaints the screen.
  - This repaint is what users perceive as the rendered interface.
  - **Note**: This step is outside React's control.

### Triggering a Render

- Two primary ways a render can be triggered in a React application:

  1. **Initial Render**:
     - Occurs the very first time the application runs.
  2. **Re-render**:
     - Occurs when a state update happens in one or more component instances.

- **Render Process Scope**:
  - The render process is triggered for the entire application not just for one single component
  - This doesn't mean that the entire DOM is updated
  - In React rendering is about calling component functions for the Updated Components and figuring out what needs to be changed in DOM later
  - In practice it looks like React only renders the updated components but thats not how react works behind the scenes
  - React looks at the entire tree when a render happens

#### Scheduling a Render

The re-rendering isn't triggered immediately after a State change happens, instead its scheduled for when the JS Engine has some free time with it

- **Render Scheduling**:
  - A render is not triggered immediately after a state update.
  - It is **scheduled** to occur when the JavaScript engine has free time.
  - This scheduling usually occurs within a few milliseconds and is not noticeable.
- **Batching**:
  - Multiple `setState` calls within the same function might be **batched** together.
  - Batching optimizes the render process by reducing unnecessary renders.

## React Rendering and Reconciliation - Part 2

Welcome to this deep dive into the React rendering process and reconciliation

### How React Rendering works in Render Phase ??

- **Component Rendering**: When a state update occurs, React calls the component functions to create updated React elements. This crates a New Virtual DOM structure

- **Virtual DOM**: Tree of all React Elements created from all instances in teh component Tree. It’s created quickly and efficiently and is used to determine changes in the DOM.

"Also called as React Element Tree!!"

### Virtual DOM vs. Shadow DOM

- **Virtual DOM**: A term that describes a tree of React elements. It’s not as significant as it seems; it's essentially a simple JavaScript object.
- **Shadow DOM**: A browser technology used in web components, unrelated to React’s virtual DOM.

### Re-rendering

- When a State Update happens a Re-render is triggered. React calls the component functions of the Component whose state is updated
- Then place the new React Element of the Component in the Virtual DOM structure
- React will also re-render all child components whenever a parent component is updated, regardless of whether the props have changed.
- This approach ensures that React doesn’t miss any changes but can lead to re-rendering the entire application.
- The whole Virtual DOM is recreated not the actual DOM

### Why not update the entire DOM whenever state changes somewhere in the app ??

- Writing the DOM is slow than creating a virtual DOM Tree
- Usually a small part of the DOM needs to be updated on state changes
- React reuses as much of the existing DOM as possible

### Fiber and Reconciliation

- **Reconciliation**: The process of comparing the new virtual DOM with the old one to determine what needs to be updated in the actual DOM. The process of comparing elements step-by-step based on their position in the tree is called Diffing about which we will learn later
- **Fiber**: The reconciler in React,teh heart of React that manages this process efficiently by keeping a mutable data structure for components and DOM elements. They are called "Units of Work"

  - **Fiber Tree**: A tree of fibers, each representing a component instance or DOM element.On Initial Render of the Page a Fibre Tree is created. Unlike React elements, fibers are not recreated on each render but are mutated.

- The Fiber Tree us used to created the updated DOM Tree

### Efficiency and Asynchronous Work

- React aims to be efficient by updating only the parts of the DOM that have changed.
- Fiber allows work to be split into chunks and processed asynchronously, enabling prioritization and handling of tasks.

### Summary

- The virtual DOM is a performance optimization, not the core of React’s efficiency.
- Reconciliation and the fiber tree are key to React’s ability to efficiently manage and update the UI.
- Understanding these concepts helps in grasping how React handles updates and maintains performance.
