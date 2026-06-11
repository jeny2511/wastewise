const actions = [

{
title:"♻️ Use a Reusable Water Bottle",
impact:"Can prevent hundreds of plastic bottles from entering landfills every year."
},

{
title:"📂 Replace Plastic Files with Cardboard Files",
impact:"Reduces non-biodegradable plastic waste and supports recyclable materials."
},

{
title:"🛍 Carry a Cloth Bag",
impact:"One cloth bag can replace hundreds of plastic bags."
},

{
title:"🚰 Turn Off the Tap While Brushing",
impact:"Can save 8–10 liters of water every day."
},

{
title:"🍌 Separate Food Waste",
impact:"Helps create compost instead of landfill waste."
},

{
title:"📄 Print Only When Necessary",
impact:"Reduces paper waste and saves trees."
},

{
title:"🔋 Dispose Batteries Properly",
impact:"Prevents toxic chemicals from polluting soil and water."
},

{
title:"☕ Carry a Reusable Cup",
impact:"Reduces disposable cup waste significantly."
},

{
title:"📱 Use Devices Longer",
impact:"Reduces electronic waste generation."
},

{
title:"🔌 Unplug Unused Chargers",
impact:"Reduces unnecessary energy consumption."
},

{
title:"🧃 Recycle Plastic Containers",
impact:"Keeps recyclable materials out of landfills."
},

{
title:"🥗 Avoid Food Waste",
impact:"Reduces methane emissions from landfills."
},

{
title:"🚲 Walk or Cycle Short Distances",
impact:"Reduces carbon emissions and improves health."
},

{
title:"🌱 Plant One Tree",
impact:"A tree can absorb carbon dioxide for decades."
}

];

function showAction(){

    const randomAction =

    actions[
        Math.floor(
            Math.random() * actions.length
        )
    ];

    document.getElementById(
        "actionCard"
    ).style.display = "block";

    document.getElementById(
        "actionCard"
    ).innerHTML = `

        <h2>${randomAction.title}</h2>

        <p>

            ${randomAction.impact}

        </p>

    `;
}