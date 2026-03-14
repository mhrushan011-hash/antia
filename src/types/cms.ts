// Database types for the CMS system

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: 'home' | 'office' | 'car' | 'diy' | 'prevention' | 'accessories';
    buyPrice: number | null;
    rentPrice: number | null;
    buyAvailable: boolean;
    rentAvailable: boolean;
    description: string;
    features: string[];
    specifications: Record<string, string>;
    images: string[];
    altTexts: string[];
    seo: SEOData;
    createdAt: string;
    updatedAt: string;
}

export interface Page {
    id: string;
    name: string;
    slug: string;
    type: 'category' | 'static';
    content: string;
    seo: SEOData;
    customCode: CustomCode;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SEOData {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    canonical: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

export interface CustomCode {
    headCode: string;
    bodyCode: string;
}

export interface MenuItem {
    id: string;
    label: string;
    url: string;
    type: 'internal' | 'external' | 'dropdown';
    children?: MenuItem[];
    order: number;
}

export interface Menu {
    id: string;
    name: string;
    location: 'header' | 'footer';
    items: MenuItem[];
}

export interface Redirect {
    id: string;
    from: string;
    to: string;
    type: '301' | '302';
    active: boolean;
    createdAt: string;
}

export interface MediaFile {
    id: string;
    filename: string;
    originalName: string;
    url: string;
    alt: string;
    size: number;
    type: string;
    uploadedAt: string;
}

export interface SiteSettings {
    id: string;
    globalHeadCode: string;
    globalBodyCode: string;
    siteName: string;
    siteDescription: string;
    defaultSEO: SEOData;
    favicon: string;
    logo: string;
}

export interface User {
    id: string;
    username: string;
    passwordHash: string;
    createdAt: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    createdAt: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    mode: "buy" | "rent";
    rentMonths?: number;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    customerId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    pincode: string;
    items: OrderItem[];
    subtotal: number;
    gst: number;
    total: number;
    paymentMethod: string;
    paymentStatus: "pending" | "paid" | "failed";
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    status: "placed" | "confirmed" | "dispatched" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    altText: string;
    author: string;
    category: string;
    tags: string[];
    published: boolean;
    featured: boolean;
    readTime: string;
    seo: SEOData;
    createdAt: string;
    updatedAt: string;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

// Database structure
export interface Database {
    products: Product[];
    pages: Page[];
    menus: Menu[];
    redirects: Redirect[];
    media: MediaFile[];
    settings: SiteSettings;
    users: User[];
    customers: Customer[];
    orders: Order[];
    blogs: Blog[];
    contacts: Contact[];
}
