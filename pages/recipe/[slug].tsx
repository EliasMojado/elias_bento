import Link from 'next/link';
import {RecipePageProps } from '@/types/recipe';
import Navbar from '../components/navbar';
import {geistMono, neueRegrade } from '../_app'; 
import {getRecipeBySlug } from '../hooks/fetchrecipe';

// Server-Side Rendering (SSR)
export const getServerSideProps = async (context: any) => {
  const { slug } = context.params;
  const { recipe, error } = await getRecipeBySlug(slug);

  return {
    props: {
      recipe,
      error,
    },
  };
}

const RecipePage = ({ recipe, error }: RecipePageProps) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="flex-1 grid grid-cols-3 gap-4 pt-4">
        <div className="row-span-2">

          {/* DISH DESCRIPTION */}
          <div className="bg-biege3 px-10 rounded-lg flex flex-col mb-4 border-2 border-black">
            <Link href="/" passHref>
              <button className="text-5xl py-2">&larr;</button>
            </Link>
            <h1 className={`text-6xl font-bold ${neueRegrade.className}`}>{recipe.title}</h1>
            <p className="text-xl italic py-4">{recipe.description}</p>
          </div>

          {/* IMAGE */}
          <div className="bg-biege3 flex rounded-lg flex-shrink-0 w-full h-auto border-2 border-black">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* INGREDIENTS */}
        <div className="bg-biege2 p-4 rounded-lg row-span-2 bg-[url('/pattern.png')] bg-bottom bg-no-repeat bg-cover] border-2 border-black">
          <h2 className={`text-4xl font-bold italic pb-2 ${geistMono.className}`}>INGREDIENTS</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li className="text-xl italic py-1" key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* STEPS */}
        <div className="bg-biege1 p-4 row-span-2 rounded-lg border-2 border-black">
          <h1 className={`text-4xl font-bold italic pb-2 ${geistMono.className}`}>STEPS</h1>

          <ol>
            {recipe.steps.map((step, index) => {
              const regex = /^(\d+)\.\s*(.*)$/;
              const match = step.match(regex);
              if (!match) return <li className="text-lg py-1" key={index}>{step}</li>;

              const [, number, text] = match;

              return (
                <li className=" text-lg py-2 flex items-start" key={index}>
                  <span className="text-2xl font-bold mr-2 pr-4">{number}</span>
                  <span className="flex-1">{text}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </main>      
    </div>
  );
};

export default RecipePage;
