 export const Addresses: addressType[] = [
  {
    src: "/smallChunky.png",
    text: "Chunky Glyph Tee",
    alt: "Chunky Glyph Tee",
    price: "120’000₮",
  },
  {
    src: "/smallBlot.png",
    text: "Chunky Glyph Tee",
    alt: "Chunky Glyph Tee",
    price: "120’000₮",
  },
  {
    src: "/smallDoodie.png",
    text: "Doodie hoodie",
    alt: "Doodie hoodie",
    price: "120’000₮",
  },
];
 export interface addressType {
  src: string;
  alt: string;
  text: string;
  price: number | string;
}
