import * as queryString from "query-string";
const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:8080/v1" : "https://api.minhaprovaminhavida.com.br/v1";

export interface ApiResponse<Payload> {
    ok: boolean
    data: Payload
};

export interface User {
    id: number
    name: string
    email: string
    avatar: string
}

export interface AuthPayload {
    jwt: string
    user: User
}

export interface UserInfoPayload {
    user: User
}

export interface Course {
    id: number
    name: string
    code: string
}

export interface BasicUniversity {
    id: number
    name: string
    acronym: string
}

export interface PublicUser {
    id: number
    name: string
    email: string
    avatar: string
}

export interface File {
    id: number
    name: string
    file: string
    createdAt: Date
    type: "exam" | "test"
    course: Course
    university: BasicUniversity
    user: PublicUser
}

export interface NewFile {
    name: string
    files: Blob[]
    type: "exam" | "test"
    universityId: string
    courseId: string
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

export const getFiles = (): Promise<ApiResponse<File[]>> => {
    return fetch(API_ENDPOINT + "/files", {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Authorization": `bearer ${getToken()}`
        }
    }).then(res => res.json());
}

export const getUniversities = (): Promise<ApiResponse<BasicUniversity[]>> => {
    return fetch(API_ENDPOINT + "/universities", {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Authorization": `bearer ${getToken()}`
        }
    }).then(res => res.json());
}

export const getCourses = (params = {}): Promise<ApiResponse<Course[]>> => {
    return fetch(API_ENDPOINT + "/courses?" + queryString.stringify(params), {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Authorization": `bearer ${getToken()}`
        }
    }).then(res => res.json());
}


export const addFile = (newFile: NewFile): Promise<ApiResponse<File>> => {
    const { files, ...json } = newFile
    
    const formData = new FormData();
    
    formData.append("json", JSON.stringify(json));
    files.forEach(file => {
        formData.append("files[]", file);
    });

    return fetch(API_ENDPOINT + "/files", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Authorization": `bearer ${getToken()}`
        },
        body: formData
    }).then(res => res.json());
}
