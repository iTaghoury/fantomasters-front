export interface User {
  id: string,
  isConnected: boolean,
  role: string,
  friends: string[],
}

export interface Role {
  name: string,
  description: string,
  citation: string,
}