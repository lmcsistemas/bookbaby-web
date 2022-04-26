import { useEffect, useContext, useState } from 'react';
import { onlyAuth } from '../../utils/onlyAuth';
import Head from 'next/head'
import { AuthContext } from '../../contexts/AuthContext'
import {Header} from '../../components/Header'
import Router from 'next/router'

import { api } from '../../services/apiClient';

import  styles  from './styles.module.scss';
import Link from 'next/link';

export default function Dashboard(){
    const {user, criancaSelecionada } = useContext(AuthContext);
    const [dadosAgenda, setDadosAgenda] = useState([])  

    function exibirAgenda(id){
        Router.push({
            pathname: '/agendacadastro',
            query: { id: id },
        })
    }

    function buscarAgendas(){
        api.get('/agenda-lista')
        .then(response =>{
            console.log('response', response.data);
            setDadosAgenda(response.data);
        })
        .catch(err =>{
            console.log('error api', err)
        })        
    }

    useEffect(() => {
        console.log("no dashboard ",criancaSelecionada);
        buscarAgendas();
    },[])

    return(
        <>
        <Head>
            <title>Painel - BookBaby</title>
        </Head>
        <div>
            <Header/>
            <div className={styles.TableAgenda}>
            <table>
                <tr>
                    <th>Data</th>
                    <th>Crianca</th>                
                    <th>Ação</th> 
                </tr>
                {
                    dadosAgenda.map((x)=>(
                            //console.log(x.crianca.agendas);
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

            </div>
        </div>
        </>
        
    )
}

export const getServerSideProps = onlyAuth(async (ctx) =>{
    return{
      props:{}
    }
  })
  