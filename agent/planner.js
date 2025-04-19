import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function generatePlan(task) {
  const prompt = `
  You are an AI task agent running on a Windows machine.
  
  The user will give you a goal. You must return a JSON array of steps.
  
  Each step must include:
  - "description": short explanation of the step
  - "command": a valid Windows CMD command to perform that step
  
  ⚠️ Strict rules:
  - Do NOT use "start", "notepad", or anything that opens GUI apps
  - Prefer "python file.py", "g++ file.cpp -o output && output", etc.
  - Use double quotes (") for strings, not single quotes (') to avoid shell issues
  - Escape special characters if needed (e.g., >, <, ^)
  - For C++ or Python file creation, use multiple 'echo' lines to avoid syntax errors
  - Avoid Unix-style commands like 'ls', 'cat', etc.
  - If chaining commands, ensure '&&' works in CMD (not PowerShell)
  - Return only raw JSON (no markdown, no extra text)
  
  Example goal:
  Create a C++ file that prints "Hello Gemini", then compile and run it.
  
  [
    {
      "description": "Create add.py file",
      "command": "echo print(\"2 + 3 =\", 2 + 3) > add.py"
    },
    {
      "description": "Run the Python file",
      "command": "python add.py"
    }
  ],
  [
    {
      "description": "Create add.cpp file",
      "command": "echo #include <iostream>\\nusing namespace std;\\nint main() { cout << \"2 + 3 = \" << 2 + 3 << endl; return 0; } > add.cpp"
    },
    {
      "description": "Run the C++ file",
      "command": "g++ add.cpp -o add && ./add"
    }
]


  
  User goal: ${task}
  `;
  

  


    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    try {
        // Extract JSON from response
        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']');
        const json = text.substring(jsonStart, jsonEnd + 1);

        return JSON.parse(json);
    } catch (err) {
        console.error('❌ Failed to parse Gemini output:', text);
        return [];
    }
}
