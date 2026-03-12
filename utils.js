// Data fetch karne ka function 
export const getQuizData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { q: "Which language runs in a web browser?", a: ["Java", "C", "JavaScript"], correct: "JavaScript" },
                { q: "What does CSS stand for?", a: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style"], correct: "Cascading Style Sheets" },
                { q: "Which tag is used for images?", a: ["<img>", "<a>", "<p>"], correct: "<img>" }
            ]);
        }, 1000); // 1 second delay to simulate API
    });
};

export const updateScore = (s) => s + 1;