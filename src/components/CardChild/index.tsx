import Image from 'next/image';
import styles from './styles.module.scss';
import fotocrianca from '../../../public/baby.jpeg'

type Props = {
    fnc:any,
    name: string,
    cpf: string,
    dataNasc:string,
    crianca:string
}

export function CardChild({fnc,name, cpf, dataNasc, crianca}:Props){
    return(
        <>
            <div className={styles.card} onClick={() => fnc(crianca)}>
                <div className={styles.nomeCrianca}>{name}</div>
                <div>
                    <Image src={fotocrianca} width={130} height={80}  alt="Logo LMC" />
                </div>
                <div className={styles.dataNasc}>{cpf}</div>
                <div className={styles.dataNasc}>{dataNasc}</div>
            </div>
        </>
    )
}