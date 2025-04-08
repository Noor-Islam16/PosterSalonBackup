import React from "react";
import { Link } from "react-router-dom";

const PosterSalon: React.FC = () => {
  return (
    <div className="bg-black text-white p-6 md:p-12 font-poppins">
      <div className="max-w-full mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-[#F8C900]">
          Poster Salon - A Haven for Vintage Art Lovers
        </h1>
        <p className="mt-4 text-sm md:text-base">
          Welcome to <span className="text-[#F8C900]">Poster Salon</span>, your
          ultimate destination for classic and collectible posters that bring
          art to life! Whether you're a die-hard movie fan, a music enthusiast,
          or simply someone looking to add that perfect piece of vintage charm
          to your space, we've got just what you need.
        </p>

        <h2 className="mt-6 text-lg font-bold text-[#F8C900]">
          Discover a World of Posters
        </h2>
        <p className="mt-2 text-sm md:text-base">
          We offer an exclusive selection of{" "}
          <span className="text-[#F8C900]">vintage posters</span> that range
          across all styles and eras:
        </p>

        <ul className="list-disc list-inside mt-4 space-y-2 text-sm md:text-base">
          <li>
            <span className="font-bold text-[#F8C900]">Movie Posters:</span>{" "}
            Explore timeless classics with our Pre-1945, Post-1945, and Modern
            collections. Dive into Sci-Fi, Horror, Western, or even iconic James
            Bond posters.
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">Concert Posters:</span>{" "}
            Celebrate some of the greatest moments in music history, from the{" "}
            <span className="text-[#F8C900]">Pre-1950s to 1990s</span>.
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">
              Pop Culture Posters:
            </span>{" "}
            From the legendary Elvis Presley to the futuristic{" "}
            <span className="text-[#F8C900]">Star Wars</span> saga, discover
            posters that capture the magic of Action Comics, Anime, and
            everything in between.
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">Fine Art Prints:</span>{" "}
            Browse our collection of Modern, Contemporary, Western, European,
            and French art prints.
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">
              Vintage & Retro Posters:
            </span>{" "}
            Bring back the past with Pop Art, Pulp Fiction, Pin Ups, Kitsch, and
            Travel posters.
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">Specialty Posters:</span>{" "}
            Circus, Maps, Faerie, Automotive, Sports, Propaganda, Celebrity, and
            even Alcohol posters.
          </li>
        </ul>

        <h2 className="mt-6 text-lg font-bold text-[#F8C900]">
          Why Choose Poster Salon?
        </h2>
        <ul className="list-disc list-inside mt-4 space-y-2 text-sm md:text-base">
          <li>
            <span className="font-bold text-[#F8C900]">
              Curated Collection:
            </span>{" "}
            Our handpicked selection ensures every poster is unique and
            collectible.
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">
              100% Satisfaction Guarantee:
            </span>{" "}
            If you're not satisfied, we'll make it right!
          </li>
          <li>
            <span className="font-bold text-[#F8C900]">Fast USA Shipping:</span>{" "}
            Enjoy prompt delivery across the USA.
          </li>
        </ul>

        <h2 className="mt-6 text-lg font-bold text-[#F8C900]">
          Transform Your Space with Art
        </h2>
        <p className="mt-2 text-sm md:text-base">
          Let <span className="text-[#F8C900]">Poster Salon</span> help you find
          the perfect poster that speaks to you, whether it's a classic movie, a
          rock concert memory, or a piece of fine art.
        </p>

        <p className="mt-4 text-sm md:text-base">
          <Link to="https://postersalon.com/" className="text-white underline">
            Browse Our Full Collection Now
          </Link>{" "}
          and add a piece of history to your home today!
        </p>
      </div>
    </div>
  );
};

export default PosterSalon;
