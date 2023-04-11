// import { z } from 'zod';

// export const schemaProduct = z.object({
//     id: z.number(),
//     imageUrl: z.string(),
//     title: z.string(),
//     // types: z.array(z.refine(z.number(), n => n === 0 || n === 1, 'types can only be 0 or 1')),
//     // types: z.array(z.number().equals([0, 1], 'types can only be 0 or 1')),
//     // types: z.array(z.number().oneOf([0, 1], 'types can only be 0 or 1')),
//     // types: z.array(z.number().in([0, 1])),
//     types: z.array(z.number().custom(n => n === 0 || n === 1, 'types can only be 0 or 1')),
//     sizes: z.array(z.number()),
//     price: z.number(),
//     category: z.number(),
//     rating: z.number(),
// })

// export type TProduct = z.infer<typeof schemaProduct>;

export type TProduct = {
    id: number;
    imageUrl: string;
    title: string;
    types: [0, 1];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
};

export type TProductsState = {
    products: TProduct[];
    isLoading: boolean;
    productsNumber: number;
    error: string;
};

export type TFetchProducts = {
    products: TProduct[];
    productsNumber: string | undefined;
};
