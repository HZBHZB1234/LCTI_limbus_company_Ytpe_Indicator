// 特质定义
const TRAITS = {
    1: { name: "暴食", unit: 1, color: "#ff6b6b" },
    10: { name: "暴怒", unit: 10, color: "#ffa726" },
    100: { name: "傲慢", unit: 100, color: "#ffd54f" },
    1000: { name: "欲望", unit: 1000, color: "#4ecdc4" },
    10000: { name: "忧郁", unit: 10000, color: "#6c63ff" },
    100000: { name: "嫉妒", unit: 100000, color: "#ff6b9d" }
};

// 人格类型图片映射
const PERSONALITY_IMAGES = {
    "均衡型": "images/balanced.jpg",
    "欲望主导型": "images/desire.jpg",
    "忧郁主导型": "images/melancholy.jpg",
    "傲慢主导型": "images/arrogance.jpg",
    "嫉妒主导型": "images/jealousy.jpg",
    "暴怒主导型": "images/warth.jpg",
    "暴食主导型": "images/gluttony.jpg",
    "欲望+忧郁复合型": "images/dm.jpg",
    "傲慢+嫉妒复合型": "images/aj.jpg",
    "忧郁+暴食复合型": "images/mg.jpg",
    "忧郁+嫉妒复合型": "images/yj.jpg",
    "暴怒+傲慢复合型": "images/ba.jpg",
    "暴食+嫉妒复合型": "images/bj.jpg",
    "暴怒+傲慢+嫉妒复合型": "images/baj.jpg",
    "暴怒+欲望复合型": "images/by.jpg",
    "暴怒+欲望复合型": "images/by.jpg",
    "暴怒+嫉妒复合型": "images/bjj.jpg",
    "傲慢+忧郁复合型": "images/ay.jpg",
    "欲望+忧郁复合型": "images/yy.jpg",
    "地狱鸡": "images/caidan.jpg",
    "平衡型": "images/balanced.jpg",
    "默认图片": "images/balanced.jpg"
};

// 全局状态
let questions = [];
let questionsLoaded = false;
let currentQuestion = 0;
let userAnswers = [];
let totalScore = 0;
let traitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
let normalizedTraitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };

// DOM 元素
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const progressBar = document.getElementById('progress-bar');
const currentQuestionSpan = document.getElementById('current-question');
const questionNumSpan = document.getElementById('question-num');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const totalScoreElement = document.getElementById('total-score');
const traitsGrid = document.getElementById('traits-grid');
const chartElement = document.getElementById('chart');
const personalityTypeElement = document.getElementById('personality-type');
const personalityDescriptionElement = document.getElementById('personality-description');
const personalityImage = document.getElementById('personality-image');
const imageContainer = document.getElementById('personality-image-container');

async function startTest() {
    resultPage.style.display = 'none';
    quizPage.style.display = 'block';
    homePage.style.display = 'none';
    
    // 如果题目尚未加载，则从 JSON 获取
    if (!questionsLoaded) {
        questionText.textContent = '加载题目中，请稍候...';
        optionsContainer.innerHTML = '';
        try {
            const response = await fetch('questions.json');
            if (!response.ok) throw new Error('题目加载失败');
            questions = await response.json();
            questionsLoaded = true;
        } catch (error) {
            alert('题目加载失败，请刷新页面重试。');
            backToHome();
            return;
        }
    }
    
    // 重置答题状态
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    totalScore = 0;
    traitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    normalizedTraitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    
    showQuestion(currentQuestion);
};

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
};

function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('请选择一个选项');
        return;
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
};

function showResult() {
    if (userAnswers[currentQuestion] === null) {
        alert('请选择一个选项');
        return;
    }
    calculateScores();
    displayResult();
    quizPage.style.display='none';
    resultPage.style.display='block';
};

function restartTest() {
    // 重置答案并回到第一题
    quizPage.style.display = 'block';
    resultPage.style.display = 'none';
    homePage.style.display = 'none';
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    totalScore = 0;
    traitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    normalizedTraitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    showQuestion(currentQuestion);
};

function backToHome() {
    quizPage.style.display = 'none';
    homePage.style.display = 'block';
    resultPage.style.display = 'none';
};

// --- 辅助函数 ---
function showQuestion(index) {
    const q = questions[index];
    questionNumSpan.textContent = index + 1;
    currentQuestionSpan.textContent = index + 1;
    questionText.textContent = q.text;
    
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((option, optIndex) => {
        const optDiv = document.createElement('div');
        optDiv.className = 'option' + (userAnswers[index] === optIndex ? ' selected' : '');
        optDiv.innerHTML = `
            <div class="option-radio"></div>
            <div class="option-text">${option.text}</div>
        `;
        optDiv.addEventListener('click', () => selectOption(index, optIndex));
        optionsContainer.appendChild(optDiv);
    });
    
    prevBtn.style.display = index === 0 ? 'none' : 'block';
    if (index === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function selectOption(qIndex, optIndex) {
    userAnswers[qIndex] = optIndex;
    // 刷新选项样式
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.toggle('selected', idx === optIndex);
    });
}

function calculateScores() {
    totalScore = 0;
    traitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    normalizedTraitScores = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    
    const traitMaxValues = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
    
    questions.forEach((q, idx) => {
        const ans = userAnswers[idx];
        if (ans === null) return;
        const val = q.options[ans].value;
        totalScore += val;
        
        Object.keys(traitScores).forEach(trait => {
            const tNum = parseInt(trait);
            if (val % (tNum * 10) >= tNum) {
                traitScores[tNum] += tNum;
                normalizedTraitScores[tNum] += 1;
            }
        });
        
        // 计算每题各特质最大可能次数
        let maxForQ = { 1:0, 10:0, 100:0, 1000:0, 10000:0, 100000:0 };
        q.options.forEach(opt => {
            Object.keys(maxForQ).forEach(trait => {
                const tNum = parseInt(trait);
                if (opt.value % (tNum * 10) >= tNum) maxForQ[tNum] = 1;
            });
        });
        Object.keys(traitMaxValues).forEach(trait => {
            traitMaxValues[trait] += maxForQ[trait];
        });
    });
    
    // 判定显著特质 (超过三分之一题目出现)
    const activeTraits = {};
    Object.keys(normalizedTraitScores).forEach(trait => {
        const tNum = parseInt(trait);
        activeTraits[tNum] = normalizedTraitScores[tNum] >= (traitMaxValues[tNum] / 3);
    });
    return activeTraits;
}

function displayResult() {
    const activeTraits = calculateScores(); // 重新计算确保最新
    quizPage.style.display = 'none';
    
    totalScoreElement.textContent = totalScore;
    
    // 特质网格
    traitsGrid.innerHTML = '';
    Object.keys(TRAITS).forEach(traitKey => {
        const trait = TRAITS[traitKey];
        const tNum = parseInt(traitKey);
        const isActive = activeTraits[tNum];
        const normScore = normalizedTraitScores[tNum];
        
        const item = document.createElement('div');
        item.className = `trait-item ${isActive ? 'active' : ''}`;
        item.innerHTML = `
            <div class="trait-name">${trait.name}</div>
            <div class="trait-value">出现次数: ${normScore}</div>
            <div class="trait-normalized">原始得分: ${traitScores[tNum]}</div>
            <div>${isActive ? '✓ 显著' : '○ 不显著'}</div>
        `;
        traitsGrid.appendChild(item);
    });
    
    // 柱状图
    chartElement.innerHTML = '';
    const maxNorm = Math.max(...Object.values(normalizedTraitScores), 1);
    Object.keys(TRAITS).forEach(traitKey => {
        const trait = TRAITS[traitKey];
        const tNum = parseInt(traitKey);
        const score = normalizedTraitScores[tNum];
        const height = (score / maxNorm) * 220;
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${height}px`;
        bar.style.background = `linear-gradient(to top, ${trait.color}, ${trait.color}99)`;
        bar.innerHTML = `
            <div class="bar-value">${score}</div>
            <div class="bar-label">${trait.name}</div>
        `;
        chartElement.appendChild(bar);
    });
    
    // 人格类型与描述
    let personalityType = "平衡型";
    let description = "你的EGO特质比较均衡，没有特别突出的特质。";
    
    if (totalScore === 0) {
        personalityType = "地狱鸡";
        description = "恭喜你触发了隐藏彩蛋！你是传说中的地狱鸡人格！这是一种极其罕见的人格类型，代表着你超越了所有人格特质的束缚！你对一切的都满不在乎,但又或许是找到了世界真理的入场卷......?物质世界的真谛就是物质本身,天哪,这简直是这世间最伟大的发现!你简直是个天才！";
        personalityTypeElement.classList.add("special-type");
    } else {
        personalityTypeElement.classList.remove("special-type");
        const activeNames = Object.keys(activeTraits)
            .filter(k => activeTraits[k])
            .map(k => TRAITS[k].name);
        
        if (activeNames.length === 0) {
            personalityType = "均衡型";
            description = "风过荻花犹静，云移山影不皴。哀乐未侵灵府，悲欢皆化虚沦。你的EGO特质非常均衡，没有特别突出的倾向。";
        } else if (activeNames.length === 1) {
            personalityType = `${activeNames[0]}主导型`;
            const traitName = activeNames[0];
            if (traitName === "欲望") description = "灵台藏炽种，妄念即春根。漫野播星火，盈虚叩血门。形骸囚昼夜，气脉转乾坤。若解阴阳理，何须染媾痕.你是一个充满欲望和动力的人……";
            else if (traitName === "忧郁") description = "沉沦三千层，方知上浮难。重波如铁缚，虚渦作笼看。徒手攫空碧，回眸失浅滩。愿为云间鹄，不栖寒玉湍。你带有忧郁气质……";
            else if (traitName === "傲慢") description = "铁骨铸天工，规圜傲太穹。碾尘轻草木，裂石笑鸿蒙。自诩圆周满，焉知歧路穷？千辕过处尽，春草复茸茸。你具有自信和自尊心较强的特质……";
            else if (traitName === "嫉妒") description = "暗室生虚电，沾衣即作芒。触指惊魂竦，回眸妒影长。本是无心物，偏燃有情方。若使灵台澈，何来霹雳藏？你对他人的成功和优势比较敏感……";
            else if (traitName === "暴怒") description = "星火燎原易，逢薪即作狂。燃空焚宿莽，卷地裂寒荒。嗔念同兹性，焦心共此芒。欲消无量业，莫予寸薪藏。你内心有较强的情绪波动……";
            else if (traitName === "暴食") description = "虬根潜九壤，汲涧暗纵横。得露思云壑，餐霞慕玉英。千须穿石苦，一脉为贪生。莫道深泉寂，幽壤有战征。你对物质或精神享受有较强的渴望……";
        } else {
            personalityType = `${activeNames.join('+')}复合型`;
            description = `你的人格是${activeNames.join('和')}的复合型。`;
            if (activeNames.includes("忧郁") && activeNames.includes("欲望")) {
                description = "夜壑求燧，朝撷流萤。逐星而踝陷，问道则云暝。左持司南而磁坠，右秉莲灯而焰青。临渊欲掬月中璧，顾影方知身是萍。鲲徙南溟须积气，鹏抟渀浪待垂霆？但将盲履寄荒霰，何日灵槎渡晓冥？你是一个内心充满矛盾的人，既有强烈的追求和目标，又时常感到忧郁和迷茫。这种特质组合使你成为一个深刻的思想者。既渴望成为他人精神指引的灯塔，又在盲目寻找更亮的灯塔来寄生。共情力敏锐却导向过度沉沦幻想，有时用仪式性的决策尝试模拟对命运的掌控感，实则放弃了主动选择的权力。";
            } else if (activeNames.includes("傲慢") && activeNames.includes("嫉妒")) {
                description = "金谷灰飞珠犹璨，昆冈火尽玉仍温.莫将青眼观魍魉，且抱冰心对晓昏.你既有自信和优越感，又容易与他人比较，这种特质组合可能使你时而自信满满，时而感到不安。";
            } else if (activeNames.includes("忧郁") && activeNames.includes("暴食")) {
                description = "你常常感到忧郁，但也会通过追求物质或精神享受来缓解这种情绪。你的情感世界丰富而复杂。";
            }
        }
    }
    
    personalityTypeElement.textContent = personalityType;
    personalityDescriptionElement.textContent = description;
    
    const imgUrl = PERSONALITY_IMAGES[personalityType] || PERSONALITY_IMAGES["默认图片"];
    if (imgUrl) {
        personalityImage.src = imgUrl;
        personalityImage.alt = `${personalityType} 人格类型图片`;
        imageContainer.style.display = 'block';
        personalityImage.onerror = () => { personalityImage.src = "images/balanced.jpg"; };
    } else {
        imageContainer.style.display = 'none';
    }
}

function removeConnectMask() {
    const mask = document.getElementById('connection-mask');
    if (mask) mask.remove();
}

function onAllResourcesLoaded(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

onAllResourcesLoaded(removeConnectMask);