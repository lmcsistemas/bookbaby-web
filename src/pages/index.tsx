import { useContext, FormEvent, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/logo_lmc.jpg';
import { toast } from 'react-toastify';

//components
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Link from 'next/link';

//context
import { AuthContext } from '../contexts/AuthContext'
import { onlyGuest } from '../utils/onlyGuest';




export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {signIn} = useContext(AuthContext);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha os dados");
      return
    }
    setLoading(true);
    let data = {
      email,
      password
    }
    await signIn(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>BookBaby - LMC Sistemas - Faça seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter} >        
          <Image src={logoImg} width={250} height={180} alt="Logo LMC" />        

          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <Input placeholder='Digite seu E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>

              <Input placeholder='Digite sua Senha' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>

              <Button type='submit' loading={loading}>
                Acessar
              </Button>
            </form>

          <Link href="/usuariocadastro">
            <a className={styles.text}>Criar Conta</a>
          </Link>
          </div>

      </div>
    </>
  )
}


export const getServerSideProps = onlyGuest(async (ctx) =>{
  return{
    props:{}
  }
})
