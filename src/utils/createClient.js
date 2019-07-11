import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import BedderConfig from 'bedder/bedderConfig';

// This is client side config only - don't put anything in here that shouldn't be public!
const endpoint = 'http://localhost:4000';
const prodEndpoint = 'https://graphql.beddertravel.com';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('bedder_appbedder_auth_token');
  const tokenObject = JSON.parse(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? tokenObject.data : '',
    },
  };
});

const client = new ApolloClient({
  resolvers: {
    Query: {
      businessUnit: (_, { businessUnitId }, { cache }) => {
        const id = `BusinessUnit:${businessUnitId}`;
        const fragment = gql`
          fragment basicInfo on BusinessUnit {
            id
            name
            parentId
            numRooms
            bedsKing
            bedsQueen
            bedsSimple
            numPeople
            equipment
            photos {
              id
              uuid
              url
            }
            rate
            currency
            isDeleted
            isNew
          }
        `;
        const query = cache.readFragment({ fragment, id });
        console.log(query);
        return query;
      }
    },
    Mutation: {
      addFileToBusiness: (_root, { modelId, uuid, url }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'Business', id: modelId });
        // TODO: This fragment should be reusable.
        const fragment = gql`
          fragment coverPhotos on Business {
            coverPhotos {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: We should pass an id that is for sure not in local cache.
        const nbOfPhotos = query.coverPhotos ? query.coverPhotos.length : 0;
        const newId = nbOfPhotos ? query.coverPhotos[nbOfPhotos - 1].id + 1 : 1;
        const newCoverPhoto = { id: newId, uuid, url, __typename: 'File' };
        const data = {
          coverPhotos: nbOfPhotos ? [ ...query.coverPhotos, newCoverPhoto] : [ newCoverPhoto ]
        };
        console.log("NEW DATA", data);
        cache.writeData({ id, data });
        return newCoverPhoto;
      },
      addFileToBusinessUnit: (_root, { modelId, uuid, url }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'BusinessUnit', id: modelId });
        // TODO: This fragment should be reusable.
        const fragment = gql`
          fragment photos on BusinessUnit {
            photos {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: We should pass an id that is for sure not in local cache.
        const nbOfPhotos = query.photos ? query.photos.length : 0;
        const newId = nbOfPhotos ? query.photos[nbOfPhotos - 1].id + 1 : 1;
        const newPhoto = { id: newId, uuid, url, __typename: 'File' };
        const data = {
          photos: nbOfPhotos ? [ ...query.photos, newPhoto] : [ newPhoto ]
        };
        cache.writeData({ id, data });
        return newPhoto;
      },
      removeFileFromBusiness: (_root, { modelId, index }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'Business', id: modelId });
        const fragment = gql`
          fragment coverPhotos on Business {
            coverPhotos {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: Is the index really reliable or should I remove by id?
        // Don't forget that splice returns the REMOVED element, that's why we don't assign to a variable.
        query.coverPhotos.splice(index, 1);
        cache.writeData({ id, data: { coverPhotos: query.coverPhotos } });
        return null;
      },
      removeFileFromBusinessUnit: (_root, { modelId, index }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'BusinessUnit', id: modelId });
        const fragment = gql`
          fragment photos on BusinessUnit {
            photos {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: Is the index really reliable or should I remove by id?
        // Don't forget that splice returns the REMOVED element, that's why we don't assign to a variable.
        query.photos.splice(index, 1);
        cache.writeData({ id, data: { photos: query.photos } });
        return null;
      },
      addNewRoom: (_root, { businessId }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'Business', id: businessId });
        const fragment = gql`
          fragment businessUnits on Business {
            units {
              id
              name
              parentId
              numRooms
              bedsKing
              bedsQueen
              bedsSimple
              numPeople
              equipment
              photos {
                id
                uuid
                url
              }
              rate
              currency
              isDeleted
              isNew
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: We should pass an id that is for sure not in local cache.
        const nbOfUnits = query.units.length;
        const newId = nbOfUnits ? query.units[nbOfUnits - 1].id + 20 : 1;
        const newBusinessUnit = { 
          id: newId, 
          parentId: newId, 
          name: 'New Room', 
          numRooms: 1, 
          bedsKing: 0,
          bedsQueen: 0,
          bedsSimple: 0,
          numPeople: 2,
          equipment: JSON.stringify(BedderConfig.getEquipment()),
          photos: [],
          rate: 0,
          currency: 'USD',
          isDeleted: false,
          isNew: true,
          __typename: 'BusinessUnit' 
        };
        const data = {
          units: [ ...query.units, newBusinessUnit]
        };
        cache.writeData({ id, data });
        return newBusinessUnit;
      },
      removeRoom: (_root, { businessId, roomId }, { cache, getCacheKey }) => {
        const roomKey = getCacheKey({ __typename: 'BusinessUnit', id: roomId });
        const businessKey = getCacheKey({ __typename: 'Business', id: businessId });
        const fragment = gql`
          fragment businessUnits on Business {
            units {
              id
              parentId
              name
            }
          }
        `;
        const query = cache.readFragment({ fragment, id: businessKey });

        for (let i = 0; i < query.units.length; i++) {
          if (query.units[i].id === roomId) {query.units.splice(i, 1); break;}
        }

        cache.writeData({ id: businessKey, data: { units: query.units } });
        cache.data.delete(roomKey);
        return null;
      }
    },
  },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
