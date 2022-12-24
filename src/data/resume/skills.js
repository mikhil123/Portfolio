// TODO: Add Athletic Skills, Office Skills,
// Data Engineering, Data Science, ML Engineering, ... ?

const skills = [
  {
    title: 'Javascript',
    competency: 4,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Amazon Web Services',
    competency: 3,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'MYSQL',
    competency: 4,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 3,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Java',
    competency: 4,
    category: ['Languages', 'Java'],
  },
  {
    title: 'Spring Boot',
    competency: 4,
    category: ['Framework'],
  },
  {
    title: 'Spring',
    competency: 3,
    category: ['Framework'],
  },
  {
    title: 'Spring Security',
    competency: 4,
    category: ['Framework'],
  },
  {
    title: 'Angular JS',
    competency: 2,
    category: ['Framework'],
  },
  {
    title: 'Cassandra',
    competency: 3,
    category: ['Databases', 'Languages'],
  },
  {
    title: 'Postgres',
    competency: 4,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'Docker',
    competency: 3,
    category: ['DevOps Tools'],
  },
  {
    title: 'Jenkins',
    competency: 3,
    category: ['DevOps Tools'],
  },
  {
    title: 'OpenShift',
    competency: 4,
    category: ['DevOps Tools'],
  },
  {
    title: 'Ansible Tower',
    competency: 4,
    category: ['DevOps Tools'],
  },
  {
    title: 'Opsgenie',
    competency: 2,
    category: ['DevOps Tools'],
  },
  {
    title: 'Checkmarx',
    competency: 2,
    category: ['DevOps Tools'],
  },
  {
    title: 'Blackduck',
    competency: 3,
    category: ['DevOps Tools'],
  },
  {
    title: 'Splunk',
    competency: 3,
    category: ['DevOps Tools'],
  },
  {
    title: 'Sysdig',
    competency: 3,
    category: ['DevOps Tools'],
  },
  {
    title: 'Venfi',
    competency: 4,
    category: ['DevOps Tools'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be == to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7a',
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7a',
  '#6968b3',
];

const categories = [
  ...new Set(skills.reduce((acc, { category }) => acc.concat(category), [])),
]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
