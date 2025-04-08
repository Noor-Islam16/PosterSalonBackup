import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ProductCarouselProps {
  title: string;
  items: { image: string; name: string; oldPrice: string; newPrice: string }[];
}

export default function ProductCarousel({
  title,
  items,
}: ProductCarouselProps) {
  return (
    <div className="relative w-full font-poppins">
      <h2 className="text-[#F8C900] text-lg font-bold mb-4">{title}</h2>

      {/* Shadcn Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true, // Enable infinite looping
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              {/* Image Card */}
              <div className="bg-white rounded-lg shadow-lg p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Product Text Outside the Card */}
              <div className="text-center mt-2">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500 line-through text-sm">
                  {item.oldPrice}
                </p>
                <p className="text-[#F8C900] font-bold">{item.newPrice}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Left Arrow */}
        <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 bg-transparent opacity-100 p-3 text-white hover:bg-opacity-75 md:left-0" />

        {/* Right Arrow */}
        <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 bg-transparent opacity-100 p-3 text-white hover:bg-opacity-75 md:right-0" />
      </Carousel>
    </div>
  );
}
