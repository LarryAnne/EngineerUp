export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string[];
  image: string;
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "Every line of code you write today is proof that yesterday's 'impossible' was just practice.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 2,
    text: "In Cameroon, education is the bridge between struggle and success. Cross it daily.",
    author: "Unknown",
    category: ["Consistency", "Stress"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    id: 3,
    text: "Failing a test doesn't make you a failure. Not trying again does.",
    author: "Unknown",
    category: ["Failure", "Exams"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 4,
    text: "Your family's sacrifices deserve your discipline. Show up every single day.",
    author: "Unknown",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 5,
    text: "The syntax error you're stuck on today is tomorrow's skill. Keep debugging.",
    author: "Unknown",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 6,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 7,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 8,
    text: "Your CGPA doesn't define your potential. Your consistency does.",
    author: "Unknown",
    category: ["Exams", "Consistency"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 9,
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: ["Failure", "Stress"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 10,
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 11,
    text: "Struggling with pointers? Every developer has been there. You'll master it.",
    author: "Unknown",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 12,
    text: "While they're scrolling, you're coding. That's the difference.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 13,
    text: "Your data structures assignment is not punishing you. It's building you.",
    author: "Unknown",
    category: ["Stress", "Discipline"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 14,
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 15,
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: ["Consistency", "Exams"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 16,
    text: "The night before exams is for review, not for panic. You've prepared for this.",
    author: "Unknown",
    category: ["Exams", "Stress"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 17,
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 18,
    text: "Your debugging skills are growing with every error message. Trust the process.",
    author: "Unknown",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 19,
    text: "The price of success is hard work, dedication to the job at hand.",
    author: "Vince Lombardi",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 20,
    text: "You don't need to be perfect. You need to be consistent.",
    author: "Unknown",
    category: ["Consistency", "Failure"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 21,
    text: "Circuit analysis seems abstract now, but it's the foundation of everything digital.",
    author: "Unknown",
    category: ["Stress", "Discipline"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 22,
    text: "Every algorithm you struggle with today makes you sharper tomorrow.",
    author: "Unknown",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 23,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 24,
    text: "Your classmates aren't your competition. Yesterday's version of you is.",
    author: "Unknown",
    category: ["Stress", "Discipline"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 25,
    text: "Mathematics for engineers is tough. That's why not everyone becomes an engineer.",
    author: "Unknown",
    category: ["Exams", "Stress"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 26,
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 27,
    text: "The semester isn't over until the last exam. Keep pushing.",
    author: "Unknown",
    category: ["Exams", "Consistency"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 28,
    text: "If you're going through hell, keep going.",
    author: "Winston Churchill",
    category: ["Failure", "Stress"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 29,
    text: "Your study group isn't moving fast enough? Study alone then. Progress over comfort.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 30,
    text: "The man who moves a mountain begins by carrying away small stones.",
    author: "Confucius",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 31,
    text: "Programming isn't about talent. It's about the hours you put in when no one's watching.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 32,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: ["Consistency", "Stress"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 33,
    text: "That exam you failed? It showed you what to fix. Now fix it.",
    author: "Unknown",
    category: ["Failure", "Exams"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 34,
    text: "Success is not how high you have climbed, but how you make a positive difference.",
    author: "Roy T. Bennett",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 35,
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: ["Discipline", "Failure"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 36,
    text: "Campus politics, distractions, friends who don't study. Stay focused on your goal.",
    author: "Unknown",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 37,
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 38,
    text: "The code compiles. The tests pass. You're improving. Keep going.",
    author: "Unknown",
    category: ["Consistency", "Failure"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 39,
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: ["Stress", "Failure"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 40,
    text: "Financial stress is real. But dropping out doesn't solve it. Graduating does.",
    author: "Unknown",
    category: ["Stress", "Discipline"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 41,
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 42,
    text: "Your calculus grade isn't a reflection of your intelligence. It's a snapshot of your preparation.",
    author: "Unknown",
    category: ["Exams", "Failure"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 43,
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 44,
    text: "Comparison is the thief of joy. Focus on your own progress.",
    author: "Theodore Roosevelt",
    category: ["Stress", "Consistency"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 45,
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: ["Consistency", "Stress"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 46,
    text: "Lectures you don't understand? Ask questions. Office hours exist for a reason.",
    author: "Unknown",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 47,
    text: "What we fear doing most is usually what we most need to do.",
    author: "Tim Ferriss",
    category: ["Stress", "Discipline"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 48,
    text: "Your IDE crashes. Your code won't run. Take a break. Then try again.",
    author: "Unknown",
    category: ["Failure", "Stress"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 49,
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 50,
    text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett",
    category: ["Stress", "Consistency"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 51,
    text: "The semester is long, but regret lasts longer. Put in the work now.",
    author: "Unknown",
    category: ["Discipline", "Exams"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 52,
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 53,
    text: "The question isn't who is going to let me; it's who is going to stop me.",
    author: "Ayn Rand",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 54,
    text: "When you feel like quitting, remember why you started.",
    author: "Unknown",
    category: ["Stress", "Failure"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 55,
    text: "GitHub commits don't lie. Your consistency shows in your contribution graph.",
    author: "Unknown",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 56,
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 57,
    text: "Peer pressure to skip class? Remember: they'll be looking for jobs. You'll be getting offers.",
    author: "Unknown",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 58,
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
    category: ["Consistency", "Failure"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 59,
    text: "Do what you can with all you have, wherever you are.",
    author: "Theodore Roosevelt",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 60,
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: ["Consistency", "Discipline"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 61,
    text: "Your project deadline is tomorrow. Panic won't help. Action will.",
    author: "Unknown",
    category: ["Stress", "Exams"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 62,
    text: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    category: ["Consistency", "Failure"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 63,
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 64,
    text: "Stack Overflow saved you again. Now understand WHY the solution works.",
    author: "Unknown",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 65,
    text: "Courage doesn't always roar. Sometimes it's the quiet voice saying 'I'll try again tomorrow.'",
    author: "Mary Anne Radmacher",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 66,
    text: "Life is 10% what happens to you and 90% how you react to it.",
    author: "Charles R. Swindoll",
    category: ["Stress", "Discipline"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 67,
    text: "Your repository is empty? Start with a README. Every journey begins somewhere.",
    author: "Unknown",
    category: ["Consistency", "Failure"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 68,
    text: "Change your life today. Don't gamble on the future, act now, without delay.",
    author: "Simone de Beauvoir",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 69,
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 70,
    text: "Late nights in the lab are building your future, not stealing your present.",
    author: "Unknown",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 71,
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
    category: ["Consistency", "Exams"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 72,
    text: "Don't limit your challenges. Challenge your limits.",
    author: "Unknown",
    category: ["Discipline", "Stress"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    id: 73,
    text: "The professor said it's impossible to finish? Prove them wrong.",
    author: "Unknown",
    category: ["Exams", "Discipline"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: 74,
    text: "Great things never come from comfort zones.",
    author: "Unknown",
    category: ["Stress", "Consistency"],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
  },
  {
    id: 75,
    text: "If you want to achieve greatness, stop asking for permission.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 76,
    text: "Your algorithm is O(n²)? Optimize it. Your skills work the same way.",
    author: "Unknown",
    category: ["Failure", "Discipline"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: 77,
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },
  {
    id: 78,
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown",
    category: ["Stress", "Consistency"],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
  },
  {
    id: 79,
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
    category: ["Exams", "Discipline"],
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&q=80"
  },
  {
    id: 80,
    text: "Your degree is not just paper. It's proof you didn't quit when it got hard.",
    author: "Unknown",
    category: ["Failure", "Consistency"],
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
  },
  {
    id: 81,
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown",
    category: ["Discipline", "Consistency"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
  },
  {
    id: 82,
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
    category: ["Consistency", "Exams"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  }
];

export const categories = ["All", "Discipline", "Failure", "Exams", "Consistency", "Stress"];