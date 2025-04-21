import { vision } from '@react-native-firebase/ml-vision';

// Step 1: Extract text from image
export const processRecipeImage = async (base64Image: string) => {
  const processed = await vision().textRecognizerProcessImage(
    `data:image/jpeg;base64,${base64Image}`
  );
  return processed.text;
};

// Step 2: Parse ingredients (Basic NLP)
export const parseIngredients = (text: string) => {
  const lines = text.split('\n');
  return lines.filter(line => 
    line.match(/(\d+\s)?(cup|tbsp|tsp|oz|g|kg|lb|ml)?\.?\s+\w+/i)
  );
};
// lib/ingredientParser.ts
import vision from '@react-native-firebase/ml-vision';

// Step 1: OCR to get text from image
export const processRecipeImage = async (base64Image: string): Promise<string> => {
  const processed = await vision().textRecognizerProcessImage(`data:image/jpeg;base64,${base64Image}`);
  return processed.text;
};

// Step 2: Parse ingredients from text
export const parseIngredients = (text: string): string[] => {
  const lines = text.split('\n');
  // Simple filter: lines that look like ingredient entries
  return lines
    .map(line => line.trim())
    .filter(line => line.length > 0 && /[a-zA-Z]/.test(line) && /\d/.test(line));
};
