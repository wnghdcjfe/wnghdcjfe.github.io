const siteContent = window.siteContent || {};

const addClassOnScroll = (element) => element && element.classList.add("come-in");

const renderNavigation = (navData) => {
    const navRoot = document.getElementById("site-nav");
    if (!navRoot || !navData) return;

    const logoAccent = navData.logoAccent || "";
    const linksMarkup = (navData.links || [])
        .map((item) => {
            const classes = [
                item.noUnderline ? "no-link" : "",
                item.iconClass ? "no-link" : ""
            ]
                .filter(Boolean)
                .join(" ");
            const content = item.iconClass ? `<i class="${item.iconClass}"></i>` : item.label;
            const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
            return `<li><a href="${item.href}" class="${classes.trim()}"${target}>${content}</a></li>`;
        })
        .join("");

    navRoot.innerHTML = `
        <div class="nav-wrapper">
            <h1 class="nav-logo">${navData.logo}<span class="logo-end">${logoAccent}</span></h1>
            <ul class="nav-menu">${linksMarkup}</ul>
        </div>
    `;
};

const renderHero = (heroData) => {
    const heroRoot = document.getElementById("hero");
    if (!heroRoot || !heroData) return;

    const introLink = heroData.intro?.link;
    const introMarkup = heroData.intro
        ? `<h3>${heroData.intro.text || ""} ${
              introLink ? `<a href="${introLink.href}" target="_blank">${introLink.label}</a>` : ""
          }</h3>`
        : "";
    const subtitleMarkup = heroData.subtitle ? `<h3>${heroData.subtitle}</h3>` : "";
    const achievementsMarkup = (heroData.achievements || [])
        .map((item) => {
            const link = item.href
                ? `<a href="${item.href}" target="_blank" class="rank-value">${item.label}</a>`
                : `<span class="rank-value">${item.label}</span>`;
            const suffix = item.suffix ? ` ${item.suffix}` : "";
            return `${link}${suffix}`;
        })
        .join(", ");
    const achievementBlock = achievementsMarkup ? `<p class="rank">${achievementsMarkup}</p>` : "";

    heroRoot.innerHTML = `${introMarkup}${subtitleMarkup}${achievementBlock}`;
};

const createProjectItem = (project) => {
    const listItem = document.createElement("li");
    const classNames = ["project", "ripple", "load-bg"];
    if (project.featured) classNames.push("project--featured");
    if (Array.isArray(project.extraClasses)) {
        classNames.push(...project.extraClasses);
    }
    listItem.className = classNames.join(" ");

    if (project.backgroundColor) {
        listItem.style.backgroundColor = project.backgroundColor;
    }

    const image = document.createElement("div");
    image.className = "project-image";
    if (project.backgroundImage) {
        image.style.backgroundImage = `url(${project.backgroundImage})`;
    }

    const link = document.createElement("a");
    link.className = "project-content";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const title = document.createElement("h3");
    title.className = "project-title";
    title.innerHTML = `<span>${project.title}</span>`;

    const underline = document.createElement("span");
    underline.className = "project-underline";

    const description = document.createElement("div");
    description.className = "project-description";
    description.innerHTML = `<span>${project.description}</span>`;

    link.appendChild(title);
    link.appendChild(underline);
    link.appendChild(description);
    listItem.appendChild(image);
    listItem.appendChild(link);

    return listItem;
};

const renderProjects = (projects) => {
    const projectsRoot = document.getElementById("projects");
    if (!projectsRoot || !projects || !projects.length) return;
    projectsRoot.innerHTML = "";
    const fragment = document.createDocumentFragment();
    projects.forEach((project) => fragment.appendChild(createProjectItem(project)));
    projectsRoot.appendChild(fragment);
};

const buildSectionWrapper = (sectionData) => {
    const wrapper = document.createElement("div");
    wrapper.className = "text-wrap animate-text";
    if (sectionData.title) {
        const heading = document.createElement("h2");
        heading.innerHTML = `${sectionData.title}<span class="logo-end">_</span>`;
        wrapper.appendChild(heading);
    }
    return wrapper;
};

const renderAbout = (aboutData) => {
    const aboutRoot = document.getElementById("about");
    if (!aboutRoot || !aboutData) return;
    const wrapper = buildSectionWrapper(aboutData);
    (aboutData.paragraphs || []).forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.className = "text-intro";
        paragraph.textContent = text;
        wrapper.appendChild(paragraph);
    });
    aboutRoot.innerHTML = "";
    aboutRoot.appendChild(wrapper);
};

const renderTech = (techData) => {
    const techRoot = document.getElementById("Tech");
    if (!techRoot || !techData) return;
    const wrapper = buildSectionWrapper(techData);
    (techData.categories || []).forEach((category) => {
        const label = document.createElement("p");
        label.className = "text-intro";
        label.textContent = category.label;
        const items = document.createElement("p");
        items.textContent = category.items;
        wrapper.appendChild(label);
        wrapper.appendChild(items);
    });
    techRoot.innerHTML = "";
    techRoot.appendChild(wrapper);
};

const renderAwards = (awardsData) => {
    const awardsRoot = document.getElementById("awards");
    if (!awardsRoot || !awardsData) return;
    const wrapper = buildSectionWrapper(awardsData);
    (awardsData.items || []).forEach((award) => {
        const title = document.createElement("p");
        title.className = "text-intro";
        title.textContent = award.label;

        const detail = document.createElement("p");
        let detailHTML = award.detail || "";
        if (award.link) {
            detailHTML += `<a href="${award.link.href}" target="_blank">${award.link.text}</a>`;
        }
        if (award.stars) {
            detailHTML += ` ${'<i class="fas fa-star"></i>'.repeat(award.stars)}`;
        }
        if (award.suffix) {
            detailHTML += award.suffix;
        }
        detail.innerHTML = detailHTML;

        wrapper.appendChild(title);
        wrapper.appendChild(detail);
    });
    awardsRoot.innerHTML = "";
    awardsRoot.appendChild(wrapper);
};

const initScrollAnimations = () => {
    let scrollPos = window.scrollY;
    const about = document.querySelector("#about > .text-wrap");
    const tech = document.querySelector("#Tech > .text-wrap");
    const awards = document.querySelector("#awards > .text-wrap");
    const sections = [
        { element: about, offset: () => about?.offsetHeight - 200 || 0 },
        { element: tech, offset: () => (tech?.offsetHeight || 0) + 300 },
        { element: awards, offset: () => (awards?.offsetHeight || 0) + 700 }
    ];

    const handleScroll = () => {
        scrollPos = window.scrollY;
        sections.forEach((section) => {
            if (section.element && scrollPos >= section.offset()) {
                addClassOnScroll(section.element);
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
};

const renderSite = (data) => {
    renderNavigation(data.navigation);
    renderHero(data.hero);
    renderProjects(data.projects);
    renderAbout(data.about);
    renderTech(data.tech);
    renderAwards(data.awards);
    initScrollAnimations();
};

window.addEventListener("DOMContentLoaded", () => {
    renderSite(siteContent);
});