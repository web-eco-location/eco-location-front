import {API_BASE_URL} from "../app-config";

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    let options = {
        headers: headers,
        url:API_BASE_URL + api,
        method: method,
    };
    if(request){
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) => 
            response.json().then((json) => {
                if(!response.ok){
                    return Promise.reject(json);
                }
                return json;
            })
    )
    .catch((error) => {
        console.log(error.status);
        return Promise.reject(error);
    });
}

// 해당 지역의 발전소 리스트 가져오기
// 광역지자체 + 시군구 단위로 검색
export function Generator_DetailArea(Area){
    console.log(Area);
    return call("/generators?detailArea=" + Area, "GET", null)
        .then((response) => {
            if(response) {
                return response;
            } else {
                return Promise.reject(new Error("Invalid response"));
            }
        })
        .catch((error) => {
            console.log("infoerror");
            console.log(error);
            console.log("Oops!");
            return Promise.reject(error);
        });
}

// 해당 발전원의 발전소 리스트 가져오기
// 발전원 이름으로 검색 (ex : 태양에너지(많아서 오래걸림), 수력에너지)
export function Generator_powerSource(powerSource){
    console.log(powerSource);
    return call("/generators?powerSource=" + powerSource, "GET", null)
        .then((response) => {
            if(response) {
                return response;
            } else {
                return Promise.reject(new Error("Invalid response"));
            }
        })
        .catch((error) => {
            console.log("infoerror");
            console.log(error);
            console.log("Oops!");
            return Promise.reject(error);
        });
}


export function tomain(){
    window.location.href="/";
}

