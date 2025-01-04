import PropTypes from 'prop-types';
import listaApagarImg from '../../assets/icon-header/lista-apagar.png';
import { theme } from '../../config/theme';

function ButtonApagarLinhaVermelha({ index, tableData, setTableData }) {

    const apagaLinhaVermelha = () => {
        const updatedData = tableData.map((row) => {
            let updatedRow = [...row];
            let cellData = updatedRow[index];

            if (cellData && cellData.style.backgroundColor === "red") {
                updatedRow[index] = { value: "", style: { backgroundColor: theme.primaryColor }}
            }

            return updatedRow;
        })

        setTableData(updatedData);
    };

    return (
        <button className="btn-apaga-red" onClick={apagaLinhaVermelha}>
            <img src={listaApagarImg} alt="Apagar" />
        </button>
    )
}

ButtonApagarLinhaVermelha.propTypes = {
    index: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
};

export default ButtonApagarLinhaVermelha;