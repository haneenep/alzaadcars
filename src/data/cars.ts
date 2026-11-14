// ──────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA. These listings are placeholders so the Collection page can be built and tested.
// Replace each entry with a real car: set `image` to a photo in /public/cars/ (e.g. "/cars/land-cruiser.jpg"),
// update the specs and price, and delete `sample: true`. Add or remove entries freely; the filters
// (make, body type, fuel, gearbox, year, price, mileage) build themselves from whatever is in this list.
// ──────────────────────────────────────────────────────────────────────────────
export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number; // AED
  km: number;
  body: "SUV" | "Sedan" | "Hatchback" | "Coupe";
  gearbox: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  color: string;
  specs: string; // e.g. "GCC"
  image: string;
  pos?: string; // CSS object-position for the photo crop
  note: string;
  sample?: boolean;
};

export const cars: Car[] = [
  { id: "land-cruiser-2021", make: "Toyota", model: "Land Cruiser", year: 2021, price: 215000, km: 48000, body: "SUV", gearbox: "Automatic", fuel: "Petrol", color: "Midnight Blue", specs: "GCC", image: "/services/showroom.jpg", pos: "40% 70%", note: "Full service history. Two-stage inspected.", sample: true },
  { id: "bmw-3-2020", make: "BMW", model: "3 Series 330i", year: 2020, price: 98000, km: 52000, body: "Sedan", gearbox: "Automatic", fuel: "Petrol", color: "Navy", specs: "GCC", image: "/services/selling.jpg", pos: "75% 60%", note: "One owner. Showroom condition inside and out.", sample: true },
  { id: "fortuner-2019", make: "Toyota", model: "Fortuner", year: 2019, price: 79000, km: 78000, body: "SUV", gearbox: "Automatic", fuel: "Petrol", color: "Silver", specs: "GCC", image: "/services/personal.jpg", pos: "65% 30%", note: "Family-ready, recently serviced.", sample: true },
  { id: "patrol-2020", make: "Nissan", model: "Patrol", year: 2020, price: 132000, km: 64000, body: "SUV", gearbox: "Automatic", fuel: "Petrol", color: "Black", specs: "GCC", image: "/services/park.jpg", pos: "15% 50%", note: "Genuine parts replaced where needed.", sample: true },
  { id: "c-class-2019", make: "Mercedes-Benz", model: "C 200", year: 2019, price: 89000, km: 71000, body: "Sedan", gearbox: "Automatic", fuel: "Petrol", color: "Black", specs: "GCC", image: "/services/rental.jpg", pos: "80% 50%", note: "Smooth, quiet and comfortable.", sample: true },
  { id: "corolla-2021", make: "Toyota", model: "Corolla", year: 2021, price: 58000, km: 39000, body: "Sedan", gearbox: "Automatic", fuel: "Petrol", color: "Navy", specs: "GCC", image: "/services/selling.jpg", pos: "20% 65%", note: "Low running costs, ideal daily driver.", sample: true },
  { id: "sportage-2022", make: "Kia", model: "Sportage", year: 2022, price: 85000, km: 28000, body: "SUV", gearbox: "Automatic", fuel: "Petrol", color: "White", specs: "GCC", image: "/services/showroom.jpg", pos: "88% 75%", note: "Nearly new with the remaining warranty.", sample: true },
  { id: "camry-hybrid-2022", make: "Toyota", model: "Camry Hybrid", year: 2022, price: 92000, km: 31000, body: "Sedan", gearbox: "Automatic", fuel: "Hybrid", color: "Pearl White", specs: "GCC", image: "/services/park.jpg", pos: "70% 55%", note: "Excellent fuel economy.", sample: true },
  { id: "mazda3-2020", make: "Mazda", model: "Mazda 3", year: 2020, price: 49000, km: 58000, body: "Hatchback", gearbox: "Manual", fuel: "Petrol", color: "Red", specs: "GCC", image: "/services/rental.jpg", pos: "30% 40%", note: "Fun to drive, easy on the budget.", sample: true },
];

export const aed = (n: number) => `AED ${n.toLocaleString("en-US")}`;
export const km = (n: number) => `${n.toLocaleString("en-US")} km`;
