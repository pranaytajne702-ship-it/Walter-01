const faqData = [
  {
    category: "registration",
    label: "Registration",
    items: [
      {
        q: "How do I add or drop a course after registration closes?",
        a: "Submit an add/drop request through the student portal under Academic Records. Requests after the second week of the term need the instructor's signature and department approval, so start the process early."
      },
      {
        q: "What's the deadline to declare or change my major?",
        a: "You can declare or change your major any time before the start of your final two semesters. Talk to your academic advisor first — some upper-level courses require the major declared a full term in advance."
      },
      {
        q: "I'm on the waitlist for a required course. What are my options?",
        a: "Waitlists are processed automatically as seats open, usually within 48 hours. If the course is required for graduation this term, email the department office with your student ID and we'll check for an override seat."
      }
    ]
  },
  {
    category: "courses",
    label: "Courses & Curriculum",
    items: [
      {
        q: "Can I take a course pass/fail instead of for a letter grade?",
        a: "Most electives allow pass/fail, but courses in your major requirements must be taken for a letter grade unless you have a documented accommodation. Check with your advisor before switching the grading option."
      },
      {
        q: "Do internship or co-op hours count toward course credit?",
        a: "Yes, through the CS 490 Practicum course. You'll need an offer letter and a faculty sponsor before the term starts; the department office can help you find a sponsor if you don't have one yet."
      },
      {
        q: "How do I request an independent study with a professor?",
        a: "Find a faculty member willing to supervise the topic, then complete the Independent Study form together. Submit it to the department office at least two weeks before registration opens for the term."
      }
    ]
  },
  {
    category: "exams",
    label: "Exams & Grades",
    items: [
      {
        q: "I have two exams scheduled at the same time. What do I do?",
        a: "Fill out the Exam Conflict form on the registrar's site as soon as the conflict appears — usually within a week of the exam schedule being posted. One of the two exams will be rescheduled or given as a makeup."
      },
      {
        q: "How do I request a regrade on an assignment or exam?",
        a: "Email your instructor directly within one week of the grade being posted, explaining specifically what you'd like reviewed. If you're not satisfied with the outcome, you can escalate to the department's academic standards committee."
      },
      {
        q: "When do final grades post, and how do I request an incomplete?",
        a: "Grades post to the student portal within five business days of the exam period ending. To request an incomplete, talk to your instructor before the last day of classes — it requires a signed agreement on a make-up timeline."
      }
    ]
  },
  {
    category: "technology",
    label: "Technology",
    items: [
      {
        q: "How do I get access to the department's GPU cluster?",
        a: "Request access through the IT ticketing system with your course or research project name. Undergraduate access is granted for the length of the term; graduate researchers can request a standing account."
      },
      {
        q: "I'm locked out of my student email or course portal. Who do I contact?",
        a: "Password resets go through central IT, not the department — use the 'Forgot password' link on the login page, or call the IT help line for same-day support if you're locked out before a deadline."
      }
    ]
  },
  {
    category: "funding",
    label: "Fees & Funding",
    items: [
      {
        q: "Are there travel grants for students presenting at conferences?",
        a: "The department offers a limited travel fund for students presenting accepted research. Applications open at the start of each term — submit your acceptance letter and an itemized budget to the department office."
      },
      {
        q: "How do I apply for a teaching or research assistantship?",
        a: "Openings are posted on the department jobs board each term, roughly a month before the term starts. Apply directly to the listing faculty member with your transcript and a short note on relevant coursework."
      }
    ]
  }
];
 
const faqList = document.getElementById("faqList");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("faqSearch");
const chipRow = document.getElementById("chipRow");
 
let activeCategory = "all";
let searchTerm = "";
 
// Build the DOM from data, based on current filters
function render() {
  faqList.innerHTML = "";
  let anyVisible = false;
 
  faqData.forEach(group => {
    const groupMatchesCategory = activeCategory === "all" || activeCategory === group.category;
    if (!groupMatchesCategory) return;
 
    const matchingItems = group.items.filter(item => {
      if (!searchTerm) return true;
      const haystack = (item.q + " " + item.a).toLowerCase();
      return haystack.includes(searchTerm);
    });
 
    if (matchingItems.length === 0) return;
 
    anyVisible = true;
 
    const heading = document.createElement("h2");
    heading.className = "category-heading";
    heading.textContent = group.label;
    faqList.appendChild(heading);
 
    matchingItems.forEach((item, idx) => {
      const itemId = group.category + "-" + idx;
 
      const wrapper = document.createElement("div");
      wrapper.className = "faq-item";
 
      const button = document.createElement("button");
      button.className = "faq-question";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", "answer-" + itemId);
      button.id = "question-" + itemId;
      button.innerHTML =
        '<span class="question-text">' + item.q + '</span><span class="icon" aria-hidden="true"></span>';
 
      const answer = document.createElement("div");
      answer.className = "faq-answer";
      answer.id = "answer-" + itemId;
      answer.setAttribute("role", "region");
      answer.setAttribute("aria-labelledby", "question-" + itemId);
      answer.dataset.open = "false";
 
      const answerInner = document.createElement("div");
      answerInner.className = "faq-answer-inner";
      const answerP = document.createElement("p");
      answerP.textContent = item.a;
      answerInner.appendChild(answerP);
      answer.appendChild(answerInner);
 
      // Core interaction: clicking a question toggles its answer
      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        answer.dataset.open = String(!isOpen);
      });
 
      wrapper.appendChild(button);
      wrapper.appendChild(answer);
      faqList.appendChild(wrapper);
    });
  });
 
  noResults.classList.toggle("visible", !anyVisible);
}
 
// Live search filtering
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim().toLowerCase();
  render();
});
 
// Category chip filtering
chipRow.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
 
  chipRow.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  chip.setAttribute("aria-pressed", "true");
  activeCategory = chip.dataset.category;
  render();
});
 
render();
 
