const API_URL = "http://localhost:9090/api/bikes"; // Backend URL

export const getBikes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addBike = async (bike) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bike),
  });
  return response.json();
};

export const updateBike = async (id, bike) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bike),
  });
  return response.json();
};

export const deleteBike = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
