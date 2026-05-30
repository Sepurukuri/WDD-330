const baseURL = import.meta.env.VITE_SERVER_URL;

console.log("baseURL =", baseURL);

async function convertToJson(res) {
  const contentType = res.headers.get("content-type");

  console.log("Response status:", res.status);
  console.log("Content-Type:", contentType);

  // If the server returned HTML instead of JSON, log it
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON but received:", text);

    throw {
      name: "servicesError",
      message: "Server returned HTML instead of JSON.",
    };
  }

  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: "servicesError",
      message: jsonResponse,
    };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const url = `${baseURL}products/search/${category}`;

    console.log("Fetching URL:", url);

    const response = await fetch(url);
    const data = await convertToJson(response);

    console.log("Products response:", data);

    return data.Result;
  }

  async findProductById(id) {
    const url = `${baseURL}product/${id}`;

    console.log("Fetching URL:", url);

    const response = await fetch(url);
    const data = await convertToJson(response);

    console.log("Product response:", data);

    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const url = `${baseURL}checkout/`;

    console.log("Checkout URL:", url);

    return await fetch(url, options).then(convertToJson);
  }
}