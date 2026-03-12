import { getQuizData, updateScore } from './utils.js';

(async function() {
    // Variables
    let questions = [];
    let currentIdx = 0;
    let score = 0;
    let selected = null;

    // DOM Elements
    const qEl = document.getElementById('question');
    const optCont = document.getElementById('options-container');
    const btn = document.getElementById('submit-btn');
    const scoreDisplay = document.getElementById('score-val');
    const progress = document.getElementById('progress-fill');

    // Initialization
    const init = async () => {
        questions = await getQuizData();
        render();
    };

    const render = () => {
        if (currentIdx >= questions.length) return finish();
        
        const data = questions[currentIdx];
        qEl.innerText = data.q;
        optCont.innerHTML = '';
        btn.disabled = true;
        progress.style.width = `${(currentIdx / questions.length) * 100}%`;

        data.a.forEach(ans => {
            const div = document.createElement('div');
            div.className = 'option';
            div.innerText = ans;
            div.onclick = () => {
                document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
                div.classList.add('selected');
                selected = ans;
                btn.disabled = false;
            };
            optCont.appendChild(div);
        });
    };

    const handleNext = () => {
        const correct = questions[currentIdx].correct;
        const options = document.querySelectorAll('.option');

        options.forEach(opt => {
            if (opt.innerText === correct) opt.classList.add('correct');
            else if (opt.innerText === selected) opt.classList.add('incorrect');
        });

        if (selected === correct) {
            score = updateScore(score);
            scoreDisplay.innerText = score;
        }

        setTimeout(() => {
            currentIdx++;
            render();
        }, 1500);
    };

    const finish = () => {
        progress.style.width = '100%';
        document.getElementById('quiz-section').innerHTML = `
            <div style="text-align:center">
                <h2> Completed!</h2>
                <p>You scored ${score} out of ${questions.length}</p>
                <button onclick="location.reload()" style="background:var(--success); border:none; padding:10px; color:white; border-radius:5px; cursor:pointer">Try Again</button>
            </div>`;
        btn.style.display = 'none';
    };

    btn.addEventListener('click', handleNext);
    init();
})();