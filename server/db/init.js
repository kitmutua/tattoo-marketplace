import { db } from './index.js';

export async function initDB() {
  try {
    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        profile_image VARCHAR(255)
      );
    `);

    // Artists table
    await db.query(`
      CREATE TABLE IF NOT EXISTS artists (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        specialty TEXT[],
        location VARCHAR(255),
        rating FLOAT,
        image_url VARCHAR(255),
        bio TEXT,
        available BOOLEAN DEFAULT true,
        latitude VARCHAR(50),
        longitude VARCHAR(50),
        verification_status VARCHAR(50) DEFAULT 'unverified'
      );
    `);

    // Designs table
    await db.query(`
      CREATE TABLE IF NOT EXISTS designs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        artist_id INTEGER REFERENCES artists(id),
        style VARCHAR(100),
        likes INTEGER DEFAULT 0
      );
    `);

    // Time slots table
    await db.query(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id SERIAL PRIMARY KEY,
        artist_id INTEGER REFERENCES artists(id),
        date VARCHAR(100),
        time VARCHAR(100),
        available BOOLEAN DEFAULT true
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}