"use client";
import { useEffect, useState } from "react";
import "./QuestCardCreator.css";
import getCurrentTime, { getCurrentDate } from "../questUtils/getCurrentTime";
import SortQuests from "../sortQuests/SortQuests";

function QuestCardCreator() {
    const [questCards, setQuestCards] = useState<Quest[]>([]);
    const [newQuestTitle, setNewQuestTitle] = useState<string>("");
    const [newQuestDate, setNewQuestDate] = useState<string>("");
    const [newQuestTime, setNewQuestTime] = useState<string>("");
    const [questListSortingType, setQuestListSortingType] = useState<"None" | "Date" | "Alphabetical">("None");
    const [questListSortingDirection, setQuestListSortingDirection] = useState<"Descending" | "Ascending">("Ascending");

    useEffect(() => {
        async function fetchQuests() {
            const response = await fetch("http://localhost:5000");
            const questsFromServer = await response.json();
            if (response.ok) {
                setQuestCards(questsFromServer);
            }
        }
        fetchQuests();
    }, []);

    useEffect(() => {
        console.log(questCards);
    }, [questCards]);

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewQuestTitle(e.target.value);
    }
    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewQuestDate(e.target.value);
    }
    function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewQuestTime(e.target.value);
    }

    async function deleteQuest(idx: number) {
        const response = await fetch(`http://localhost:5000/quests/${idx}`, {
            method: "DELETE",
        });
        const newQuestArray = await response.json();
        if (response.ok) {
            setQuestCards(newQuestArray);
        }
    }

    async function handleSubmit() {
        const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newQuestTitle,
                date: newQuestDate || getCurrentDate(),
                time: newQuestTime || getCurrentTime()
            }),
        });
        const newQuestArray = await response.json();
        if (response.ok) {
            setQuestCards(newQuestArray);
            setNewQuestTitle("");
            setNewQuestDate(getCurrentDate());
            setNewQuestTime(getCurrentTime());
        }
    }

    async function handleEditQuest(questId: number, edittedQuestTile: string, edittedQuestDate: string, edittedQuestTime: string) {
        const response = await fetch(`http://localhost:5000/quests/${questId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: edittedQuestTile,
                date: edittedQuestDate || getCurrentDate(),
                time: edittedQuestTime || getCurrentTime()
            }),
        });
        const newQuestArray = await response.json();
        if (response.ok) {
            setQuestCards(newQuestArray);
        }
    };

    return (
        <div className="PageContainer">
            <div className="SortingControls">
                <select className="SortingSelect" value={questListSortingType} onChange={(e) => setQuestListSortingType(e.target.value as "None" | "Date" | "Alphabetical")}>
                    <option value="None">No Sorting</option>
                    <option value="Date">Sort by Date</option>
                    <option value="Alphabetical">Sort Alphabetically</option>
                </select>
                {
                    (questListSortingType === "None") ? <></> :
                        <select className="SortDirectionSelect" value={questListSortingDirection} onChange={(e) => setQuestListSortingDirection(e.target.value as "Descending" | "Ascending")}>
                            <option value="Descending">Descending</option>
                            <option value="Ascending">Ascending</option>
                        </select>
                }
            </div>

            <div className="QuestCreatorBox">
                <h1 className="QuestCreatorTitle">Quest Creator</h1>
                <div className="QuestCreatorInputs">
                    <input className="QuestTitleInput" type="text" placeholder="Enter Quest Title..."
                        onChange={handleTitleChange} /><br />
                    <input className="QuestDateInput" type="date"
                        value={newQuestDate || getCurrentDate()} onChange={handleDateChange} />
                    <input className="QuestTimeInput" type="time"
                        value={newQuestTime || getCurrentTime()} onChange={handleTimeChange} />
                </div>
                <button className="NewQuestSubmit" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="QuestCardsList">
                <SortQuests
                    sortingType={questListSortingType}
                    sortingDirection={questListSortingDirection}
                    questCards={questCards}
                    onEdit={handleEditQuest}
                    handleEditQuest={handleEditQuest}
                    deleteQuest={deleteQuest}>
                </SortQuests>
            </div>
        </div>
    );
}

export default QuestCardCreator;