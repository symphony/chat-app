declare global {
  interface User {
    id: string;
    username: string;
  }

  interface UserDB {
    [id: string]: User;
  }

  interface AppStats {
    totalConnections: number;
  }
}

export {};