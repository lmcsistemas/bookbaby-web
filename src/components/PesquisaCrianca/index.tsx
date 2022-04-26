import Router from 'next/router';
import { parseCookies } from 'nookies';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';
import { BtnCadastrar } from '../BtnCadastrar';
import { Button } from '../Button';
import { Input } from '../Input';
import styles from './styles.module.scss';

type PropsPesquisaCrianca = {
    rota:string,
    btnCadastrar:boolean,
    rotaCadastrar:string
}


export function PesquisaCrianca({rota, btnCadastrar=false, rotaCadastrar=''}: PropsPesquisaCrianca){
    const [cpf, setCpf] = useState('');
    const [nome, setNome]  = useState('');
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState([]);
    const {criancaCadastrar, setCriancaCadastrar} = useContext(AuthContext);

    let cookies = parseCookies(undefined);
    let nivelCookie = cookies['@nextauth.nivel'];

    function handleSearchChild(event: FormEvent){
        event.preventDefault();   
        searchChild();         
    }

    function searchChild(){
        let url = "";
        console.log(cpf)
        if(cpf != ''){
            url = `criancaUser?cpf=${cpf}`
        }else if(nome != ''){
            url = `criancaUser?name=${nome}`
        }else{
            url = `criancaUser`;
        }
        console.log(url);
        api.get(`${url}`)
        .then(response =>{
            console.log('response', response.data);
            setDados(response.data);
            
        })
        .catch(err =>{
            console.log('error api', err)
        })  
    }

    function escolher(x){
        console.log("x", x)
        setCriancaCadastrar(x)

        if(rota != undefined){
            Router.push('/criancacadastro');
        }
    }

    useEffect(() => {
        console.log('dentro do useedffec');
        setCriancaCadastrar('');

        if(nivelCookie == 'pais'){
            console.log('nivel pais')
            searchChild();
        }
    }, [])

    return(

        <div className={styles.container}>
            {(criancaCadastrar == '' && nivelCookie == 'escola') ? 
            <>

                {btnCadastrar ?  <BtnCadastrar name="Cadastrar" link={rotaCadastrar}/> :""}

                <div className={styles.titulo} >
                    <h3>Pesquisar Criança</h3>
                </div>                
                <form  onSubmit={handleSearchChild}>
                    <label className={styles.label}>CPF:</label>
                    <Input type="text"  onChange={(e) => {setCpf(e.target.value)}} />

                    <label className={styles.label}>Nome:</label>
                    <Input type="text" onChange={(e) => {setNome(e.target.value)}} />
                    
                    <Button type='submit' loading={loading}>Pesquisar</Button>
                </form>
            </>
            : ""}            

            {criancaCadastrar == '' && dados.length > 0  ?
                <table>
                    <tr>
                        <th>Nome Criança</th>
                        <th>Agenda</th>                
                    </tr>                        
                    {
                        dados.map((x, i)=>(                             
                            <tr key={i}>
                                <td>{x.crianca.name}</td>
                                <td>
                                    <button onClick={() => escolher(x.crianca.id)}>Selecionar</button>                                    
                                </td>                
                            </tr>                             
                        ))
                    }                
                </table>
                :"" }
        </div>

    )
}