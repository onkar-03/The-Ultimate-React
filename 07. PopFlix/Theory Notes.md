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

### How Composition Works

- **Children Prop:** One of the most common ways to achieve composition is by using the `children` prop. This allows any content, including other components, to be passed into the parent component, which can then render it appropriately.
- **Component Props:** Another way to compose components is by passing them as explicit props. This allows for even more control over which components are included and how they are rendered.

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
