import { NavLink } from 'react-router-dom'
import styles from './NavList.module.css'
import { useNavLinks } from '../hooks/useNavLinks'

interface NavListProps {
  onLinkClick?: () => void
}

export default function NavList({ onLinkClick }: NavListProps) {
  const links = useNavLinks()
  return (
    <ul className={styles.list}>
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={onLinkClick}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
