import type { StaticImageData } from "next/image";
import Image from "next/image";

interface HeroProps {
    imgData: StaticImageData;
    imgAlt: string;
    title: string;
}

export default function Hero({ imgData, imgAlt, title }: HeroProps) {
    return (
      <div className="relative h-[85vh] overflow-hidden">
        {/* Background Image */}
        <Image
          src={imgData}
          alt={imgAlt}
          layout="fill"
          objectFit="cover"
          className="z-0"
          style={{ filter: 'brightness(0.3)' }}
        />
        {/* Text Content */}
        <div className="absolute z-10 w-full h-full flex flex-col justify-center items-center px-10">
          <h1 className="text-white text-6xl font-bold leading-snug text-center">{title}</h1>
          
          <p className="text-white absolute bottom-10 right-10 text-sm">
            Photo by <a href="https://unsplash.com/photos/..." target="_blank" rel="noopener noreferrer">Jo Szczepanska</a> on <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </p>
        </div>
      </div>
    );
  }