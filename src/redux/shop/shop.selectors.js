import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopCollectionsForPreview = createSelector(
  [selectShopCollections],
  
  // Object.keys method returns all the keys of the object in an array and here we are mapping those keys to their respecitve values
  (collections) => Object.keys(collections).map((key) => collections[key])
);

// Data Normalization: Storing lists of elements inside an object instead of an array
// Reason: Data fetching will be fast (will be same to fetch first element as well as for the last element)
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
  )
);
