import "./Board.css"
import PropTypes from "prop-types"
// import Cell from "../Cell/Cell"

export default function Board({ option }) {

  return (
    <section>
      
    </section>
  )
}

Board.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  onButtonClick: PropTypes.func,
}
