// Initiate a network request to the given URL
// Its an Asynchronous request
fetch('https://jsonplaceholder.typicode.com/todos')
  // The `fetch()` function returns a Promise that resolves to a Response object
  .then((res) =>
    // Convert the response body to JSON; this returns a Promise that resolves to the parsed JSON data
    res.json(),
  )
  // Handle the parsed JSON data
  .then((data) =>
    // Log the JSON data to the console
    console.log(data),
  );

// This line executes first because it's a synchronous operation
console.log(`Hello I'm First`);

/*
Detailed Explanation:

1. `fetch('https://jsonplaceholder.typicode.com/todos')`:
   - `fetch()`: A built-in JavaScript function to make network requests
   - It takes a URL as an argument and optionally an options object
   - It returns a Promise that resolves to the Response object representing the response to the request

2. `.then((res) => res.json())`:
   - The `then()` method is called on the Promise returned by `fetch()`
   - It takes a callback function that receives the Response object (`res`)
   - `res.json()`: The Response object has a `json()` method which parses the response body as JSON
   - `res.json()` also returns a Promise that resolves to the parsed JSON data

3. `.then((data) => console.log(data))`:
   - The second `then()` method is called on the Promise returned by `res.json()`.
   - It takes a callback function that receives the parsed JSON data (`data`).
   - `console.log(data)`: Logs the JSON data to the console.

4. `console.log('Hello I'm First')`:
   - This line is executed immediately because it is a synchronous operation.
   - It prints the string to the console before the asynchronous fetch operation completes.
*/
