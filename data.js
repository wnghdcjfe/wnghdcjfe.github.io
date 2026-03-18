/**
 * 모든 콘텐츠는 이 객체만 수정하면 됩니다.
 * 필요한 경우 항목을 추가/삭제하거나 텍스트를 바꾸세요.
 */
window.siteContent = {
    navigation: {
        logo: "Hongchul Ju",
        logoAccent: "_",
        links: [
            { label: "Projects", href: "#projects" },
            { label: "About", href: "#about" },
            { label: "Tech", href: "#Tech" },
            { label: "Awards", href: "#awards" },
            { label: "Blog", href: "https://jhc9639.blog.me", external: true },
            { iconClass: "fab fa-github", href: "https://github.com/wnghdcjfe", external: true, noUnderline: true }
        ]
    },
    hero: {
        intro: {
            text: "Hi I'm",
            link: { label: "Hongchul ju", href: "https://github.com/wnghdcjfe" }
        },
        subtitle: "A developer who makes beautiful code",
        achievements: [
            {
                label: "Top 4%",
                href: "https://raw.githubusercontent.com/wnghdcjfe/wnghdcjfe.github.io/master/4percent.JPG",
                suffix: " at 2020 Kakao Front-End Development Challenge"
            },
            {
                label: "76th",
                href: "https://github.com/mochajs/mocha/graphs/contributors",
                suffix: " Mocha Contributor"
            },
            {
                label: "Platinum 1",
                href: "https://solved.ac/profile/zagabi",
                suffix: " in BOJ"
            }
        ]
    },
    projects: [
        {
            title: "AMOS",
            description: "Real-time Weather Monitoring System",
            url: "https://github.com/wnghdcjfe/wnghdcjfe.github.io/blob/master/%EA%B8%B0%EC%83%81%EC%A0%95%EB%B3%B4%EC%A7%80%EC%9B%90%EC%B2%B4%EA%B3%84.md",
            backgroundImage: "./imgs/amos.gif",
            backgroundColor: "#0b2a3e",
            featured: true
        },
        {
            title: "IU toon",
            description: "Singer IU Song Serving Page",
            url: "https://github.com/wnghdcjfe/IUtoon",
            backgroundImage: "./imgs/iu.gif",
            backgroundColor: "#ed1a44"
        },
        {
            title: "KNUE",
            description: "University community web site",
            url: "https://github.com/wnghdcjfe/wnghdcjfe.github.io/blob/master/knue.md",
            backgroundImage: "./imgs/knue.gif",
            backgroundColor: "#000000"
        },
        {
            title: "Lucid Codeforce",
            description: "A system that quickly finds answers to Codeforce.",
            url: "https://lucidcode.herokuapp.com/#/",
            backgroundImage: "./imgs/lucid.png",
            backgroundColor: "#42b983",
            extraClasses: ["project--mobile-auto-image"]
        },
        {
            title: "Mocha.js",
            description: "Javascript Test Framework",
            url: "https://github.com/mochajs/mocha/graphs/contributors",
            backgroundImage: "./imgs/mocha.png",
            backgroundColor: "#a67d5d",
            extraClasses: ["project--mobile-auto-image"]
        },
        {
            title: "Solbang Notepad",
            description: "Actor Chun Woo-hee's Notebook Page",
            url: "https://github.com/wnghdcjfe/thousand_wooo_app",
            backgroundImage: "./imgs/thou.gif",
            backgroundColor: "#1faec8"
        }
    ],
    about: {
        title: "About",
        paragraphs: [
            "I started programming by developing a university community, and I joined the Air Force and developed a project to provide weather data services. One of the most representative projects is the AMOS project currently used by the airport control department.",
            "Based on the experience of solving more than 1,300 algorithmic problems in BOJ, I have experienced over 67% improvement in performance by using segments and a 15-fold increase in data growth, but 30% improvement by removing unnecessary business logic and requests."
        ]
    },
    tech: {
        title: "Tech",
        categories: [
            {
                label: "Strong",
                items: "JS(ES5+) / Vue.js / Vuex / React.js / Redux / D3.js / Node.js / Express.js / Request.js / Cheerio.js / Nightmare.js / Mocha.js / TypeScript / GraphQL / HTML5 / CSS / Webpack / C++(PS) / Functional Programming / MongoDB / Neo4j / Nginx"
            },
            {
                label: "Knowledgeable",
                items: "Spring / Java / jQuery / Angular.js / PHP / Python / TensorFlow / DL(LSTM, CNN) / Matplotlib / Numpy / Pandas / Beautiful Soup 4 / Selenium / JSP / MySQL / TiberoDB / FirebaseDB"
            },
            {
                label: "ETC",
                items: "Git / Docker / IOT / OPIC-IM2(20.02.29) / Secure Coding Completion(KISA)"
            }
        ]
    },
    awards: {
        title: "Awards",
        items: [
            {
                label: "2020 Kakao Development Challenge Front-End Challenges",
                detail: "20.07 / Top 4% / Programmers / ",
                link: { href: "https://bit.ly/2C96qdc", text: "link" }
            },
            {
                label: "2019 Countributon – Mocha.js",
                detail: "19.12.04 / Encouragement Prize / Ministry of Science and ICT"
            },
            {
                label: "citation (development of North Korean Artillery Weather Station)",
                detail: "19.04.11 / defense Intelligence Headquarters",
                stars: 3,
                suffix: " / Defense Department"
            },
            {
                label: "citation (development of AMOS)",
                detail: "18.08.20 / Brigadier General",
                stars: 1,
                suffix: " / Weather Group of R.O.K Air Force"
            },
            {
                label: "2nd place in SW development competition for military in South Korea",
                detail: "17.01.24 / General",
                stars: 4,
                suffix: " / Defense Department"
            },
            {
                label: "1st place in Startup Korea Gangwon Hackathon",
                detail: "15.12.13 / 1st place / Gangwon Creative Economy Innovation Center"
            },
            {
                label: "2nd place in the 2015 Korea Presentation Contest",
                detail: "15.01.29 / 2nd place in university student category / G1 Gangwon"
            }
        ]
    }
};

