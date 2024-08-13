/*
 --- We can Export in 2 Ways:
 - 1. Named export: Where we need to import them with the same name
 - EG: export function Logo(){}, need to import this with the same name Logo in App.js

 - 2. Default export: Where we don't need to import them with the same name, we can use whatever name we want while importing in App.js
 - EG: export default function Logo(){}
*/

export default function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}
