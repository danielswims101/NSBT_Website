export type ProductVariant = { id: string; title: string; available: boolean };
export type Product = {
  handle: string;
  name: string;
  price: string;
  section: "books" | "regalia" | "desk";
  image: string;
  available: boolean;
  description: string;
  photoFollows?: boolean;
  variants: ProductVariant[];
};

export function cartUrl(variantId: string) {
  return `/api/cart?v=${encodeURIComponent(variantId)}`;
}

export function formatPrice(price: string) {
  const n = Number(price);
  return Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : `$${price}`;
}

export const products: Product[] = [
  {
    handle: "servant-leadership-by-efrain-agosto",
    name: "Servant Leadership, by Efrain Agosto",
    price: "16.49",
    section: "books",
    image: "/images/store/servant-leadership.jpg",
    available: true,
    description:
      "Servant Leadership, by Efrain Agosto. A study of leadership in the New Testament and its bearing on ministry today. Available through the NSBT Bookstore.",
    variants: [{ id: "41205661794359", title: "Book", available: true }],
  },
  {
    handle: "cap",
    name: "NSBT Cap, Grey",
    price: "20.00",
    section: "regalia",
    image: "/images/store/studio/cap.jpg",
    available: true,
    description: "A grey cap carrying the seal of the New School of Biblical Theology. Offered for students, alumni, and friends of the school. Available in grey and maroon.",
    variants: [
      { id: "41205611200567", title: "Grey", available: true },
      { id: "41205611167799", title: "Maroon", available: true },
    ],
  },
  {
    handle: "snapback-cap",
    name: "NSBT Snapback Cap, Grey",
    price: "20.00",
    section: "regalia",
    image: "/images/store/studio/snapback.jpg",
    available: true,
    description: "A snapback cap carrying the NSBT seal. Offered for students, alumni, and friends of the school. Available in grey and maroon.",
    variants: [
      { id: "41205617000503", title: "Grey", available: true },
      { id: "41205616967735", title: "Maroon", available: true },
    ],
  },
  {
    handle: "short-sleeve-polo-shirt",
    name: "NSBT Polo Shirt, Short Sleeve",
    price: "30.00",
    section: "regalia",
    image: "/images/store/studio/polo.jpg",
    available: true,
    description: "A short-sleeve polo carrying the NSBT seal. Offered for students, alumni, and friends of the school. Select sizes are currently available.",
    variants: [
      { id: "41205624307767", title: "Small", available: false },
      { id: "41205624340535", title: "Medium", available: true },
      { id: "41205624373303", title: "Large", available: true },
      { id: "41205624406071", title: "XLarge", available: true },
      { id: "41205624438839", title: "2x", available: true },
      { id: "41205624471607", title: "3x", available: true },
    ],
  },
  {
    handle: "short-sleeve-v-neck-tshirt",
    name: "NSBT V-Neck T-Shirt, Short Sleeve",
    price: "30.00",
    section: "regalia",
    image: "/images/store/studio/vneck.jpg",
    available: true,
    description: "A short-sleeve v-neck carrying the NSBT seal. Offered for students, alumni, and friends of the school. Select sizes are currently available.",
    variants: [
      { id: "41205620736055", title: "Small", available: false },
      { id: "41205620768823", title: "Medium", available: true },
      { id: "41205620801591", title: "Large", available: true },
      { id: "41205620834359", title: "XLarge", available: true },
      { id: "41205620867127", title: "2X", available: true },
      { id: "41205620899895", title: "3x", available: true },
    ],
  },
  {
    handle: "hoodie-grey",
    name: "NSBT Hoodie, Grey",
    price: "40.00",
    section: "regalia",
    image: "/images/store/studio/hoodie-grey.jpg",
    photoFollows: false,
    available: true,
    description: "A grey hoodie carrying the seal of the New School of Biblical Theology. Offered for students, alumni, and friends of the school. Select sizes are currently available.",
    variants: [
      { id: "41205536260151", title: "Small", available: true },
      { id: "41205536292919", title: "Medium", available: true },
      { id: "41205536325687", title: "Large", available: true },
      { id: "41205536358455", title: "XLarge", available: true },
      { id: "41205536391223", title: "2XL", available: true },
      { id: "41205536423991", title: "3XL", available: true },
      { id: "41205538914359", title: "4XL", available: false },
    ],
  },
  {
    handle: "hoodie",
    name: "NSBT Hoodie, Maroon",
    price: "40.00",
    section: "regalia",
    image: "/images/store/studio/hoodie-maroon.jpg",
    available: false,
    description: "A maroon hoodie carrying the NSBT seal. Currently unavailable.",
    variants: [
      { id: "41205535014967", title: "Small", available: false },
      { id: "41205529280567", title: "Medium", available: false },
      { id: "41205529313335", title: "Large", available: false },
      { id: "41205529346103", title: "XLarge", available: false },
      { id: "41205529378871", title: "2XL", available: false },
      { id: "41205529411639", title: "3XL", available: false },
    ],
  },
  {
    handle: "duffle-bag",
    name: "NSBT Duffle Bag",
    price: "30.00",
    section: "regalia",
    image: "/images/store/studio/duffle.jpg",
    available: true,
    description: "A duffle bag carrying the NSBT seal. Offered for students, alumni, and friends of the school. Available in maroon and grey.",
    variants: [
      { id: "41205579448375", title: "Maroon", available: true },
      { id: "41205613232183", title: "Grey", available: true },
    ],
  },
  {
    handle: "journal-with-pen",
    name: "NSBT Journal and Pen",
    price: "10.00",
    section: "desk",
    image: "/images/store/studio/journal.jpg",
    available: true,
    description: "A journal and pen carrying the NSBT seal. Offered for students, alumni, and friends of the school.",
    variants: [{ id: "41205607465015", title: "Journal", available: true }],
  },
  {
    handle: "pens",
    name: "NSBT Pen",
    price: "5.00",
    section: "desk",
    image: "/images/store/studio/pen.jpg",
    available: true,
    description: "A pen carrying the NSBT seal. Offered for students, alumni, and friends of the school.",
    variants: [{ id: "41205601697847", title: "Pen", available: true }],
  },
  {
    handle: "mug",
    name: "NSBT Mug",
    price: "15.00",
    section: "desk",
    image: "/images/store/studio/mug.jpg",
    available: true,
    description: "A mug carrying the NSBT seal. Offered for students, alumni, and friends of the school.",
    variants: [{ id: "41205594521655", title: "Mug", available: true }],
  },
  {
    handle: "water-bottle",
    name: "NSBT Water Bottle",
    price: "10.00",
    section: "desk",
    image: "/images/store/studio/bottle.jpg",
    available: true,
    description: "A water bottle carrying the NSBT seal. Offered for students, alumni, and friends of the school.",
    variants: [{ id: "41205605138487", title: "Bottle", available: true }],
  },
];

export function productByHandle(handle: string) {
  return products.find((p) => p.handle === handle);
}
