import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import Router from 'next/router'

import { setCookie } from 'nookies';
import { api } from '../services/apiClient';

import { toast } from 'react-toastify';

type AuthContextData = {
    user:UserProps;
    isAuthenticated: boolean;
    signIn:(credentials: SignInProps) => Promise<void>;
    signOut:() => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
    buscarCriancas: () => Promise<any>;
    criancas:any;
    selecionarCrianca;
    setCriancaCadastrar;
    criancaSelecionada:string
    criancaCadastrar:string;
}

type UserProps = {
    id:string;
    name:string;
    email:string;
    nivel:string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type SignUpProps ={
    name: string,
    email:string,
    password:string
}

type TypeChild = {
    crianca:string
}

export const AuthContext = createContext({} as AuthContextData )

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        destroyCookie(undefined, '@nextauth.nivel')        
        Router.push('/')
    }catch{
        console.log('falha ao deslogar')
    }
}



export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;
    const [criancaSelecionada, setCriancaSelecionada] = useState(null);
    const [criancas, setCriancas] = useState([]);
    const [criancaCadastrar, setCriancaCadastrar]= useState('');

    async function selecionarCrianca(crianca:TypeChild){
        alert('selecionarCrianca '+crianca)
        await setCriancaSelecionada(crianca);

        Router.push('/dashboard');
    
    }
   


    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if(token){
            api.get('/detail')
            .then( response => {
                const {id, name, email, nivel} = response.data;

                console.log('no context detail ', response.data)

                setUser({id, name, email, nivel});
            })
            .catch(() =>{
                signOut();
            })
        }

    }, []);

    async function buscarCriancas(){
        console.log('no buscar');
        try{
           await api.get('/criancaUser')
            .then( response => {
                console.log(response.data);
                setCriancas(response.data);
            })
            .catch(err =>{
                console.log(err);
            })
        }catch{
           console.log('passou no catch');
        }
    }



    async function signIn({email, password}:SignInProps){
        console.log('email', email);
        console.log('password', password);
        try{
            const response = await api.post('/login', { email, password})
            const { id, name, nivel, token } = response.data;
            console.log(response.data);
            console.log('no login', { id, name, nivel, token });

            setCookie(undefined, '@nextauth.nivel', nivel, {
                maxAge:60*60*24*30,
                path: "/" //quais os caminha com acesso ao cookies, / eh todos
            });

            setCookie(undefined, '@nextauth.token', token, {
                maxAge:60*60*24*30,
                path: "/" //quais os caminha com acesso ao cookies, / eh todos
            });

            setUser({
                id,
                name,
                email,
                nivel
            })
            //passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Bem-Vindo ao BookBady');
            //redirecionar para pagina
            Router.push('/dashboard');
            
        }catch(err){
            toast.error("Error ao acessar sistema");
            console.log("erro ao acessar",err)

        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name, email, password
            })
            const {id} = response.data;
            if(id){
                toast.success('Usuário cadastro com sucesso');
                Router.push('/');
            }
        }catch(err){
            console.log('erro ', err);
            toast.error('Erro ao cadastrar usuário');
        }
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, buscarCriancas, criancas, criancaSelecionada, selecionarCrianca, criancaCadastrar, setCriancaCadastrar }}>
            {children}
        </AuthContext.Provider>
    )
}