/* =====================================================
   MONTHSARY WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   MUSIC PLAYER
===================================================== */

let music;
let musicButton;

const MUSIC_TIME_KEY = "monthsaryMusicTime";
const MUSIC_PLAYING_KEY = "monthsaryMusicPlaying";


document.addEventListener("DOMContentLoaded", function () {

    music = document.getElementById("bgMusic");
    musicButton = document.getElementById("musicButton");

    if (!music) {
        return;
    }


    /* -----------------------------
       Get saved music position
    ----------------------------- */

    const savedTime =
        parseFloat(localStorage.getItem(MUSIC_TIME_KEY)) || 0;

    const wasPlaying =
        localStorage.getItem(MUSIC_PLAYING_KEY) === "true";


    /* -----------------------------
       Restore music position
    ----------------------------- */

    music.addEventListener("loadedmetadata", function () {

        if (
            savedTime > 0 &&
            savedTime < music.duration
        ) {
            music.currentTime = savedTime;
        }

    });


    /* -----------------------------
       Update button
    ----------------------------- */

    updateMusicButton();


    /* -----------------------------
       Try to continue music
    ----------------------------- */

    if (wasPlaying) {

        const playPromise = music.play();

        if (playPromise !== undefined) {

            playPromise
                .then(function () {

                    updateMusicButton();

                })
                .catch(function () {

                    /*
                        Browser blocked autoplay.

                        The user only needs to click
                        the music button once on this page.
                    */

                    updateMusicButton();

                });

        }

    }


    /* -----------------------------
       Save current position
    ----------------------------- */

    music.addEventListener("timeupdate", function () {

        localStorage.setItem(
            MUSIC_TIME_KEY,
            music.currentTime
        );

    });


    /* -----------------------------
       Save when music ends
    ----------------------------- */

    music.addEventListener("ended", function () {

        localStorage.setItem(MUSIC_TIME_KEY, "0");

        localStorage.setItem(
            MUSIC_PLAYING_KEY,
            "true"
        );

    });


    /* -----------------------------
       Save before leaving page
    ----------------------------- */

    window.addEventListener("beforeunload", function () {

        if (music) {

            localStorage.setItem(
                MUSIC_TIME_KEY,
                music.currentTime
            );

            localStorage.setItem(
                MUSIC_PLAYING_KEY,
                !music.paused
            );

        }

    });

});


/* =====================================================
   PLAY / PAUSE MUSIC
===================================================== */

function toggleMusic() {

    if (!music) {
        music = document.getElementById("bgMusic");
    }

    if (!music) {
        return;
    }


    if (music.paused) {

        music.play()
            .then(function () {

                localStorage.setItem(
                    MUSIC_PLAYING_KEY,
                    "true"
                );

                updateMusicButton();

            })
            .catch(function (error) {

                console.log(
                    "Music could not play:",
                    error
                );

            });

    } else {

        music.pause();

        localStorage.setItem(
            MUSIC_PLAYING_KEY,
            "false"
        );

        localStorage.setItem(
            MUSIC_TIME_KEY,
            music.currentTime
        );

        updateMusicButton();

    }

}


/* =====================================================
   MUSIC BUTTON TEXT
===================================================== */

function updateMusicButton() {

    if (!musicButton) {
        musicButton =
            document.getElementById("musicButton");
    }

    if (!musicButton || !music) {
        return;
    }


    if (music.paused) {

        musicButton.innerHTML =
            "🎵 Play Music";

        musicButton.classList.remove("playing");

    } else {

        musicButton.innerHTML =
            "⏸ Pause Music";

        musicButton.classList.add("playing");

    }

}


/* =====================================================
   ENVELOPE
===================================================== */

function openEnvelope() {

    const envelope =
        document.getElementById("envelope");

    if (!envelope) {
        return;
    }

    envelope.classList.add("open");


    setTimeout(function () {

        window.location.href =
            "home.html";

    }, 1200);

}


/* =====================================================
   REASONS
===================================================== */

const reasons = {

    1: {
        title: "Your Smile 💗",

        text:
            "Your smile has this way of making everything feel a little lighter. I could probably look at it forever."
    },

    2: {
        title: "Your Patience 🥺",

        text:
            "Thank you for being patient with me, especially when I am difficult to understand. It means more than you know."
    },

    3: {
        title: "Your Effort 💕",

        text:
            "I notice the little things you do. Even the smallest effort from you can mean so much to me."
    },

    4: {
        title: "Your Kindness 🌷",

        text:
            "The way you treat people and the way you care about others is one of the things that makes you special to me."
    },

    5: {
        title: "The Way You Care 🫶",

        text:
            "You make me feel cared for, remembered, and loved. And honestly, I treasure that more than words can explain."
    },

    6: {
        title: "Simply You 💗",

        text:
            "At the end of everything, I love you because you're you. I wouldn't trade you for anyone else."
    }

};


/* =====================================================
   SHOW REASON
===================================================== */

function showReason(number) {

    const popup =
        document.getElementById("reasonPopup");

    const title =
        document.getElementById("popupTitle");

    const text =
        document.getElementById("popupText");


    if (!popup || !title || !text) {
        return;
    }


    title.textContent =
        reasons[number].title;

    text.textContent =
        reasons[number].text;


    popup.classList.add("show");

}


/* =====================================================
   CLOSE POPUP
===================================================== */

function closePopup() {

    const popup =
        document.getElementById("reasonPopup");

    if (popup) {

        popup.classList.remove("show");

    }

}


/* =====================================================
   FUNNY REASON
===================================================== */

function showFunny() {

    const popup =
        document.getElementById("reasonPopup");

    const title =
        document.getElementById("popupTitle");

    const text =
        document.getElementById("popupText");


    if (!popup || !title || !text) {
        return;
    }


    title.textContent =
        "The Real Reason 😂💗";


    text.textContent =
        "Because unfortunately for you... you're stuck with me now. No refunds. No exchanges. Lifetime subscription. 😭💗";


    popup.classList.add("show");

}


/* =====================================================
   CLOSE POPUP WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener("click", function (event) {

    const popup =
        document.getElementById("reasonPopup");


    if (event.target === popup) {

        popup.classList.remove("show");

    }

});


/* =====================================================
   FINAL QUESTION
===================================================== */

function sayYes() {

    const message =
        document.getElementById("yesMessage");


    if (!message) {
        return;
    }


    message.classList.add("show");

    createHearts();

}


/* =====================================================
   RUNAWAY NO BUTTON
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const noButton =
        document.getElementById("noButton");


    if (!noButton) {
        return;
    }


    noButton.addEventListener(
        "mouseover",
        function () {

            const maxX = 250;
            const maxY = 150;


            const randomX =
                Math.floor(
                    Math.random() *
                    (maxX * 2 + 1)
                ) - maxX;


            const randomY =
                Math.floor(
                    Math.random() *
                    (maxY * 2 + 1)
                ) - maxY;


            noButton.style.transform =
                "translate(" +
                randomX +
                "px, " +
                randomY +
                "px)";

        }
    );

});


/* =====================================================
   HEART ANIMATION
===================================================== */

function createHearts() {

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");


        heart.innerHTML = "♥";


        heart.style.position =
            "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            "100vh";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.color =
            "#d85b82";

        heart.style.zIndex =
            "9999";

        heart.style.pointerEvents =
            "none";

        heart.style.transition =
            "transform 3s ease, opacity 3s ease";


        document.body.appendChild(heart);


        setTimeout(function () {

            heart.style.transform =
                "translateY(-110vh) rotate(" +
                Math.random() * 360 +
                "deg)";

            heart.style.opacity = "0";

        }, 50);


        setTimeout(function () {

            heart.remove();

        }, 3100);

    }

}