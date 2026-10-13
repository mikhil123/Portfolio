// Each skill has a single display group. `competency` is a self-rating out of 5.
const skills = [
  { title: 'Java', competency: 4, group: 'Backend & Data' },
  { title: 'Spring Boot', competency: 4, group: 'Backend & Data' },
  { title: 'Spring Security', competency: 4, group: 'Backend & Data' },
  { title: 'Spring', competency: 3, group: 'Backend & Data' },
  { title: 'Apache Spark', competency: 3, group: 'Backend & Data' },

  { title: 'Postgres', competency: 4, group: 'Databases' },
  { title: 'MySQL', competency: 4, group: 'Databases' },
  { title: 'Cassandra', competency: 3, group: 'Databases' },

  { title: 'Amazon Web Services', competency: 3, group: 'Cloud & DevOps' },
  { title: 'OpenShift', competency: 4, group: 'Cloud & DevOps' },
  { title: 'Ansible Tower', competency: 4, group: 'Cloud & DevOps' },
  { title: 'Venafi', competency: 4, group: 'Cloud & DevOps' },
  { title: 'Docker', competency: 3, group: 'Cloud & DevOps' },
  { title: 'Jenkins', competency: 3, group: 'Cloud & DevOps' },
  { title: 'Splunk', competency: 3, group: 'Cloud & DevOps' },
  { title: 'Sysdig', competency: 3, group: 'Cloud & DevOps' },
  { title: 'Blackduck', competency: 3, group: 'Cloud & DevOps' },
  { title: 'Opsgenie', competency: 2, group: 'Cloud & DevOps' },
  { title: 'Checkmarx', competency: 2, group: 'Cloud & DevOps' },

  { title: 'JavaScript', competency: 4, group: 'Frontend' },
  { title: 'HTML + SASS/SCSS/CSS', competency: 3, group: 'Frontend' },
  { title: 'AngularJS', competency: 2, group: 'Frontend' },
];

const groups = [...new Set(skills.map((s) => s.group))];

export { groups, skills };
