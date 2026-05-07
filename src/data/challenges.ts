export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Review Yesterday's Lecture",
    description: "Spend 15 minutes reviewing your notes from yesterday's class. Identify one concept you didn't fully understand and research it.",
    category: "Study",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Code a Simple Function",
    description: "Write a function that reverses a string without using built-in reverse methods. Test it with at least 3 different inputs.",
    category: "Programming",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Solve One Math Problem",
    description: "Pick one problem from your calculus or linear algebra textbook that you found difficult. Solve it step by step.",
    category: "Mathematics",
    difficulty: "Medium"
  },
  {
    id: 4,
    title: "Teach a Concept",
    description: "Explain one programming concept (like loops or arrays) to a classmate or write it down as if teaching a beginner.",
    category: "Collaboration",
    difficulty: "Medium"
  },
  {
    id: 5,
    title: "Debug Practice",
    description: "Find a piece of your old code that has bugs. Spend 20 minutes debugging it without looking at solutions.",
    category: "Programming",
    difficulty: "Medium"
  },
  {
    id: 6,
    title: "Circuit Analysis Practice",
    description: "Solve one circuit problem using Kirchhoff's laws. Draw the circuit diagram and show all your work.",
    category: "Circuits",
    difficulty: "Hard"
  },
  {
    id: 7,
    title: "Read Documentation",
    description: "Pick a library or framework you're learning. Read its official documentation for 15 minutes and try one example.",
    category: "Programming",
    difficulty: "Easy"
  },
  {
    id: 8,
    title: "Algorithm Visualization",
    description: "Draw out how bubble sort or selection sort works step by step with a small array. Understand each swap.",
    category: "Algorithms",
    difficulty: "Medium"
  },
  {
    id: 9,
    title: "GitHub Commit",
    description: "Make at least one meaningful commit to a personal project today. Even small progress counts.",
    category: "Programming",
    difficulty: "Easy"
  },
  {
    id: 10,
    title: "Practice Problem Solving",
    description: "Solve one problem on LeetCode, HackerRank, or Codewars. Start with an easy one if you're new.",
    category: "Algorithms",
    difficulty: "Medium"
  },
  {
    id: 11,
    title: "Watch an Educational Video",
    description: "Find a 10-minute video explaining a concept you're struggling with. Take notes while watching.",
    category: "Study",
    difficulty: "Easy"
  },
  {
    id: 12,
    title: "Build Something Small",
    description: "Create a simple calculator or to-do list app. Focus on functionality, not perfection.",
    category: "Programming",
    difficulty: "Medium"
  },
  {
    id: 13,
    title: "Review Past Exams",
    description: "Look at one past exam question you got wrong. Solve it again correctly and understand why you were wrong.",
    category: "Study",
    difficulty: "Medium"
  },
  {
    id: 14,
    title: "Code Review",
    description: "Read through someone else's code (from GitHub or a classmate). Try to understand their approach.",
    category: "Programming",
    difficulty: "Medium"
  },
  {
    id: 15,
    title: "Mathematical Proof",
    description: "Work through one mathematical proof from your course. Write it out in your own words.",
    category: "Mathematics",
    difficulty: "Hard"
  },
  {
    id: 16,
    title: "Organize Your Notes",
    description: "Spend 15 minutes organizing your digital or physical notes. Create a summary page for one topic.",
    category: "Study",
    difficulty: "Easy"
  },
  {
    id: 17,
    title: "Time Complexity Analysis",
    description: "Take three of your functions and analyze their time complexity. Write down your reasoning.",
    category: "Algorithms",
    difficulty: "Hard"
  },
  {
    id: 18,
    title: "Study Session Planning",
    description: "Create a realistic study schedule for the next 3 days. Include breaks and specific topics.",
    category: "Study",
    difficulty: "Easy"
  },
  {
    id: 19,
    title: "Fix a Bug",
    description: "Find one bug in your current project and fix it. Document what caused it and how you fixed it.",
    category: "Programming",
    difficulty: "Medium"
  },
  {
    id: 20,
    title: "Explain Without Jargon",
    description: "Try to explain a technical concept (like recursion) to someone non-technical. Simplicity is the goal.",
    category: "Collaboration",
    difficulty: "Medium"
  },
  {
    id: 21,
    title: "Practice Questions",
    description: "Complete 5 practice questions from your weakest subject. Focus on understanding, not speed.",
    category: "Study",
    difficulty: "Medium"
  },
  {
    id: 22,
    title: "Refactor Old Code",
    description: "Take an old project and refactor it. Make it cleaner, more readable, and better structured.",
    category: "Programming",
    difficulty: "Hard"
  },
  {
    id: 23,
    title: "Join a Study Group",
    description: "Attend or organize a 30-minute study session with classmates. Discuss one challenging topic.",
    category: "Collaboration",
    difficulty: "Easy"
  },
  {
    id: 24,
    title: "Build a Mini Project",
    description: "Start a small project you've been thinking about. Just create the basic structure today.",
    category: "Programming",
    difficulty: "Medium"
  },
  {
    id: 25,
    title: "Flash Card Review",
    description: "Create or review 10 flashcards for key concepts you need to memorize.",
    category: "Study",
    difficulty: "Easy"
  }
];

export function getDailyChallenge(): Challenge {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const challengeIndex = dayOfYear % challenges.length;
  return challenges[challengeIndex];
}
