# 🧠 AI Task Agent

An intelligent command-line AI agent that understands your natural language instructions, generates a step-by-step plan using a free AI API, executes tasks locally on your computer, and retries intelligently if something fails.

> 👨‍💻 Created by: Ayush Singh

---

## 🚀 Features

- 💬 Accepts natural language tasks via terminal
- 🧠 Uses free AI API (Google Gemini ) to plan steps
- ✅ Seeks user approval before executing
- ⚙️ Executes file creation and command-line scripts
- ❌ Detects errors, refines the task using AI, and retries

---

## 📽 Demo

🎥 [Watch Screen Recording](https://drive.google.com/file/d/1PoNroIX3EKqjMg2GdB5mYipjtrwALqm2/view?usp=drive_link))  

---

## 🛠️ Tech Stack

- Node.js (ES Modules)
- Free AI API (Gemini)
- Cross-platform CLI (Windows, macOS, Linux)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone [https://github.com/ayush-singh-26/Ai-Agent.git]
cd Ai-Agent

```
### 2. Install Dependencies
```bash
npm install

```
### 3. Add API Key
Create a .env file in the root:
Add your API key to the file:

```bash
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### Start the AI agent with:
``` bash
node index.js

```
You will see:

🧠 What task would you like me to perform?
Then enter a natural language instruction, such as:

Create a Python script that prints multiplication of two numbers.

Flow:

AI generates a plan and displays it.
Asks for your approval.
Executes the steps locally.
Asks if the result is correct.
If not, it asks why and fixes it automatically using AI.


 
