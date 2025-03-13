
import { Question } from "@/components/QuizCard";
import { v4 as uuidv4 } from "uuid";

// Sample questions for different genres
// In a real app, this would be replaced with a call to the Gemini API
const sampleQuestions: Record<string, Question[]> = {
  "science": [
    {
      id: uuidv4(),
      text: "Which of the following is NOT a state of matter?",
      options: ["Plasma", "Liquid", "Gas", "Energy"],
      correctAnswer: 3,
    },
    {
      id: uuidv4(),
      text: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Gd"],
      correctAnswer: 0,
    },
    {
      id: uuidv4(),
      text: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correctAnswer: 1,
    },
    {
      id: uuidv4(),
      text: "What is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Brain"],
      correctAnswer: 2,
    },
    {
      id: uuidv4(),
      text: "Which particle has a positive charge?",
      options: ["Electron", "Proton", "Neutron", "Photon"],
      correctAnswer: 1,
    },
  ],
  "history": [
    {
      id: uuidv4(),
      text: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
      correctAnswer: 2,
    },
    {
      id: uuidv4(),
      text: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correctAnswer: 2,
    },
    {
      id: uuidv4(),
      text: "Which ancient civilization built the pyramids at Giza?",
      options: ["Greeks", "Romans", "Mesopotamians", "Egyptians"],
      correctAnswer: 3,
    },
    {
      id: uuidv4(),
      text: "Who painted the Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
      correctAnswer: 1,
    },
    {
      id: uuidv4(),
      text: "The Industrial Revolution began in which country?",
      options: ["France", "Germany", "United States", "Great Britain"],
      correctAnswer: 3,
    },
  ],
  "technology": [
    {
      id: uuidv4(),
      text: "Who is the co-founder of Microsoft?",
      options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
      correctAnswer: 1,
    },
    {
      id: uuidv4(),
      text: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Machine Learning",
        "Hyperlink and Text Management Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: 0,
    },
    {
      id: uuidv4(),
      text: "Which company developed the first iPhone?",
      options: ["Samsung", "Nokia", "Apple", "Motorola"],
      correctAnswer: 2,
    },
    {
      id: uuidv4(),
      text: "What year was the World Wide Web invented?",
      options: ["1989", "1991", "1995", "1999"],
      correctAnswer: 0,
    },
    {
      id: uuidv4(),
      text: "Which programming language is known as the 'mother of all programming languages'?",
      options: ["Java", "C", "Python", "FORTRAN"],
      correctAnswer: 1,
    },
  ],
  "general": [
    {
      id: uuidv4(),
      text: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correctAnswer: 2,
    },
    {
      id: uuidv4(),
      text: "Which of these is NOT a primary color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctAnswer: 3,
    },
    {
      id: uuidv4(),
      text: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
    },
    {
      id: uuidv4(),
      text: "What is the currency of Brazil?",
      options: ["Peso", "Dollar", "Euro", "Real"],
      correctAnswer: 3,
    },
    {
      id: uuidv4(),
      text: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Lion", "Elephant", "Gorilla"],
      correctAnswer: 1,
    },
  ],
};

// Generate mock questions for any genre not in our predefined list
const generateGenericQuestions = (genre: string): Question[] => {
  return [
    {
      id: uuidv4(),
      text: `What is considered the most significant advancement in ${genre}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
    },
    {
      id: uuidv4(),
      text: `Who is widely regarded as a pioneer in ${genre}?`,
      options: ["Person 1", "Person 2", "Person 3", "Person 4"],
      correctAnswer: Math.floor(Math.random() * 4),
    },
    {
      id: uuidv4(),
      text: `Which event had the biggest impact on ${genre}?`,
      options: ["Event 1", "Event 2", "Event 3", "Event 4"],
      correctAnswer: Math.floor(Math.random() * 4),
    },
    {
      id: uuidv4(),
      text: `What is a common misconception about ${genre}?`,
      options: ["Misconception 1", "Misconception 2", "Misconception 3", "Misconception 4"],
      correctAnswer: Math.floor(Math.random() * 4),
    },
    {
      id: uuidv4(),
      text: `Which country is most associated with advancements in ${genre}?`,
      options: ["Country 1", "Country 2", "Country 3", "Country 4"],
      correctAnswer: Math.floor(Math.random() * 4),
    },
  ];
};

// This function generates a quiz with Gemini API
export const generateQuiz = async (genre: string): Promise<Question[]> => {
  try {
    // Show loading state while generating questions
    console.log(`Generating questions for genre: ${genre}`);
    
    // Prepare the prompt for Gemini API
    const prompt = `Generate 5 multiple-choice quiz questions about ${genre}. 
    Each question should have 4 options with exactly one correct answer.
    Format the response as a valid JSON array with this structure:
    [
      {
        "text": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0 (index of correct option, 0-3)
      }
    ]
    Make sure the questions are factually accurate and appropriately challenging.`;

    // Call the Gemini API with the provided API key
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDJFqEEMSITrZAFOTC0z682cGlLr02oY50", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Failed to generate questions: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    
    // Extract the text from the response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      console.error('No text in Gemini response', data);
      throw new Error('Invalid response from Gemini API');
    }

    console.log('Gemini response received');
    
    // Find the JSON part of the response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('Could not extract JSON from response', responseText);
      // Fall back to sample questions if we can't parse the response
      return getSampleQuestions(genre);
    }
    
    try {
      // Parse the JSON part
      const parsedQuestions = JSON.parse(jsonMatch[0]);
      
      // Validate and format the questions
      const formattedQuestions = parsedQuestions.map((q: any) => ({
        id: uuidv4(),
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer
      }));
      
      console.log(`Successfully generated ${formattedQuestions.length} questions`);
      return formattedQuestions;
    } catch (jsonError) {
      console.error('Failed to parse JSON from response', jsonError);
      // Fall back to sample questions if we can't parse the JSON
      return getSampleQuestions(genre);
    }
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    // Fall back to sample questions if there's an error
    return getSampleQuestions(genre);
  }
};

// Sample questions as fallback
const getSampleQuestions = (genre: string): Question[] => {
  // Normalize the genre to lowercase for case-insensitive matching
  const normalizedGenre = genre.toLowerCase();
  
  // Check if we have predefined questions for this genre
  if (normalizedGenre in sampleQuestions) {
    return sampleQuestions[normalizedGenre];
  }
  
  // Otherwise, generate generic questions
  return generateGenericQuestions(genre);
};
