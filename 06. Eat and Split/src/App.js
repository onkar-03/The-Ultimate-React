import { useState } from 'react';

// Static Data
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

// Button Component
// Reusable at multiple Components
function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  // We need a State to handle the Add new Friend Form on clicking the Button
  // Also rerender teh Component
  // As the Component is rendered in App Component hence we define a State here
  // As its initially hidden hence false
  const [addFriend, setAddFriend] = useState(false);
  const [splitBill, setSplitBill] = useState(false);

  // We render the Friends list in the FriendsList component, but we add a new Friend in the FordAddFriend component hence we wan to update the friends list here
  // As the State needs to be accessed in the FriendsList component & update i.e. the setter needs up update the state in FormAddFriend component
  // Hence as both the siblings component need access to the state and the setter function hence we Uplift the State to their nearest parent component
  // We can have te Array empty [] / initialFriends as we wish
  const [friends, setFriends] = useState(initialFriends);

  // Event Handler for Add Friend
  function handleAddFriend() {
    // Here we toggle the state of addFriend to open the Form
    setAddFriend(!addFriend);
  }

  // Event Handler for Split Bill
  function handleSplitBill() {
    // Here we toggle the state of splitBill to open the Form
    setSplitBill(!splitBill);
  }

  function handleAddFriends(friend) {
    // Here we add the new friend to the friends list
    // We use the spread operator to create a new array with the new friend and the old friends
    setFriends((friends) => [...friends, friend]);

    // After adding the new friend, we close the Form
    setAddFriend(false);
  }

  // Render App Component
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList onClick={handleSplitBill} friends={friends} />

        {/*
        - Conditionally render the Form only when the addFriend value is True
        - When the value is false hide the Form 
        */}
        {addFriend && (
          <FormAddFriend updateFriends={handleAddFriends} friends={friends} />
        )}
        <Button onClick={handleAddFriend}>
          {/* Conditionally render Text based on Open and Closed Form State */}
          {addFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {splitBill && <FormSplitBill onClick={handleSplitBill} />}
    </div>
  );
}

function FriendsList({ onClick, friends }) {
  // Rendering Each friend iof Friends Array using .map()
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onClick={onClick} />
      ))}
    </ul>
  );
}

function Friend({ friend, onClick }) {
  // Rendering Each Friend component as a list item
  return (
    <li className='friend'>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* 
      - Using Conditional Rendering to render the Texts Colors for different cases
      */}
      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} ows you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && (
        <p className=''>You and {friend.name} are even</p>
      )}
      <Button onClick={onClick}>Select</Button>
    </li>
  );
}

function FormAddFriend({ friends, updateFriends }) {
  // As we want to get the Value of the input fields and store it somewhere to use it in our application
  // For this we use the Controlled Elements, where we have one piece of state for each input and retrieve its value from the input fields
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  // To generate random ID
  const id = crypto.randomUUID();

  function handleSubmit(e) {
    // Prevent Default reload
    e.preventDefault();

    // If nothing entered nothing happens
    if (!name || !image) return;

    // Create a new Friend Object to add to the Array
    const newFriend = {
      id,
      name,
      image: `${image}?={id}`,
      balance: 0,
    };

    console.log(newFriend);

    // Add to the existing Array
    // using destructuring
    updateFriends(newFriend);

    // We would also reset the form fields
    setName('');
    setImage('https://i.pravatar.cc/48');

    // We would also reset the form fields
    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Add Friend</label>
      {/* Using Controlled Elements  */}
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌞image url</label>
      {/* Using Controlled Elements  */}
      <input
        type='text'
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>.
    </form>
  );
}

function FormSplitBill({ onClick }) {
  return (
    <form className='form-split-bill'>
      <h2>Split a Bill with X</h2>
      <label>💰 Bill Value</label>
      <input type='text'></input>

      <label>🕴️ Your Expense</label>
      <input type='text'></input>

      <label>🧑‍🤝‍🧑 X's Expense</label>
      <input type='text' disabled></input>

      <label>🤑 Who's paying the Bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button onClick={onClick}>Split Bill</Button>
    </form>
  );
}
