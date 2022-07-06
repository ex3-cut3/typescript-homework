import {TIMEOUT_SECONDS} from "./config";
import {FilmData} from "./interfaces";

const timeout = function (s: number) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const ajax = async function (url: string): Promise<FilmData> {
    try {
        const res: unknown = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
        const data = await res.json();

        if (res.results && res.page) throw new Error(`${data.message}(${data.status})`);
        return data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};