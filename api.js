import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const genAI = new GoogleGenerativeAI('YOUR API');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function insertParagraphs() {
    const questions = document.querySelectorAll(".qtext");
    const answers = document.querySelectorAll(".answer");
  
    if (questions.length > 0 && answers.length > 0 && questions.length === answers.length) {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = answers[i];
  
        // Concatenate question text and answer text
        const combinedText = `${question.innerText} ${answer.innerText}`;

        run(combinedText)

        async function run(combinedText) {
            const result = await model.generateContent(`need the correct option with the whole answer and not explanation for ${combinedText}`);
            const response = await result.response;
            const text = response.text();
            
            console.log(text); 

            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            paragraph.classList.add("inserted-paragraph");
            question.parentNode.insertBefore(paragraph, question.nextSibling);
          }
      }
    } else {
      console.warn('no questions found.');
    }


    
    const butt = document.createElement("button");
    butt.style.fontSize = "14px";
    butt.value = "Next page";
    butt.name = "next";
    butt.id = "mod_quiz-next-nav";
    butt.className = "myBtn";
    butt.textContent = "Next";
    if (answers.length) {
    answers[answers.length - 1].appendChild(butt);
    }
  }

  
// document.addEventListener('DOMContentLoaded', insertParagraph);
 window.onload = insertParagraphs;
// insertParagraph();
