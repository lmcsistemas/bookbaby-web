import Head from "next/head";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import styles from './styles.module.scss';

import { api } from '../../services/apiClient';
import { toast } from "react-toastify";
import  Router  from "next/router";
import { PesquisaCrianca } from "../../components/PesquisaCrianca";
import { AuthContext } from "../../contexts/AuthContext";
import { CriancaCreate, CriancaUpdate } from "../../services/crianca";



export default function CriancaCadastro(){
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [dtnascimento, setDtnascimento] = useState('');
    const [id, setId] = useState('');

    const {criancaCadastrar} =  useContext(AuthContext);

    async function gravarCrianca(event: FormEvent){
        event.preventDefault();
        setLoading(true);
        let retorno; 
        let data = { name, cpf, dtnascimento};  
        if(id != ''){
            data['id']= id;
            retorno = CriancaUpdate(data);
        }else{
            retorno = CriancaCreate(data);
        }

        if(retorno){
            toast.success('Criança cadastrada com sucesso.');
            setName('');
            setCPF('');
            setDtnascimento('');
        }else{
            toast.error('Falha ao gravar criança ') 
        }
        setLoading(false);
        
    }

    async function pegaDadosCrianca(criancaId){
        //http://localhost:3333/crianca?criancaId=14894d89-8514-41ba-99cf-1835f5d7371f

        await api.get(`/crianca?criancaId=${criancaId}`)
        .then(response => {
            setName(response.data.name)
            setCPF(response.data.cpf)
            setDtnascimento(response.data.dtnascimento)
            setId(response.data.id);
        })
        .catch(err =>{
            console.log('error ', err)
        })
    }

    useEffect(()=>{
        console.log('seleciodad', criancaCadastrar);
        pegaDadosCrianca(criancaCadastrar);
    }, [])

    return(
        <>
            <Head>
                <title>Criança - Cadastro</title>
            </Head>
            <div>
                <Header/>
                <div className={styles.container}>

                    <div className={styles.titulo}>
                        <h3>Cadastro - Criança</h3>
                    </div>            

                    <div className={styles.login}>
                        <form onSubmit={gravarCrianca}>
                            <Input className={styles.namebtn} placeholder='Nome' value={name} onChange={(e) => setName(e.target.value) }/>
                            <Input className={styles.cpfbtn} placeholder='CPF' value={cpf} onChange={(e) => setCPF(e.target.value) }/>
                            <Input className={styles.dtnascbtn} placeholder='Data de Nascimento' value={dtnascimento} onChange={(e) => setDtnascimento(e.target.value) }/>
                            <Input type="hidden" placeholder='Digite o nome da criança' value={id} />
                        
                            <div className={styles.areabtn}>
                                <Button className={styles.button} type='submit' loading={loading}>
                                    Gravar
                                </Button>
                            </div>
                        </form>
                    </div>          
                </div>
            </div>
        </>
    )
}