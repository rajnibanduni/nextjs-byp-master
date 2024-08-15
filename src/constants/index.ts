enum PaymentMethod {
  CARD = "CARD",
  PAYPAL = "PAYPAL",
}

export const SITE_METADATA = {
  name: "Buyurparts.com",
  title: "Buy parts for your vehicle - buyurparts.com",
  description:
    "Buy auto parts and accessories for your Vehicle | Purchase across hundreds of Brands | Buy Ur Parts",
  url: "https://buyurparts.com",
  image: "https://buyurparts.com/logo.png",
  twitter: "@buyurparts",
  facebook: "buyurparts",
  instagram: "buyurparts",
  linkedin: "buyurparts",
  email: "info@buyurparts.com",
  supportEmail: "support@buyurparts.com",
  phone: "+1 1234 5678 90",
};

export const CheckoutFormDefaultValues = {
  paymentMethod: PaymentMethod.CARD,
  billingFirstName: "",
  billingLastName: "",
  billingCompanyName: "",
  billingPhone: "",
  billingStreetAddress: "",
  billingCity: "",
  billingState: "",
  billingZipCode: "",
  billingCountry: "United States",
  shippingSameAsBilling: true,
  shippingFirstName: "",
  shippingLastName: "",
  shippingCompanyName: "",
  shippingPhone: "",
  shippingStreetAddress: "",
  shippingCity: "",
  shippingState: "",
  shippingZipCode: "",
  shippingCountry: "United States",
};

export const US_STATES = [
  { value: "AL", name: "Alabama", abbr: "AL" },
  { value: "AK", name: "Alaska", abbr: "AK" },
  { value: "AZ", name: "Arizona", abbr: "AZ" },
  { value: "AR", name: "Arkansas", abbr: "AR" },
  { value: "CA", name: "California", abbr: "CA" },
  { value: "CO", name: "Colorado", abbr: "CO" },
  { value: "CT", name: "Connecticut", abbr: "CT" },
  { value: "DE", name: "Delaware", abbr: "DE" },
  { value: "FL", name: "Florida", abbr: "FL" },
  { value: "GA", name: "Georgia", abbr: "GA" },
  { value: "HI", name: "Hawaii", abbr: "HI" },
  { value: "ID", name: "Idaho", abbr: "ID" },
  { value: "IL", name: "Illinois", abbr: "IL" },
  { value: "IN", name: "Indiana", abbr: "IN" },
  { value: "IA", name: "Iowa", abbr: "IA" },
  { value: "KS", name: "Kansas", abbr: "KS" },
  { value: "KY", name: "Kentucky", abbr: "KY" },
  { value: "LA", name: "Louisiana", abbr: "LA" },
  { value: "ME", name: "Maine", abbr: "ME" },
  { value: "MD", name: "Maryland", abbr: "MD" },
  { value: "MA", name: "Massachusetts", abbr: "MA" },
  { value: "MI", name: "Michigan", abbr: "MI" },
  { value: "MN", name: "Minnesota", abbr: "MN" },
  { value: "MS", name: "Mississippi", abbr: "MS" },
  { value: "MO", name: "Missouri", abbr: "MO" },
  { value: "MT", name: "Montana", abbr: "MT" },
  { value: "NE", name: "Nebraska", abbr: "NE" },
  { value: "NV", name: "Nevada", abbr: "NV" },
  { value: "NH", name: "New Hampshire", abbr: "NH" },
  { value: "NJ", name: "New Jersey", abbr: "NJ" },
  { value: "NM", name: "New Mexico", abbr: "NM" },
  { value: "NY", name: "New York", abbr: "NY" },
  { value: "NC", name: "North Carolina", abbr: "NC" },
  { value: "ND", name: "North Dakota", abbr: "ND" },
  { value: "OH", name: "Ohio", abbr: "OH" },
  { value: "OK", name: "Oklahoma", abbr: "OK" },
  { value: "OR", name: "Oregon", abbr: "OR" },
  { value: "PA", name: "Pennsylvania", abbr: "PA" },
  { value: "RI", name: "Rhode Island", abbr: "RI" },
  { value: "SC", name: "South Carolina", abbr: "SC" },
  { value: "SD", name: "South Dakota", abbr: "SD" },
  { value: "TN", name: "Tennessee", abbr: "TN" },
  { value: "TX", name: "Texas", abbr: "TX" },
  { value: "UT", name: "Utah", abbr: "UT" },
  { value: "VT", name: "Vermont", abbr: "VT" },
  { value: "VA", name: "Virginia", abbr: "VA" },
  { value: "WA", name: "Washington", abbr: "WA" },
  { value: "WV", name: "West Virginia", abbr: "WV" },
  { value: "WI", name: "Wisconsin", abbr: "WI" },
  { value: "WY", name: "Wyoming", abbr: "WY" },
];

export const VEHICLE_ATTRIBUTES = [
  {
    make: "BMW",
    models: [
      {
        name: "X5",
        years: ["2020", "2021", "2022"],
        bodyStyles: ["SUV", "Coupe"],
      },
      {
        name: "5 Series",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Coupe"],
      },
      {
        name: "3 Series",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Coupe", "Hatchback"],
      },
    ],
  },
  {
    make: "Audi",
    models: [
      {
        name: "A4",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Convertible"],
      },
      {
        name: "A6",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan", "Coupe"],
      },
      {
        name: "A7",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan", "Coupe"],
      },
    ],
  },
  {
    make: "Toyota",
    models: [
      {
        name: "Corolla",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan", "Hatchback"],
      },
      {
        name: "Camry",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan", "Coupe"],
      },
      {
        name: "Rav4",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Hatchback"],
      },
      {
        name: "Tacoma",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["SUV"],
      },
    ],
  },
  {
    make: "Honda",
    models: [
      {
        name: "Civic",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Hatchback"],
      },
      {
        name: "Accord",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan", "Coupe"],
      },
      {
        name: "CR-V",
        years: ["2017", "2018", "2019", "2020", "2021"],
        bodyStyles: ["SUV"],
      },
      {
        name: "Pilot",
        years: ["2016", "2017", "2018", "2019", "2020"],
        bodyStyles: ["SUV"],
      },
    ],
  },
  {
    make: "Ford",
    models: [
      {
        name: "Mustang",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Coupe"],
      },
      {
        name: "Fusion",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan", "Hatchback"],
      },
      {
        name: "Escape",
        years: ["2017", "2018", "2019", "2020", "2021"],
        bodyStyles: ["SUV"],
      },
      {
        name: "Expedition",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["SUV"],
      },
    ],
  },
  {
    make: "Chevrolet",
    models: [
      {
        name: "Corvette",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Coupe"],
      },
      {
        name: "Cruze",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["Sedan"],
      },
      {
        name: "Silverado",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["SUV"],
      },
      {
        name: "Traverse",
        years: ["2018", "2019", "2020"],
        bodyStyles: ["SUV"],
      },
    ],
  },
  {
    make: "Nissan",
    models: [
      {
        name: "Altima",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan", "Coupe"],
      },
      {
        name: "Sentra",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["Sedan"],
      },
      {
        name: "Rogue",
        years: ["2019", "2020", "2021"],
        bodyStyles: ["SUV"],
      },
      {
        name: "Pathfinder",
        years: ["2017", "2018", "2019", "2020", "2021"],
        bodyStyles: ["SUV"],
      },
    ],
  },
];

  // Mega Menu
  export const MEGAMENU_ITEMS = [
    {
      category: "Home",
      href: "/home",
      
    },

    {
        category: "Shop",
        href: "/shop",
        product: [
            {
                Image:"",
                title: "Shop List",
                href: "/shop-list",
                items: [
                    "Shop1",
                    "Shop2",
                    "Shop3",
                    "Shop4",
                    "Shop5",
                    "Shop6",
                    "Shop7",
                    "Shop8",
                    "Shop9",
                ]
            },
            {
                title: "Product Detail",
                href: "/product-detail",
                items: [
                    "Product 1",
                    "Product 2",
                    "Product 3",
                    "Product 4",
                    "Product 5",
                    "Product 6",
                    "Product 7",
                ]
            },
            {
                title: "Shop-Page",
                href: "/shop-page",
                items: [
                    "page 1",
                    "Page 2",
                    "Page 3",
                    "Page 4",
                ]
            },
            {
                title: "Shop Layout",
                href: "/shop-layout",
                items: [
                    "Layout 1",
                    "Layout 2",
                    "Layout 3",
                    "Layout 4",
                ]
            }, 
        ]
    },
  
  
    {
      category: "Tires & Wheels",
      href: "/",
  },
    {
        category: "Interior Accessories",
        href: "/",
    },
    {
        category: "Blog",
        href: "/",
    },
    {
      category: "Contact",
      href: "/",
    },
    {
      category: "Top Offers",
      href: "/",
      product: [
        {
            image:"https://754969b0.rocketcdn.me/partdo/wp-content/uploads/2022/10/1-35-500x500.jpg",
            title: "Shop List",
            href: "/shop-list",
            items: [
                "Shop1",
                "Shop2",
                "Shop3",
                "Shop4",
                "Shop5",
                "Shop6",
                "Shop7",
                "Shop8",
                "Shop9",
            ]
        },
        {
            title: "Product Detail",
            href: "/product-detail",
            items: [
                "Product 1",
                "Product 2",
                "Product 3",
                "Product 4",
                "Product 5",
                "Product 6",
                "Product 7",
            ]
        },
        {
            title: "Shop-Page",
            href: "/shop-page",
            items: [
                "page 1",
                "Page 2",
                "Page 3",
                "Page 4",
            ]
        },
        {
            title: "Shop Layout",
            href: "/shop-layout",
            items: [
                "Layout 1",
                "Layout 2",
                "Layout 3",
                "Layout 4",
            ]
        }, 
    ]
    },

  ]