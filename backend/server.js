import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/user.js'; // Import user routes
import avatarRoutes from './routes/avatar.js'; // Import avatar routes
import chatbotRoutes from './routes/chatbot.js'; // Import chatbot routes
import conversationRoutes from './routes/conversation.js'; // Import conversation routes
import messageRoutes from './routes/message.js'; // Import message routes
import 'dotenv/config';


//require('dotenv').config();//secure the secret key


const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Incoming Request Data:', req.body);
  next();
});


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const publicPath = path.join(__dirname, 'public');


const port = process.env.PORT || 3001;


// CORS Middleware
app.use(cors());
// Logs
app.use(morgan('dev'));
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

const databaseName = 'backend';

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });




// Import the path to the public directory


// Serve static files from the public directory
app.use(express.static(publicPath));

// Handle JSON requests
app.use(express.json());

// Routes
app.use('/api', userRoutes); // Use user routes
app.use('/api', avatarRoutes); // Use avatar routes
app.use('/api', chatbotRoutes); // Use chatbot routes
app.use('/api', conversationRoutes); // Use conversation routes
app.use('/api', messageRoutes); // Use message routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const HOST = process.env.HOST || "127.0.0.1";
app.listen(process.env.PORT, HOST, () => {
  console.log(`Server is running on ${HOST} on port ${process.env.PORT}`);
});

