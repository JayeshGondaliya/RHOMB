// PRODUCTS DATA (React / JavaScript)

const img = (seed, w = 800, h = 1000) =>
    `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const products = [
    {
        id: "p1",
        name: "Aurora Diamond Solitaire Ring",
        category: "Rings",
        metal: "Diamond",
        price: 184500,
        oldPrice: 210000,
        image: img("photo-1605100804763-247f67b3557e"),
        rating: 4.9,
        bestseller: true,
        featured: true,
        description:
            "A breathtaking 1.2ct round brilliant solitaire set in 18k recycled gold.",
    },
    {
        id: "p2",
        name: "Celeste Pavé Diamond Necklace",
        category: "Necklaces",
        metal: "Diamond",
        price: 329000,
        image: img("photo-1599643478518-a784e5dc4c8f"),
        rating: 4.8,
        featured: true,
        description:
            "Cascading pavé diamonds suspended on an invisible chain.",
    },
    {
        id: "p3",
        name: "Reverie Gold Hoop Earrings",
        category: "Earrings",
        metal: "Gold",
        price: 48900,
        image: img("photo-1535632787350-4e68ef0ac584"),
        rating: 4.7,
        bestseller: true,
        description:
            "Architectural 22k hoops with a hand-polished mirror finish.",
    },
    {
        id: "p4",
        name: "Maharani Emerald Bangle",
        category: "Bangles",
        metal: "Gold",
        price: 268000,
        image: img("photo-1611591437281-460bfbe1220a"),
        rating: 4.9,
        featured: true,
        description:
            "Heritage emerald bangle inspired by royal Mughal jewellery.",
    },
    {
        id: "p5",
        name: "Lumen Platinum Tennis Bracelet",
        category: "Bracelets",
        metal: "Platinum",
        price: 158000,
        image: img("photo-1602173574767-37ac01994b2a"),
        rating: 4.8,
        bestseller: true,
        description:
            "42 brilliant-cut diamonds in a seamless platinum tennis line.",
    },
    {
        id: "p6",
        name: "Orion Sapphire Pendant",
        category: "Pendants",
        metal: "Gold",
        price: 72500,
        image: img("photo-1515562141207-7a88fb7ce338"),
        rating: 4.6,
        description:
            "Ceylon blue sapphire framed by a halo of brilliant diamonds.",
    },
    {
        id: "p7",
        name: "Velvet Rose Gold Stack Ring",
        category: "Rings",
        metal: "Gold",
        price: 32500,
        image: img("photo-1551732998-9573f695fdbb"),
        rating: 4.7,
        bestseller: true,
        description: "Three stackable bands in blush rose gold.",
    },
    {
        id: "p8",
        name: "Eternal Silver Chain",
        category: "Necklaces",
        metal: "Silver",
        price: 12500,
        image: img("photo-1599459183200-59c7687a1c83"),
        rating: 4.5,
        description: "Italian-spun sterling silver Figaro chain.",
    },
    {
        id: "p9",
        name: "Noir Onyx Studs",
        category: "Earrings",
        metal: "Gold",
        price: 18900,
        image: img("photo-1506634572416-48cdfe530110"),
        rating: 4.6,
        description:
            "Sleek onyx cabochons in brushed yellow gold.",
    },
    {
        id: "p10",
        name: "Aria Diamond Cluster Pendant",
        category: "Pendants",
        metal: "Diamond",
        price: 96000,
        image: img("photo-1573408301185-9146fe634ad0"),
        rating: 4.8,
        featured: true,
        description:
            "A cluster of pear-cut diamonds set in white gold.",
    },
    {
        id: "p11",
        name: "Reign Gold Cuff",
        category: "Bracelets",
        metal: "Gold",
        price: 142000,
        image: img("photo-1620578728140-7daf4adb7d3b"),
        rating: 4.7,
        description: "Bold textured cuff in solid 22k gold.",
    },
    {
        id: "p12",
        name: "Mystique Diamond Engagement Ring",
        category: "Rings",
        metal: "Diamond",
        price: 245000,
        image: img("photo-1518049362265-d5b2a6467637"),
        rating: 5.0,
        featured: true,
        bestseller: true,
        description:
            "Oval brilliant centerpiece with a hidden halo.",
    },
];

// CONSTANTS
export const categories = [
    "Rings",
    "Necklaces",
    "Earrings",
    "Bracelets",
    "Bangles",
    "Pendants",
];

export const metals = [
    "Gold",
    "Silver",
    "Platinum",
    "Diamond",
];

// INR FORMATTER
export const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);