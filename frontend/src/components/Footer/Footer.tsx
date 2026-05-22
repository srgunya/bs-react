import { FooterBottom } from '../Footer__bottom/FooterBottom'
import { FooterTop } from '../Footer__top/FooterTop'
import styles from './Footer.module.scss'

export function Footer() {
	return (
		<footer className={styles['footer']}>
			<FooterTop />
			<FooterBottom />
		</footer>
	)
}
