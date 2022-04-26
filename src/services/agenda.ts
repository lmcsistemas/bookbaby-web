import { api } from "./apiClient";


export function AgendaUpdate(data){
    return new Promise((resolve, reject) => {
        api.put('/agenda', data)
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


export function AgendaCreate(data){
    return new Promise((resolve, reject) => {
        api.post('/agenda', data)
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






