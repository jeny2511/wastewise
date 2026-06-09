import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "wastewise-6bb48.firebaseapp.com",
  projectId: "wastewise-6bb48",
  storageBucket: "wastewise-6bb48.firebasestorage.app",
  messagingSenderId: "968963179738",
  appId: "1:968963179738:web:e0c7916841fd3cc6f651e3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const loginBtn =
document.getElementById("login-btn");

loginBtn.addEventListener("click", async () => {

    const password =
    document.getElementById("password").value;

    if(password !== "WasteWise2026"){

        document.getElementById("error")
        .innerText = "Wrong Password";

        return;
    }

    document.getElementById("login-section")
    .style.display = "none";

    document.getElementById("dashboard")
    .style.display = "block";

    loadDashboard();

});

async function loadDashboard(){

    const querySnapshot =
    await getDocs(
        collection(db,"assessments")
    );

    let total = 0;
    let scoreSum = 0;
    let highest = 0;

    let weakCounter = {};

    const table =
    document.getElementById(
        "participantTable"
    );

    querySnapshot.forEach((doc)=>{

        const data = doc.data();

        total++;

        scoreSum += data.score;

        if(data.score > highest)
            highest = data.score;

        data.weakTopics.forEach(topic => {

            weakCounter[topic] =
            (weakCounter[topic] || 0)+1;

        });

        table.innerHTML += `
            <tr>
                <td>${data.name}</td>
                <td>${data.score}/15</td>
            </tr>
        `;
    });

    const avg =
    total ? ((scoreSum/(total*15))*100)
    .toFixed(1) : 0;

    let commonWeak = "-";
    let max = 0;

    for(let topic in weakCounter){

        if(weakCounter[topic] > max){

            max = weakCounter[topic];
            commonWeak = topic;

        }
    }

    document.getElementById(
        "totalAssessments"
    ).innerText = total;

    document.getElementById(
        "averageScore"
    ).innerText = avg + "%";

    document.getElementById(
        "highestScore"
    ).innerText = highest + "/15";

    document.getElementById(
        "weakArea"
    ).innerText = commonWeak;

}