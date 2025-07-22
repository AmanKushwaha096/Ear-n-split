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


function Button({ children,onClick }) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}

export default function App(){
  const [showAddFriend,setShowAddFriend] = useState(false);
  const [friendsList,setFriendsList] = useState(initialFriends);

  function toggleShow(){
    setShowAddFriend(show =>!show);
  }
  function handleAddFriends(newFriend){
    setFriendsList(friends => [...friends, newFriend]);
    setShowAddFriend(false);
  }




  return <div className="app">
    <div className="sidebar">
      <FriendsList friendsList={friendsList}/>
      {showAddFriend && <FormAddFriend friendsList={friendsList} addFriends={handleAddFriends} toggleShow={toggleShow}/>}
      <Button onClick={toggleShow}>{showAddFriend ? 'Close' :'Add friend'}</Button>
    </div>
    <FormSplitBill/>
  </div>
}

function FriendsList({friendsList}){
  // const friends = initialFriends;

  return <ul>
    {friendsList.map(friend => <Friend friend={friend} key={friend.id}/>)}
  </ul>
}

function Friend({friend}){
  return(
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance <0  && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}
      </p> }
      {friend.balance > 0 && <p className="green">{friend.name} owes you ${friend.balance}
      </p>}
      {friend.balance === 0 && <p >You and {friend.name} are even
      </p>}

      <Button>Select</Button>
    </li>
  )
}


function FormAddFriend({addFriends}){
  const [name,setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  function handleSubmit(e){
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name , image : `${image}?=${id}`,balance : 0,id
    }
    // setFriendsList(friends => [...friends,newFriend]);
    addFriends(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48')

  }
  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🫂 Friend name</label>
    <input value={name} type="text" onChange={e => setName(e.target.value)}/>

    <label>📷 Image URL</label>
    <input value={image} type="text" onChange={e => setImage(e.target.value)} />

    <Button>Add</Button>
  </form>
}

function FormSplitBill(){
  return <form className="form-split-bill">
    <h2>Split a bill with X</h2>

    <label>💰 Bill value</label>
    <input type="text" />

    <label>🧑‍🦱 Your expense</label>
    <input type="text" />

    <label>🫂 X's expense</label>
    <input type="text" disabled/>

    <label>🤑Who is paying the bill</label>
    <select>
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>

    <Button>Split bill</Button>
  </form>
}