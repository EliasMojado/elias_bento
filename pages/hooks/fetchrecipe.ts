import { Recipe } from '../../types/recipe';

export const getAllRecipes = async (maxRetries = 10): Promise<{ recipes: Recipe[]; error: string | null }> => {
  let attempts = 0;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  while (attempts < maxRetries) {
    try {
      const res = await fetch('http://localhost:3000/api/recipe');

      if (!res.ok) {
        throw new Error(`Failed to fetch recipes: ${res.status} ${res.statusText}`);
      }

      const recipes: Recipe[] = await res.json();
      return { recipes, error: null };
    } catch (error: any) {
      attempts++;

      if (attempts >= maxRetries) {
        console.error(`Failed to fetch recipes after ${attempts} attempts:`, error.message);
        return { recipes: [], error: `Failed to load recipes. Please try again later.` };
      }

      // Delay the next retry
      await delay(1000 * attempts); // Exponential backoff (e.g., 1s, 2s, 3s)
    }
  }

  return { recipes: [], error: "Unexpected error" };
};

export const getRecipeBySlug = async (slug: string): Promise<{ recipe: Recipe | null; error: string | null }> => {
  const apiUrl = `http://localhost:3000/api/recipe/${slug}`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch recipe: ${res.status} ${res.statusText}`);
    }

    const recipe: Recipe = await res.json();
    return { recipe, error: null };
  } catch (error: any) {
    console.error(`Error fetching recipe with slug "${slug}":`, error.message);
    return { recipe: null, error: `Failed to load recipe. Please try again later.` };
  }
};