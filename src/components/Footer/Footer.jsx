import "./Footer.css"

export default function Footer() {

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Minesweeper</p>
    </footer>
  )
}