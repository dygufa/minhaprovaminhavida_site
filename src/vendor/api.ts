const API_ENDPOINT = "";

export const loginGoogle = (token: string) => {
    return fetch(API_ENDPOINT + "/users/login/google", {
        method: "POST"
    });
}
