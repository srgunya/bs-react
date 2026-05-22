import React from 'react'
import styles from './AccordionInfo.module.scss'
import { AccordionInfoProps } from './AccordionInfo.props'

export function AccordionInfo({ info, checkInsideTag }: AccordionInfoProps) {
	function createInfo(data: typeof info) {
		const tag = data.tag.split(' ').filter(item => item.trim() !== '')
		return data.text.map((el, i) => {
			const text = checkInsideTag(el, data.link, data.strong)
			return (
				<React.Fragment key={i}>
					{tag[i] == 'h1' && <h1>{text}</h1>}
					{tag[i] == 'p' && <p>{text}</p>}
				</React.Fragment>
			)
		})
	}

	return <div className={styles['info']}>{createInfo(info)}</div>
}
