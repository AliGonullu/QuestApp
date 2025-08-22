const express = require('express');
const fs = require('fs');
const cors = require('cors');

datapath = "quests.json";

let quests = [];
let currentId = 0;

const app = express();
app.use(cors());
app.use(express.json());


function loadQuests() {
    if (fs.existsSync(datapath)) {
        const data = fs.readFileSync(datapath);
        const jsonQuests = JSON.parse(data);
        currentId = jsonQuests.length > 0 ? Math.max(...jsonQuests.map(q => q.id)) + 1 : 0;
        quests = jsonQuests;        
        console.log("Quests loaded:", jsonQuests);
    } else {
        console.log("No quests.json found. Starting fresh.");
    }
}

function saveQuestsToFile() {
    const dataToWrite = JSON.stringify(quests, null, 2);
    fs.writeFile(datapath, dataToWrite, (err) => {
        if (err) throw err;
        console.log("All quests saved to file.");
    });
}


app.get("/", (req, res) => {
    loadQuests();
    res.json(quests);
});

app.post("/", (req, res) => {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
        return res.status(400).json({ message: "Invalid Data" });
    }

    const newQuest = {
        id: currentId,
        title: title,
        date: date,
        time: time
    }
    currentId++;
    quests.push(newQuest);
    saveQuestsToFile(); 
    res.status(201).json(quests);
});

app.put("/quests/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, date, time } = req.body;
    const questIdx = quests.findIndex((q) => q.id === id);

    if (questIdx === -1) {
        return res.status(404).json({ message: "Quest not found" });
    }

    console.log(title);
    if (title != "") {
        quests[questIdx].title = title;
    }
    if (date != "") {
        quests[questIdx].date = date;
    }
    if (time != "") {
        quests[questIdx].time = time;
    }
    saveQuestsToFile();
    res.status(201).json(quests);
});

app.delete("/quests/:id", (req, res) => {
    const id = parseInt(req.params.id);
    quests = quests.filter((q) => q.id !== id);
    saveQuestsToFile();
    res.status(201).json(quests);
});

app.listen(5000, () => {
    loadQuests();
    console.log("http://localhost:5000");

});

