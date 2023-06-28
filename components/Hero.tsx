import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="z-10 flex h-screen items-center justify-center text-5xl uppercase leading-[80px] tracking-wider text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl">
          Eleganza
        </h1>
      </div>
      <div className="bg-cover bg-center">
        <Image
          src="/images/hero.jpg"
          fill
          style={{ objectFit: "cover" }}
          alt="Hero"
          unoptimized
        />
      </div>
    </div>
  );
};

export default Hero;
