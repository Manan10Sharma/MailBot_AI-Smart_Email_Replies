📧 Smart Email Replier – AI-based Gmail Assistant
A full-stack AI-powered Gmail assistant built using Java (Spring Boot), React.js, and a Chrome Extension that generates tone-based email replies (Professional, Casual, Friendly) directly within Gmail.


🚀 Features
✨ AI-Powered Reply Generator: Automatically generates email replies in selected tones (Professional, Casual, Friendly).

⚙️ Spring Boot Backend: Processes email content via RESTful APIs using tone-classification logic.

🎨 Responsive UI: React.js frontend styled with Material UI for seamless interaction.

🧩 Chrome Extension Integration: Injects reply suggestions directly into Gmail’s compose window.

🔁 Smart Suggestions: Detects email tone and suggests contextually appropriate responses.

📬 Real-time Interaction: Replies are fetched and inserted dynamically without reloading Gmail.

🛠️ Tech Stack
Frontend: React.js, Material UI

Backend: Java, Spring Boot, REST APIs

Browser Integration: Chrome Extension (Manifest V3, Content Scripts, DOM Injection)

AI/Logic: Tone classification and smart reply logic

📸 Demo
(Insert screenshots or a GIF here showcasing how the extension works inside Gmail)

🧪 Getting Started
Prerequisites
Node.js & npm

Java 17+
Maven
Chrome (for extension testing)

Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/Smart-Email-Replier.git
Backend Setup
Navigate to the backend directory and run:

bash
Copy
Edit
mvn spring-boot:run
Frontend Setup
Navigate to the frontend directory:

bash
Copy
Edit
npm install
npm start
Chrome Extension

Navigate to chrome-extension/ folder

Open chrome://extensions/

Enable Developer Mode

Click Load unpacked and select the chrome-extension folder


📁 Project Structure
bash
Copy
Edit
smart-email-replier/
├── backend/               # Spring Boot backend
├── frontend/              # React.js frontend
├── chrome-extension/      # Chrome extension files
└── README.md


📌 To Do
 Add support for custom tone training

 Improve AI accuracy for reply suggestions

 OAuth integration for Gmail API access

 Support multiple languages

🧑‍💻 Author
Manan Sharma


<img width="1615" height="711" alt="image" src="https://github.com/user-attachments/assets/ada8cf1b-c18c-454c-8120-45a02bd93551" />


<img width="1503" height="376" alt="image" src="https://github.com/user-attachments/assets/24a7339c-b6f4-4ec5-9ffd-5e88dace4807" />


<img width="1541" height="648" alt="image" src="https://github.com/user-attachments/assets/34b510af-ac15-4575-a9f4-131aa3ee7f76" />

