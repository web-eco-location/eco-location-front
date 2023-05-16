import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type":"application/json",
    });  
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if(request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        ).catch((error) => {
            console.log(error.status);
            return Promise.reject(error);
        }
    );
}

// export function signin(userDTO) {
//     return call("/auth/signin", "POST", userDTO)
//     .then((response) => {
//         if(response.token) {
//             localStorage.setItem("ACCESS_TOKEN", response.token);
//             window.location.href="/";
//         }
//     });
// }