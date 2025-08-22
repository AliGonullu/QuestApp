import QuestCard from "../questCard/QuestCard";

type SortQuestsProps = {
    sortingType:  "None" | "Date" | "Alphabetical";
    sortingDirection: "Descending" | "Ascending";
    questCards: Quest[];
    onEdit: Function;
    handleEditQuest: (questId: number, edittedQuestTile: string, edittedQuestDate: string, edittedQuestTime: string) => void;
    deleteQuest: (idx: number) => void;
}

function SortQuests({ sortingType, sortingDirection, questCards, onEdit, handleEditQuest, deleteQuest }: SortQuestsProps) {

    function orderByDate(descending: boolean = false) {
        let sign = descending ? 1 : -1;

        questCards.sort((a, b) => {
            if (a.date < b.date) return sign * 1;
            if (a.date > b.date) return -sign * 1;
            if (a.time < b.time) return sign * 1;
            if (a.time > b.time) return -sign * 1;
            return 0;
        })
        return questCards;
    }

    function orderByAlphabetic(descending: boolean = false) {
        let sign = descending ? 1 : -1;

        questCards.sort((a, b) => {
            if (a.title < b.title) return sign * 1;
            if (a.title > b.title) return -sign * 1;
            if (a.date < b.date) return sign * 1;
            if (a.date > b.date) return -sign * 1;
            return 0;
        })
        return questCards;
    }

    function selectOrder(){
        if(sortingType === "Date") return orderByDate(sortingDirection === "Descending");
        if(sortingType === "Alphabetical") return orderByAlphabetic(sortingDirection === "Descending");
        return questCards;
    }

    return (
        <ul>
            {selectOrder().map((quest, index) =>
                <li key={index}>
                    <QuestCard
                        id={quest.id}
                        title={quest.title}
                        time={quest.time}
                        date={quest.date}
                        onEdit={handleEditQuest}
                        deleteQuest={() => deleteQuest(quest.id)}
                    />
                </li>)}
        </ul>
    );
}

export default SortQuests;