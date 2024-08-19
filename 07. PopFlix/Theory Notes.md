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

### Downsides of Prop Drilling

- **Increased Boilerplate Code:** Prop drilling often leads to repetitive and verbose code, as you must explicitly pass data or functions through multiple layers of components.
- **Tightly Coupled Components:** Intermediary components that merely pass down props become tightly coupled with the data, making them harder to reuse in different contexts without modifying the prop structure.

- **Complexity in Maintenance:** As the component tree grows, managing and understanding how data flows through the components becomes more challenging, leading to increased difficulty in maintaining the codebase.
