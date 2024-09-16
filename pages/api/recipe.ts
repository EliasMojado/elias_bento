import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Recipe } from '@/types/recipe';

export const getRecipes = (): Recipe[] => {
  const filePath = path.join(process.cwd(), '/data/recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  return data.map((item: any) => item.recipe);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Recipe[]>
) {
  try {
    const recipes = getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error reading recipes:', error);
    res.status(500).json([]);
  }
}

