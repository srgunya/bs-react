import cn from 'classnames'
import { MouseEvent, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import styles from './ListItems.module.scss'
import { ListItemsProps } from './ListItems.props'

export function ListItems({ items, more }: ListItemsProps) {
	const moreRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		moreRef.current?.classList.add(styles['itemsList__block_more'])
	}, [more])

	useEffect(() => {
		setTimeout(() => {
			moreRef.current?.classList.remove(styles['itemsList__block_more'])
		}, 100)
	}, [more])

	function createItem(arr: typeof items, name: string) {
		if (arr.length != 0) {
			return (
				<div
					className={cn(styles['itemsList__block'], {
						[styles['itemsList__block_more']]: name == 'more',
					})}
					ref={name == 'more' ? moreRef : undefined}
				>
					{arr.map(el => (
						<Link to='' className={styles['item__link']} key={el.id}>
							<div className={styles['item__cont']}>
								<picture className={styles['item__pic'] + ' wrap_tr'}>
									<img
										src={PREFIX + el.img}
										alt=''
										className={cn(styles['item__img'], {
											['img_tr']: name == 'items',
											[styles['img_tr']]: name == 'more',
										})}
									/>
								</picture>
								<span className={styles['item__brand']}>{el.brand}</span>
								<span className={styles['item__type']}>{el.type}</span>
								<span className={styles['item__model']}>{el.model}</span>
								{el.sale ? sale(el.price, el.sale) : price(el.price)}
								<div className={styles['item__split']}>
									<span className={styles['item__split_span']}>
										по {Math.round(el.price / 4).toLocaleString('ru-RU') + ' ₽'}
										&nbsp;
									</span>
									x4 платежами
								</div>
								<span className={styles['item__signature']}>с партнёрами BRANDSHOP</span>
							</div>
							<div
								className={cn(styles['itemSize'], {
									[styles['itemSize_center']]: el.size.split(',').length < 4,
								})}
							>
								{el.size.split(',').map((el, i) => (
									<div className={styles['itemSize__wrap']} key={i}>
										<button className={styles['itemSize__size']} onClick={clickSize}>
											{el} <img src='/img/item/ok.png' alt='' className={styles['itemSize__ok']} />
										</button>
									</div>
								))}
							</div>
							<div className={styles['itemIcon']}>
								<img src='/img/item/star.png' alt='' className={styles['itemIcon__icon']} />
								<img src='/img/item/lupa.png' alt='' className={styles['itemIcon__icon']} />
							</div>
							<div className={styles['item__shadow']}></div>
						</Link>
					))}
				</div>
			)
		}
	}

	function sale(price: number, sale: number) {
		return (
			<div className={styles['itemSale']}>
				<div className={styles['itemSale__block']}>
					<span className={styles['itemSale__price']}>{price.toLocaleString('ru-RU') + ' ₽'}</span>
					<span className={styles['itemSale__percent']}>{'–' + sale + '%'}</span>
				</div>
				<span className={styles['itemSale__sale']}>
					{Math.round(price - (price * sale) / 100).toLocaleString('ru-RU') + ' ₽'}
				</span>
			</div>
		)
	}
	function price(price: number) {
		return <span className={styles['item__price']}>{price.toLocaleString('ru-RU') + ' ₽'}</span>
	}

	function clickSize(e: MouseEvent) {
		e.preventDefault()
		if (e.target instanceof HTMLButtonElement) {
			e.target.classList.add(styles['itemSize__size_click'])
			e.target.disabled = true
			setTimeout(() => {
				if (e.target instanceof Element && e.target.classList) {
					e.target.classList.remove(styles['itemSize__size_click'])
				}
			}, 1000)
			setTimeout(() => {
				if (e.target instanceof HTMLButtonElement && e.target.classList) {
					e.target.disabled = false
				}
			}, 1500)
		}
	}
	return (
		<div className={styles['itemsList']}>
			{createItem(items, 'items')}
			{createItem(more, 'more')}
		</div>
	)
}
