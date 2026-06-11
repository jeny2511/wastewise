const userName =
localStorage.getItem(
    "pledgeName"
);

document.getElementById(
    "certificate-name"
).innerText =
userName.toUpperCase();

document.getElementById(
    "certificate-date"
).innerText =
"Date: " +
new Date().toLocaleDateString();

function getBase64Image(img) {

    const canvas =
        document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx =
        canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL("image/png");
}

async function downloadCertificate(){

    const { jsPDF } =
        window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    const logo = new Image();

logo.src =
    "images/wastewise-logo.png";

await new Promise((resolve) => {

    logo.onload = resolve;

});

const logoData =
    getBase64Image(logo);

doc.addImage(
    logoData,
    "PNG",
    82,
    15,
    45,
    25
);

// Green border
doc.setDrawColor(46, 204, 113);
doc.setLineWidth(2);
doc.rect(10, 10, 190, 277);

// Title
doc.setTextColor(46, 204, 113);
doc.setFontSize(26);
doc.setFont(undefined, "bold");

doc.text(
    "GREEN CITIZEN CERTIFICATE",
    105,
    60,
    { align: "center" }
);

// Subtitle
doc.setTextColor(0, 0, 0);
doc.setFontSize(16);
doc.setFont(undefined, "normal");

doc.text(
    "This certifies that",
    105,
    110,
    { align: "center" }
);

// Name
doc.setTextColor(46, 204, 113);
doc.setFontSize(30);
doc.setFont(undefined, "bold");

doc.text(
    userName.toUpperCase(),
    105,
    95,
    { align: "center" }
);

// Main text
doc.setTextColor(0, 0, 0);
doc.setFontSize(14);
doc.setFont(undefined, "normal");

doc.text(
    "has successfully taken the",
    105,
    135,
    { align: "center" }
);

doc.text(
    "WasteWise Green Citizen Pledge",
    105,
    145,
    { align: "center" }
);

doc.text(
    "and committed to responsible waste management",
    105,
    160,
    { align: "center" }
);

doc.text(
    "and environmental sustainability.",
    105,
    170,
    { align: "center" }
);

// Date
doc.setFontSize(14);

doc.text(
    "Date: " +
    new Date().toLocaleDateString(),
    105,
    205,
    { align: "center" }
);

// Team WasteWise
doc.setDrawColor(46, 204, 113);

doc.line(
    75,
    225,
    135,
    225
);

doc.setFontSize(18);
doc.setFont(undefined, "bold");

doc.text(
    "Team WasteWise",
    105,
    240,
    { align: "center" }
);

doc.save(
    "WasteWise_Certificate.pdf"
);

}

window.downloadCertificate =
downloadCertificate;