import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { BtnCadastrar } from "../../components/BtnCadastrar";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { PesquisaCrianca } from "../../components/PesquisaCrianca";
import styles from './styles.module.scss'

function handleSignUp(event: FormEvent){
    event.preventDefault();
}

export default function Crianca(){
    const [loading, setLoading] = useState(null);
    const [name, setName] = useState(null);
    const [cpf, setCPF] = useState(null);

    return(
        <>
            <Head>
                <title>Criança Pesquisa</title>
            </Head>
            <Header/>
            <PesquisaCrianca rota="" btnCadastrar={true} rotaCadastrar="/criancacadastro"/>

        </>
    )
}