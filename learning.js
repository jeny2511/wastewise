const learningContent = document.getElementById("learning-content");

const weakTopics =
JSON.parse(localStorage.getItem("weakTopics")) || [];

const content = {

    "Wet Waste": `
        <div class="card">
            <h2>Wet Waste</h2>
            <ul>
                <li>Includes food scraps, fruit peels and flowers.</li>
                <li>Can be converted into compost.</li>
                <li>Should be disposed in the green bin.</li>
                <li>Do not mix with dry waste.</li>
            </ul>
        </div>
    `,

    "Dry Waste": `
        <div class="card">
            <h2>Dry Waste</h2>
            <ul>
                <li>Includes paper, plastic, glass and metal.</li>
                <li>Most dry waste can be recycled.</li>
                <li>Should be disposed in the blue bin.</li>
                <li>Keep recyclable items clean whenever possible.</li>
            </ul>
        </div>
    `,

    "E-Waste": `
        <div class="card">
            <h2>E-Waste</h2>
            <ul>
                <li>Includes batteries, chargers, earphones and electronic devices.</li>
                <li>Contains harmful chemicals.</li>
                <li>Should not be thrown in regular bins.</li>
                <li>Dispose through authorized e-waste collection centers.</li>
            </ul>
        </div>
    `,

    "Biomedical Waste": `
        <div class="card">
            <h2>Biomedical Waste</h2>
            <ul>
                <li>Includes masks, bandages and medical waste.</li>
                <li>Can spread infections if handled improperly.</li>
                <li>Requires special disposal methods.</li>
                <li>Should never be mixed with household waste.</li>
            </ul>
        </div>
    `,

    "General Awareness": `
        <div class="card">
            <h2>General Waste Awareness</h2>
            <ul>
                <li>Practice the 3Rs: Reduce, Reuse, Recycle.</li>
                <li>Segregate waste at the source.</li>
                <li>Reduce single-use plastics.</li>
                <li>Proper waste management helps protect the environment.</li>
            </ul>
        </div>
    `
};

if(weakTopics.length === 0){

    learningContent.innerHTML = `
        <div class="card">
            <h2>Great Job!</h2>
            <p>
                No major weak areas were detected.
                You can still take the assessment again.
            </p>
        </div>
    `;

}else{

    weakTopics.forEach(topic => {

        if(content[topic]){
            learningContent.innerHTML += content[topic];
        }

    });

}