import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import {FiLogOut} from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext'
import { parseCookies } from 'nookies';

export function Header(){

    const { user, signOut } = useContext(AuthContext);

    let cookies = parseCookies(undefined);
    let nivelCookie = cookies['@nextauth.nivel'];

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/dashboard'}>
                    <img src="logo_lmc.jpg" width={160} height={100} />
                </Link>
                {/* <h3>Olá {user?.name} seja bem vindo</h3> */}
                <nav className={styles.menuNav}>
                    {nivelCookie == 'escola' ?  <Link href={'/pais'}><a>Pais</a></Link> :""}
                    <Link href={'/agenda'}>
                        <a>Agenda</a>
                    </Link>
                    <Link href={'/crianca'}>
                        <a>Criança</a>
                    </Link>
                    <Link href={'/'}>
                        <a>Mensagem</a>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut color="#000" size={20}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}