import { searchMedia }
from "./apiService.mjs";

export async function search(query) {

    try {

        return await searchMedia(query);

    } catch(error) {

        console.error(error);

        return [];
    }
}