import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id?: string;
      role: 'guest' | 'user' | 'admin'; // ajoute ce que tu veux
      [key: string]: any;
    };
    formDraft?: {
      nom?: string;
      email?: string;
      message?: string;
    };
     views?: number;
  }
}