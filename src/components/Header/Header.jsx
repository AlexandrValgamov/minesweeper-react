import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
  return(
    <header className="header">
      <div className="header__logo" />
      <div className="header__nav">
        <Link to="/options" className="header__link">Настройки</Link>
        <Link to="/leaders" className="header__link">Таблица лидеров</Link>
      </div>
    </header>
  )
}