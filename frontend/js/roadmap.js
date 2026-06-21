const roadmapContainer =
document.getElementById(
"roadmapContainer"
);

const raw =
localStorage.getItem(
"roadmap"
);

if(!raw){

    roadmapContainer.innerHTML =
    "<h2>No roadmap found.</h2>";

}
else{

    const roadmap =
    JSON.parse(raw);

    const totalPhases =
roadmap.phases.length;

const totalProjects =
roadmap.phases.reduce(
(total,phase)=>
total + phase.projects.length,
0
);

const statsContainer =
document.getElementById(
"statsContainer"
);

if(statsContainer){

statsContainer.innerHTML = `

<div class="stat-card">
<h2>${totalPhases}</h2>
<p>Phases</p>
</div>

<div class="stat-card">
<h2>${totalProjects}</h2>
<p>Projects</p>
</div>

<div class="stat-card">
<h2>${roadmap.estimatedDuration}</h2>
<p>Duration</p>
</div>

`;

}

    // Header Card

    roadmapContainer.innerHTML += `

<div class="phase-card">

    <h1>
    ${roadmap.goal}
    </h1>

    <p>
    Estimated Duration:
    ${roadmap.estimatedDuration}
    </p>

    <br>

    <h3>
    Overview
    </h3>

    <p>
    ${roadmap.overview}
    </p>

    <br>

    <h3>
    Career Outcome
    </h3>

    <p>
    ${roadmap.careerOutcome}
    </p>

</div>

`;

    // Phases

    roadmap.phases.forEach(
    (phase,index)=>{

        roadmapContainer.innerHTML += `

        <div class="phase-card">

            <h2>
            Phase ${index + 1}
            </h2>

            <label>

                <input
                type="checkbox"
                class="phaseCheck"
                data-index="${index}">

                Completed

            </label>

            <br>

            <h3>
            ${phase.title}
            </h3>

            <p>
            Duration:
            ${phase.duration}
            </p>

            <h4>
            Skills
            </h4>

            <ul>

            ${phase.skills
            .map(skill =>
            `<li>${skill}</li>`)
            .join("")}

            </ul>

            <br>

            <h4>
            Projects
            </h4>

            <ul>

            ${phase.projects
            .map(project =>
            `<li>${project}</li>`)
            .join("")}

            </ul>

            <br>

            <h4>
            Resources
            </h4>

            ${phase.resources
            .map(resource =>

            `
            <a
            href="${resource.url}"
            target="_blank">

            ${resource.name}

            </a>

            <br><br>
            `

            ).join("")}

        </div>

        `;

    });

}

/* =========================
   PDF DOWNLOAD
========================= */

const downloadBtn =
document.getElementById(
"downloadBtn"
);

if(downloadBtn){

    downloadBtn.addEventListener(
    "click",
    ()=>{

        const pdf =
        new jspdf.jsPDF();

        pdf.text(
        roadmapContainer.innerText,
        10,
        10
        );

        pdf.save(
        "SkillPath-Roadmap.pdf"
        );

    });

}

/* =========================
   PROGRESS TRACKER
========================= */

function updateProgress(){

    const checkboxes =
    document.querySelectorAll(
    ".phaseCheck"
    );

    let completed = 0;

    checkboxes.forEach(
    checkbox=>{

        const index =
        checkbox.dataset.index;

        localStorage.setItem(
        `phase-${index}`,
        checkbox.checked
        );

        if(
        checkbox.checked
        ){
            completed++;
        }

    });

    const percentage =
    checkboxes.length === 0
    ? 0
    : Math.round(
      (completed /
      checkboxes.length) * 100
      );

    const progressText =
    document.getElementById(
    "progressText"
    );

    const progressFill =
    document.getElementById(
    "progressFill"
    );

    if(progressText){

        progressText.innerText =
        `Progress: ${percentage}%`;

    }

    if(progressFill){

        progressFill.style.width =
        `${percentage}%`;

    }

}

/* =========================
   RESTORE SAVED STATES
========================= */

const checkboxes =
document.querySelectorAll(
".phaseCheck"
);

checkboxes.forEach(
checkbox=>{

    const index =
    checkbox.dataset.index;

    const savedState =
    localStorage.getItem(
    `phase-${index}`
    );

    if(
    savedState === "true"
    ){
        checkbox.checked = true;
    }

    checkbox.addEventListener(
    "change",
    updateProgress
    );

});

/* =========================
   INITIALIZE
========================= */

updateProgress();