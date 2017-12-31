const API_ENDPOINT = "http://localhost:8080/v1";

interface ApiResponse<Payload> {
    ok: boolean
    data: Payload
};

interface User {
    id: number
    name: string
    email: string
}

interface AuthPayload {
    jwt: string
    user: User
}

interface UserInfoPayload {
    user: User
}

const getToken = () => {
    return localStorage.getItem("jwt");
};

export const loginGoogle = (token: string): Promise<ApiResponse<AuthPayload>> => {
    return fetch(API_ENDPOINT + "/users/login/google", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ access_token: token })
    }).then(async res => {
        const json: ApiResponse<AuthPayload> = await res.json();
        if (json.ok) {
            localStorage.setItem("jwt", json.data.jwt);
        }
        return json;
    });
}

export const getUserInfo = (): Promise<ApiResponse<UserInfoPayload>> => {
    return fetch(API_ENDPOINT + "/users/me", {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Authorization": `bearer ${getToken()}`
        }
    }).then(res => res.json());
}