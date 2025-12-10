
const BASE_URL = import.meta.env.MODE === "production" ? import.meta.env.VITE_REACT_PRODUCT_API : "http://localhost:8000/api/v1"

export default BASE_URL