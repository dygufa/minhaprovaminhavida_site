const API_ENDPOINT = "";

export const loginGoogle = (token) => {
    return fetch(API_ENDPOINT + "/users/login/google", {
        method: "POST"
    });
}
