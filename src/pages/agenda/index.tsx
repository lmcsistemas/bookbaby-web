import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { parseCookies } from "nookies";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BtnCadastrar } from "../../components/BtnCadastrar";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { AuthContext } from '../../contexts/AuthContext'
import { api } from "../../services/apiClient";
import InputMask from 'react-input-mask';
import styles from './styles.module.scss';


    function DateInput(props) {
        return (
            <InputMask
                className={styles.input}
                mask='99/99/9999'
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}>
            </InputMask>
        );
    }


export default function Agenda(){
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [dados, setDados]  = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);
    console.log('user agenda', user)
        

    let cookies = parseCookies(undefined);
    let nivelCookie = cookies['@nextauth.nivel'];


    function formatadatabanco(data){

        let dia = data.substring(0,2);
        let mes = data.substring(3,5);
        let ano = data.substring(6,10);

        return `${ano}-${mes}-${dia}`;
    }

    function handleSignUp(event: FormEvent){
        event.preventDefault();        
        let url = `/agenda-lista?dataInicio=${formatadatabanco(dataInicial)}&dataFim=${formatadatabanco(dataFinal)}`;    
        buscarAgendas(url);
    }
    
    function buscarAgendas(url:string){
        if(url.length == 0){
            url = `/agenda-lista?userId=${user.id}`;
        }
    
        api.get(url)
        .then(response =>{
            console.log('response', response.data);
            setDados(response.data);
        })
        .catch(err =>{
            console.log('error api', err)
        })        
    }

    function exibirAgenda(id){
        Router.push({
            pathname: '/agendacadastro',
            query: { id: id },
        })
    }    

    useEffect(()=>{
        if(nivelCookie != 'escola'){
            buscarAgendas('')
        }  
    },[])

    return(
        <>
        <Head>
            <title>Agenda - Pesquisa</title>                
        </Head>       
        <Header/>
        
        <div className={styles.container}>
            <BtnCadastrar name="Cadastrar" link="/agendacadastro"/>

            <div className={styles.titulo}>
                <h3>Agenda</h3>
            </div>            
            
            {(nivelCookie == 'escola') ? (
                <form onSubmit={handleSignUp}>
                    <div className={styles.periodo}>
                        <DateInput placeholder='Data Inicial' type='text' value={dataInicial} onChange={(e) => setDataInicial(e.target.value)  }/>
                        <DateInput placeholder='Data Final' type='text' value={dataFinal} onChange={(e) => setDataFinal(e.target.value) }/>
                    </div>
                    <Button type='submit' loading={loading}>
                    Pesquisar
                    </Button>
                </form>
            ): '' }
            
            {(dados.length > 0) ? 
                <table>
                    <tr>
                        <th>Data</th>
                        <th>Nome Criança</th>
                        <th>Agenda</th>                
                    </tr>
                    {
                        dados.map((x)=>(
//                            console.log(x.crianca.agendas);
                             x.crianca.agendas.map((data)=>(
                                <tr>
                                    <td>{data.created_at}</td>
                                    <td>{x.crianca.name}</td>
                                    <td>
                                        <button onClick={() => exibirAgenda(data.id)}>Exibir Agenda</button>                                        
                                    </td>                
                                </tr>
                             ))
                        ))
                    }                
                </table>
                : "" }            
        </div>
        
        </>
    )
}