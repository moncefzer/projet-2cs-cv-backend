const data = {
  cvColor: "red",
  step: 1,
  currentEditedIndex: undefined,
  infos: {
    image: "path-to-profile-image.jpg",
    firstName: "Moncef",
    lastName: "Zermache",
    jobTitle: "Software Engineer",
    country: "United States",
    city: "San Francisco",
    state: "CA",
    phoneNumber: "+1234567890",
    email: "john@example.com",
  },
  jobTitle: "Software Engineer",
  feild: "Software Development",
  skills: [
    { skill: "JavaScript" },
    { skill: "React" },
    { skill: "HTML" },
    { skill: "CSS" },
    // Add more skills as needed
  ],
  yearsOfExperience: "5",
  jobExperience: [
    {
      jobTitle: "Software Developer",
      companyName: "ABC Tech",
      startMonth: "January",
      endMonth: "December",
      startYear: "2018",
      endYear: "2021",
      city: "New York",
      state: "NY",
      currentlyWorkHere: false,
      responsibility: "Developed and maintained web applications.",
    },
  ],
  languages: [
    {
      language: "English",
      level: "Fluent",
    },
    {
      language: "Spanish",
      level: "Intermediate",
    },
  ],
  summary:
    "Hello, i’m Mohamed, a passionate Digital Products (UI/UX) designer with more then 2 years of experience in the domain, my objective is to leverage my creative skills, problem-solving abilities, and help businesses launch or develop their digital products following the best product development practices. As a master student, I am seeking a Contract, remote or hybrid part-time UI/UX designer position.",
  education: [
    {
      schoolName: "Higher School of Computer Science and Technology",
      location: "Bejaia",
      degree: "Bachelor of Science",
      field: "Computer Science",
      endMonth: "May",
      endYear: "2018",
    },
  ],
};

module.exports = { data };
