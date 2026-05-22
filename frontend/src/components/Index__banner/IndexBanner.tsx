import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import styles from './IndexBanner.module.scss'
export function IndexBanner() {
	return (
		<Link to='' className={styles['banner']}>
			<picture className={styles['banner__pic'] + ' wrap_tr'}>
				<img
					src={PREFIX + '/img/index-banner/puma.jpg'}
					className={styles['banner__img'] + ' img_tr'}
				/>
			</picture>
		</Link>
	)
}
