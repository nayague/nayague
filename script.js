const workHistory = [
  {
    company: "GoTradie",
    location: "Australia",
    jobRole: "Senior Software Engineer",
    duration: "August 2023 - PRESENT",
    description: [
      "Built cross-platform web and mobile app (React Native, ReactJS) with modern tech (PWA, TypeScript, React Queries, Storybook, GIT) using Scrum and tools (JIRA, Confluence) to deliver user-centric features iteratively (in collaboration with UI/UX and product).",
      "Transformed GoTradie web app into a standalone PWA in a week, saving 90% development cost compared to a standalone application which takes 3 months."],
    skills: ["React.js", "React Native", "Progressive Web Applications (PWAs)"

    ]
  },
  {
    company: "OrangeHRM",
    location: "Sri Lanka",
    jobRole: "Senior Software Engineer",
    duration: "November 2021 - August 2023",
    description: [
      "Led OrangeHRM's front-end overhaul, prioritizing UI/UX with modern frameworks (VueJS 3, VueX, React Native, Angular) and agile tools (GIT, JIRA, Confluence, TWiki) for collaboration and documentation, quality, and seamless user and developer experience.",
      "By working closely with stakeholders and the UI/UX team, I co-revamped the front-end of the recruitment module, leading to a 22% increase in positive user satisfaction ratings based on post-application surveys."
    ],
    skills: ["Front-end Coding", "Git", "Vue.js", "Vuex", "Vue", "Docker", "PHP"]
  },
  {
    company: "Aeturnum",
    location: "Sri Lanka",
    jobRole: "Senior Software Engineer",
    duration: "June 2021 - October 2021",
    description: ["Collaborated with stakeholders on POS bridge development for Line10, leading NuxtJS (VueJS framework) and architectural design and development for a user-centric experience. Improved the developer experience by introducing, implementing the VueX state manager in the Line10 Application."],
    skills: ["Vue.js", "Webpack", "JavaScript", "Front-end Coding", "Git", "Nuxt.js", "Nuxt"]
  },
  {
    company: "Platform1",
    location: "Sri Lanka",
    jobRole: "Senior Software Engineer",
    duration: "January 2021 - June 2021",
    description: ["Led front-end development across the entire software lifecycle, contributing micro front-ends for maintainability, UX iteration, and best practices adherence (ISO 27001, GDPR)."],
    skills: ["Vue.js", "Webpack", "JavaScript", "Front-end Coding", "Git", "React Native", "ASP.NET"]
  },
  {
    company: "Platform1",
    location: "Sri Lanka",
    jobRole: "Software Engineer",
    duration: "June 2018 - January 2021",
    description: ["Enhanced user experience through iterative design, built interactive web components from basic to complex, and implemented secure front-end practices compliant with ISO 27001, utilizing JavaScript, Vue.js, VueX, React Native, and Storybook."],
    skills: ["Vue.js", "JavaScript", "React Native", "ISO27001", "General Data Protection Regulation (GDPR)", "Information Security"]
  },
  {
    company: "Suwahas",
    location: "Sri Lanka",
    jobRole: "Software Engineer",
    duration: "September 2017 - June 2018",
    description: ["Supported ERP development TrendyWear with vanilla JS, jQuery, PHP, MariaDB, and GIT."],
    skills: ["Git", "PHP", "jQuery", "MariaDB", "Relational Databases"]
  },
  {
    company: "Quard International",
    location: "Sri Lanka",
    jobRole: "Web Developer",
    duration: "August 2016 - August 2017",
    description: ["Built 20+ websites using PHP, WordPress, and Magento."],
    skills: ["PHP", "WordPress", "Magento", "HTML5", "CSS", "jQuery"]
  },
  {
    company: "3CS",
    location: "Sri Lanka",
    jobRole: "Associate Web Designer",
    duration: "Feb 2016 - August 2016",
    description: ["Skilled in website and application design using Adobe Photoshop, seamlessly transitioning to Figma and Adobe XD as industry standards evolved."],
    skills: ["Git", "Adobe Photoshop", "Figma", "Adobe XD", "Web Design", "Application Design"]
  },
  {
    company: "Miami Exports",
    location: "Sri Lanka",
    jobRole: "Intern",
    duration: "June 2015 - August 2015",
    description: ["Intern web developer: front-end design & development."],
    skills: ["HTML5", "CSS", "jQuery", "MySQL", "MariaDB"]
  }
];

const render = (template, container, data) => {
  const templateContainer = document.querySelector(container); // Replace with your container element selector

  if (templateContainer) {
    const mappedData = data.map((item) => template(item)).join('');

    templateContainer.innerHTML = mappedData;
  } else {
    console.error('Work history container element not found!');
  }
}

const workHistoryTemplate = (item) => `
  <div class="card shadow">
    <div class="card-body">
      <h5 class="card-title">${item.company} - ${item.jobRole} - ${item.location}</h5>
      <p class="card-text">${item.duration}</p>
      <ul class="list-group">
        ${item.description.map(line => `<li class="list-group-item">${line}</li>`)}
      </ul>
      <p class="mt-2">
        ${item.skills.map(skill => `<span class="badge bg-dark">${skill}</span>`).join(' ')}
      </p>
    </div>
  </div>
`
render(workHistoryTemplate, '.work-history-container', workHistory);