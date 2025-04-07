export interface User {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: "local";
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
} 