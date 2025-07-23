// Importing icons from lucide-react
import {
  LayoutDashboard,
  Calendar,
  WalletCards,
  List,
  Settings,
  Puzzle,
  Code2,
  User,
  BriefcaseBusiness,
  Crown,
} from "lucide-react";

// Sidebar base navigation options
export const SideBaseOptions = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Scheduled Interviews",
    path: "/scheduled-interviews",
    icon: Calendar,
  },
  {
    name: "All Interviews",
    path: "/all-interviews",
    icon: List,
  },
  {
    name: "Billing",
    path: "/billing",
    icon: WalletCards,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

// Interview type options
export const InterviewTypes = [
  {
    title: "Technical",
    icon: Code2,
  },
  {
    title: "Behavioral",
    icon: User,
  },
  {
    title: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: Crown,
  },
];

export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{Duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

🍀 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
  {
    question: "",
    type: 'Technical/Behavioral/Experience/Problem Solving/Leasership'
  },
  {
    ...
  }
]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;
