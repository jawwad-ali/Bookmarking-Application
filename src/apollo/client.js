import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://reverent-easley-afe34b.netlify.app/.netlify/functions/bookmark',
        fetch,
    }),
    cache: new InMemoryCache()
});