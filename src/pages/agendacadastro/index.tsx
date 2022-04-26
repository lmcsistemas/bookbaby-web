import { route } from "next/dist/server/router";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input, Textarea } from "../../components/Input";
import { api } from "../../services/apiClient";
import { AgendaCreate, AgendaUpdate } from "../../services/agenda"; 

import { AuthContext } from "../../contexts/AuthContext";

import styles from './styles.module.scss';
import { parseCookies } from "nookies";
import { PesquisaCrianca } from "../../components/PesquisaCrianca";

export default function Cadastrar(){
    const [almoco, setAlmoco] = useState('');
    const [janta, setJanta] = useState('');
    const [lanche, setLanche] = useState('');
    const [informacoes, setInformacoes] = useState('');
    const [precisa, setPrecisa] = useState('');    
    
    const [loading, setLoading] = useState(false);

    const {user, setCriancaCadastrar, criancaCadastrar} = useContext(AuthContext);

    //const [agendaId, setAgendaId] = useState('');

    const router = useRouter()
    const agendaId = router.query.id;
    console.log(router.query);

    let cookies = parseCookies(undefined);
    let nivelCookie = cookies['@nextauth.nivel'];

    useEffect(() => {
        if(agendaId != '' && agendaId != undefined){
            console.log('passou do id ', agendaId);
    
            api.get(`agenda?id=${agendaId}`)
            .then(response =>{
                console.log('response', response.data[0]);            
                setCriancaCadastrar(response.data[0].criancaId)
    
                setAlmoco(response.data[0].almoco)
                setJanta(response.data[0].janta)
                setLanche(response.data[0].lanche)
                setInformacoes(response.data[0].informacoes)
                setPrecisa(response.data[0].precisa)            
            })
            .catch(err =>{
                console.log('error api', err)
            })
        }
    }, [])    
    async function cadastrar(event:FormEvent){
        event.preventDefault();
        let data = {
            almoco,
            janta,
            lanche,
            informacoes,
            precisa,
            criancaId:criancaCadastrar
        }

        let retorno;

        if(agendaId != undefined){
            data['agendaId'] = agendaId;   
            retorno = await AgendaUpdate(data);
        }else{
            retorno = await AgendaCreate(data);
        }

        if(retorno){
            toast.success('Agenda cadastrada com sucesso');
            setAlmoco('');
            setJanta('');
            setLanche('');
            setInformacoes('');
            setPrecisa('');

            router.push('/agenda');

        }else{
            toast.error('Falha ao gravar agenda');
        }                
    }

    return(
        <>
        <Head>
            <title>Agenda - Cadastro</title>                
        </Head>       
        <Header/>
        <PesquisaCrianca rota="" btnCadastrar={false} rotaCadastrar=""/>
        <div className={styles.container}>                
            {(criancaCadastrar != '') ?
            <>
                <div className={styles.titulo} >
                    <h3>Cadastro - Agenda</h3>
                </div>
                <form onSubmit={cadastrar}>
                    <label className={styles.label}>Almoço:</label>
                    <Textarea value={almoco} placeholder="Informar como foi o almoço da criança, quantidade que comeu e descrever os itens." onChange={(e) => {setAlmoco(e.target.value)}} >
                    </Textarea>

                    <label className={styles.label}>Lanche:</label>
                    <Textarea value={lanche} placeholder="Informar como foi o lanche da criança, quantidade que comeu e descrever os itens." onChange={(e) => {setLanche(e.target.value)}} >
                        
                    </Textarea>

                    <label className={styles.label}>Jantar:</label>
                    <Textarea value={janta} placeholder="Informar como foi o jantar da criança, quantidade que comeu e descrever os itens." onChange={(e) => {setJanta(e.target.value)}} >
                        
                    </Textarea>

                    <label className={styles.label}>Informações:</label>
                    <Textarea value={informacoes} placeholder="Destacar informações sobre o dia da criança." onChange={(e) => {setInformacoes(e.target.value)}} >
                        
                    </Textarea>

                    <label className={styles.label}>Precisa:</label>
                    <Textarea value={precisa} placeholder="Informar ao pais os itens em falta, fraldas, lenços, pomadas e etc... " onChange={(e) => {setPrecisa(e.target.value)}} >
                        
                    </Textarea>

                    <Button type='submit' loading={loading}>Gravar</Button>
                </form> 
            </>
                : "" }            
        </div>
        
        </>
    )
}