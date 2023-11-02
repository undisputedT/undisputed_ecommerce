import { createClient } from "@sanity/client";
import { ImageUrlBuilder } from "next-sanity-image";

export const client = createClient({
    projectId: '7s0ijhpf',
    dataset: 'production',
    apiVersion: '2023-09-05',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);