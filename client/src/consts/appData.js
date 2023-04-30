export const cities = [
  // longitude , latitude
  { cityName: "Delhi", coord: [77.216721, 28.6448] },
  { cityName: "Mumbai", coord: [72.877426, 19.07609] },
  { cityName: "Bengaluru", coord: [77.580643, 12.972442] },
  { cityName: "Chennai", coord: [80.327225, 13.206524] },
  { cityName: "Kolkata", coord: [88.363892, 22.572645] },
  { cityName: "Surat", coord: [72.831062, 21.17024] },
  { cityName: "Pune", coord: [73.856255, 18.516726] },
  { cityName: "Hyderabad", coord: [78.491684, 17.38714] },
];
export const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
export const colors = [
  "Grey",
  "Black",
  "White",
  "Blue",
  "Red",
  "Silver",
  "Green",
  "Orange",
  "Yellow",
  "Bronze",
];
export const transmissions = [
  "Manual",
  "Automatic ",
  "Semi-Automatic",
  "Tiptronic",
];
export const fuelTypes = ["Petrol", "Diesel ", "Compressed Natural Gas(CNG)"];
export const noOfSeats = [2, 4, 6, 8, 10, "More than 10"];
export const bodyTypes = [
  "Sedan",
  "SUV",
  "Coupe",
  "Luxury",
  "Convertible",
  "Hatchback",
  "Wagon",
  "Crossover",
  "Sports Car",
  "Supercar",
];

export const getRatingStr = (rating) => {
  let ratingString;
  switch (true) {
    case rating >= 1 && rating <= 2.4:
      ratingString = "Poor";
      break;
    case rating >= 2.5 && rating <= 3.4:
      ratingString = "Fair";
      break;
    case rating >= 3.5 && rating <= 4.4:
      ratingString = "Good";
      break;
    case rating >= 4.5 && rating <= 5:
      ratingString = "Excellent";
      break;
    default:
      throw new Error("Invalid rating value");
  }
  return ratingString;
};
