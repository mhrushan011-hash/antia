import fs from 'fs';
import path from 'path';
import type { Database } from '@/types/cms';
import initialData from './initial-data';

// In production (Vercel), the filesystem is read-only except /tmp
// Data is ephemeral per cold-start but always seeded from initial-data.ts
const DB_PATH = process.env.NODE_ENV === 'production'
    ? '/tmp/antia-db.json'
    : path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists
function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// Initialize database if it doesn't exist
function initializeDB(): Database {
    ensureDataDir();

    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
    }

    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

// Read database
export function readDB(): Database {
    try {
        if (!fs.existsSync(DB_PATH)) {
            return initializeDB();
        }
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return initializeDB();
    }
}

// Write database
export function writeDB(data: Database): void {
    ensureDataDir();
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Helper functions for each entity
export const db = {
    products: {
        getAll: () => readDB().products,
        getById: (id: string) => readDB().products.find(p => p.id === id),
        getBySlug: (slug: string) => readDB().products.find(p => p.slug === slug),
        create: (product: any) => {
            const data = readDB();
            data.products.push(product);
            writeDB(data);
            return product;
        },
        update: (id: string, updates: Partial<any>) => {
            const data = readDB();
            const index = data.products.findIndex(p => p.id === id);
            if (index !== -1) {
                data.products[index] = { ...data.products[index], ...updates, updatedAt: new Date().toISOString() };
                writeDB(data);
                return data.products[index];
            }
            return null;
        },
        delete: (id: string) => {
            const data = readDB();
            data.products = data.products.filter(p => p.id !== id);
            writeDB(data);
        },
    },

    pages: {
        getAll: () => readDB().pages,
        getById: (id: string) => readDB().pages.find(p => p.id === id),
        getBySlug: (slug: string) => readDB().pages.find(p => p.slug === slug),
        create: (page: any) => {
            const data = readDB();
            data.pages.push(page);
            writeDB(data);
            return page;
        },
        update: (id: string, updates: Partial<any>) => {
            const data = readDB();
            const index = data.pages.findIndex(p => p.id === id);
            if (index !== -1) {
                data.pages[index] = { ...data.pages[index], ...updates, updatedAt: new Date().toISOString() };
                writeDB(data);
                return data.pages[index];
            }
            return null;
        },
        delete: (id: string) => {
            const data = readDB();
            data.pages = data.pages.filter(p => p.id !== id);
            writeDB(data);
        },
    },

    menus: {
        getAll: () => readDB().menus,
        getById: (id: string) => readDB().menus.find(m => m.id === id),
        getByLocation: (location: 'header' | 'footer') => readDB().menus.find(m => m.location === location),
        update: (id: string, updates: Partial<any>) => {
            const data = readDB();
            const index = data.menus.findIndex(m => m.id === id);
            if (index !== -1) {
                data.menus[index] = { ...data.menus[index], ...updates };
                writeDB(data);
                return data.menus[index];
            }
            return null;
        },
    },

    redirects: {
        getAll: () => readDB().redirects,
        getByFrom: (from: string) => readDB().redirects.find(r => r.from === from && r.active),
        create: (redirect: any) => {
            const data = readDB();
            data.redirects.push(redirect);
            writeDB(data);
            return redirect;
        },
        delete: (id: string) => {
            const data = readDB();
            data.redirects = data.redirects.filter(r => r.id !== id);
            writeDB(data);
        },
    },

    media: {
        getAll: () => readDB().media,
        getById: (id: string) => readDB().media.find(m => m.id === id),
        create: (media: any) => {
            const data = readDB();
            data.media.push(media);
            writeDB(data);
            return media;
        },
        delete: (id: string) => {
            const data = readDB();
            data.media = data.media.filter(m => m.id !== id);
            writeDB(data);
        },
    },

    settings: {
        get: () => readDB().settings,
        update: (updates: Partial<any>) => {
            const data = readDB();
            data.settings = { ...data.settings, ...updates };
            writeDB(data);
            return data.settings;
        },
    },

    users: {
        getByUsername: (username: string) => readDB().users.find(u => u.username === username),
    },

    customers: {
        getAll: () => readDB().customers ?? [],
        getById: (id: string) => (readDB().customers ?? []).find(c => c.id === id),
        getByEmail: (email: string) => (readDB().customers ?? []).find(c => c.email === email),
        create: (customer: any) => {
            const data = readDB();
            if (!data.customers) data.customers = [];
            data.customers.push(customer);
            writeDB(data);
            return customer;
        },
    },

    blogs: {
        getAll: () => readDB().blogs ?? [],
        getById: (id: string) => (readDB().blogs ?? []).find(b => b.id === id),
        getBySlug: (slug: string) => (readDB().blogs ?? []).find(b => b.slug === slug),
        getPublished: () => (readDB().blogs ?? []).filter(b => b.published),
        getFeatured: () => (readDB().blogs ?? []).filter(b => b.published && b.featured),
        create: (blog: any) => {
            const data = readDB();
            if (!data.blogs) data.blogs = [];
            data.blogs.push(blog);
            writeDB(data);
            return blog;
        },
        update: (id: string, updates: Partial<any>) => {
            const data = readDB();
            if (!data.blogs) data.blogs = [];
            const index = data.blogs.findIndex(b => b.id === id);
            if (index !== -1) {
                data.blogs[index] = { ...data.blogs[index], ...updates, updatedAt: new Date().toISOString() };
                writeDB(data);
                return data.blogs[index];
            }
            return null;
        },
        delete: (id: string) => {
            const data = readDB();
            if (!data.blogs) data.blogs = [];
            data.blogs = data.blogs.filter(b => b.id !== id);
            writeDB(data);
        },
    },

    contacts: {
        getAll: () => readDB().contacts ?? [],
        create: (contact: any) => {
            const data = readDB();
            if (!data.contacts) data.contacts = [];
            data.contacts.push(contact);
            writeDB(data);
            return contact;
        },
    },

    orders: {
        getAll: () => readDB().orders ?? [],
        getById: (id: string) => (readDB().orders ?? []).find(o => o.id === id),
        getByCustomerId: (customerId: string) => (readDB().orders ?? []).filter(o => o.customerId === customerId),
        getByEmail: (email: string) => (readDB().orders ?? []).filter(o => o.customerEmail === email),
        create: (order: any) => {
            const data = readDB();
            if (!data.orders) data.orders = [];
            data.orders.push(order);
            writeDB(data);
            return order;
        },
        update: (id: string, updates: Partial<any>) => {
            const data = readDB();
            if (!data.orders) data.orders = [];
            const index = data.orders.findIndex(o => o.id === id);
            if (index !== -1) {
                data.orders[index] = { ...data.orders[index], ...updates, updatedAt: new Date().toISOString() };
                writeDB(data);
                return data.orders[index];
            }
            return null;
        },
    },
};
