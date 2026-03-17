const testQuestions = {
    en: [
        {
            question: "How do you feel about money this morning?",
            options: [
                { text: "I feel abundant and optimistic", points: 4 },
                { text: "It's okay, some ups some downs", points: 3 },
                { text: "Worried about expenses", points: 2 },
                { text: "I never think about it", points: 1 }
            ]
        },
        {
            question: "When you see an opportunity to make extra money, you usually:",
            options: [
                { text: "Jump in and try it", points: 4 },
                { text: "Research it carefully first", points: 3 },
                { text: "Wait and see what happens", points: 2 },
                { text: "Assume it won't work", points: 1 }
            ]
        },
        {
            question: "How often do you share your good fortune with others?",
            options: [
                { text: "Regularly, I believe in generosity", points: 4 },
                { text: "Sometimes, when I can", points: 3 },
                { text: "Rarely, I need to keep it all", points: 2 },
                { text: "Never had much to share", points: 1 }
            ]
        }
    ],
    zh: [
        {
            question: "今早起床你對金錢的感覺是？",
            options: [
                { text: "感覺富足，充滿希望", points: 4 },
                { text: "還好，有起有落", points: 3 },
                { text: "有點擔心開銷", points: 2 },
                { text: "我很少想這個問題", points: 1 }
            ]
        },
        {
            question: "當你看到一個額外賺錢的機會，你通常會？",
            options: [
                { text: "直接嘗試看看", points: 4 },
                { text: "先仔細研究", points: 3 },
                { text: "先觀望一段時間", points: 2 },
                { text: "覺得一定是騙人的", points: 1 }
            ]
        },
        {
            question: "你多久會和別人分享你的好運？",
            options: [
                { text: "常常分享，相信施比受更有福", points: 4 },
                { text: "有時候會，看機會", points: 3 },
                { text: "很少，自己留著比較好", points: 2 },
                { text: "沒什麼好分享的", points: 1 }
            ]
        }
    ]
};

let currentQuestion = 0;
let totalPoints = 0;
let answers = [];

function startTest() {
    currentQuestion = 0;
    totalPoints = 0;
    answers = [];
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('test-container');
    const resultDiv = document.getElementById('test-result');
    resultDiv.classList.add('hidden');
    
    const questions = testQuestions[currentLang];
    const q = questions[currentQuestion];
    
    let html = `
        <div class="test-question">
            <h4>${currentQuestion + 1}. ${q.question}</h4>
            <div class="test-options">
    `;
    
    q.options.forEach((option, index) => {
        html += `
            <label class="test-option" data-points="${option.points}">
                <input type="radio" name="question-${currentQuestion}" value="${index}">
                ${option.text}
            </label>
        `;
    });
    
    html += `
            </div>
        </div>
        <button id="next-question-btn" class="btn btn-primary" disabled>
            ${currentQuestion < questions.length - 1 ? getText('test.next') : getText('test.finish')}
        </button>
    `;
    
    container.innerHTML = html;
    
    // Add event listeners
    container.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', onQuestionAnswered);
    });
    
    document.getElementById('next-question-btn').addEventListener('click', nextQuestion);
}

function onQuestionAnswered(e) {
    const selectedOption = e.target.closest('.test-option');
    const questionContainer = e.target.closest('.test-question');
    
    questionContainer.querySelectorAll('.test-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    selectedOption.classList.add('selected');
    document.getElementById('next-question-btn').disabled = false;
}

function nextQuestion() {
    const selected = document.querySelector('.test-option.selected');
    if (!selected) return;
    
    const points = parseInt(selected.dataset.points);
    totalPoints += points;
    answers.push(points);
    
    currentQuestion++;
    
    const questions = testQuestions[currentLang];
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const container = document.getElementById('test-container');
    const resultDiv = document.getElementById('test-result');
    container.innerHTML = '';
    
    let titleKey, textKey;
    
    if (totalPoints >= 10) {
        titleKey = 'test.result.excellent.title';
        textKey = 'test.result.excellent.text';
    } else if (totalPoints >= 7) {
        titleKey = 'test.result.good.title';
        textKey = 'test.result.good.text';
    } else if (totalPoints >= 4) {
        titleKey = 'test.result.average.title';
        textKey = 'test.result.average.text';
    } else {
        titleKey = 'test.result.low.title';
        textKey = 'test.result.low.text';
    }
    
    document.getElementById('test-result-title').textContent = getText(titleKey);
    document.getElementById('test-result-text').textContent = getText(textKey);
    
    resultDiv.classList.remove('hidden');
}
