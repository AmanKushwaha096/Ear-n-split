import { useState } from "react";
import FriendsList from "./FriendsList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import Button from "./Button";

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


export default function App(){
  const [showAddFriend,setShowAddFriend] = useState(false);
  const [friendsList,setFriendsList] = useState(initialFriends);
  const [splitWithFriend,setSplitWithFriend] = useState('');
  


  function toggleShow(){
    setShowAddFriend(show =>!show);
  }
  function handleAddFriends(newFriend){
    setFriendsList(friends => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSplit(friend){
    setSplitWithFriend((cur)=> cur?.id === friend.id ? null : friend)
    setShowAddFriend(false);
  }

  function calculateSplit(value){
    setFriendsList(friends => friends.map(friend => friend.id === splitWithFriend.id ? {...friend,balance : friend.balance +value} : friend ))
    setSplitWithFriend(null);
  }

  return <div className="app">
    <div className="sidebar">
      <FriendsList friendsList={friendsList} onSelect ={handleSplit}  selectedFriend={splitWithFriend}/>

      {showAddFriend && <FormAddFriend friendsList={friendsList} addFriends={handleAddFriends} toggleShow={toggleShow}/>}
      <Button onClick={toggleShow}>{showAddFriend ? 'Close' :'Add friend'}</Button>
    </div>
    {splitWithFriend && <FormSplitBill friend={splitWithFriend} calculateSplit={calculateSplit} />}
  </div>
}







