declare global {
  interface UserDB {
    [id: string]: User;
  }

  interface AppStats {
    totalConnections: number;
  }
}

export {};