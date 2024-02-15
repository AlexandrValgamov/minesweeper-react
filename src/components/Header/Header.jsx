import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo" />
      <nav className="header__nav">
        <ul className="header__links-list">
          <li><Link to="/" className="header__link">Настройки</Link></li>
          <li><Link to="/leaders" className="header__link">Таблица лидеров</Link></li>
        </ul>
      </nav>
    </header>
  )
}