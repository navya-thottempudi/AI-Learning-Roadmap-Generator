const generateBtn =
document.getElementById("generateBtn");

const loading =
document.getElementById("loading");

generateBtn.addEventListener(
    "click",
    generateRoadmap
);

async function generateRoadmap(){

    try{

        const goal =
        document.getElementById("goal").value;

        const level =
        document.getElementById("level").value;

        const hours =
        document.getElementById("hours").value;

        const freeOnly =
        document.getElementById("freeOnly").checked;

        if(!hours){

    alert(
    "Please enter study hours."
    );

    return;
}

if(hours > 168){

    alert(
    "Study hours per week cannot exceed 420."
    );

    return;
}

        loading.style.display = "block";

        let phaseCount;

if(hours <= 5){

    phaseCount = 8;

}
else if(hours <= 10){

    phaseCount = 6;

}
else if(hours <= 20){

    phaseCount = 5;

}
else{

    phaseCount = 4;

}

        const prompt = `

Return ONLY valid JSON.

Do not use markdown.

Create a personalized learning roadmap.

Goal: ${goal}

Skill Level: ${level}

Study Hours Per Week: ${hours}

Free Resources Only:
${freeOnly}

Response format:

{
   "goal":"",
  "estimatedDuration":"",
  "overview":"",
  "careerOutcome":"",
  "phases":[
    {
      "title":"",
      "duration":"",
      "skills":[],
      "projects":[],
      "resources":[
        {
          "name":"",
          "url":""
        }
      ]
    }
  ]
}

Generate exactly ${phaseCount} phases.
Write a short overview (2-3 sentences).
Write a realistic career outcome based on the roadmap.

`;

        const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[
                    {
                        parts:[
                            {
                                text:prompt
                            }
                        ]
                    }
                ]

            })

        });

        const data =
        await response.json();
        let roadmapText =
        data.candidates[0]
        .content.parts[0].text;
        
        roadmapText =
        roadmapText
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();
        
        JSON.parse(roadmapText);
        
        // Save latest roadmap
        localStorage.setItem(
            "roadmap",
            roadmapText
        );
        
        // Save roadmap history
        let savedRoadmaps =
        JSON.parse(
        localStorage.getItem("savedRoadmaps")
        ) || [];
        
        savedRoadmaps.push(
        JSON.parse(roadmapText)
        );
        
        localStorage.setItem(
        "savedRoadmaps",
        JSON.stringify(savedRoadmaps)
        );
        
        loading.style.display = "none";
        window.location.href =
        "roadmap.html";
    }

    catch(error){
        console.error(error);
        loading.style.display = "none";
        alert(
        "Failed to generate roadmap."
        );

    }

}