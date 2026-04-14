const TRAITS = {
    1: { name: "暴食", unit: 1, color: "#ff6b6b" },
    10: { name: "暴怒", unit: 10, color: "#ffa726" },
    100: { name: "傲慢", unit: 100, color: "#ffd54f" },
    1000: { name: "欲望", unit: 1000, color: "#4ecdc4" },
    10000: { name: "忧郁", unit: 10000, color: "#6c63ff" },
    100000: { name: "嫉妒", unit: 100000, color: "#ff6b9d" }
};

// 根据您的图片文件，设置正确的人格类型图片映射
const PERSONALITY_IMAGES = {
    "均衡型": "images/balanced.jpg",
    "欲望主导型": "images/desire.jpg",
    "忧郁主导型": "images/melancholy.jpg", // 使用您提供的huanzhi.jpg
    "傲慢主导型": "images/arrogance.jpg",
    "嫉妒主导型": "images/jealousy.jpg", // 没有对应图片，使用默认
    "暴怒主导型": "images/warth.jpg", // 没有对应图片，使用默认
    "暴食主导型": "images/gluttony.jpg",
    "欲望+忧郁复合型": "images/dm.jpg",
    "傲慢+嫉妒复合型": "images/aj.jpg", // 没有对应图片，使用默认
    "忧郁+暴食复合型": "images/mg.jpg", // 没有对应图片，使用默认
    "地狱鸡": "images/caidan.jpg", // 彩蛋图片
    "平衡型": "images/balanced.jpg", // 默认使用均衡型图片
    "默认图片": "images/balanced.jpg" // 备用图片
};

const questions = [
    {
        id: 1,
        text: "你是否从不进行多余的、无意义的工作，除非大难临头了或者有人强迫着你去做？",
        options: [
            { text: "任务就是任务咯", value: 0 },
            { text: "乐意至极☺️🌸，我的朋友", value: 1000 },
            { text: "我不！我就不！我啥都不想做，你奈我何", value: 100 },
            { text: "我有好多想干的事，人生的意义就是前进啊，老兄！", value: 1001 }
        ]
    },
    {
        id: 2,
        text: "你是否为自己的未来感到迷茫,不知该何去何从?",
        options: [
            { text: "噢...执行经理,我想或许是应该给自己找个目标了", value: 1000 },
            { text: "该死,我的罗盘丢了,我们根本不可能能在大湖上活下去", value: 10000 },
            { text: "我想...我知道自己的的未来需要的是什么,我会为之开辟前路", value: 1100 },
            { text: "行军...行军...摄取...抹除...再生...行军...", value: 1 },
            { text: "去TM的人生未来,这种问题问我,我怎么可能知道啊!!!", value: 10 },
            { text: "人生就是人生咯", value: 0 }
        ]
    },
    {
        id: 3,
        text: "你是否有感受过被压力压得难以喘息的感觉?",
        options: [
            { text: "哦..该死的流程和任务系统,我哭了", value: 10000 },
            { text: "嘶..我作业(工作)还没做完,真该死", value: 10000 },
            { text: "任务就是任务咯", value: 0 },
            { text: "那又怎样,叽里咕噜说什么呢,疯狂地狱鸡,v我50", value: 1 },
            { text: "DDL领域大神,开玩笑,我超勇的啦☺️🌸", value: 100 }
        ]
    },
    {
        id: 4,
        text: "你所追寻的东西都得到了吗?还是说你其实根本没得到过?",
        options: [
            { text: "目标就是目标咯", value: 0 },
            { text: "这些目标既是束缚也是枷锁,到底什么时候才能将我解放!", value: 110 },
            { text: "王想要,王得到!", value: 1000 },
            { text: "老己想要,老己别闹", value: 10000 },
            { text: "冒险结束了!", value: 1000 },
            { text: "无我梦中,阿鼻叫唤,海浪只是被风推动着前进罢了", value: 10000 },
            { text: "TA知道TA和你谈过吗?😡", value: 100 }
        ]
    },
    {
        id: 5,
        text: "假如你溺水了,你觉得会有朋友来救你吗?",
        options: [
            { text: "笑死,根本没有朋友", value: 10000 },
            { text: "溺水就是溺水咯", value: 0 },
            { text: "感谢首脑,我们协会混的还不错,想吃火腿彭彭了", value: 1 },
            { text: "卯,参上", value: 100 },
            { text: "谨遵指令之意", value: 10000 },
            { text: "孑然一生,舍身取园", value: 100 },
            { text: "所以代我哭泣吧,为了我,和剩下的所有人(语出斯蒂芬妮)", value: 20000 }
        ]
    },
    {
        id: 6,
        text: "你相信自己有着碾碎一切阻挡在自己面前的阻力的能力吗?",
        options: [
            { text: "我将开辟道路", value: 100 },
            { text: "繁殖...摄取...抹除...阻碍之物，将被粉碎。", value: 1 },
            { text: "阻力就是阻力咯", value: 0 },
            { text: "不知这场大雨何时就会落下...", value: 10000 },
            { text: "道路的前方,我会得到什么🤔", value: 1000 }
        ]
    },
    {
        id: 7,
        text: "你会变得更好,对吧?",
        options: [
            { text: "......言•噪(必然的,废话少说,聒噪)", value: 110 },
            { text: "理所当然!经理老爷!!!!!!!!!!", value: 100 },
            { text: "我就是我咯", value: 0 },
            { text: "未来的是未来再说咯(偷吃小蛋糕)", value: 1 },
            { text: "我想...不会了吧...", value: 10000 },
            { text: "走一步,看一步啦!老兄!", value: 0 }
        ]
    },
    {
        id: 8,
        text: "我想和所有人分享自己的想法!",
        options: [
            { text: "你会认可我吗🥹", value: 1100 },
            { text: "快来和我玩!Ryoshu!", value: 1000 },
            { text: "我...我想...我还是一个人呆着吧...", value: 10000 },
            { text: "想法就是想法喽", value: 0 },
            { text: "我等只是在讨论学术罢了...", value: 1100 }
        ]
    },
    {
        id: 9,
        text: "我希望能够有人理解我...",
        options: [
            { text: "我只是想和你们大家一起……埋葬在花香中……", value: 11000 },
            { text: "我将穷极一生来寻找这样的人", value: 1000 },
            { text: "苦痛啊,你是我的唯一", value: 10000 },
            { text: "我就是我喽", value: 0 },
            { text: "无所谓,吾将贯彻此道", value: 100 }
        ]
    },
    {
        id: 10,
        text: "你可曾因被撺夺事物而对他人感到不满?(例如:抢票恰好售空,喜欢的人被人抢走,限定周边没抢到,抽卡就你没出,公司任务(学校小组作业)全权由你完成......)",
        options: [
            { text: "命运何其弄人?!", value: 100010 },
            { text: "苦痛啊,除了你...", value: 10000 },
            { text: "篡夺就是篡夺咯", value: 0 },
            { text: "时运不济罢了", value: 100 },
            { text: "命里有时终须有,命里无时莫方求", value: 0 }
        ]
    },
    {
        id: 11,
        text: "你重要的人即将离开你时?(对方主观意志所导致的)",
        options: [
            { text: "友人呐...若是我这次放你离开..想必你便再也不会回来了吧...", value: 10000 },
            { text: "拜拜就是拜拜喽~", value: 0 },
            { text: "我不理解,但会尊重", value: 0 },
            { text: "凭什么,你要离开我!", value: 100010 },
            { text: "圣光背弃了我!", value: 110 }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let totalScore = 0;
let traitScores = {
    1: 0, 10: 0, 100: 0, 1000: 0, 10000: 0, 100000: 0
};
let normalizedTraitScores = {
    1: 0, 10: 0, 100: 0, 1000: 0, 10000: 0, 100000: 0
};

const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const startTestBtn = document.getElementById('start-test');
const progressBar = document.getElementById('progress-bar');
const currentQuestionElement = document.getElementById('current-question');
const questionNumElement = document.getElementById('question-num');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const totalScoreElement = document.getElementById('total-score');
const traitsGrid = document.getElementById('traits-grid');
const chartElement = document.getElementById('chart');
const personalityTypeElement = document.getElementById('personality-type');
const personalityDescriptionElement = document.getElementById('personality-description');
const restartBtn = document.getElementById('restart-btn');
const backHomeBtn = document.getElementById('back-home-btn');
const personalityImage = document.getElementById('personality-image');
const imageContainer = document.getElementById('personality-image-container');

document.addEventListener('DOMContentLoaded', function() {
    showQuestion(currentQuestion);
    
    startTestBtn.addEventListener('click', startTest);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', showResult);
    restartBtn.addEventListener('click', restartTest);
    backHomeBtn.addEventListener('click', backToHome);
});

function startTest() {
    homePage.classList.remove('active');
    quizPage.classList.add('active');
    resultPage.classList.remove('active');
    
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const question = questions[index];
    questionNumElement.textContent = index + 1;
    currentQuestionElement.textContent = index + 1;
    questionTextElement.textContent = question.text;
    
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-radio"></div>
            <div class="option-text">${option.text}</div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(optionIndex));
        optionsContainer.appendChild(optionElement);
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

function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('请选择一个选项');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function calculateScores() {
    totalScore = 0;
    traitScores = { 1: 0, 10: 0, 100: 0, 1000: 0, 10000: 0, 100000: 0 };
    normalizedTraitScores = { 1: 0, 10: 0, 100: 0, 1000: 0, 10000: 0, 100000: 0 };
    
    const traitMaxValues = { 1: 0, 10: 0, 100: 0, 1000: 0, 10000: 0, 100000: 0 };
    
    questions.forEach((question, index) => {
        const answerIndex = userAnswers[index];
        if (answerIndex !== null) {
            const optionValue = question.options[answerIndex].value;
            totalScore += optionValue;
            
            Object.keys(traitScores).forEach(trait => {
                const traitNum = parseInt(trait);
                if (optionValue % (traitNum * 10) >= traitNum) {
                    traitScores[traitNum] += traitNum;
                    normalizedTraitScores[traitNum] += 1;
                }
            });
            
            let maxValuesForQuestion = { 1: 0, 10: 0, 100: 0, 1000: 0, 10000: 0, 100000: 0 };
            
            question.options.forEach(option => {
                const value = option.value;
                Object.keys(maxValuesForQuestion).forEach(trait => {
                    const traitNum = parseInt(trait);
                    if (value % (traitNum * 10) >= traitNum) {
                        maxValuesForQuestion[traitNum] = 1;
                    }
                });
            });
            
            Object.keys(traitMaxValues).forEach(trait => {
                const traitNum = parseInt(trait);
                traitMaxValues[traitNum] += maxValuesForQuestion[traitNum];
            });
        }
    });
    
    const activeTraits = {};
    Object.keys(normalizedTraitScores).forEach(trait => {
        const traitNum = parseInt(trait);
        const maxValue = traitMaxValues[traitNum];
        const threshold = maxValue / 2;
        activeTraits[traitNum] = normalizedTraitScores[traitNum] >= threshold;
    });
    
    return activeTraits;
}

function showResult() {
    if (userAnswers[currentQuestion] === null) {
        alert('请选择一个选项');
        return;
    }
    
    const activeTraits = calculateScores();
    
    quizPage.classList.remove('active');
    resultPage.classList.add('active');
    
    totalScoreElement.textContent = totalScore;
    
    traitsGrid.innerHTML = '';
    Object.keys(TRAITS).forEach(traitKey => {
        const trait = TRAITS[traitKey];
        const traitNum = parseInt(traitKey);
        const isActive = activeTraits[traitNum];
        const normalizedScore = normalizedTraitScores[traitNum];
        
        const traitElement = document.createElement('div');
        traitElement.className = `trait-item ${isActive ? 'active' : ''}`;
        traitElement.innerHTML = `
            <div class="trait-name">${trait.name}</div>
            <div class="trait-value">出现次数: ${normalizedScore}</div>
            <div class="trait-normalized">原始得分: ${traitScores[traitNum]}</div>
            <div>${isActive ? '✓ 显著' : '○ 不显著'}</div>
        `;
        traitsGrid.appendChild(traitElement);
    });
    
    chartElement.innerHTML = '';
    const maxNormalizedScore = Math.max(...Object.values(normalizedTraitScores));
    
    Object.keys(TRAITS).forEach(traitKey => {
        const trait = TRAITS[traitKey];
        const traitNum = parseInt(traitKey);
        const score = normalizedTraitScores[traitNum];
        
        const height = maxNormalizedScore > 0 ? (score / maxNormalizedScore) * 220 : 0;
        
        const barElement = document.createElement('div');
        barElement.className = 'bar';
        barElement.style.height = `${height}px`;
        barElement.style.background = `linear-gradient(to top, ${trait.color}, ${trait.color}99)`;
        barElement.innerHTML = `
            <div class="bar-value">${score}</div>
            <div class="bar-label">${trait.name}</div>
        `;
        chartElement.appendChild(barElement);
    });
    
    let personalityType = "平衡型";
    let description = "你的EGO特质比较均衡，没有特别突出的特质。";
    
    // 彩蛋：当总分为0时，显示"地狱鸡"人格类型
    if (totalScore === 0) {
        personalityType = "地狱鸡";
        description = "恭喜你触发了隐藏彩蛋！你是传说中的地狱鸡人格！这是一种极其罕见的人格类型，代表着你超越了所有人格特质的束缚！你对一切的都满不在乎,但又或许是找到了世界真理的入场卷......?物质世界的真谛就是物质本身,天哪,这简直是这世间最伟大的发现!你简直是个天才！";
        
        // 为地狱鸡人格添加特殊样式
        personalityTypeElement.classList.add("special-type");
    } else {
        personalityTypeElement.classList.remove("special-type");
        
        const activeTraitNames = Object.keys(activeTraits)
            .filter(traitKey => activeTraits[traitKey])
            .map(traitKey => TRAITS[traitKey].name);
        
        if (activeTraitNames.length === 0) {
            personalityType = "均衡型";
            description = "风过荻花犹静，云移山影不皴。哀乐未侵灵府，悲欢皆化虚沦。你的EGO特质非常均衡，没有特别突出的倾向。你在不同情境下能够展现出不同的特质，具有很好的适应性。";
        } else if (activeTraitNames.length === 1) {
            personalityType = `${activeTraitNames[0]}主导型`;
            description = `${activeTraitNames[0]}特质在你的人格中占据主导地位。`;
            
            if (activeTraitNames[0] === "欲望") {
                description = "灵台藏炽种，妄念即春根。漫野播星火，盈虚叩血门。形骸囚昼夜，气脉转乾坤。若解阴阳理，何须染媾痕.你是一个充满欲望和动力的人，对目标有强烈的追求，不轻易满足于现状。你有明确的人生方向，并且会为之不懈努力。色欲是指想要大规模传播构成自己的东西，可能接近于繁殖欲望。分享所知,分享所想,寻求认可,亦为色欲.";
            } else if (activeTraitNames[0] === "忧郁") {
                description = "沉沦三千层，方知上浮难。重波如铁缚，虚渦作笼看。徒手攫空碧，回眸失浅滩。愿为云间鹄，不栖寒玉湍。你带有忧郁气质，对生活和情感有深刻的体验和思考。你可能会时常反思，对事物的感受比较深刻。你可曾潜入深水？下潜得越深，就越难再浮上来。那种紧紧束缚全身的压迫感，还有无论怎么挣扎都抓不住任何东西的虚无感。这就是所谓的忧郁。";
            } else if (activeTraitNames[0] === "傲慢") {
                description = "铁骨铸天工，规圜傲太穹。碾尘轻草木，裂石笑鸿蒙。自诩圆周满，焉知歧路穷？千辕过处尽，春草复茸茸。你具有自信和自尊心较强的特质，有时可能表现出一定的优越感。你相信自己的能力，不轻易向困难低头。车轮是技术的象征，也是人类试图前进的方向本身。车轮傲慢地追求着连自然都未能产生的完美的圆，无尽地转动着。因此，即使其撕扯肉块、碾过草地……它也毫不在乎。它也毫不在乎。";
            } else if (activeTraitNames[0] === "嫉妒") {
                description = "暗室生虚电，沾衣即作芒。触指惊魂竦，回眸妒影长。本是无心物，偏燃有情方。若使灵台澈，何来霹雳藏？你对他人的成功和优势比较敏感，有时会产生比较心理。这也可以转化为你追求进步的动力。若是谁曾体会过嫉妒的情绪，便会明白那种感受与静电的相似之处。";
            } else if (activeTraitNames[0] === "暴怒") {
                description = "星火燎原易，逢薪即作狂。燃空焚宿莽，卷地裂寒荒。嗔念同兹性，焦心共此芒。欲消无量业，莫予寸薪藏。你内心有较强的情绪波动，容易对不公或挫折产生强烈的情绪反应。学会管理情绪对你很重要。火这种东西，一旦开始燃烧，就会一直燃烧下去，直到没有可以燃烧的东西为止。也就是怒火中烧。字面意义上的。如果明白了没有意义，火也就不会被点燃了呢。";
            } else if (activeTraitNames[0] === "暴食") {
                description = "虬根潜九壤，汲涧暗纵横。得露思云壑，餐霞慕玉英。千须穿石苦，一脉为贪生。莫道深泉寂，幽壤有战征。你对物质或精神享受有较强的渴望，喜欢追求满足感。适度追求享受是生活的调味剂。植物的根系在土壤之中生长挖掘，吸取养分。关键在于，得到了养分却不满足于此。吸收的养分越多，根系就愈加宽阔发达。一切都是为了获取更多的养分。";
            }
        } else {
            personalityType = `${activeTraitNames.join('+')}复合型`;
            description = `你的人格是${activeTraitNames.join('和')}的复合型，这些特质共同塑造了你独特的性格。`;
            
            if (activeTraitNames.includes("忧郁") && activeTraitNames.includes("欲望")) {
                description = "夜壑求燧，朝撷流萤。逐星而踝陷，问道则云暝。左持司南而磁坠，右秉莲灯而焰青。临渊欲掬月中璧，顾影方知身是萍。鲲徙南溟须积气，鹏抟渀浪待垂霆？但将盲履寄荒霰，何日灵槎渡晓冥？你是一个内心充满矛盾的人，既有强烈的追求和目标，又时常感到忧郁和迷茫。这种特质组合使你成为一个深刻的思想者。既渴望成为他人精神指引的灯塔，又在盲目寻找更亮的灯塔来寄生。共情力敏锐却导向过度沉沦幻想，有时用仪式性的决策尝试模拟对命运的掌控感，实则放弃了主动选择的权力。";
            } else if (activeTraitNames.includes("傲慢") && activeTraitNames.includes("嫉妒")) {
                description = "金谷灰飞珠犹璨，昆冈火尽玉仍温.莫将青眼观魍魉，且抱冰心对晓昏.你既有自信和优越感，又容易与他人比较，这种特质组合可能使你时而自信满满，时而感到不安。";
            } else if (activeTraitNames.includes("忧郁") && activeTraitNames.includes("暴食")) {
                description = "你常常感到忧郁，但也会通过追求物质或精神享受来缓解这种情绪。你的情感世界丰富而复杂。";
            }
        }
    }
    
    personalityTypeElement.textContent = personalityType;
    personalityDescriptionElement.textContent = description;
    
    const imageUrl = PERSONALITY_IMAGES[personalityType] || PERSONALITY_IMAGES["默认图片"];
    
    if (imageUrl) {
        personalityImage.src = imageUrl;
        personalityImage.alt = `${personalityType} 人格类型图片`;
        imageContainer.style.display = 'block';
        
        // 添加图片加载失败的备用方案
        personalityImage.onerror = function() {
            this.src = "images/balanced.jpg";
        };
    } else {
        imageContainer.style.display = 'none';
    }
}

function restartTest() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    resultPage.classList.remove('active');
    quizPage.classList.add('active');
    showQuestion(currentQuestion);
}

function backToHome() {
    resultPage.classList.remove('active');
    homePage.classList.add('active');
}
