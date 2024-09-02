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

### List of DOM Updates

After the render phase, React has a list of changes (DOM updates) that need to be made to the actual DOM. These updates are based on the differences found between the old and new Virtual DOM trees.

React processes this list to determine which changes need to be applied to the DOM efficiently. This helps in minimizing the number of direct manipulations to the DOM, which are relatively slow operations

### Efficiency and Asynchronous Work

- React aims to be efficient by updating only the parts of the DOM that have changed.
- Fiber allows work to be split into chunks and processed asynchronously, enabling prioritization and handling of tasks.

### Summary

- The virtual DOM is a performance optimization, not the core of React’s efficiency.
- Reconciliation and the fiber tree are key to React’s ability to efficiently manage and update the UI.
- Understanding these concepts helps in grasping how React handles updates and maintains performance.

## How Rendering Works the Commit Phase - Part 3

After the Render Phase we have a list of DOM updates that will now be used in the commit Phase. List of Updates is generated by React.

Technically the Updated Fibre Tree also goes in the Commit Phase

### Phases of Rendering

1. **Trigger**

   - Starts with either the initial render of the app or a state update in a component.

2. **Render Phase**

   - **Purpose**: Creates a new virtual DOM (React Element Tree) from the updated component instances.
   - **Process**:
     - Calls component functions to generate updated React elements.
     - Results in a virtual DOM which is essentially a tree of React elements.
     - Child components are rendered as well, regardless of prop changes.
   - **Important Note**: This phase is asynchronous to prevent blocking the JavaScript engine and to support concurrent features.

3. **Reconciliation**

   - **Purpose**: Updates the current fiber tree (representation of the element tree) by comparing it with the new virtual DOM.
   - **Process**:
     - Uses the Fiber reconciler to compare and find minimal DOM updates needed.
     - **Diffing Algorithm**: Compares elements in the new virtual DOM with the current fiber tree.

**NOTE: "React only does the Render Phase, it does not write to the DOM !!"**

4. **Commit Phase**

- **Purpose**: Applies the list of DOM updates to the actual DOM.
- **Process**:
  - Performed by a separate library (Renderer), ReactDOM, which handles DOM updates.
  - The Renderer inserts, deletes, updates the DOM Elements
  - This phase is synchronous, ensuring that all updates are applied in one go for consistency.
- **Outcome**: Results in an updated DOM reflecting the new application state.

1. **Browser Paint Phase**
   - **Purpose**: Visually updates the user interface. Performed by whatever Browser we are using.
   - **Process**:
     - The browser detects DOM changes and repaints the screen when it has idle time.

### Key Points

- **React and DOM Interaction**:

  - React handles the render phase but does not directly update the DOM.
  - ReactDOM is responsible for the commit phase, which involves actual DOM updates.

- **React's Versatility**:

  - React is not limited to the DOM and can be used with other hosts, such as React Native for mobile apps or Remotion for videos.
  - Different packages or "renderers" are used to commit React applications to various hosts.

- **Terminology**:
  - **Virtual DOM**: A term that doesn't fully capture React’s rendering and update process, leading to the preference for "React Element Tree."

## How Diffing Works ??

### Fundamental Assumptions

The Diffing algorithm is based on two fundamental assumptions:

1. **Different Element Types Produce Different Trees**: Two elements of different types will produce entirely different trees.
2. **Stable Keys Maintain Consistency**: Elements with a stable key, which remains consistent over time, will stay the same across renders.

**NOTE: This help React go from [O(N^3)] to [O(N)] Operations per 1000 elements**

### Different Element Types Produce Different Trees

Diffing compares elements step by step between two renders, focusing on their position in the tree. There are two key situations to consider:

1. **Different Elements at the Same Position**: When an element changes in a certain position of the tree between renders, React assumes the element and all its children are no longer valid. This leads to:

   - The destruction and removal of the elements from the DOM, including their state.
   - Rebuilding the tree with brand-new elements.

#### Example 1: Type of Instance Changed

When the type of an element changes, React removes the old element and its child components, then rebuilds the new element with fresh instances of the child components. This process resets the state of the components.

##### Initial Render

```jsx
<div>
  <SearchBar />
</div>
```

##### Updated Render Render

```jsx
<header>
  <SearchBar />
</header>
```

**Explanation**:
In the above example, the type of the element changes from div to header. React will:

Remove the div element and its child, the SearchBar component, from the DOM.
Rebuild the structure as a header with a new instance of the SearchBar component.
This effectively resets the state of the SearchBar component because a new instance is created

#### Example 2: Component Type Changed

The same behavior applies when the type of a React component changes within the same parent element. React will destroy the old component instance, including its state, and create a new one.

##### Initial Render

```jsx
<div>
  <SearchBar />
</div>
```

##### Updated Render

```jsx
<div>
  <ProfileMenu />
</div>
```

**Explanation**:
Here, the SearchBar component is replaced by a ProfileMenu component within the same div. React will:

Destroy the SearchBar component, removing it from the DOM along with its state.
Instantiate a new ProfileMenu component in its place.

2. **Same Element at the Same Position**: When the element at a certain position remains the same between renders, React keeps the element in the DOM, preserving its state and all its child elements.

#### Example: Attribute and Prop Changes

##### Initial Render

```jsx
<div className='hidden'>
  <SearchBar wait={1} />
</div>
```

##### Updated Render

```jsx
<div className='active'>
  <SearchBar wait={4} />
</div>
```

**Explanation**:

The className attribute of the div changes from 'hidden' to 'active'.
The wait prop of the SearchBar component changes from 1 to 4.

React will mutate the className attribute of the existing div element from 'hidden' to 'active'.
Pass the new wait prop to the existing SearchBar component

**Key Points**

- DOM Element Preservation: The div element is not removed from the DOM; it’s simply updated.
- State Preservation: The SearchBar component is not destroyed; it retains its state, even though its wait prop changes.

### Implications and the Key Prop

- **Efficiency in React**: React optimizes performance by reusing existing DOM elements and preserving their state, minimizing unnecessary changes.

- **Need for Fresh Instances**: Occasionally, you may need to force the creation of a new component instance, ensuring that it starts with a fresh state.

- **Role of the `key` Prop**: The `key` prop is crucial in these scenarios. It allows you to instruct React to treat a component as a new instance, rather than reusing the existing one.

- **Control Over Component Behavior**: By assigning a unique `key` value, you can control when React should discard the old component instance and generate a new one, ensuring the component behaves as expected with a fresh state.

In summary:

- **Different element types** cause React to destroy and rebuild elements, losing state.
- **Same element types** at the same position lead to DOM mutation and state preservation.
- **Key prop** can be used to force React to create new component instances with new state.

These principles are crucial for understanding how React efficiently updates the DOM while managing state.

## Understanding the Key Prop in React

The `key` prop is a special prop used in React to help the Diffing algorithm efficiently update the DOM. Here's a detailed breakdown of its purpose and usage:

### What is the Key Prop?

- **Definition**: The `key` prop is used to uniquely identify elements in a list. It helps React distinguish between elements when they are added, removed, or reordered.
- **Applicable Elements**: It can be used for both DOM elements and React components.

### Why Use the Key Prop?

1. **Stable Keys for Performance Optimization**

   - **Purpose**: A stable key helps React maintain the element’s identity across renders, even if its position in the list changes.
   - **Example**: When adding a new item to a list, React uses the key to keep track of existing elements. Without a key, React might unnecessarily remove and recreate elements, which impacts performance.

#### Example 1: Without Keys

- **Scenario**: A list with items but no `key` prop.

##### Example: Before Re-render

```jsx
<ul>
  <Question question={q1} />
  <Question question={q2} />
</ul>
```

##### Example: After Re-render

```jsx
<ul>
  <Question question={q0} />
  <Question question={q1} />
  <Question question={q2} />
</ul>
```

- **Effect**: When the list is updated, React may remove and recreate elements if their positions change, leading to unnecessary re-rendering of q1 and q2.

#### Example 2: With Stable Keys

- **Scenario**: A list where each item has a unique `key`.

##### Example: Before Re-render

```jsx
<ul>
  <Question key='q1' question={q1} />
  <Question key='q2' question={q2} />
</ul>
```

##### Example: After Re-render

```jsx
<ul>
  <Question key='q0' question={q0} />
  <Question key='q1' question={q1} />
  <Question key='q2' question={q2} />
</ul>
```

- **Effect**: React identifies items by their keys, preserving their state and improving performance even if their positions change.

2. **Resetting State**
   - **Purpose**: Changing the key of an element allows React to treat it as a completely new element, which is useful for resetting component state.
   - **Example**: If the state of a component should reset when certain props change, assigning a new key forces React to discard the old component and create a new one.

#### Example : Resetting State with Changing Keys

- **Scenario**: A component with a state that should reset when its props change.

```jsx
<div>
  <Question
  question={{
    title: React vs Js,
    body:'Why should we use React ??
  }}

  key={q23}/>
</div>
```

```jsx
<div>
  <Question
    question={{
      title: React,
      body: 'What is React ??',
    }}
    key={q24}
  />
  />
</div>
```

- **Effect**: By assigning a new `key` to the component when props change, React treats it as a new instance, resetting its state and displays the new Question and Answer Component

### Summary

- **Always Use Keys**: When rendering lists or components that might change order or be dynamically created.
- **Keys in Lists**: Enhance performance by preventing unnecessary DOM operations.
- **Changing Keys**: Useful for resetting component state when needed.

By understanding and using the `key` prop effectively, you can optimize your React applications and ensure they perform efficiently.

## Rendering Process and Related Concepts in React

### Two Types of Logic we can Write in React

1. Render Logic
2. Event Handler Functions

#### 1. **Render Logic**

- **Definition**: Render logic is all the code that lives at the top level of your component functions and is responsible for describing how the view of a component instance should look. It refers to all the code that's executed when a component is rendered

- **Examples**:
  - Code in the return block of the component.
  - Functions that are called within the return block

#### 2. **Event Handler Functions**

- **Definition**: Event handler functions are pieces of code that execute as a consequence of an event that the handler is listening to.
- **Examples**:
  - Functions registered to events like `onClick` for a click event.
- **Purpose**: Event handlers contain code that makes things happen in the application, such as state updates, HTTP requests, and page navigation.

**Summary** : "_Render Logic code renders the component whereas event handlers contain code that actually does things. Basically Event Handlers code makes things happen in the application_"

### Fundamentals of Functional Programming

1.  **Side Effects**

    - It refers to the dependency on or modification of any data outside the function scope".
    - Interaction with the outside world".
    - Examples: mutating external variables, HTTP requests, writing to DOM

Example:

```jsx
areas {} // Empty Object

function circleAreas (){
areas.circle = 3.14 * r * r; // Mutates the Outside Object
}
```

=> Mutates teh Outside Variable / Object

1.  **Pure Functions**
    - A function that has no side effects
    - Basically they don't change any variable outside their scope
    - Given the same Input it always returns the same Output

Example:

```jsx
function Area(r) {
  return 3.14 * r * r; // returns the area of a circle
}
```

=> Returns the same Output for same Input

3. **Impure Function**
   - A function that has side effects
   - Basically they change any variable outside their scope
   - Given the same Input it always returns a different Output

Example 1:

```jsx
areas {} // Empty Object


function circleAreas (){
  areas.circle = 3.14 * r * r; // Mutates the Outside Object
}
```

=> Mutates the Outside Object areas by creating a new property named circle

Example 2:

```jsx
function Area(r) {
  const date = Date.now();
  const area = 3.14 * r * r;
  return `${date} ${area}`;
}
```

=> This returns a different Output for the same Input as the Date Changes every time

#### 3. **Importance of Differentiating Render Logic and Event Handlers**

- **Render Logic**: Responsible for rendering the component.
- **Event Handlers**: Contain code that interacts with the outside world to perform actions.

### Rule for Render Logic

- **Rule**: Components must be pure functions when it comes to render logic.
- **Implications**:
  - Given the same prop (input) the Component should give the same JSX (output)
  - Render logic must not produce any side effects.
  - Render logic cannot perform network requests, create timers, or directly manipulate the DOM.
  - Render logic must not mutate objects or variables outside the component function's scope.
  - Mutating props is forbidden because it would be a side effect.
  - State updates cannot occur in render logic as they would cause an infinite loop.
  - State updates are technically not side effects but are still prohibited in render logic.
  - `console.log` and creating random numbers are technically side effects but are generally harmless and allowed.

#### Where to Use Side Effects ??

- It basically is interaction of react component with the world outside that component.
- We need side effects all the time.
- They make out applications do something.
- But they shouldn't be included in the Render Logic

Instead we can create side effects in two different places in React:

1.  **Event Handlers**:
    Side effects are allowed and encouraged within event handler functions.

1.  **`useEffect` Hook**:
    Used to handle side effects that need to occur as soon as the component is rendered.

## State Update Batching in React

### Overview

In React, state updates are batched to optimize performance. This means that multiple `setState` calls within the same event handler are combined into a single state update, which triggers only one render and commit phase.

### Key Concepts

1. **State Updates Are Batched**:

   - React does not trigger renders immediately after each state update within an event handler.
   - Multiple `setState` calls are batched into one state update, leading to a single render and commit phase.
   - This approach prevents unnecessary re-renders and optimizes performance by only updating the screen once, even if multiple pieces of state are updated.

2. **Example Scenario**:

   - Consider an event handler function that updates three pieces of state. Instead of rendering the UI three times, React batches these updates and renders the UI only once.

   How React Handles This ??

   - When the `reset` function is called, it triggers three state updates:

     - `setAnswer('')`
     - `setBest(true)`
     - `setSolve(false)`

   - Instead of updating the state and re-rendering the component three times (once for each state update), React batches these state updates together.

   - React waits until all the state updates in the `reset` function have been made, and then triggers a single re-render. This ensures that the UI is only updated once, reflecting all the changes made to the state.

   - The `console.log(answer)` statement inside the `reset` function logs the old value of `answer` before it gets updated. This happens because React does not immediately update the state after calling `setAnswer('')`. Instead, the state is updated after the component re-renders. This answer State now is called **Stale State**.

   - React schedules the state updates, and they take effect only after the render phase is complete. This behavior is what makes state updates in React asynchronous.

   - **Performance**: By batching multiple state updates into a single render, React avoids unnecessary re-renders, which could lead to performance issues, especially in large applications.

   - **Consistency**: This batching ensures that all related state updates are reflected together in the UI, maintaining consistency and avoiding intermediate states that might not make sense to the user.

   In summary, React's automatic batching of state updates optimizes performance and ensures a more predictable and consistent UI update process.

3. **Asynchronous State Updates**:

   - State updates in React are asynchronous, meaning the updated state is not immediately available after a `setState` call.
   - The updated state can only be accessed after the render phase is complete.

4. **Handling Immediate State Needs**:

   - If you need the new state immediately after updating it (e.g., to update the state again based on the previous state), you can pass a callback function to `setState` instead of a single value.

5. **React 18 Enhancements**:

   - Before React 18, automatic batching only occurred in event handlers.
   - With React 18, batching is now automatic for all scenarios, including `timeouts`, promises`, and native event handlers using `addEventListener`.

6. **Dealing with Batching Issues**:
   - In rare cases where batching may cause issues, you can use `ReactDOM.flushSync` to exclude specific state updates from batching. However, this is seldom needed.

## Events in React

### Event Capture, Target, Bubble, and Event Delegation

To understand event handling in both the traditional DOM and React, it's essential to grasp the concepts of event capture, target, bubble, and why event delegation and propagation are significant.

#### **Event Propagation Phases**

- **Event propagation** refers to the order in which events are triggered in the DOM.
- When an event occurs, like a user clicking a button, the event is created. It doesn't immediately activate the target element but goes through the following phases:

1. **Event Capture (Capturing Phase)**

   - The event starts from the root of the DOM tree and moves downward toward the target element.
   - During this phase, any event listeners set to capture the event can intercept it before it reaches the target element.
   - This phase is less commonly used but is important for scenarios where you want to catch events before they reach their intended target.

2. **Target Phase**

   - This is the phase where the event has reached the target element, the one directly interacted with by the user (e.g., the button that was clicked).
   - The event listeners attached directly to this element are triggered during this phase.

3. **Event Bubble (Bubbling Phase)**
   - After reaching the target element, the event bubbles back up to the root, triggering event listeners on ancestor elements.
   - This phase is commonly used for handling events, especially in event delegation.

### **Event Delegation**

- **Event delegation** is a technique where you leverage event propagation, particularly the bubbling phase, to handle events efficiently.
- Instead of attaching event listeners to every child element individually, you can attach a single event listener to a parent element. This listener can then manage events for all its descendants.

#### **Using `e.target` to Identify Event Source**

- When using event delegation, it’s crucial to determine whether the event occurred on one of the intended child elements.
- You can do this by checking the `e.target` property, which refers to the actual element that triggered the event.

#### **Why Use Event Delegation?**

- **Performance:** Reduces the number of event listeners, which can be especially important in cases where you have many similar elements (e.g., a list of items).
- **Dynamic Content Handling:** Allows you to manage events on elements that are added to the DOM after the initial load, without needing to attach new event listeners.
- **Simplified Code:** Makes your code easier to maintain by centralizing event handling in one place.

#### **Event Propagation and React**

- Understanding event propagation is crucial in React because React's synthetic event system is built on top of the DOM's event system.
- React manages event listeners at the root of the DOM and uses delegation to handle events, making it essential to understand these phases to predict how events will behave in your React components.

### Behind the Scenes: Event Handling in React

- Behind the scenes, React performs **Event Delegation** for all the events in our Application.
- React registers all event handlers on the root DOM container, which is generally a `div` with the id of `root`. This is where all events are handled.
- React uses event delegation by attaching a single event listener to the root of the document, ensuring efficient event handling.

### React Event Handling

- React's approach to event handling differs from the traditional DOM.
- Whenever we declare an EventHandler, React gives us the Event Object, which we generally refer to as `e`.
- In Vanilla JavaScript, we get access to the native DOM event object like mouse/keyboard events.
- React gives us something called **Synthetic Event**, which is a thin wrapper around the DOM's native event object.
- Synthetic Events are similar to native event objects but add/change some functionalities on top of them.
- They have the same interface as native events and methods like `stopPropagation` and `preventDefault`.
- Events in React are normalized and wrapped in a SyntheticEvent object, ensuring cross-browser compatibility.
- Most of the Synthetic Events bubble (including `focus`, `blur`, and `change`) except `scroll`.

### Event Handlers in React vs. JavaScript

- Attributes and event handlers are named using camelCase (e.g., `onClick` instead of `onclick` or `click`).
- In Vanilla JavaScript, if we want to stop the default behavior of the browser (like reloading the page), we pass the `false` value, but in React, we need to use `preventDefault()`.
- Attach `Capture` if you need to handle during the capture phase (e.g., `onClickCapture`).

## Summary: React Library vs Framework

### 1. Introduction to React as a Library

- **Key Point:** React is a library, not a framework, which means it serves a different purpose in building web applications.

## Frameworks vs. Libraries

### Sushi Kit Analogy

Understanding the difference between frameworks and libraries can be illustrated with a sushi kit analogy:

1. **Framework:**

   - **Analogy:** Like an all-in-one sushi kit that comes with all necessary ingredients but limits flexibility.
   - **Pros:** Provides everything needed to build a complete application.
   - **Cons:** You're limited to the framework's tools and conventions(not always bad).

2. **Library:**
   - **Analogy:** Like buying individual ingredients for making sushi, offering more freedom but requiring more effort and decision-making.
   - **Pros:** Allows for the selection of multiple third-party libraries to build an application.
   - **Cons:** Managing the integration and compatibility of various libraries can be challenging.

### Frameworks in JavaScript

- **Overview:** Frameworks like Angular, Vue, or Svelte provide a complete structure with built-in tools, making them ideal for large-scale applications.

### React as a View Library

- **Role of React:** React is primarily focused on rendering components onto a user interface (UI). This role provides flexibility in choosing additional libraries to handle other aspects of application development.

### Freedom and Complexity with React

- **Trade-Offs:**
  - **Pros:** React’s flexibility allows developers to select the best tools suited for their specific needs.
  - **Cons:** This flexibility requires developers to find, learn, and maintain various third-party libraries, which can add complexity to the development process.

## React's 3rd-Party Library Ecosystem

### Overview

React's popularity has led to a rich ecosystem of third-party libraries designed to address various development needs such as routing, state management, and styling.

### Commonly Used React Libraries

Several libraries are widely used within the React ecosystem to enhance development:

- **React Router:** Provides routing capabilities to navigate between different views or pages in a React application.
- **React Query:** Simplifies data fetching, caching, and synchronization for React applications.
- **Redux:** Manages and centralizes application state, making it easier to manage complex state interactions.
- **Styled Components:** Enables the use of component-level styles in a React application, leveraging tagged template literals.
- **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development with predefined classes.

These libraries help developers build more robust and scalable applications by offering specialized functionality and improving development efficiency.

### Frameworks Built on Top of React !!

#### Overview

React has inspired the development of several frameworks that extend its capabilities. These frameworks offer predefined solutions for common challenges, making it easier to build complex applications.

#### Opinionated React Frameworks

Frameworks like Next.js, Remix, and Gatsby are built on top of React. They provide structured approaches to routing, state management, and styling, which can simplify the development process by reducing the need to make decisions from scratch.

#### Advantages of Using React Frameworks

By using a React framework, developers benefit from a streamlined development process. These frameworks make key decisions for you, which can lead to faster project completion and a more consistent developer experience.

#### Full-Stack Capabilities

Some React frameworks, such as Next.js, go beyond front-end development by offering full-stack capabilities. This allows developers to build entire applications with React as the core technology, handling both client-side and server-side needs.

#### Conclusion

React frameworks enhance the React ecosystem by providing more structure and efficiency. Moving forward, learning and building projects with frameworks like Next.js will deepen your understanding and improve your development skills.

## Practical Summary

1. **Component as a Blueprint:**

   - A component serves as a blueprint for a UI element.
   - When used, React creates a component instance, which is a physical manifestation with props, state, effects, etc.
   - The component instance, when rendered, returns a React element.

2. **Rendering vs. Committing:**

   - Rendering means calling component functions and determining what DOM elements need to be inserted, deleted, or updated.
   - Committing refers to actually updating the DOM, done by ReactDOM or other renderers.

3. **Render Triggers:**

   - Initial app render and state updates trigger renders.
   - The entire application re-renders, not just a single component.
   - Re-rendering affects all child components, but not all elements are updated in the DOM due to reconciliation.

4. **Diffing Algorithm:**

   - Diffing determines which DOM elements to add or modify.
   - If an element stays in the same position, its DOM and state remain unchanged.
   - Changes in position or type result in the destruction and resetting of DOM elements and states.

5. **Using Key Props:**

   - Keys help React identify elements uniquely, preventing unnecessary DOM recreations.
   - Changing a key will result in the destruction and rebuilding of the DOM element.

6. **Avoid Declaring Components Inside Components:**

   - Declaring a new component inside another will recreate it on every re-render of the parent.
   - Always declare components at the top level of a file to avoid unnecessary state resets.

7. **Render Logic Constraints:**

   - Render logic should not produce side effects such as API calls, timers, or state updates.
   - Side effects should be managed inside event handlers or `useEffect`.

8. **Committing Phase:**

   - The DOM update occurs during the commit phase, handled by ReactDOM or other renderers.

9. **State and Event Handling:**

   - Multiple state updates within an event handler are batched, leading to a single re-render for performance.
   - State updates are asynchronous; immediate access to updated state values is not guaranteed.
   - Synthetic events, provided by React, ensure consistent behavior across browsers and include more events than native ones.

10. **React's Library Nature:**
    - React is a library, not a framework, allowing the use of various third-party libraries.
    - While this provides flexibility, it requires selecting and learning from a vast number of libraries.
    - Commonly used libraries will be covered in the course's main projects.

This summary captures the key practical takeaways from the section, focusing on concepts you need to apply while working with React.
