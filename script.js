"use strict";

// ================================
// 時計と日付
// ================================

function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");

    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }

    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });
    }
}

updateClock();
setInterval(updateClock, 1000);


// ================================
// セリフ
// ================================

const messages = [
    [
        "昨日、ペンを冷蔵庫にしまってしまいました。人間の脳とは実に興味深い。",
        "……私も人間なのですが。",
    ],
    [
        "「重要なのは問いである」こういう趣旨の言葉は、哲学者が何人も残しています。私も賛成です。",
        "ちなみに昨日の問いは「ペンにも利き手はあるのか」でした。……今日もまだ答えは出ていません。",
    ],
    [
        "人間は、気になるという理由だけで未知へ向かえます。",
        "非効率で、美しい性質ですね。",
    ],
    [
        "あなたの今日の記録を見ていました。ふと「記録される側」の気持ちになってみたんです。……落ち着きませんでした。",
    ],
    [
        "あなたはプリンのカラメルを最初に食べますか？……いえ、研究とは関係ありません。ちょっと気になっただけです。",
    ],
    [
        "私はペットに名前をつけません。情が移るからです。……ええ、その理屈でいくとあなたも危ないですね。",
    ],
    [
        "私は散歩が好きです。行き先を決めると散歩ではなくなる気がするので、決めません。",
        "……帰ってこられない日もありますが、まあそれも散歩の一部です。",
    ]
];

let messageIndex = 0;
let pageIndex = 0;
let characterIndex = 0;
let isTyping = false;
let typingTimer = null;

const typingSpeed = 45;

const messageTextElement = document.getElementById("message-text");
const cursorElement = document.getElementById("typing-cursor");
const nextButton = document.getElementById("next");

function getCurrentMessage() {
    return messages[messageIndex][pageIndex];
}

function startTyping() {
    clearTimeout(typingTimer);

    const currentMessage = getCurrentMessage();

    characterIndex = 0;
    isTyping = true;

    messageTextElement.textContent = "";
    cursorElement.classList.remove("hidden");

    typeNextCharacter(currentMessage);
}

function typeNextCharacter(currentMessage) {
    if (characterIndex >= currentMessage.length) {
        finishTyping();
        return;
    }

    const currentCharacter = currentMessage[characterIndex];

    messageTextElement.textContent += currentCharacter;
    characterIndex++;

    let delay = typingSpeed;

    if (
        currentCharacter === "。" ||
        currentCharacter === "！" ||
        currentCharacter === "？"
    ) {
        delay = 220;
    } else if (
        currentCharacter === "、" ||
        currentCharacter === "…" ||
        currentCharacter === "・"
    ) {
        delay = 100;
    }

    typingTimer = setTimeout(function () {
        typeNextCharacter(currentMessage);
    }, delay);
}

function finishTyping() {
    clearTimeout(typingTimer);

    messageTextElement.textContent = getCurrentMessage();
    characterIndex = getCurrentMessage().length;
    isTyping = false;

    cursorElement.classList.add("hidden");
}

function moveToNextMessage() {
    pageIndex++;

    if (pageIndex >= messages[messageIndex].length) {
        pageIndex = 0;
        messageIndex++;

        if (messageIndex >= messages.length) {
            messageIndex = 0;
        }
    }

    startTyping();
}

if (!messageTextElement || !cursorElement || !nextButton) {
    console.error("セリフ欄のHTMLが見つかりません。idを確認してください。");
} else {
    nextButton.addEventListener("click", function () {
        if (isTyping) {
            finishTyping();
            return;
        }

        moveToNextMessage();
    });

    startTyping();
}