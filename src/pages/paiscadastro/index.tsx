import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import styles from './styles.module.scss';

import { api } from '../../services/apiClient';
import { toast } from "react-toastify";
import  Router  from "next/router";

export default function CriancaCadastro(){
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    async function handleSignUp(event: FormEvent){
        event.preventDefault();
        alert('handleSignUp')

        setLoading(true);
        try{
            // await api.post('/crianca', { name, cpf, dtnascimento})
            // .then(response =>{
            //     setLoading(true);
            //     const {id} = response.data;
            //     console.log(response.data);
    
            //     toast.success('Criança cadastrada com sucesso.');
            //     //redirecionar para pagina

            //     setCPF('');
            //     setName('');
            //     setDtnascimento('')
            //     setId(id)

            //     setLoading(false);

            // })
            // .catch((err) =>{
            //     console.log(err)
            //     console.log(err.error)
            //     toast.error('Falha ao gravar criança ', err.error);     
            //     setLoading(false);
            // })
        }catch(error){
            console.log(error.message);
            console.error(error);
            toast.error('Falha ao gravar criança ', error) 
            setLoading(false);
        }
    }

    return(
        <>
            <Head>
                <title>Pais - Cadastro</title>
            </Head>
            <div>
                <Header/>
                <div className={styles.container}>

                    <div className={styles.titulo}>
                        <h3>Pais - Criança</h3>
                    </div>            

                    <div className={styles.login}>
                        <form onSubmit={handleSignUp}>
                            <Input className={styles.namebtn} placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}/>
                            <Input className={styles.namebtn} placeholder='E-mail' value={email} onChange={(e) => setName(e.target.value)}/>
                            <Input className={styles.namebtn} placeholder='cpf' value={cpf} onChange={(e) => setName(e.target.value)}/>

                            <Input type="hidden" value={id} />

                            <select className={styles.select} >
                                <option value="">Selecione</option>
                                <option value="escola">Escola</option>
                                <option value="pais">Pais</option>

                            </select>
                        
                            <div className={styles.areabtn}>
                                <Button className={styles.button} type='submit' loading={loading}>
                                    Cadastrar
                                </Button>
                            </div>
                        </form>
                    </div>          
                </div>
            </div>
        </>
    )
}