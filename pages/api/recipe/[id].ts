import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Recipe } from '@/types/recipe';

// Function to fetch all recipes
const getRecipes = (): Recipe[] => {
  const filePath = path.join(process.cwd(), '/data/recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  // Assuming the 'recipe' is nested within each item
  return data.map((item: any) => item.recipe);
};

// API handler to fetch a specific recipe by ID
export default function handler(req: NextApiRequest, res: NextApiResponse<Recipe | { message: string }>) {
  const { id } = req.query; // Get the recipe ID from the request query parameters

  try {
    const recipes = getRecipes();
    const recipe = recipes.find((recipe: Recipe) => recipe.id === id); // Find the recipe by ID

    if (recipe) {
      res.status(200).json(recipe); // Return the recipe if found
    } else {
      res.status(404).json({ message: `Recipe with id ${id} not found.` }); // Return 404 if not found
    }
  } catch (error) {
    console.error('Error reading recipes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
