import Image from "next/image";
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Navbar from "./components/navbar";
import { HomeProps } from '@/types/recipe';
import Link from 'next/link';
import { geistSans, geistMono, neueRegrade } from './_app'; 
import { getAllRecipes } from './hooks/fetchrecipe';

// Server-side data fetching
export const getServerSideProps = async () => {
  const { recipes, error } = await getAllRecipes();

  return {
    props: {
      recipes,
      error,
    },
  };
};

export default function Home({ recipes, error }: HomeProps) {
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      
      <main className="flex-1 grid grid-cols-3 gap-4 pt-4">
        <div className="flex col-span-2 gap-4">

          {/* TITLE */}
          <div className="bg-customcrimson text-[#FEEBC6] p-10 rounded-lg flex flex-col justify-between h-full">
            <h1 className={`text-6xl font-bold ${neueRegrade.className}`}>Collection of Bento Box Recipes</h1>
            <h2 className={`text-3xl italic mt-2 ${geistMono.className}`}>Across Different Parts of the World ✈️</h2>
          </div>

          {/* IMAGE */}
          <div className="bg-customblue flex rounded-lg flex-shrink-0 w-[40%] border-2 border-black">
            <Image 
              src="/bento.png"
              alt="Bento Picture"
              layout="responsive"
              width={500} 
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
        
        {/* LIST OF RECIPES */}
        <div className="bg-biege2 p-4 row-span-2 rounded-lg h-[800px] flex flex-col border-2 border-black">
          <h1 className={`text-3xl italic ${geistMono.className}`}>RECIPES</h1>

          <ul className="flex-1 overflow-y-auto">
            {recipes.map((recipe, index) => (
              <Link key={recipe.id} href={`/recipe/${recipe.id}`} passHref>
                <li
                  key={recipe.id}
                  className={`text-lg py-4 ${index < recipes.length - 1 ? 'border-b border-dashed border-black' : ''}`}
                >
                  <h3 className="text-xl pb-2 font-semibold">{recipe.title}</h3>
                  <p className="text-md">{recipe.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-biege1 p-4 rounded-lg border-2 border-black">
          <h2 className="text-2xl p-4">
            Welcome to a culinary corner where a passion for bentos truly comes to life. 
            As a chef and devoted bento enthusiast, Elias believes that every meal is an opportunity to create art. 
            Explore his favorite bento creations, discover tips for crafting your own, and experience the joy of transforming every meal into a little masterpiece.
          </h2>
        </div>
        
        {/* FEEDBACK */}
        <div className="bg-biege3 p-6 rounded-lg flex flex-col justify-between h-full border-2 border-black">
          {/* TEXT */}
          <div>
            <h3 className={`text-3xl italic font-semibold mt-2 ${geistSans.className}`}>We’d Love to Hear from You!</h3>
            <p className="text-lg pt-4 mb-4">
              Let us know what you think! If you have any suggestions or recipes you’d like us to include, we’re all ears. 
              Your feedback helps us make our Bento Box recipes even better.
            </p>
          </div>

          {/* EMOJIS */}
          <div className="flex gap-4 mt-4">
            <a href="elias@old.st" className="text-2xl text-gray-800 hover:text-gray-600">
              <FaEnvelope />
            </a>
            <a href="https://web.facebook.com/IdiotUser" className="text-2xl text-gray-800 hover:text-gray-600" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/elijahmojado/" className="text-2xl text-gray-800 hover:text-gray-600" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
