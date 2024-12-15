import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './FooterTop.module.scss'
import { ulAdress, ulHelp, ulInfo, ulSocial } from './FooterTop.params'
import { FooterProps } from './FooterTop.props'
export function FooterTop() {
	function createUl(ul: FooterProps) {
		return ul.map((el, i) => {
			if (el.h1) {
				return (
					<li className={styles['footerTop__li']} key={i}>
						<h1 className={styles['footerTop__h1']}>{el.h1}</h1>
					</li>
				)
			} else if (el.img) {
				return (
					<li
						className={cn(styles['footerTop__li'], {
							[styles['footerTop__li_bot']]: el.text === 'Telegram Бот',
						})}
						key={i}
					>
						<Link to={el.to} className={styles['footerTop__link']}>
							<img src={el.img} alt='' className={styles['footerTop__img']} />
							{el.text}
						</Link>
					</li>
				)
			} else if (el.to != undefined && !el.img && !el.h1) {
				return (
					<li className={styles['footerTop__li']} key={i}>
						<Link
							to={el.to}
							className={cn(styles['footerTop__link_border'], styles['footerTop__link'])}
							key={i}
						>
							{el.text}
						</Link>
					</li>
				)
			}
		})
	}
	return (
		<div className={styles['footerTop']}>
			<ul className={styles['footerTop__ul']}>{createUl(ulSocial)}</ul>
			<ul className={styles['footerTop__ul']}>{createUl(ulAdress)}</ul>
			<ul className={styles['footerTop__ul']}>{createUl(ulHelp)}</ul>
			<ul className={styles['footerTop__ul']}>{createUl(ulInfo)}</ul>
		</div>
	)
}
