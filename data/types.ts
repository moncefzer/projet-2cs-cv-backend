export interface jobExperienceType {
  jobTitle: string;
  companyName: string;
  startMonth: string;
  endMonth: string;
  startYear: string;
  endYear: string;
  city: string;
  state: string;
  currentlyWorkHere: boolean;
  responsibility: string;
}

export interface languagesType {
  language: string;
  level: string;
}

export interface skillsType {
  skill: string;
}
export interface CvState {
  step: number;
  currentEditedIndex: number | undefined;
  infos: ContactType;
  cvColor: string;
  jobTitle: string;
  feild: string;
  skills: Array<skillsType>;
  yearsOfExperience: string;
  jobExperience: Array<jobExperienceType>;
  languages: Array<languagesType>;
  summary: string;
  education: Array<educationType>;
}

export interface ContactType {
  image: any;
  firstName: string;
  lastName: string;
  jobTitle: string;
  country: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
}

export interface educationType {
  schoolName: string;
  location: string;
  degree: string;
  field: string;
  endMonth: string;
  endYear: string;
}
