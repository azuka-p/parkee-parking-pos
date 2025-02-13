const cfg = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
};

const testCfg = {
  API_BASE_URL: "https://__SERVER_URL__",
};

export default import.meta.env.MODE === "test" ? testCfg : cfg;
