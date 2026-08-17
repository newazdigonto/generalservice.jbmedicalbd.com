import Image from "next/image";

export default function PageHero({
  image,
  alt,
  objectPosition = "center",
}: {
  image: string;
  alt: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative h-60 bg-navy">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition }}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,22,80,0.28)] to-[rgba(27,22,80,0.52)]" />
    </div>
  );
}
