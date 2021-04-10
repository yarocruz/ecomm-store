import { FaShoppingCart } from 'react-icons/fa'

import styles from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <p className={styles.navTitle}>Flair Button Shop</p>
            <p className={styles.navCart}>
                <button>
                    <FaShoppingCart /> $0.00
                </button>
            </p>
        </nav>
    )
}

export default Nav;