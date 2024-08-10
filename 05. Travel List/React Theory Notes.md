# React Theory Learnings

This repository contains my notes and summaries on various concepts in React. It covers essential topics like controlled elements, state and props, thinking in React, and state management. These notes are intended to provide a quick reference and help reinforce my understanding of React.

## Table of Contents

- [Controlled Elements in React](#controlled-elements-in-react)
- [Understanding State and Props in React](#understanding-state-and-props-in-react)
- [Thinking in React](#thinking-in-react)
- [State Management in React](#state-management-in-react)
  - [When and Where to Use State](#when-and-where-to-use-state)

---

## Controlled Elements in React

### Default Behavior of Input Fields

- Input fields like `<input>` and `<select>` maintain their own state in the DOM, making it difficult to manage their state effectively.
- React centralizes state within the application, rather than allowing the DOM to manage it.

### Controlled Elements

- Controlled elements in React mean that React, not the DOM, controls the state of input fields.
- This technique helps achieve centralized state management.

### Steps to Implement Controlled Elements

1. **Create a Piece of State:**
   - Example: `const [description, setDescription] = useState('');`
2. **Use State as Value of Input Field:**
   - Example: `<input type="text" value={description} />`
3. **Listen for Change Event:**
   - Example: `<input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />`

---

## Understanding State and Props in React

### What's the difference between state and props?

#### State:

- Internal data owned by the component.
- Acts as the component's memory, holding data over time across rerenders.
- Updating state rerenders the component, making it interactive.

#### Props:

- External data passed from parent to child components.
- Like function parameters, used to configure child components.
- Props are read-only and cannot be modified by the receiving component.

#### Connection between State and Props:

- Passing state as props ensures that both the owning component and the child component rerender when the state updates.

---

## Thinking in React

### React Development Mindset

- React requires a different mindset compared to vanilla JavaScript.
- Focus on state transitions rather than element mutations.

### Process Overview:

1. **Break UI into Components:**
   - Identify and structure reusable UI components.
2. **Build a Static Version:**
   - Create a non-interactive version, focusing on the UI.
3. **State Management:**
   - Decide when and where to use state (local/global).
4. **Data Flow:**
   - Establish how data flows through the application, using one-way data flow, child-to-parent communication, and global state management.

---

## State Management in React

### Overview

- State management is crucial in React.
- `useState` is used to create state that tracks data changes during an app's lifecycle.

### Types of State:

1. **Local State:**
   - Needed by one or a few related components.
   - Example: Search bar input text.
2. **Global State:**
   - Needed by multiple components across the app.
   - Managed using React Context API or libraries like Redux.
   - Example: Shopping cart data.

### When and Where to Use State

#### When to Create State:

1. **Check if Data Changes:**
   - Use a regular variable if it doesn't change; use state if it does.
2. **Can the Data be Derived?**
   - Derive new data from existing state or props if possible, instead of creating new state.
3. **Should Updating State Re-render the Component?**
   - If yes, create state using `useState`; if no, consider using a ref.

#### Where to Place State:

1. **Component-specific State:**
   - Keep state within the component if only it needs it.
2. **Pass State to Child Components:**
   - Pass state down via props if child components need it.
3. **Lifting State Up:**
   - Lift state to the closest common ancestor if multiple components need the same state.

---
