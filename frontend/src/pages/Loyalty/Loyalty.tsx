import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { ListNav } from '../../components/List__nav/ListNav'
import { PREFIX } from '../../helpers/API'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import styles from './Loyalty.module.scss'
import { loyalty } from './Loyalty.params'

export function Loyalty() {
	const mainRef = useLoadPage()

	function createUl(ul: string[]) {
		return (
			<ul>
				{ul.map((el, i) => (
					<li key={i}>{el}</li>
				))}
			</ul>
		)
	}

	function createButton(el: string) {
		return (
			<Link to='/loyalty-program/'>
				<Button className={styles['happyBday__button']}>
					<span>{el}</span>
					<img
						src='/img/slider/arrow.png'
						alt=''
						className={styles['happyBday__button_img']}
					/>
				</Button>
			</Link>
		)
	}

	function createTag(obj: (typeof loyalty)[0]) {
		const tag = obj.tag.split(' ')
		const text = obj.text
		return (
			<div className={styles[obj.class]}>
				{text.map((el, i) => (
					<React.Fragment key={i}>
						{tag[i] == 'h2' && <h2>{el}</h2>}
						{tag[i] == 'p' && <p>{el}</p>}
						{tag[i] == 'grey' && <p className={styles['p_font-grey']}>{el}</p>}
						{tag[i] == 'ul' && Array.isArray(el) && createUl(el)}
						{tag[i] == 'link' && !Array.isArray(el) && createButton(el)}
					</React.Fragment>
				))}
			</div>
		)
	}

	return (
		<div className={'main'} ref={mainRef}>
			<div className={'sideBar'}>
				<ListNav params={['Программа лояльности']} />
			</div>
			<div className={styles['loyalty']}>
				<div className={styles['personalSale']}>
					<h1>Программа лояльности BRANDSHOP</h1>
					<picture className={'wrap_tr'}>
						<img
							src={PREFIX + '/img/loyalty/brandshop-card.jpg'}
							alt=''
							className={'img_tr'}
						/>
					</picture>
					{createTag(loyalty[0])}
				</div>
				{createTag(loyalty[1])}
			</div>
		</div>
	)
}
