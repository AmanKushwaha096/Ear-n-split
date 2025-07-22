import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({addFriends}){
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