// import { func } from "prop-types";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, className, onClick, type }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriendForm() {
    setShowAddFriendForm((show) => !show);
    // console.log(showAddFriendForm);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriendForm((s) => !s);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((f) => (friend !== f ? friend : null));
    console.log(selectedFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button className={"button"} onClick={handleShowAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend, key) => (
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
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button className={"button"} onClick={() => onSelection(friend)}>
        {selectedFriend == friend ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48");
  function handleAddFriendSubmit(e) {
    e.preventDefault();

    if (!name || !imageURL) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${imageURL}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImageURL("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriendSubmit}>
      <label>👫Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📸Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />

      <Button className={"button"} type={"submit"}>
        Add
      </Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split bill with name</h2>

      <label>💲 Bill Value</label>
      <input type="text" />

      <label>🕴 Your Expense</label>
      <input type="text" />

      <label>🕺 Friend's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying?</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>

      <div id="form-split-bill-buttons">
        <Button className={"split-btn"}>Split Bill</Button>
        <Button className={"delete-btn"}>Delete Friend</Button>
      </div>
    </form>
  );
}
