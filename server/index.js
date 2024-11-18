import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { initDB } from './db/init.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Initialize database
await initDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1] || '';
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return { user };
    } catch (err) {
      return { user: null };
    }
  },
});

await server.start();

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});