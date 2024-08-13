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

## Lifting State and Inverse Data Flow in React

### 1. Lifting State

- **Purpose**: We need the new items array and its event handler function in both sibling components (Form and Packing List). The Form is used to create new items and add them to the array, while the Packing List renders the list items on the UI.
- **Solution**: To share the state and the event handler across these sibling components, we lift the state and the event handler to their closest common parent, i.e., the `App` component.

### 2. One-Way Data Flow in React

- **Challenge**: React enforces one-way data flow, meaning data can only flow from parent to child components, not sideways between sibling components.
- **Example**: In a checkout interface, the `Promotions` component allows users to input coupon codes, creating a `coupons` state. However, the `Total` component also needs access to this `coupons` state to calculate the total price, presenting a challenge since we can't directly share state across siblings.

### 3. Solution: Lifting State Up

- **Process**: To solve this problem, we lift the `coupons` state up to a common parent component (`Checkout` in the example). By doing this, both `Promotions` and `Total` can receive the `coupons` state as props from their parent.

### 4. Updating the Parent State from a Child Component

- **Problem**: After lifting the state to a parent component, the child component no longer has direct control over it, so how can it update this state?
- **Solution**: We pass down the setter function (e.g., `setCoupons`) as a prop to the child components that need to update the state. This approach enables child components to call this function and update the state in the parent component.

### 5. Inverse Data Flow (Child-to-Parent Communication)

- **Explanation**: By passing down a setter function, we enable a form of child-to-parent communication, sometimes referred to as "inverse data flow." While React generally enforces one-way data flow from parent to child, this technique allows data to effectively "flow" up the tree by updating the parent state from a child component.

## Derived State in React

- **Understanding Derived State:**
  Derived state refers to state that is computed from existing state or props. Instead of maintaining multiple state variables, derived state allows you to calculate certain values directly from another piece of state, simplifying your component logic.

- **Example Scenario:**
  Consider a React component with three states: `cart`, `numItems`, and `totalPrice`. In this example, `numItems` represents the number of items in the cart, and `totalPrice` is the sum of all item prices. Both `numItems` and `totalPrice` are derived from the `cart` state.

- **Problems with Multiple State Variables:**
  Having separate state variables for `numItems` and `totalPrice` can lead to issues. Since these values depend on the `cart` state, they must be manually updated whenever `cart` changes. This can result in inconsistencies and bugs if not handled correctly.

- **Unnecessary Rerenders:**
  Updating `numItems`, `totalPrice`, and `cart` separately causes the component to rerender multiple times, which is inefficient and unnecessary. This happens because each state update triggers a rerender, leading to performance issues.

- **The Solution - Deriving State:**
  Instead of creating separate state variables, you can derive `numItems` and `totalPrice` from the `cart` state. By using regular variables, you eliminate the need for additional `useState` calls. This approach ensures that all related data remains consistent and avoids unnecessary rerenders.

- **Single Source of Truth:**
  The `cart` state becomes the single source of truth, meaning all related values are derived from it. This makes your code more maintainable and reduces the risk of state mismatches or inconsistencies.

- **Automatic Recalculation:**
  When the `cart` state updates, the component rerenders, and the derived values (`numItems` and `totalPrice`) are automatically recalculated. This ensures that your UI always reflects the latest data without manual updates.

- **Best Practice:**
  Whenever possible, prefer derived state over creating multiple state variables. This approach minimizes complexity and prevents common mistakes, such as managing redundant or unnecessary state.
