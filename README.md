This is a full-stack real-time chat application built with Node.js (backend) and React (frontend) using WebSockets for real-time communication. Multiple users can join, send messages, and see online users with a history of the last 50 messages maintained in memory.
Features

Real-time messaging using WebSockets (Socket.IO).
Display of online users.
In-memory chat history (last 50 messages).
Simple, dynamic chat interface with auto-scrolling.
Username-based joining with duplicate prevention.

Prerequisites

Node.js (v14.x or later)
npm (comes with Node.js)


Project Structure
Real-Time Chat Dashboard/
├── server/         # Node.js backend
│   ├── node_modules/
│   ├── package.json
│   └── server.js
├── client/        # React frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md            # This file
Setup Instructions
1. Backend Setup

Navigate to backend directory:
cd server

Initialize project and install dependencies:
npm init -y
npm install express socket.io cors

Start the backend server:
npm run dev

The server will run on http://localhost:3000.
Check the console for "Server running on port 3000".



2. Frontend Setup

Navigate to frontend directory:
cd client

Create React app and install dependencies:
npx create-react-app . 
npm install socket.io-client

Configure proxy (for development):

To avoid port conflict, change the start script to use port 3001:
json"start": "PORT=3001 react-scripts start"



Start the frontend:
npm start

The app will open in your browser at http://localhost:3001.



3. Running the Application

Ensure both the backend (npm run dev in server) and frontend (npm start in client) are running in separate terminal windows.
Open http://localhost:3001 in multiple browser tabs or devices to test multi-user functionality.
Enter a username and click "Join Chat" to start chatting.
Type a message and press "Send" to broadcast it.

Usage

Joining: Enter a unique username and click "Join Chat". If the username is taken or empty, an alert message will be displayed.
Chatting: Type messages in the input field and send. Messages appear in real-time for all connected users.
Online Users: See a list of currently connected users on the left.
History: View the last 50 messages, which auto-update and scroll to the latest.


Troubleshooting

"Cannot GET /": Normal when accessing http://localhost:3000 directly; the backend only serves /history.
Connection Issues: Ensure both servers are running and ports (3000 for backend, 3001 for frontend) are not blocked.
CORS Errors: The proxy setup should handle this in development. For production, serve the React build from the backend.
Empty Screen: Refresh the page or check console logs (F12) for errors.

Deployment (Optional)

Build Frontend:
cd client
npm run build


Install path: npm install path.



Contributing
Feel free to fork and submit pull requests. Report issues on the GitHub repository.
License
MIT License simon assfasw