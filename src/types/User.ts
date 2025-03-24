export type User = {
  id: number;
  name: string;
  email: string;
  documentId: string;
  username: string;
  provider: "local";
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
};