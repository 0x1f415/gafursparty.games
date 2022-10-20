import { HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './Pumpkin.module.scss';
import Image from 'next/image';

export default function Pumpkin({
	className,
	children,
	...otherProps
}: HTMLProps<HTMLDivElement>) {
	return (
		<div className={classNames(className, styles.Pumpkin)} {...otherProps}>
			<img src="/pumpkin.png" className={styles.Image} />
			{children}
		</div>
	);
}
