const mongoose = require('mongoose');
const Article = require('./models/articleModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogapp';

const categories = [
    "Technology", "Artificial Intelligence", "Agriculture", "Civil Engineering",
    "Mechanical", "Electrical", "Space & Astronomy", "Robotics",
    "Environment", "Data Science", "Healthcare", "Business"
];

const authors = [
    { name: "Alice Johnson", email: "alice@example.com", img: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Bob Smith", email: "bob@example.com", img: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Charlie Brown", email: "charlie@example.com", img: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Diana Prince", email: "diana@example.com", img: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "Ethan Hunt", email: "ethan@example.com", img: "https://randomuser.me/api/portraits/men/5.jpg" }
];

const titles = [
    "The Future of AI in Healthcare", "Sustainable Farming Practices", "Mars Colonization Updates",
    "Quantum Computing Explained", "The Rise of Electric Vehicles", "Minimalist Living Tips",
    "Understanding Blockchain", "Healthy Eating Habits", "Remote Work Trends 2026",
    "Top 10 Programming Languages", "SpaceX Starship Progress", "Renewable Energy Solutions",
    "Meditation for Beginners", "Financial Freedom Strategies", "The Art of Storytelling",
    "Cybersecurity Best Practices", "Machine Learning Basics", "Urban Gardening Guide",
    "The History of the Internet", "Digital Marketing Trends"
];

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "

const generateArticles = () => {
    let articles = [];
    for (let i = 0; i < 20; i++) {
        const author = authors[Math.floor(Math.random() * authors.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const title = titles[i] || `Article Title ${i + 1}`;

        articles.push({
            articleId: Date.now().toString() + i,
            title: title,
            category: category,
            content: lorem.repeat(5),
            dateOfCreation: new Date().toISOString(),
            dateOfModification: new Date().toISOString(),
            isArticleActive: true,
            authorData: {
                name: author.name,
                email: author.email,
                profileImageUrl: author.img
            },
            comments: []
        });
    }
    return articles;
};

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        const articles = generateArticles();
        await Article.insertMany(articles);

        console.log(`Successfully added ${articles.length} dummy articles!`);
        process.exit();
    } catch (err) {
        console.error("Error seeding DB:", err);
        process.exit(1);
    }
};

seedDB();
