const container =
document.getElementById(
"savedContainer"
);

const savedRoadmaps =
JSON.parse(
localStorage.getItem(
"savedRoadmaps"
)
) || [];

if(savedRoadmaps.length === 0){

    container.innerHTML =
    "<h2>No saved roadmaps found.</h2>";

}
else{

    savedRoadmaps.forEach(
    (roadmap,index)=>{

        container.innerHTML += `

        <div class="phase-card">

            <h2>
            ${roadmap.goal}
            </h2>

            <p>
            ${roadmap.estimatedDuration}
            </p>

            <button
            onclick="openRoadmap(${index})">

            Open

            </button>

            <button
            onclick="deleteRoadmap(${index})">

            Delete

            </button>

        </div>

        `;

    });

}

function openRoadmap(index){

    const roadmaps =
    JSON.parse(
    localStorage.getItem(
    "savedRoadmaps"
    ));

    localStorage.setItem(
    "roadmap",
    JSON.stringify(
    roadmaps[index]
    )
    );

    window.location.href =
    "roadmap.html";

}

function deleteRoadmap(index){

    let roadmaps =
    JSON.parse(
    localStorage.getItem(
    "savedRoadmaps"
    ));

    roadmaps.splice(
    index,
    1
    );

    localStorage.setItem(
    "savedRoadmaps",
    JSON.stringify(
    roadmaps
    ));

    location.reload();

}