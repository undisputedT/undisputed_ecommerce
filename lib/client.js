import { createClient } from '../sanity-ecommerce/node_modules/@sanity/client';
import imageUrlBuilder from '../sanity-ecommerce/node_modules/@sanity/image-url'

export const client = createClient({
    projectId: '7s0ijhpf',
    dataset: 'production',
    apiVersion: '2023-09-05',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);