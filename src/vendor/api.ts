const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:8080/v1" : "https://api.minhaprovaminhavida.com.br/v1";

export interface ApiResponse<Payload> {
    ok: boolean
    data: Payload
};

export interface User {
    id: number
    name: string
    email: string
}

export interface AuthPayload {
    jwt: string
    user: User
}

export interface UserInfoPayload {
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

export const loginFacebook = (token: string): Promise<ApiResponse<AuthPayload>> => {
    return fetch(API_ENDPOINT + "/users/login/facebook", {
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