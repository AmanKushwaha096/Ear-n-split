import Friend from "./Friend"

export default function FriendsList({ friendsList, onSelect, selectedFriend }) {
    return <ul>
        {friendsList.map(friend => <Friend friend={friend} key={friend.id} setPerson={onSelect} selectedFriend={selectedFriend} />)}
    </ul>
}