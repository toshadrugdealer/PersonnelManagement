import { FC } from 'react'
import styles from './Header.module.scss'

interface HeaderProps {
	employees: number
	handleModal: () => void
}
const Header: FC<HeaderProps> = ({ employees, handleModal }) => {
	return (
		<header>
			{employees ? (
				<button className={styles.filterBtn} onClick={handleModal}></button>
			) : null}
			<h1>Personnel Management</h1>
		</header>
	)
}
export default Header
