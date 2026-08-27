import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export let isUsingMemoryStore = false;

// Embedded in-memory store for zero-dependency local runs
class LocalStore {
  private dataDir: string;
  private usersFile: string;
  private topicsFile: string;
  private sessionsFile: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data_local');
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    this.usersFile = path.join(this.dataDir, 'users.json');
    this.topicsFile = path.join(this.dataDir, 'topics.json');
    this.sessionsFile = path.join(this.dataDir, 'sessions.json');
    this.ensureFile(this.usersFile);
    this.ensureFile(this.topicsFile);
    this.ensureFile(this.sessionsFile);
  }

  private ensureFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    }
  }

  public read<T>(collectionName: 'users' | 'topics' | 'sessions'): T[] {
    const file = path.join(this.dataDir, `${collectionName}.json`);
    this.ensureFile(file);
    try {
      const data = fs.readFileSync(file, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public write<T>(collectionName: 'users' | 'topics' | 'sessions', items: T[]): void {
    const file = path.join(this.dataDir, `${collectionName}.json`);
    fs.writeFileSync(file, JSON.stringify(items, null, 2), 'utf-8');
  }
}

export const localStore = new LocalStore();

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.trim() !== '') {
    try {
      console.log('🔄 Attempting MongoDB connection...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log('✅ Connected to MongoDB database successfully.');
      isUsingMemoryStore = false;
      return;
    } catch (err: any) {
      console.warn(`⚠️ MongoDB connection failed (${err.message}).`);
      console.log('📦 Falling back to Embedded Local File Store (zero-dependency mode).');
      isUsingMemoryStore = true;
    }
  } else {
    console.log('📦 No MONGODB_URI provided. Initialized Embedded Local Store for seamless development.');
    isUsingMemoryStore = true;
  }
};
