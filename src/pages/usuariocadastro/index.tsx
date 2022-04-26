import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo_lmc.jpg';

//components
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import Link from 'next/link';

import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function usuariocadastro() {

  const {signUp} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading]= useState(false);


  async function handleSignUp(event: FormEvent){
    event.preventDefault();
    if(name === '' || email === '' || password === ''){
      toast.warning('Informe os dados');
      return 
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    signUp(data)

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
              <h1>Crie sua Conta</h1>
            <form onSubmit={handleSignUp}>
              <Input placeholder='Digite seu Nome' type='text' value={name} onChange={(e) => setName(e.target.value) }/>
              <Input placeholder='Digite seu E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value) }/>
              <Input placeholder='Digite sua Senha' type='password' value={password} onChange={(e) => setPassword(e.target.value) }/>
              <Button type='submit' loading={loading}>
                Cadastrar
              </Button>
            </form>

          <Link href="/">
            <a className={styles.text}>Já possui um conta? Faça o login</a>
          </Link>
          </div>

      </div>
    </>
  )
}
