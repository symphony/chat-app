declare global {
  interface User {
    id: string;
    username: string;
  };

  interface Message {
    self: boolean;
    sender: string;
    message: string;
  };

};

export {};