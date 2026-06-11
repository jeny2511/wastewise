import { db, collection, addDoc } from "./firebase.js";

async function takePledge() {
  const name = document.getElementById("pledgeName").value.trim();

  if (name === "") {
    alert("Enter your name");

    return;
  }

      localStorage.setItem(
        "pledgeName",
        name
    );

  try {
    await addDoc(collection(db, "pledges"), {
      name: name,
      date: new Date(),
    });

    console.log("Pledge Saved");
  } catch (error) {
    console.error("Firebase Error:", error);
  }

  document.getElementById("message").innerHTML = `
<h2>
    Thank you for taking the WasteWise Pledge 🌱
</h2>

<br>

<button onclick="window.location.href='certificate.html'">

    Generate My Certificate

</button>
`;
}

window.takePledge = takePledge;
