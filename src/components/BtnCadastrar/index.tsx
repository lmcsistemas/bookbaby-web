import Link from "next/link";
import styles from './styles.module.scss';

type Props = {
    name:string,
    link:string
}

export function BtnCadastrar({name, link}:Props){
    return(
        <div className={styles.arealink}>
            <Link href={link}>
            <a>{name}</a>
            </Link>
        </div>
    )
}