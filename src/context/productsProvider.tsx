import React, { ReactElement, createContext, useState, useEffect } from "react";

export type ProductType = {
    name: string;
    image: string;
    price: number;
    quantity: number;
    stock: number;
    in_stock: boolean;
    type: string;
};

const initState: ProductType[] = [
    {
        name: "Intel I9-13900K",
        image: "./images/i9-13900k-resize.png",
        price: 580,
        quantity: 0,
        stock: 100,
        in_stock: true,
        type: "CPU"
    },
    {
        name: "Ryzen 7 7700X",
        image: "./images/Ryzen-7-7700X-resize.jpeg",
        price: 320,
        quantity: 0,
        stock: 200,
        in_stock: true,
        type: "CPU"
    },
    {
        name: "MSI RTX 3060Ti",
        image: "./images/MSI-RTX3060Ti-resize.png",
        price: 360,
        quantity: 0,
        stock: 150,
        in_stock: true,
        type: "GPU"
    },
    {
        name: "Powercolor Radeon 6600",
        image: "./images/Powercolor-Radeon-6600-resize.jpeg",
        price: 220,
        quantity: 0,
        stock: 300,
        in_stock: true,
        type: "GPU"
    },
    {
        name: "Corsair Vengeance 8GB RAM",
        image: "./images/Corsair-Vengeance-DDR4-8gb-resize.jpeg",
        price: 25,
        quantity: 0,
        stock: 350,
        in_stock: true,
        type: "RAM"
    },
    {
        name: "Corsair Vengeance 16GB ProRGB RAM",
        image: "./images/RAM-Vengeance-ProRGB-16GB-resize.jpeg",
        price: 65,
        quantity: 0,
        stock: 200,
        in_stock: true,
        type: "RAM"
    },
    {
        name: "Dell Poweredge r720",
        image: "./images/MBD-Dell_PE_R720V1-resize.jpeg",
        price: 200,
        quantity: 0,
        stock: 150,
        in_stock: true,
        type: "MB"
    },
    {
        name: "Supermicro X11SAE",
        image: "./images/MBD-X11SAE-resize.jpeg",
        price: 350,
        quantity: 0,
        stock: 100,
        in_stock: true,
        type: "MB"
    },
    {
        name: "Samsung 980 PRO SSD",
        image: "./images/980pro-ssd-resize.jpeg",
        price: 90,
        quantity: 0,
        stock: 220,
        in_stock: true,
        type: "Storage"
    },
    {
        name: "Seagate BarraCuda 8TB HDD",
        image: "./images/hdd-resize.png",
        price: 100,
        quantity: 0,
        stock: 100,
        in_stock: true,
        type: "Storage"
    },
    {
        name: "Corsair 4000D",
        image: "./images/Corsair-4000D-resize.jpeg",
        price: 95,
        quantity: 0,
        stock: 400,
        in_stock: true,
        type: "Case"
    },
    {
        name: "Thermaltake Versa H18",
        image: "./images/Thermaltake-Versa-H18-resize.jpeg",
        price: 50,
        quantity: 0,
        stock: 500,
        in_stock: true,
        type: "Case"
    }
];

export type useProductsContextType = { products: ProductType[] };

const initContextState: useProductsContextType = { products: [] };

const ProductsContext = createContext<useProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const productsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState);

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = fetch("http://localhost:3500/products")
                .then((res) => {
                    return res.json();
                })
                .catch((err) => {
                    if (err instanceof Error) console.log(err.message);
                });
            return data;
        };
        fetchProducts().then((products) => setProducts(products));
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
