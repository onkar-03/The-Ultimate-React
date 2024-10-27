// --- Designing A Custom Provider & Hook !!

import { createContext, useContext, useState } from 'react';
import { faker } from '@faker-js/faker';

// Context API
// 1. Creating a New Context Provider
// The var 'PostContext' is in uppercase because its a component and the components are declared using Uppercase letters

// Create a new context to store Pots Information
const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// Provider Component that provides the Context
function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost()),
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    // Using the Context we created
    // 2. Provide values to the child components
    // Declare all the props we want the child components to have in the Object created inside the value property
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPosts: handleAddPost,
        onClearPosts: handleClearPosts,

        // Shorthand for assigning a variable to a property with the same name
        // Equivalent to searchQuery: searchQuery
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// Custom Hook
function usePosts() {
  const context = useContext(PostContext);

  // Incase we try to access the value of Provider outside children we get undefined
  // This is because we defined the Post Context for a specific set of components / children only
  if (context === undefined)
    throw new Error('Post Context was used Outside the PostProvider !!');
  return context;
}

export { PostProvider, usePosts };
