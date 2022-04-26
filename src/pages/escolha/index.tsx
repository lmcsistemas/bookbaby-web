import { useContext, useEffect, useState } from 'react';
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';

import { AuthContext } from '../../contexts/AuthContext'
import Image from 'next/image';
import { CardChild } from '../../components/CardChild'

export  default function Escolha(){
    const {user, criancas, buscarCriancas, criancaSelecionada, selecionarCrianca} = useContext(AuthContext);

    useEffect(() => {
        console.log(user.nivel)
        buscarCriancas();
        
    },[])

    return(
        <>
            <Head>
                <title>Escolha</title>                
            </Head>
            <div >
            <Header />
                <main className={styles.container}>                    
                    {
                        criancas.map((dados, key) =>(                                
                                <CardChild key={key} fnc={(x) => selecionarCrianca(x)} name={dados.crianca.name} cpf={dados.crianca.cpf} crianca={dados.crianca.id} dataNasc={dados.crianca.dtnascimento}/>
                            )
                        )
                    }
                </main>                
            </div>
        </>
    )
}