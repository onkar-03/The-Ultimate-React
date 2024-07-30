// Define an asynchronous function named getTodos
async function getTodos() {
  // Wait for the fetch request to complete and store the response in res
  // 'fetch' initiates a network request and returns a Promise that resolves to a Response object
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');

  // Wait for the response to be parsed as JSON and store the result in data
  // 'res.json()' also returns a Promise that resolves to the parsed JSON data
  const data = await res.json();

  // Log the parsed JSON data to the console
  console.log(data);
}

// Call the getTodos function to actually perform the fetch and log the data
getTodos();

// This line executes immediately because it's a synchronous operation
// It prints the string to the console before the asynchronous fetch operation completes
console.log(`I'm First Again !!`);

/*
Detailed Explanation:

1. `async function getTodos() {}`:
   - Defines an asynchronous function named `getTodos` using the `async` keyword.
   - Asynchronous functions allow the use of the `await` keyword to pause the execution of the function until the awaited Promise resolves.

2. `const res = await fetch('https://jsonplaceholder.typicode.com/todos');`:
   - `fetch()`: A built-in JavaScript function to make network requests.
   - It takes a URL as an argument and optionally an options object.
   - It returns a Promise that resolves to the Response object representing the response to the request.
   - The `await` keyword pauses the execution of the `getTodos` function until the Promise returned by `fetch` resolves.

3. `const data = await res.json();`:
   - `res.json()`: A method on the Response object that parses the response body as JSON.
   - It returns a Promise that resolves to the parsed JSON data.
   - The `await` keyword pauses the execution of the `getTodos` function until the Promise returned by `res.json()` resolves.

4. `console.log(data);`:
   - Logs the parsed JSON data to the console.

5. `getTodos();`:
   - Calls the `getTodos` function to initiate the fetch request and log the data.

6. `console.log('I'm First Again !!');`:
   - This line is executed immediately because it's a synchronous operation.
   - It prints the string to the console before the asynchronous fetch operation completes.
*/
