import { IcartItem } from "../../types";

export const allMerchItems: IcartItem[] = [
  {
    name: "Cheap Talk Vinyl",
    quantity: 0,
    price: 25,
    photos: ["/photos/albumArt3.jpg"],
  },
  {
    name: "Cheap Talk CD",
    quantity: 0,
    price: 15,
    photos: ["/photos/albumArt3cd.jpg"],
  },
  {
    name: "Love In The Dark CD",
    quantity: 0,
    price: 15,
    photos: ["/photos/albumArt2.jpg"],
  },
  {
    name: "Self-Titled CD",
    quantity: 0,
    price: 15,
    photos: ["/photos/albumArt1.jpg"],
  },
  {
    name: "Aunt Vicki Shirt",
    quantity: 0,
    price: 20,
    photos: ["/photos/shirt1.jpeg", "/photos/shirt2.jpeg"],
    availableSizes: ["S", "M", "L"],
    availableColors: ["Gold", "Green", "Pink"],
  },
  {
    name: "Aunt Vicki Smoking Jacket A",
    quantity: 0,
    price: 65,
    photos: ["/photos/jacket1B.jpeg", "/photos/jacket1A.jpeg", "/photos/jacket1C.jpeg"],
  },
  {
    name: "Aunt Vicki Smoking Jacket B",
    quantity: 0,
    price: 65,
    photos: [ "/photos/jacket2B.jpeg", "/photos/jacket2A.jpeg", "/photos/jacket2C.jpeg"],
  },
  {
    name: "Aunt Vicki Smoking Jacket C",
    quantity: 0,
    price: 65,
    photos: [ "/photos/jacket3B.jpeg", "/photos/jacket3A.JPG", "/photos/jacket3C.jpeg"],
  },
  {
    name: "test",
    quantity: 0,
    price: 1,
    photos: [ "/photos/test.jpeg"],
  }
];
