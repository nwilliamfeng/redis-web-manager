export class ApiHelper {

    static async get(url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    static async post(url, data, headers = { 'Content-Type': 'application/json' }) {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }

    static async postByForm(url, data) {    
        let  kv=[];
        for (var key in data) {
            kv.push(`${key}=${data[key]}`);
        }
        const response = await fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
                body: kv.join('&'),
            });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }

    // static async postByForm(url, data) {    
    //     let formData=new FormData();
    //     for (var key in data) {
    //         formData.append(key,data[key]);
    //     }
    
    //     const response = await fetch(url,
    //         {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    //             body: formData,
    //         });
    //     if (!response.ok) {
    //         throw new Error(response.statusText);
    //     }
    //     return await response.json();


    // }



}