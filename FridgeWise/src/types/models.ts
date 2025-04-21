export interface FridgeItem {
    id: string;
    name: string;
    added: Date;
    expiresIn: number;
    userId: string;
  }
  
  export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
  }