export interface Product     {
    "id": number;
    "documentId": string;
    "name": string;
    "description": string | null;
    "price": number | null;
    "createdAt": string;
    "updatedAt": string;
    "publishedAt": string;
    "locale": string;
  }