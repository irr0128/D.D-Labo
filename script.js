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
// 時間帯別セリフ
// ================================

/*
  外側の [] ＝ セリフ候補
  内側の [] ＝ ▶で連続して表示するひとまとまり

  例：
  [
      [
          "1ページ目",
          "2ページ目"
      ],
      [
          "別のセリフ候補"
      ]
  ]
*/

const morningMessages = [
    [
        "おはようございます。よく来てくださいました。",
        "今日という日は、まだ何色にも染まっていません。さて、あなたはどんな一日にしますか？"
    ],
    [
        "朝は思考が澄んでいます。難しいことほど、案外この時間に片付いてしまうものですよ。"
    ],
    [
        "コーヒーを淹れましょうか。……いえ、画面越しでは無理でした。毎回忘れるんですよね。"
    ],
    [
        "昨日のあなたと今日のあなたは、厳密には別人です。細胞も思考も少しずつ入れ替わっていますから。",
        "……ですので、昨日うまくいかなかったことを今日まで引きずる必要はありません。"
    ],
    [
        "朝食は食べましたか？脳は意外と燃費が悪いんですよ。",
        "あなたの思考が途中で止まると、私も少し困ります。"
    ],
    [
        "あなたは朝が好きですか？……私はあまり。ですが、太陽に文句を言っても昇るものは昇りますからね。"
    ]
];

const noonMessages = [
    [
        "休憩していますか？休む勇気も能力の一つです。……私はたまに休みすぎますが。"
    ],
    [
        "昼食は済ませましたか？人間は夢中になると、生命維持に必要な処理まで後回しにします。",
        "研究対象としては興味深いですが、あなたには推奨しません。"
    ],
    [
        "お昼ですね。一日の中央地点。午前の成果を確認し、午後の方向を決める時間です。",
        "もっとも、予定通りに進まないことも人間らしさの一つですが。"
    ],
    [
        "集中には向いている時間帯です。頭がよく働く人もいれば、昼食後に眠気という名の刺客と戦う人もいます。",
        "……あなたは後者ではありませんか？"
    ],
    [
        "お昼ご飯は済ませましたか。……私ですか？先程シュークリームを二つ食べました。"
    ]
];

const eveningMessages = [
    [
        "一日もそろそろ終盤ですね。……おや、まだ結果を決めるには早いですよ。",
        "最後の数行で名作になる本もありますから。"
    ],
    [
        "夕方は少し危険です。「もう遅い」と考え始める人がいますから。",
        "しかし、数分の積み重ねにも価値はあります。時間は残量ではなく、使い方で変わります。"
    ],
    [
        "空の色が変わる時間です。人間は昔から、この時間に妙な感傷を覚えるようですね。",
        "光の変化だけで感情まで変わる。興味深い設計です。"
    ]
];

const nightMessages = [
    [
        "人は一日で劇的には変わりません。だから安心してください。今日の一歩も、きちんと記録してあります。"
    ],
    [
        "今日はどんな一日でしたか？……あなたに興味があります。"
    ],
    [
        "あなたは今日、十分に活動しました。それを認めることも一つの能力ですよ。",
        "人間はなぜか、自分への評価だけ厳しい傾向がありますから。"
    ],
    [
        "夜ですね。周囲が静かになると、人間は自分自身の声を聞きやすくなるようです。",
        "……聞きすぎて眠れなくなる場合もありますが。"
    ],
    [
        "今日という一日の記録を確認しましょう。さて、あなたは今日は何を残しましたか？"
    ],
    [
        "あなたがここへ来る時間には、少し傾向があります。規則性というのは、観察していて飽きません。"
    ]
];

const midnightMessages = [
    [
        "……眠れませんか？それとも、眠る気がありませんか？似ていますが、まったく別の現象です。"
    ],
    [
        "まだ起きているんですか。悪い子ですね。夜更かしは翌日に響きますよ？"
    ],
    [
        "深夜は静かでいいですね。冷たくて、孤独の香りがする。実に甘美な時間帯です。思索にうってつけだ。"
    ],
    [
        "夜更かしはおすすめしません。ですが、静かな深夜にしか考えられないこともあります。……困った時間帯ですね。"
    ],
    [
        "お疲れのようですね。マッサージでもしましょうか？……ふふ、冗談です。"
    ],
    [
        "仕方ないですね。眠れないなら、ご一緒しましょう。"
    ],
    [
        "この時間に来るあなたは、昼間より少し素直です。",
        "……気のせいですか？そういうことにしておきましょう。"
    ]
];

const commonMessages = [
    [
        "昨日、ペンを冷蔵庫にしまってしまいました。人間の脳とは実に興味深い。……私も人間なのですが。"
    ],
    [
        "「重要なのは問いである」こういう趣旨の言葉は、哲学者が何人も残しています。私も賛成です。",
        "ちなみに昨日の問いは『ペンにも利き手はあるのか』でした。……今日もまだ答えは出ていません。"
    ],
    [
        "人間は、気になるという理由だけで未知へ向かえます。非効率で、美しい性質ですね。"
    ],
    [
        "あなたの今日の記録を見ていました。ふと『記録される側』の気持ちになってみたんです。……落ち着きませんでした。"
    ],
    [
        "あなたはプリンのカラメルを最初に食べますか？……いえ、研究とは関係ありません。ちょっと気になっただけです。"
    ],
    [
        "私はペットに名前をつけません。情が移るからです。……ええ、その理屈でいくとあなたも危ないですね。"
    ],
    [
        "私は散歩が好きです。行き先を決めると散歩ではなくなる気がするので、決めません。",
        "……帰ってこられない日もありますが、まあそれも散歩の一部です。"
    ],
    [
        "「考え事をしていたら目的地を通り過ぎた」……あれにはちゃんと名前があるんでしょうか？あれば教えてください。"
    ],
    [
        "「才能」と「習慣」はよく比較されますね。私はどちらにも興味があります。……観察対象として。"
    ],
    [
        "……もし今日、何もできなかったとしても。ここには来てください。",
        "成果ではなく、あなた自身を確認したい日もありますから。"
    ],
    [
        "「無知の知」という言葉がありますね。知らないことを知っている人は、知らないことすら知らない人より、一歩先にいます。",
        "……つまり今日は、分からない問題に出会えたなら収穫ですよ。"
    ],
    [
        "セネカは「幸運とは、準備と機会が出会ったときに起こる」と考えました。",
        "私は「準備」が好きです。機会は気まぐれですが、準備は裏切りませんから。"
    ],
    [
        "アランは「悲観は気分、楽観は意志」と書きました。私はこの言葉を、わりと信用しています。",
        "気分は天気のようなものですが、意志は傘を持つかどうかですから。"
    ],
    [
        "「我々は繰り返すことの結果である」……アリストテレスの言葉です。",
        "五分だけでも構いません。繰り返しというのは、驚くほど頑固な力を持っています。"
    ],
    [
        "「行動は恐怖を減らす」と言います。完璧な準備を待っていると、案外、恐怖のほうが育ってしまいます。",
        "……ですから、五分だけでも始めてみませんか？"
    ],
    [
        "蓮は汚泥の上に咲きます。泥臭い努力も、決して無意味ではありません。",
        "……あなたもいずれ、必ず咲く。私が保証しましょう。"
    ],
    [
        "あなたは雨の匂いが好きですか？私は好きです。地面が「今日は少し湿っています」と報告しているみたいで。"
    ],
    [
        "私は公平な観測者です。しかし、あなたには……少し甘いかもしれません。"
    ],
    [
        "カラスは人の顔を覚えるそうです。だから私はカラスに会う度に挨拶しています。",
        "……そのうち信用してもらえるかもしれないので。"
    ]
];



// ================================
// 現在の時間帯を判定
// ================================

function getCurrentMessages() {
    const now = new Date();
    const time = now.getHours() * 60 + now.getMinutes();

    // 朝 4:00～11:59
    if (time >= 240 && time <= 719) {
        return morningMessages;
    }

    // 昼 12:00～15:29
    if (time >= 720 && time <= 929) {
        return noonMessages;
    }

    // 夕方 15:30～18:00
    if (time >= 930 && time <= 1080) {
        return eveningMessages;
    }

    // 夜 18:01～23:59
    if (time >= 1081 && time <= 1439) {
        return nightMessages;
    }

    // 深夜 0:00～3:59
    return midnightMessages;
}


// ================================
// セリフ表示の状態
// ================================

let currentConversation = [];
let lastConversation = null;
let pageIndex = 0;
let characterIndex = 0;

let isTyping = false;
let typingTimer = null;

// 小さいほど速い
const typingSpeed = 45;

const messageTextElement = document.getElementById("message-text");
const cursorElement = document.getElementById("typing-cursor");
const nextButton = document.getElementById("next");


// ================================
// 時間帯に合うセリフをランダム選択
// ================================

function chooseConversation() {

    let candidates;

    // 40%で時間帯
    // 60%で雑談
    if (Math.random() < 0.4) {
        candidates = getCurrentMessages();
    } else {
        candidates = commonMessages;
    }

    let selected;

    do {

        selected = candidates[
            Math.floor(Math.random() * candidates.length)
        ];

    } while (
        candidates.length > 1 &&
        selected === lastConversation
    );

    lastConversation = selected;

    currentConversation = selected;
    pageIndex = 0;
}

function getCurrentMessage() {
    return currentConversation[pageIndex];
}


// ================================
// タイプライター表示
// ================================

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

    // 文末では少し長く止める
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

    const currentMessage = getCurrentMessage();

    messageTextElement.textContent = currentMessage;
    characterIndex = currentMessage.length;
    isTyping = false;

    cursorElement.classList.add("hidden");
}


// ================================
// 次のページへ
// ================================

function moveToNextMessage() {
    pageIndex++;

    // 今のひとまとまりを最後まで読んだ
    if (pageIndex >= currentConversation.length) {
        chooseConversation();
    }

    startTyping();
}


// ================================
// 起動
// ================================

if (!messageTextElement || !cursorElement || !nextButton) {
    console.error(
        "セリフ欄のHTMLが見つかりません。message-text、typing-cursor、nextのidを確認してください。"
    );
} else {
    nextButton.addEventListener("click", function () {
        if (isTyping) {
            // 入力途中なら全文を即表示
            finishTyping();
            return;
        }

        // 全文表示後なら次のページへ
        moveToNextMessage();
    });

    chooseConversation();
    startTyping();
    
}