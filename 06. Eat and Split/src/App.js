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
  // Also rerender the Component
  // As the Component is rendered in App Component hence we define a State here
  // As its initially hidden hence false
  const [addFriend, setAddFriend] = useState(false);

  // We render the Friends list in the FriendsList component, but we add a new Friend in the FordAddFriend component hence we wan to update the friends list here
  // As the State needs to be accessed in the FriendsList component & update i.e. the setter needs up update the state in FormAddFriend component
  // Hence as both the siblings component need access to the state and the setter function hence we Uplift the State to their nearest parent component
  // We can have te Array empty [] / initialFriends as we wish
  const [friends, setFriends] = useState(initialFriends);

  // Same Uplifting State when we select a friend to split bill
  // We want the List and the split bill component to communicate with each other
  // As both of them are sibling components hence we uplift ht estate to nearest parent component
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Event Handler for Add Friend
  function handleAddFriend() {
    // Here we toggle the state of addFriend to open the Form
    setAddFriend(!addFriend);
  }

  // Event Handler for Split Bill for Selected Friend
  function handleSelection(friend) {
    // When a select is clicked the associated friend is set as the currently selected
    // setSelectedFriend(friend);

    // When a select is clicked the associated friend is set as the currently selected, also if the friend tab is already open for split bill and we click again we want to close the tab hence get the selectedFriend back to null
    // Using ?. nullish coalescing so as to avoid error of reading null.id when the value is bull
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
  }

  // Event Handler for Add Friends
  function handleAddFriends(friend) {
    // Here we add the new friend to the friends list
    // We use the spread operator to create a new array with the new friend and the old friends
    setFriends((friends) => [...friends, friend]);

    // After adding the new friend, we close the Form
    setAddFriend(false);
  }

  function handleSplitBill(value) {
    // Creating a new array with the updated data of who ows you and who do u owe money in the new array
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    );

    // Close the Form after bill split
    setSelectedFriend(null);
  }

  // Render App Component
  return (
    <div className='app'>
      <div className='sidebar'>
        {/* FriendsList needs the Setter function hence we pass it in here */}
        <FriendsList
          onSelection={handleSelection}
          friends={friends}
          selectedFriend={selectedFriend}
        />

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
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendsList({ onSelection, friends, selectedFriend }) {
  // Rendering Each friend iof Friends Array using .map()
  return (
    <ul>
      {friends.map((friend) => (
        // Now as the Friends component also needs it hence we pass the setter function further down to the Friends component
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  // taking the currently selected friend and comparing with each friend
  // Marking the matching one as selected with the selected class
  // Using ?. nullish coalescing so as to avoid error of reading null.id when the value is bull
  const isSelected = selectedFriend?.id === friend.id;

  // Rendering Each Friend component as a list item
  return (
    <li className={isSelected ? 'selected' : ''}>
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
      {/* 
      - Using the passed setter function to save the current friend in the selected friends state
      - As we want to pass the friend as an argument hence we don it in this way of callback 
      - Using the boolean value of isSelected to make sure to add the CLose text to the Button for currently selected friend
      */}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  // States to hold each of the input data with their default values
  // Implementing Controlled Elements to store their data
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  // Derived State
  const paidByFriend = bill ? bill - paidByUser : '';

  // Event Handler for Submitting the Split Bill Form
  function handleSubmit(e) {
    // Prevent default reload always
    e.preventDefault();

    if (!bill || !paidByUser) return;

    // If i am paying the Bill my friend ows me the Money and visa versa
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : paidByUser);
  }

  // Implementing Controlled Elements in every select and input field
  // Converting the String Numbers to Digits using +
  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a Bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      ></input>

      <label>🕴️ Your Expense</label>
      <input
        type='text'
        value={paidByUser}
        onChange={(e) =>
          //  To keep the range of amount to enter within the bill range
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      ></input>

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      <input type='text' disabled value={paidByFriend}></input>

      <label>🤑 Who's paying the Bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
