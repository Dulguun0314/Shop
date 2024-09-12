export const Comments: Comment[] = [
  {
    name: "Saraa",
    text: "Ваав материал ёстой гоё  байна 😍",
  },
  {
    name: "Saraa",
    text: "🔥🔥🔥",
  },
  {
    name: "Saraa",
    text: "Ваав материал ёстой гоё харагдаж байна Ваав материал ёстой гоё  байна ",
  },
  {
    name: "Saraa",
    text: "Ваав материал ёстой гоё  байна",
  },
];
interface Comment {
  name: string;
  text: string;
}
interface Size {
  text: string;
}

export const sizes: Size[] = [
  {
    text: "S",
  },
  {
    text: "M",
  },
  {
    text: "L",
  },
  {
    text: "XL",
  },
  {
    text: "2XL",
  },
];
export const products: Product[] = [
  {
    src: "/hoodieBack.png",
    alt: "Hoodie Back",
  },
  {
    src: "/hoodieRight.png",
    alt: "Hoodie Right",
  },
  {
    src: "/hodieCap.png",
    alt: "Hoodie Cap",
  },
  {
    src: "/hoodieFront.png",
    alt: "Hoodie Front",
  },
];
export interface Product {
  src: string;
  alt: string;
}
