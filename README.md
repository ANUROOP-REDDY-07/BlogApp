# AuthorHub - Modern Blog Application

A full-stack MERN blog application designed for seamless interaction between Authors and Readers. Features a modern UI with glassmorphism effects, role-based access control, and real-time content management.

![AuthorHub Preview](client/public/preview.png)

## 🚀 Features

- **Role-Based Access**: Distinct dashboards for Authors (write/manage) and Readers (view/comment).
- **Authentication**: Secure sign-up/sign-in powered by Clerk.
- **Modern UI**: Clean, responsive layout with glassmorphism and high-contrast design.
- **Content Management**: Create, edit, and delete articles with rich text support.
- **Engagement**: Comments section, category filtering, and search functionality.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Bootstrap, React Router, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Auth**: Clerk integration.

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/AuthorHub.git
cd AuthorHub
```

### 1. Setup Server
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/blogapp (or your MongoDB Atlas URI)
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 2. Setup Client
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 🏃‍♂️ Running the App

### Start the Backend Server
```bash
cd server
npm run dev
# or for production: npm start
```
Server runs on: `http://localhost:3000`

### Start the Frontend Client
Open a new terminal:
```bash
cd client
npm run dev
```
Client runs on: `http://localhost:5173`

## 📁 Project Structure

```
AuthorHub/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Header, Footer, Articles, etc.)
│   │   ├── contexts/       # Context API for State Management
│   │   ├── styles/         # Custom CSS (Glassmorphism, Theme Variables)
│   │   └── main.jsx        # Entry Point & Routes
│   └── ...
├── server/                 # Express Backend
│   ├── APIs/               # REST API Routes (userApi, authorApi)
│   ├── models/             # Mongoose Schemas (User, Author, Article)
│   └── server.js           # Server Entry Point
└── README.md               # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
