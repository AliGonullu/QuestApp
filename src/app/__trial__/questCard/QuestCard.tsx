"use client";

import { useState } from "react";
import "./QuestCard.css";

type QuestCardProps = {
    id: number;
    title: string;
    time: string;
    date: string;
    onEdit: (id: number, title: string, date: string, time: string) => void;
    deleteQuest: () => void;
};

function QuestCard({id, title, time, date, onEdit, deleteQuest }: QuestCardProps) {
    const [edittedQuestTile, setEdittedQuestTitle] = useState<string>(title);
    const [edittedQuestDate, setEdittedQuestDate] = useState<string>(date);
    const [edittedQuestTime, setEdittedQuestTime] = useState<string>(time);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        onEdit(id, edittedQuestTile, edittedQuestDate, edittedQuestTime);
    };

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEdittedQuestTitle(e.target.value);
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEdittedQuestDate(e.target.value);
    }

    function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEdittedQuestTime(e.target.value);
    }

    function editForm() {
        return <div className="QuestEditBox">
            <h2 className="QuestEditTitle">Edit Quest</h2>
            <div className="QuestEditInputs">
                <input className="QuestEditTitleInput" type="text" placeholder="Enter Quest Title..."
                    onChange={handleTitleChange} /><br />
                <input className="QuestEditDateInput" type="date"
                    onChange={handleDateChange} />
                <input className="QuestEditTimeInput" type="time"
                    onChange={handleTimeChange} />
            </div>
            <button className="EditSubmit" onClick={() => handleEdit()}>Change</button>
        </div>
    }

    return (
        <>
            <div className="QuestCardBox">
                <button className="CancelButton"
                    onClick={() => deleteQuest()}>❌</button>
                <button className="EditButton"
                    onClick={() => setIsEditing(!isEditing)}>🖋</button>
                <h1 className="QuestTitle">{title}</h1>
                <p className="QuestDate">{date} | {time}</p>
            </div>
            {isEditing ? editForm() : <></>}
        </>
    );
}

export default QuestCard;