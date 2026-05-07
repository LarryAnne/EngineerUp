export interface Story {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

export const stories: Story[] = [
  {
    id: 1,
    title: "From 8/20 to 18/20: Brice's Journey",
    subtitle: "How one failed exam became the turning point",
    content: `Brice sat in the UB lecture hall, staring at his Data Structures exam paper. 8/20. He'd never scored that low. Around him, classmates whispered about their scores. Some celebrated 15s and 16s. He folded the paper and left quietly.

That night, Brice didn't sleep well. He thought about his parents in Bamenda, the sacrifices they made to pay his fees, the expectations they had. He thought about dropping out, switching to something "easier."

But the next morning, something shifted. Instead of avoiding his classmates, Brice approached the top student, Leonel. "Can you help me understand linked lists?" he asked. Leonel agreed.

For three weeks, Brice showed up to study sessions. He watched YouTube tutorials twice. He practiced coding problems until his fingers hurt. During the next test, Brice scored 14/20. Not perfect, but progress.

By the final exam, Brice had a system: daily practice, office hours every week, teaching concepts to others to solidify his understanding. Final score? 18/20.

Years later, Brice became a software engineer at a fintech startup. But he never forgot that 8/20. It taught him that failure isn't final—consistency is.`,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    date: "2026-04-24",
    category: "Academic Resilience"
  },
  {
    id: 2,
    title: "The Night Before Circuit Analysis",
    subtitle: "When Sandra learned discipline the hard way",
    content: `It was 11 PM. Sandra had her Circuit Analysis exam at 8 AM. She'd spent the last two weeks attending parties, catching up on series, telling herself "I'll study tomorrow."

Now, tomorrow was here.

She opened her notes. Nothing made sense. Kirchhoff's laws? Thevenin's theorem? It was all foreign. Panic set in. She tried cramming, but her brain refused to cooperate. She stayed up until 4 AM, then gave up and slept.

The exam was brutal. Sandra left the hall knowing she'd failed. And she did—7/20.

But something clicked that day. Sandra realized that "cramming" wasn't a strategy. It was a gamble. And she'd lost.

For the second semester, Sandra changed everything. She created a study timetable. She reviewed lecture notes the same day. She practiced problems daily instead of weekly. When friends invited her out mid-week, she said no.

Her classmates teased her: "Sandra don become too serious o!" But Sandra didn't care. She remembered that 7/20.

End of semester? Sandra scored 16/20 in Circuit Analysis II. Her friends asked for her notes. Sandra smiled and shared them. She'd learned the hard way, but she'd learned.`,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    date: "2026-04-23",
    category: "Discipline"
  },
  {
    id: 3,
    title: "Debugging at 3 AM",
    subtitle: "Emmanuel's first successful project",
    content: `Emmanuel had been staring at his code for six hours straight. His C++ assignment was due in five hours, and nothing was working. Segmentation fault. Null pointer exception. Undefined behavior.

He'd tried everything. Stack Overflow. YouTube. ChatGPT. Nothing worked.

At 3 AM, Emmanuel considered submitting incomplete work. "At least I'll get partial marks," he thought.

But then he remembered his father's words before he left for university: "Son, hard work is the only language success understands."

Emmanuel took a deep breath. He started from scratch. Not copy-pasting this time—actually understanding each line. He drew diagrams. He traced variables. He tested each function individually.

At 6:30 AM, his code compiled. At 7:15 AM, all test cases passed. At 7:45 AM, he submitted.

Emmanuel got 19/20 on that assignment. But more importantly, he learned something: debugging isn't just fixing code. It's developing patience, logic, and perseverance.

Today, Emmanuel works as a backend developer. When junior developers complain about bugs, he tells them about that 3 AM night. "The bug isn't your enemy," he says. "It's your teacher."`,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80",
    date: "2026-04-22",
    category: "Programming"
  },
  {
    id: 4,
    title: "The Study Group That Changed Everything",
    subtitle: "How collaboration beats isolation",
    content: `Mirabel was struggling. Calculus II was destroying her confidence. She'd attend lectures, take notes, but nothing stuck. She studied alone, too embarrassed to ask for help.

One day, her classmate Jennifer invited her to a study group. Mirabel almost said no—what if they discovered she was behind? What if they laughed at her questions?

But she went anyway.

The group met every Tuesday and Thursday evening. At first, Mirabel stayed quiet. But then Jennifer asked a "stupid" question—and the top student, Patrick, admitted he'd been confused about the same thing.

Mirabel realized something: everyone was struggling. Some with derivatives. Others with integrals. Some with exam anxiety. She wasn't alone.

Slowly, Mirabel started participating. She asked questions. She explained concepts she understood. The group became her support system.

End of semester results: Mirabel scored 15/20 in Calculus II. Not the highest, but a massive improvement from her 9/20 in Calculus I.

More importantly, Mirabel learned that vulnerability isn't weakness. Asking for help isn't failure. Collaboration isn't cheating. It's growth.`,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    date: "2026-04-21",
    category: "Collaboration"
  },
  {
    id: 5,
    title: "When the Power Went Out",
    subtitle: "Blaise's resourcefulness during tough times",
    content: `Blaise lived in a neighborhood where power outages were routine. His assignment was due Monday. It was Friday night. The power had been out since Thursday.

His laptop battery was at 15%. No generator. No backup. His phone's hotspot was his only internet source.

Most students would've panicked. Blaise got creative.

He went to a nearby café that had a generator. He bought the cheapest item on the menu—one small coffee—and worked there for four hours until closing.

Saturday morning, he woke up at 5 AM and walked to campus. The library opened at 7 AM. He was first in line. He worked until 1 PM, taking only short breaks.

Sunday, the power returned to his neighborhood for three hours. Blaise used every minute. He finished his project with two hours to spare.

Monday, he submitted. His professor praised his work. Blaise didn't mention the power outages, the café, or the early morning library trips.

But he'd learned something invaluable: success isn't about perfect conditions. It's about adapting to imperfect ones. Blaise graduated with honors three years later. He never forgot those power outages—they taught him resourcefulness.`,
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&q=80",
    date: "2026-04-20",
    category: "Resourcefulness"
  },
  {
    id: 6,
    title: "The Algorithm That Wouldn't Sort",
    subtitle: "Rita's breakthrough moment",
    content: `Rita had been working on her sorting algorithm assignment for two days. Bubble sort worked. Insertion sort worked. But merge sort? Kept failing test cases.

She'd rewritten it five times. Watched three different tutorials. Asked on Discord. Still broken.

In frustration, Rita closed her laptop and went for a walk around campus. She wasn't thinking about code—just clearing her head.

Then, mid-walk, it hit her. The recursive calls. She'd been passing the wrong indices. That was it.

Rita rushed back to her room. She made the fix. Ten lines of code. She ran the tests.

All passed.

Rita sat back and smiled. That walk had been more productive than two days of staring at her screen.

She learned an important lesson that day: sometimes, the solution doesn't come from trying harder. It comes from stepping back and thinking differently.

Rita now works at a tech company in Lagos. When she's stuck on a problem, she takes a walk. Her colleagues think it's odd, but Rita knows—sometimes, distance brings clarity.`,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    date: "2026-04-19",
    category: "Problem Solving"
  },
  {
    id: 7,
    title: "Failing Forward",
    subtitle: "How Kevin turned rejection into motivation",
    content: `Kevin applied for a software engineering internship at MTN. He'd spent weeks preparing his resume, practicing coding problems, building projects.

He didn't even get an interview.

Kevin was devastated. He watched his classmates get internships at Jumia, Orange, and startups. He felt left behind.

For a week, Kevin did nothing. He skipped classes. Ignored assignments. Questioned his abilities.

Then, his roommate asked him a simple question: "What are you going to do about it?"

Kevin decided to treat rejection as feedback. He reviewed his resume. Too generic. He rewrote it, highlighting specific projects. He improved his GitHub. He practiced LeetCode daily.

Three months later, Kevin applied to a fintech startup. This time, he got an interview. Then a second interview. Then an offer.

Kevin accepted. That internship became a full-time job offer after graduation.

Looking back, Kevin is grateful for that MTN rejection. It forced him to level up. It taught him that failure isn't the end—it's the beginning of improvement.`,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80",
    date: "2026-04-18",
    category: "Career Growth"
  },
  {
    id: 8,
    title: "The Last Bench Student",
    subtitle: "From distraction to dedication",
    content: `Chris always sat in the last row. Not because he couldn't see—because he didn't want to be seen. He'd browse Twitter during lectures, chat with friends, copy assignments from classmates.

His GPA reflected it: 2.1 after first semester.

Then came the wake-up call. His parents called him home during the break. His father said, "We're struggling to pay your fees. If your grades don't improve, we can't continue."

Chris realized he'd been taking everything for granted. The fees. The opportunity. The education.

Second semester, Chris moved to the front row. He turned off his phone during lectures. He actually read his textbooks—not just borrowed notes before exams.

His friends mocked him: "Chris don change o. Na who senior you?"

Chris didn't respond. He just kept showing up. Asking questions. Doing assignments himself. Reviewing before exams.

End of semester: 3.2 GPA.

It wasn't perfect, but it was progress. Chris continued the discipline. By third year, he had a 3.8 GPA. By final year, he graduated with honors.

Chris learned that change isn't about grand gestures. It's about small, consistent decisions. Starting with where you sit.`,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    date: "2026-04-17",
    category: "Transformation"
  },
  {
    id: 9,
    title: "When YouTube Became a Classroom",
    subtitle: "Divine's alternative learning path",
    content: `Divine didn't understand her professor's teaching style. The lectures moved too fast. The explanations assumed prior knowledge she didn't have.

After failing her first quiz in Object-Oriented Programming, Divine knew she needed a different approach.

She turned to YouTube.

She found freeCodeCamp, Traversy Media, Programming with Mosh. She watched videos at 1.5x speed, paused when confused, rewound when needed.

She took notes. She coded along. She built projects from tutorials, then modified them to understand the concepts better.

Her professor's lectures became review sessions. YouTube was her actual classroom.

End of semester, Divine scored 17/20 in OOP. Her professor was surprised. "You've improved significantly," he said.

Divine didn't mention YouTube. But she'd learned an important lesson: if one teaching method doesn't work, find another. Education isn't one-size-fits-all.

Today, Divine is a full-stack developer. She still uses YouTube to learn new technologies. She's grateful to the creators who made learning accessible—free and flexible.`,
    image: "https://images.unsplash.com/photo-1556484687-30636164638b?w=1200&q=80",
    date: "2026-04-16",
    category: "Self-Learning"
  },
  {
    id: 10,
    title: "The Resit That Saved Everything",
    subtitle: "Nora's second chance story",
    content: `Nora failed her Linear Algebra exam. Not just failed—scored 5/20. She needed a resit to progress to second year.

The shame was overwhelming. While her classmates moved forward, Nora was stuck. Some whispered. Others pretended not to notice. A few offered sympathy—which somehow felt worse.

Nora had two options: give up or get serious.

She chose the latter.

For six weeks, Nora did nothing but Linear Algebra. She attended tutorial sessions. She hired a senior student as a tutor—using her meal money to pay him. She practiced past questions until she could solve them in her sleep.

Her friends invited her to parties. She said no. They called her anti-social. She didn't care.

Resit day came. Nora was nervous but prepared. She worked through the questions methodically. She checked her work twice.

Result: 16/20.

Nora progressed to second year. She graduated on time with a 3.5 GPA. Today, she works as a data analyst.

When people ask about her journey, Nora doesn't hide the resit. She's proud of it. It taught her that setbacks aren't permanent—unless you let them be.`,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80",
    date: "2026-04-15",
    category: "Redemption"
  },
  {
    id: 11,
    title: "The Project That Almost Broke Me",
    subtitle: "Cedric's team project nightmare turned lesson",
    content: `Cedric was assigned a group project with four classmates. He assumed everyone would contribute equally.

He was wrong.

Two members disappeared after the first meeting. One submitted plagiarized code. The fourth did minimal work.

Cedric faced a choice: complain to the professor (and risk looking like a snitch) or carry the team himself.

He chose to carry them—but not silently.

Cedric documented everything. Who attended meetings. Who submitted work. Who contributed code. He built the entire project himself but kept detailed records.

During the presentation, the professor asked specific technical questions. Cedric answered confidently. His teammates stammered.

After class, the professor called Cedric aside. "I could tell you did most of the work," she said. "I've adjusted the grades accordingly."

Cedric scored 18/20. His teammates scored between 8 and 12.

Cedric learned two lessons: First, you can't control others' work ethic—only your own. Second, documentation matters. Evidence speaks louder than complaints.

Today, Cedric is a tech lead at a startup. He still documents everything. And he always credits team members fairly—because he knows how it feels to carry the weight alone.`,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    date: "2026-04-14",
    category: "Teamwork"
  },
  {
    id: 12,
    title: "From Broke to Builder",
    subtitle: "How Joel turned financial stress into fuel",
    content: `Joel's tuition was three months overdue. The bursar's office sent warnings. His classmates were writing exams; Joel wasn't allowed in the hall.

Financial stress consumed him. He couldn't focus. Couldn't sleep. His phone was full of missed calls from his mother, apologizing for not having the money.

Joel thought about dropping out. Maybe university wasn't for him.

Then, a classmate mentioned freelancing. "People pay for code," he said. "You're good at Python. Use it."

Joel had never considered this. But desperation breeds creativity.

He created a profile on Fiverr. He offered basic Python scripting services. His first gig paid $15. He used it to buy data and apply for more gigs.

Slowly, Joel built a reputation. $15 became $50. $50 became $100. Within three months, Joel had earned enough to pay half his tuition. His mother covered the rest.

Joel didn't just survive—he thrived. He balanced freelancing with school. He learned time management. He learned sales. He learned persistence.

By final year, Joel had a portfolio and income. After graduation, he didn't job hunt—clients hunted him.

Joel now runs a software consultancy. He hires students who remind him of his younger self. And he never forgets: sometimes, the struggle is the training ground for success.`,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    date: "2026-04-13",
    category: "Entrepreneurship"
  }
];

export function getTodayStory(): Story {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const storyIndex = dayOfYear % stories.length;
  return stories[storyIndex];
}
