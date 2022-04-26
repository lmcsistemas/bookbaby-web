import { api } from "./apiClient";

export function CriancaUpdate(data){
    return new Promise((resolve, reject) => {
        api.put('/crianca', data)
        .then(response => {
            console.log(response)
            resolve(true);
        })        
        .catch(error => {
            console.log(error);
            reject(false);
        });    
    });
}

export function CriancaCreate(data){
    return new Promise((resolve, reject) => {
        api.post('/crianca', data)
        .then(response => {
            console.log(response)
            resolve(true);
        })        
        .catch(error => {
            console.log(error);
            reject(false);
        });    
    });
}
