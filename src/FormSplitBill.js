import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ friend, calculateSplit }) {
    const [bill, setBill] = useState("");
    const [expense, setExpense] = useState("");
    const friendsExpense = bill ? bill - expense : "";
    const [whoIsPaying, setWhoisPaying] = useState("user")

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !expense) return;
        calculateSplit(whoIsPaying === 'user' ? friendsExpense : -expense)

    }

    return <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {friend.name}</h2>

        <label>💰 Bill value</label>
        <input type="text" value={bill} onChange={e => setBill(+e.target.value)} />

        <label>🧑‍🦱 Your expense</label>
        <input type="text" value={expense} onChange={e => setExpense(+e.target.value > bill ? expense : +e.target.value)} />

        <label>🫂 {friend.name}'s expense</label>
        <input type="text" value={friendsExpense} disabled />

        <label>🤑Who is paying the bill</label>
        <select value={whoIsPaying} onChange={e => setWhoisPaying(e.target.value)}>
            <option value="user">You</option>
            <option value="friend">{friend.name}</option>
        </select>

        <Button>Split bill</Button>
    </form>
}