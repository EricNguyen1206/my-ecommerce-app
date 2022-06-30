export const sliderItems = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/my-ecommerce-app-770f8.appspot.com/o/banner.webp?alt=media&token=8d88f516-448c-4cff-86ea-d3227daf8c1e",
        title: "SUMMER SALE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "f3f8f3",
    },
    {
        id: 2,
        img: "https://i.ibb.co/DG69bQ4/2.png",
        title: "AUTUMN COLLECTION",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "fcf5f5",
    },
    {
        id: 3,
        img: "https://i.ibb.co/cXFnLLV/3.png",
        title: "LOUNGEWEAR LOVE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "f3f3f9",
    },
];

export const categories = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/my-ecommerce-app-770f8.appspot.com/o/men_category.webp?alt=media&token=033f4b32-06c5-4623-b0bc-b54373b11411",
        title: "MEN PRODUCTS!",
        cat: "men",
    },
    {
        id: 2,
        img: "https://firebasestorage.googleapis.com/v0/b/my-ecommerce-app-770f8.appspot.com/o/women_category.webp?alt=media&token=60994e0d-4ce2-4c94-baf1-98fed48e68aa",
        title: "WOMEN DESIGNS",
        cat: "women",
    },
    {
        id: 3,
        img: "https://firebasestorage.googleapis.com/v0/b/my-ecommerce-app-770f8.appspot.com/o/kid_banner.webp?alt=media&token=dfa8e34a-d396-48e2-977e-48d066941c7e",
        title: "KIDS CLOTHES",
        cat: "kids",
    },
];

export const popularProducts = [
    {
        id: 1,
        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    },
    {
        id: 2,
        img: "https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
    },
    {
        id: 3,
        img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
    },
    {
        id: 4,
        img: "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
    },
    {
        id: 5,
        img: "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
    },
    {
        id: 6,
        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
    },
    {
        id: 7,
        img: "https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
    },
    {
        id: 8,
        img: "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
    },
];

export const dummyProduct = [
    {
        _id: "62a8bcc9c34331227803b7f9",
        title: "Basic shirt",
        desc: "Basic shirt 100% spandex for summer",
        img: "1JUDFCE676P7yvS7ZqECryqtU1k2ajbZD",
        categories: [],
        size: ["S", "M", "L"],
        color: ["#000", "#fff"],
        price: 100,
        inStock: true,
        createdAt: "2022-06-14T16:52:25.696Z",
        updatedAt: "2022-06-14T16:52:25.696Z",
        __v: 0,
    },
    {
        _id: "62a9371e67466a29b45ceadb",
        title: "Crew Neck Short Sleeve T-Shirt",
        desc: "Basic shirt 100% spandex for summerCarefully selected fabric, cut, and details. A stylish statement T-shirt.",
        img: "19UHtdGqdkApwY4EEDBKDz8qvKlLRDFSp",
        categories: [],
        size: ["S", "L", "XL"],
        color: ["#323227"],
        price: 79,
        inStock: true,
        createdAt: "2022-06-15T01:34:22.501Z",
        updatedAt: "2022-06-15T01:34:22.501Z",
        __v: 0,
    },
];

export const dummyCart = [
    {
        _id: "62a9393f67466a29b45ceadf",
        userId: "62a8ad2569745d5bed911c48",
        products: [
            {
                productId: "62a8bcc9c34331227803b7f9",
                quantity: 2,
                _id: "62a9393f67466a29b45ceae0",
            },
        ],
        createdAt: "2022-06-15T01:43:27.328Z",
        updatedAt: "2022-06-15T01:43:27.328Z",
        __v: 0,
    },
];
