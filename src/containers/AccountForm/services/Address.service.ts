import axios from "axios";

const http = axios.create({
    baseURL: "https://provinces.open-api.vn/api",
    headers: {
        "Content-type": "application/json",
    },
});

export default class AddressService<T> {
    getProvinces() {
        return http.get<T>("/p");
    }

    getDistricts(provinceCode: number) {
        return http.get<T>(`/p/${provinceCode}?depth=2`);
    }

    getWards(districtCode: number) {
        return http.get<T>(`/d/${districtCode}?depth=2`);
    }
}
