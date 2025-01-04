import PropTypes from "prop-types";

function ButtonRemoveColumn({ index, setDelColOpen, setColumnIndexAtual }) {

    const abrirModalDelCol = (columnIndex) => {
        // Setar column index para ser usado no modal
        setColumnIndexAtual(columnIndex);

        setDelColOpen(true);
    };

    return(
        <span className="btn-remove" onClick={() => abrirModalDelCol(index)}>X</span>
    )

}

ButtonRemoveColumn.propTypes = {
    index: PropTypes.number.isRequired,
    setDelColOpen: PropTypes.func.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired,
    // tableData: PropTypes.array.isRequired,
    // setTableData: PropTypes.func.isRequired,
    // tableHeader: PropTypes.array.isRequired,
    // setTableHeader: PropTypes.func.isRequired,
}

export default ButtonRemoveColumn;