import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import images from "../../assets";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import arrow icons

const posters = [
  { title: "Advertising", image: images.pop1 },
  { title: "Propoganda", image: images.pop2 },
  { title: "Celebrity", image: images.pop3 },
  { title: "Sports", image: images.Sports },
  { title: "Pulp Fiction", image: images.pop5 },
  { title: "Kitsch", image: images.pop6 },
  { title: "Circus", image: images.pop7 },
  { title: "Maps", image: images.pop8 },
  { title: "Foories", image: images.pop9 },
  { title: "Pin Ups", image: images.pinup },
  { title: "Anime", image: images.Anime },
  { title: "Travel", image: images.pop10 },
  { title: "Pop Art", image: images.fine9 },
  { title: "Drawings", image: images.fine10 },
  { title: "Texture", image: images.fine11 },
  { title: "Photography", image: images.photography },
];

const PopCulturePosters = () => {
  return (
    <div className=" bg-black text-[#F8C900] p-4 sm:p-8 font-poppins">
      {/* Title with Left & Right Lines */}
      <div className="flex items-center justify-center w-full sm:w-1/2 mx-auto mb-4">
        <div className="flex-1 border-t border-[#F8C900]"></div>
        <h1 className="text-2xl sm:text-3xl font-bold mx-4 whitespace-nowrap">
          Pop Culture
        </h1>
        <div className="flex-1 border-t border-[#F8C900]"></div>
      </div>
      <p className="text-center text-gray-400 mb-8 w-full sm:w-3/4 mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti
        nulla at esse recusandae ea veritatis officia officiis, tenetur
        excepturi impedit molestiae laboriosam repudiandae explicabo.
      </p>

      {/* Grid Layout for Posters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {posters.map((poster, index) => (
          <Card key={index} className="bg-black border-0 shadow-lg w-full">
            <CardContent className="p-4">
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-auto object-cover rounded-none"
              />
              <h2 className="text-center sm:text-start text-base sm:text-lg font-medium mt-2 text-[#F8C900] w-full">
                {poster.title}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 w-full">
        {/* Centered Arrows */}
        <div className="flex justify-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 space-x-4 mb-4 sm:mb-0">
          <Button className="bg-[#F8C900] text-black rounded-full p-3">
            <ChevronLeft size={20} />
          </Button>
          <Button className="bg-[#F8C900] text-black rounded-full p-3">
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Page Numbers on the Right */}
        <div className="flex justify-center sm:ml-auto space-x-2">
          <Button className="bg-[#F8C900] text-black rounded-none">1</Button>
          <Button variant="ghost" className="text-[#F8C900] rounded-none">
            2
          </Button>
          <Button
            variant="ghost"
            className="text-[#F8C900] rounded-none bg-black"
          >
            ...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopCulturePosters;
