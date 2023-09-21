import algoliasearch from "algoliasearch";

export const client = algoliasearch(
  "4ZCEDXC60I",
  "23f5bd76c1c54b3111f1c02f33ad7601"
);
export const index = client.initIndex("user_details");

const addItemsToAlgolia = async (item: any) => {
  try {
    const response = await index.saveObject(item);
    console.log(`Item added with objectID: ${response.objectID}`);
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

interface IAlgoliaSearchProps {
  name?: string;
  email?: string;
  age?: string;
  address?: string;
  [s: string]: unknown;
}

const useAlgoliaSearch = async (
  queryParams: IAlgoliaSearchProps,
  page?: number
) => {
  const newArray: string[] = [];
  Object.keys(queryParams)
    .filter((item) => {
      if (item) {
        return queryParams[item];
      }
    })
    ?.map((item: string) => {
      newArray.push(item);
    });

  console.log(newArray);

  const searchParams = Object.values(queryParams)
    .filter((item) => {
      return !!item;
    })
    .join(",");

  const responseArrayOfObjects = await index
    .search(searchParams, {
      page: page ? Number(page) - 1 : 0,
      restrictSearchableAttributes: newArray,
    })
    .then(({ hits, nbHits }) => {
      const hitsUpdatedArray = hits?.map((item: any, index: any) => ({
        ...item,
        key: index,
      }));
      return { hitsUpdatedArray, nbHits };
    });

  return {
    data: responseArrayOfObjects?.hitsUpdatedArray,
    count: responseArrayOfObjects?.nbHits,
  };
};

export { addItemsToAlgolia, useAlgoliaSearch };
