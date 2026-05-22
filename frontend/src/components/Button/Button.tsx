import cn from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import styles from './Button.module.scss'

export const Button = forwardRef<
	HTMLButtonElement,
	HTMLAttributes<HTMLButtonElement>
>(function Button({ children, className, ...props }, ref) {
	return (
		<button className={cn(styles['button'], className)} {...props} ref={ref}>
			{children}
		</button>
	)
})
