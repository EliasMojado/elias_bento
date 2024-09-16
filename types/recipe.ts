export type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    steps: string[];
}

export interface RecipePageProps {
    recipe: Recipe | null;
    error?: string | null;
}

export interface HomeProps {
    recipes: Recipe[];
    error?: string | null;
  }