export interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  commonMistakes: string[];
  quickTips: string[];
  resources: string[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Programming (C/C++/Python)",
    description: "Learn the fundamentals of programming including variables, loops, functions, and data structures.",
    icon: "Code",
    commonMistakes: [
      "Not understanding pointers and memory management",
      "Mixing up = (assignment) with == (comparison)",
      "Forgetting to initialize variables before use",
      "Not handling edge cases in code",
      "Copy-pasting code without understanding it"
    ],
    quickTips: [
      "Practice coding daily, even if it's just 15 minutes",
      "Read error messages carefully—they tell you what's wrong",
      "Use proper variable names that describe what they store",
      "Test your code with different inputs, including edge cases",
      "Draw out the logic before coding (flowcharts help!)"
    ],
    resources: [
      "freeCodeCamp YouTube channel",
      "LeetCode for practice problems",
      "GeeksforGeeks for concept explanations",
      "The Odin Project for structured learning"
    ]
  },
  {
    id: 2,
    title: "Mathematics (Calculus & Linear Algebra)",
    description: "Master the mathematical foundations essential for engineering and computer science.",
    icon: "Calculator",
    commonMistakes: [
      "Rushing through problems without understanding the concept",
      "Not practicing enough diverse problems",
      "Forgetting to show all steps in exams",
      "Mixing up formulas and theorems",
      "Avoiding the 'hard' topics instead of tackling them"
    ],
    quickTips: [
      "Practice daily—math skills build through repetition",
      "Understand WHY formulas work, not just HOW to use them",
      "Always show your work, even if you know the answer",
      "Create formula sheets and review them regularly",
      "Form study groups to explain concepts to each other"
    ],
    resources: [
      "Khan Academy for step-by-step explanations",
      "3Blue1Brown for visual understanding",
      "Paul's Online Math Notes",
      "MIT OpenCourseWare"
    ]
  },
  {
    id: 3,
    title: "Circuit Analysis & Electronics",
    description: "Understand electrical circuits, components, and analysis techniques.",
    icon: "Zap",
    commonMistakes: [
      "Not drawing clear circuit diagrams",
      "Forgetting to apply Kirchhoff's laws correctly",
      "Mixing up series and parallel circuit rules",
      "Not checking units in calculations",
      "Skipping the conceptual understanding"
    ],
    quickTips: [
      "Always redraw the circuit neatly before solving",
      "Label every node, current, and voltage clearly",
      "Practice with simple circuits before complex ones",
      "Memorize fundamental laws (Ohm's, Kirchhoff's, etc.)",
      "Use simulation tools to verify your calculations"
    ],
    resources: [
      "All About Circuits website",
      "ElectronicsHub for basics",
      "CircuitLab for simulations",
      "YouTube: EEVblog, GreatScott!"
    ]
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    description: "Learn how to organize data efficiently and solve problems algorithmically.",
    icon: "Network",
    commonMistakes: [
      "Not understanding when to use which data structure",
      "Memorizing code instead of understanding logic",
      "Ignoring time and space complexity",
      "Not practicing implementation from scratch",
      "Giving up when stuck instead of breaking down the problem"
    ],
    quickTips: [
      "Visualize data structures—draw them out",
      "Start with simple implementations before complex ones",
      "Practice tracing algorithms step-by-step on paper",
      "Learn Big O notation early and use it consistently",
      "Solve problems from easy to hard progressively"
    ],
    resources: [
      "Visualgo.net for algorithm visualization",
      "HackerRank for practice",
      "Abdul Bari's YouTube channel",
      "mycodeschool YouTube channel"
    ]
  },
  {
    id: 5,
    title: "Object-Oriented Programming",
    description: "Master OOP concepts like classes, inheritance, polymorphism, and encapsulation.",
    icon: "Box",
    commonMistakes: [
      "Not understanding the difference between class and object",
      "Overusing inheritance when composition is better",
      "Making everything public instead of using encapsulation",
      "Not practicing with real-world examples",
      "Ignoring design principles like SOLID"
    ],
    quickTips: [
      "Think of classes as blueprints and objects as houses built from them",
      "Use real-world analogies to understand concepts",
      "Practice building small projects using OOP",
      "Draw class diagrams before coding",
      "Refactor procedural code to OOP for practice"
    ],
    resources: [
      "Programming with Mosh YouTube channel",
      "Head First Object-Oriented Analysis and Design book",
      "Oracle Java Tutorials for OOP concepts",
      "Refactoring Guru for design patterns"
    ]
  },
  {
    id: 6,
    title: "Database Systems",
    description: "Learn to design, query, and manage databases effectively.",
    icon: "Database",
    commonMistakes: [
      "Not normalizing databases properly",
      "Writing inefficient SQL queries",
      "Not understanding relationships (one-to-many, many-to-many)",
      "Forgetting to use primary and foreign keys",
      "Not practicing query writing enough"
    ],
    quickTips: [
      "Master basic SQL before advanced topics",
      "Draw ER diagrams for database design",
      "Practice writing queries without looking at solutions",
      "Learn to read execution plans for optimization",
      "Use online SQL playgrounds for practice"
    ],
    resources: [
      "SQLBolt for interactive lessons",
      "Mode Analytics SQL Tutorial",
      "W3Schools SQL section",
      "Stanford's database course (free online)"
    ]
  },
  {
    id: 7,
    title: "Computer Architecture",
    description: "Understand how computers work at the hardware level.",
    icon: "Cpu",
    commonMistakes: [
      "Not connecting concepts to real-world applications",
      "Rushing through binary and hexadecimal conversions",
      "Ignoring the importance of memory hierarchy",
      "Not practicing assembly language basics",
      "Treating it as pure theory instead of foundational knowledge"
    ],
    quickTips: [
      "Relate hardware concepts to programming you've done",
      "Practice number system conversions until fluent",
      "Understand the fetch-decode-execute cycle thoroughly",
      "Learn basic assembly to appreciate high-level languages",
      "Watch videos on how CPUs actually work"
    ],
    resources: [
      "Neso Academy YouTube channel",
      "Ben Eater's computer building series",
      "Computer Organization and Design textbook",
      "Crash Course Computer Science"
    ]
  },
  {
    id: 8,
    title: "Discrete Mathematics",
    description: "Study logic, sets, graphs, and mathematical reasoning for computer science.",
    icon: "Binary",
    commonMistakes: [
      "Not seeing the connection to programming",
      "Skipping proof techniques thinking they're not important",
      "Rushing through logic and set theory",
      "Not practicing enough problems",
      "Treating it as abstract instead of applied"
    ],
    quickTips: [
      "Connect every concept to CS applications",
      "Practice writing proofs step-by-step",
      "Master logic gates and Boolean algebra early",
      "Use Venn diagrams and truth tables generously",
      "Study graph theory with real network examples"
    ],
    resources: [
      "Trefor Bazett YouTube channel",
      "Brilliant.org for interactive learning",
      "MIT Mathematics for Computer Science notes",
      "Discrete Math textbook by Rosen"
    ]
  }
];
