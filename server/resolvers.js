import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db/index.js';

export const resolvers = {
  Query: {
    artists: async () => {
      const result = await db.query('SELECT * FROM artists');
      return result.rows;
    },
    artist: async (_, { id }) => {
      const result = await db.query('SELECT * FROM artists WHERE id = $1', [id]);
      return result.rows[0];
    },
    designs: async () => {
      const result = await db.query(`
        SELECT d.*, a.name as artist_name 
        FROM designs d 
        JOIN artists a ON d.artist_id = a.id
      `);
      return result.rows.map(row => ({
        ...row,
        artist: { name: row.artist_name }
      }));
    },
    availableSlots: async (_, { artistId }) => {
      const result = await db.query(
        'SELECT * FROM time_slots WHERE artist_id = $1 AND available = true',
        [artistId]
      );
      return result.rows;
    },
    me: async (_, __, { user }) => {
      if (!user) return null;
      const result = await db.query('SELECT * FROM users WHERE id = $1', [user.id]);
      return result.rows[0];
    },
  },
  Mutation: {
    signup: async (_, { email, password, name, role }) => {
      const existingUser = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (existingUser.rows[0]) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await db.query(
        'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, hashedPassword, name, role]
      );
      
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (!user.rows[0]) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.rows[0].password);
      
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
      
      return { token, user: user.rows[0] };
    },
    createDesign: async (_, { title, imageUrl, price, style }, { user }) => {
      if (!user || user.role !== 'artist') {
        throw new Error('Not authorized');
      }

      const result = await db.query(
        'INSERT INTO designs (title, image_url, price, style, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, imageUrl, price, style, user.id]
      );

      return result.rows[0];
    },
    bookSlot: async (_, { slotId }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }

      const result = await db.query(
        'UPDATE time_slots SET available = false WHERE id = $1 AND available = true RETURNING *',
        [slotId]
      );

      if (!result.rows[0]) {
        throw new Error('Slot not available');
      }

      return result.rows[0];
    },
  },
};