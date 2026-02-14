const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadText = document.getElementById("sadText");
const sadWall = document.getElementById("sadWall");
const card = document.getElementById("card");
const cloudsContainer = document.getElementById("clouds");
const bgMusic = document.getElementById("bgMusic");

// GIFs
const beggingGif = "https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif";
const cryingGif = "https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif";
const happyGif = "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif";
const niceGif = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";

// Sad statements
const sadStatements = [
    "Piangg, I didn’t mean to make you mad 😿",
    "Piangggggggg 💔",
    "Piangg, I’m sorry 🥺",
    "Let's bati na Ma'am! 😔",
    "Sorry 🌧️", 
    "Piangg, ang cute mo! 🥹",
    "Piangg, bati na tayoooooo 🥺",
];

let state = "begging";
let sadIndex = 0;
gif.src = beggingGif;

// Hover state
function setState(newState) {
    if(state === newState) return;
    state = newState;
    if(state === "begging") { gif.src = beggingGif; sadText.style.opacity = 0; }
    if(state === "crying") { gif.src = cryingGif; sadText.textContent = "Piangg… please don’t say yes if you’re unsure… I’d be really sad 😿"; sadText.style.opacity = 1; }
    if(state === "happy") { gif.src = happyGif; sadText.style.opacity = 0; }
}

yesBtn.addEventListener("mouseenter", () => setState("crying"));
yesBtn.addEventListener("mouseleave", () => setState("begging"));
noBtn.addEventListener("mouseenter", () => setState("happy"));
noBtn.addEventListener("mouseleave", () => setState("begging"));

// Clouds + rain + thunder
function startRainThunder() {
    cloudsContainer.style.display = "block";
    cloudsContainer.innerHTML = "";

    for(let i=0;i<5;i++){
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        const size = 120 + i*40;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size/2}px`;
        cloud.style.top = `${20+i*10}%`;
        cloud.style.left = `${-50 + i*50}%`;
        cloud.style.opacity = 0.5 + i*0.1;
        cloud.style.filter = `blur(${6-i}px)`;
        cloudsContainer.appendChild(cloud);
    }

    for(let i=0;i<50;i++){
        const drop = document.createElement("div");
        drop.className = "rain";
        drop.style.left = `${Math.random()*100}%`;
        drop.style.animationDuration = `${0.4+Math.random()*0.6}s`;
        drop.style.animationDelay = `${Math.random()*1}s`;
        cloudsContainer.appendChild(drop);
    }

    const thunder = document.createElement("div");
    thunder.className = "thunder";
    cloudsContainer.appendChild(thunder);

    function flash(){
        thunder.style.opacity=1;
        setTimeout(()=>{thunder.style.opacity=0},100);
        setTimeout(flash,2000+Math.random()*3000);
    }
    flash();
}

// YES click
yesBtn.addEventListener("click",()=>{
    document.body.style.background="#555";
    startRainThunder();
    sadWall.style.display="block";
    sadWall.innerHTML="";
    gif.src=cryingGif;

    const line = document.createElement("div");
    line.className="sad-line";
    line.textContent=sadStatements[sadIndex];
    sadWall.appendChild(line);

    sadIndex++;
    if(sadIndex>=sadStatements.length) sadIndex=0;
});

// NO click
noBtn.addEventListener("click", () => {
    // Show Valentine message
    document.body.style.background = "linear-gradient(135deg, #ffd6e8, #fff0f6)";
    cloudsContainer.style.display = "none";

    card.innerHTML=`
        <h1 style="color:#ff4d6d;">Yaaaaayyyyyyy!! 💖</h1>
        <img src="${niceGif}" style="width:220px;border-radius:15px;">
        <p style="color:#555;">
            Piangg, Bati na tayooooooo haaa 💕<br>
            I hope today brings you smiles and warmth 🌸
        </p>
    `;

    const bgMusic = document.getElementById("bgMusic");
    const startTime = 30; // chorus start in seconds
    const endTime = 60;   // chorus end in seconds

    // Jump to chorus start
    bgMusic.currentTime = startTime;
    bgMusic.play().catch(err => console.log("Autoplay blocked:", err));

    // Check continuously if we reached end of chorus
    const loopChorus = setInterval(() => {
        if (bgMusic.currentTime >= endTime) {
            bgMusic.currentTime = startTime; // jump back to chorus start
            bgMusic.play(); // ensure it keeps playing
        }
    }, 100);

    // Optional: Stop looping if needed when page changes or another button is clicked
    // clearInterval(loopChorus);
});


