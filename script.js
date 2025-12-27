const screens = document.querySelectorAll(".screen");
const music = document.getElementById("bgMusic");
const typeText = document.getElementById("typeText");
const PASSWORD = "24032005 & 28122006"; // bebas Anda ganti
const correctPuzzleOrder = [
    "foto1.jpeg",
    "foto3.jpeg",
    "foto5.jpeg",
    "foto7.jpeg",
    "foto6.jpeg",
    "foto4.jpeg",
    "foto2.jpeg",
];

let selectedPuzzlePhotos = [];
let puzzleIndex = 0;
let timer = 15;
let life = 3;
let timerInterval;
let answer = [];
let puzzlePick = [];
let startTime;

/* UTIL */
function show(id) {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function checkPassword() {
    const input = document.getElementById("passwordInput").value.toLowerCase();
    const msg = document.getElementById("passwordMsg");

    if (input === PASSWORD) {
        msg.innerText = "Benar Sekali😉, kayaknya kamu beneran suka sama aku deh 💖";
        playSuccess();
        setTimeout(() => {
            show("gameWord");
            startTimer();
        }, 600);
    } else {
        msg.innerText = "nah kan kena cium😙! coba deh tanyain passwordnya ke orang yang kamu suka yaa 😉";
        playClick();
    }
}


/* START */
function startGame() {
    startTime = Date.now();
    music.play().catch(()=>{});
    show("passwordScreen");
}


/* TIMER */
function startTimer() {
    clearInterval(timerInterval);
    timer = 15;
    document.getElementById("timer").innerText = timer;

    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) loseLife();
    }, 1000);
}

/* WORD GAME */
function selectWord(btn) {
    playClick();
    if (answer.includes(btn.innerText)) return;
    answer.push(btn.innerText);

    const span = document.createElement("span");
    span.innerText = btn.innerText;
    document.getElementById("answerBox").appendChild(span);
}

function checkWord() {
    const resultText = document.getElementById("resultText");

    if (answer.join("") === "NASYWAADILLANYONYAPUTRA") {
        clearInterval(timerInterval);
        playSuccess();
        setProgress(60);
        show("gamePuzzle");

        if (resultText) {
            resultText.textContent = "";
            resultText.classList.remove("error");
        }
    } else {
        loseLife();

        if (resultText) {
            resultText.textContent =
                "Susunan katanya salah ni, silakan tanyain lagi ke orang yang kamu suka yaa😉";
            resultText.classList.add("error");
        }
    }
}


function loseLife() {
    life--;
    document.getElementById("life").innerText = life;
    answer = [];
    document.getElementById("answerBox").innerHTML = "";
    startTimer();

    if (life <= 0) {
        document.getElementById("gameMsg").innerText =
            "Hehehe gagal 😆 Tapi aku tetap sayang kamu";
        life = 3;
    }
}

/* PUZZLE */
function pickPuzzle(img) {
    const selectedSrc = img.getAttribute("src");
    const msg = document.getElementById("puzzleMsg");

    if (selectedSrc === correctPuzzleOrder[puzzleIndex]) {

        img.style.opacity = "0.4";
        img.style.pointerEvents = "none";

        // SIMPAN FOTO YANG BENAR
        selectedPuzzlePhotos.push(selectedSrc);

        puzzleIndex++;
        playClick();

        if (puzzleIndex === correctPuzzleOrder.length) {
            playSuccess();
            setProgress(80);
            msg.textContent = "Yeay! Kamu berhasil 💖";

            setTimeout(() => {
                show("mainScreen");
                typeWriter();
                startConfetti();
            }, 800);
        }

    } else {
        msg.textContent = "Urutannya salah! coba tanyain lagi deh ke cowo kamu, soalnya cuman dia yang tau😅";
        msg.classList.add("error");

        resetPuzzle();
    }
}

function resetPuzzle() {
    puzzleIndex = 0;
    selectedPuzzlePhotos = [];

    document.querySelectorAll(".puzzle img").forEach(img => {
        img.style.opacity = "1";
        img.style.pointerEvents = "auto";
    });
}

/* MESSAGE */
const message =
"Barakallah fi umrik dila. Aku bersyukur masih bisa chattan bahkan telfonan sama kau hampir tiap malem😽, maap maap yaaw kalau misalkan aku berlebihan terus bikin kau ilfeel😔, kadang suka kelepas gitu aku. Pokoknya kita sama-sama upgrade diri yaa dila💖, wish you all the best🤏🏻";

let i = 0;
function typeWriter() {
    if (i < message.length) {
        typeText.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
    }
}

/* NAV */
function showGallery() {
    const gallery = document.querySelector("#galleryScreen .gallery");

    gallery.innerHTML = "";

    selectedPuzzlePhotos.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Kenangan " + (index + 1);
        gallery.appendChild(img);
    });

    setProgress(90);
    show("galleryScreen");
}


function showFinal() {
    setProgress(100);
    show("finalScreen");

    const timeTaken = (Date.now() - startTime) / 1000;
    if (timeTaken < 40) {
        document.getElementById("finalTitle").innerText = "Ending Rahasia 💖";
        document.getElementById("finalMsg").innerText =
            "Kayaknya aku suka sama kau deh 😅, Apa kau yang suka sama aku yaa ❤️?, kalau suka tuh bilang aja😙, jangan gengsi 😉";
    } else {
        document.getElementById("finalMsg").innerText =
            "Semoga segala impian dan keinginan mu tergapai yaa😙. btw ada ending rahasia nya loh beb, coba tanyain cara nemuin ending rahasianya ke bubub kamu tuh";
    }
}

/* CONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function startConfetti() {
    particles = Array.from({length: 80}, () => ({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*4+1,
        d: Math.random()*3+1
    }));
    animate();
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.y += p.d;
        if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animate);
}

/* HEART */
function floatingHeart() {
    const heart = document.createElement("div");
    heart.innerText = "❤";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";
    heart.style.fontSize = Math.random() * 14 + 12 + "px";
    heart.style.opacity = 0.7;
    heart.style.animation = "floatUp 6s linear forwards";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(floatingHeart, 900);

/* PROGRESS & SOUND */
function setProgress(p) {
    document.getElementById("progress").style.width = p + "%";
}
function playClick() {
    document.getElementById("clickSound").play().catch(()=>{});
}
function playSuccess() {
    document.getElementById("successSound").play().catch(()=>{});
}

// ==============================
// PASSWORD ENTER HANDLER
// ==============================
const passwordInput = document.getElementById("passwordInput");

if (passwordInput) {
    passwordInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") checkPassword();
    });
}


