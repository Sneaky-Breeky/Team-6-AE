const API_BASE_URL = "http://localhost:5146/api/auth";

/**
 * Login user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Response>}
 */
export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        // Handle errors and parse JSON safely
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        return errorData;
    }

    return response.json();
}