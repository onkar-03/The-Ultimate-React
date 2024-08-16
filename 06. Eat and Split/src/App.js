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

  // Event Handler for Add Friend
  function handleAddFriend() {
    // Here we toggle the state of addFriend to open the Form
    setAddFriend(!addFriend);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList />

        {/*
        - Conditionally render the Form only when the addFriend value is True
        - When the value is false hide the Form 
        */}
        {addFriend && <FormAddFriend />}
        <Button onClick={handleAddFriend}>
          {/* Conditionally render Text based on Open and Closed Form State */}
          {addFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  // Rendering Each friend iof Friends Array using .map()
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
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
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend }) {
  return (
    <form className='form-add-friend'>
      <label>🧑‍🤝‍🧑Add Friend</label>
      <input type='text' />
      <label>🌞image url</label>
      <input type='text' />
      <Button>Add</Button>.
    </form>
  );
}

function FormSplitBill() {
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

      <Button>Split Bill</Button>
    </form>
  );
}
