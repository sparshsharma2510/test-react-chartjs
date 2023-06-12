import styles from "../styles/Navbar.module.css";

export default function Navbar(){
    return(
        <div className={styles['nav-container']}>
            <div className={styles['nav-container__nav']}>
                <img src={"/AppLogo.png"} alt="app logo" width={120}></img>
                <div className={styles['nav-container__nav--content-div']}>
                    <span className="material-symbols-outlined">account_circle</span>
                </div>
            </div>
        </div>
    );
}