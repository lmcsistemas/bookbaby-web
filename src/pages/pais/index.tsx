import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { BtnCadastrar } from "../../components/BtnCadastrar";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import styles from './styles.module.scss'

function handleSignUp(event: FormEvent){
    event.preventDefault();
}

function adicionar(){
    alert('added...');
}

export default function Pais(){
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');

    return(
        <>
            <Head>
                <title>Pais Pesquisar</title>
            </Head>
            <Header/>
            <div className={styles.container}>
                
                <BtnCadastrar  name="Cadastrar" link="/paiscadastro"/>

                <div className={styles.titulo}>
                    <h3>Pais - Pesquisar</h3>
                </div>  
                <div className={styles.login}>
                    <form onSubmit={handleSignUp}>
                        <Input className={styles.namebtn} placeholder='Digite o nome da criança' value={name} onChange={(e) => setName(e.target.value) }/>
                        <Input className={styles.cpfbtn} placeholder='Digite o CPF da criança' value={cpf} onChange={(e) => setCPF(e.target.value) }/>
                        <div className={styles.areabtn}>
                            <Button type='submit' loading={loading}>
                                Pesquisar
                            </Button>
                        </div>
                    </form>
                </div> 

                <div className={styles.TableAgenda}>
                    <table>
                        <tr>
                            <th>Nome Pai/Responsável</th>
                            <th>CPF</th>                
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>                            
                            <tr>
                                <td>
                                <Link href={`/agenda/id=`}>
                                    Nome do Pai
                                </Link>
                                </td>                
                                <td>12345678909</td>                            
                                <td>testeemail@teste.com</td>
                                <td>
                                    <button onClick={adicionar}>Adicionar Crianca</button>
                                </td>
                            </tr>
                            
                                        
                    </table>
                </div>    
                
            </div>
        </>
    )
}