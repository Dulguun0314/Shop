export const products: Product[] = [
  {
    number: 1,
    src: "/shoes.png",
    alt: "/shoes.png",
    name: "WOMEN'S HORSEBIT MULE",
    support: "#12345678",
    saled: 200,
    price: 12000,
  },
  {
    number: 2,
    src: "/blackShirt.png",
    alt: "/black.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 90,
    price: 12000,
  },
  {
    number: 3,
    src: "/pinkShirt.png",
    alt: "/pinkShirt.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 85,
    price: 12000,
  },
  {
    number: 4,
    src: "/greenShirt.png",
    alt: "/greenShirt.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 73,
    price: 12000,
  },
  {
    number: 5,
    src: "/brownPants.png",
    alt: "/brownPants.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 62,
    price: 12000,
  },
  {
    number: 6,
    src: "/mansJacket.png",
    alt: "/blueShirt.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 58,
    price: 12000,
  },
  {
    number: 7,
    src: "/blackShoes.png",
    alt: "/blackShoes.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 41,
    price: 12000,
  },
  {
    number: 8,
    src: "/womanShoes.png",
    alt: "/whiteShoes.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 20,
    price: 12000,
  },
  {
    number: 9,
    src: "/pinkShirt.png",
    alt: "/pinkShirt.png",
    name: "HOUNDSTOOTH CREWNECK TOP",
    support: "#12345678",
    saled: 200,
    price: 12000,
  },
];

interface Product {
  number: number;
  src: string;
  alt: string;
  name: string | number;
  support: number | string;
  saled: number;
  price: number;
}
