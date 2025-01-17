import { useCallback } from "react";
import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente de botão para inserir uma nova coluna à esquerda ou à direita na tabela.
 * 
 * @param {string} direction - Direção da inserção ('left' ou 'right').
 * @param {number} index - Índice da coluna atual.
 * @param {Array} tableData - Dados da tabela (linhas e células).
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {Array} tableHeader - Cabeçalho da tabela.
 * @param {Function} setTableHeader - Função para atualizar o cabeçalho da tabela.
 * @param {Object} theme - Objeto com o tema da aplicação, usado para estilização.
 * 
 * @return {JSX.Element} Retorna um botão que adiciona uma nova coluna
 */
function ButtonInserirNovaColuna({ direction, index, tableData, setTableData, tableHeader, setTableHeader, theme }) {

    /**
     * Função responsável por adicionar uma nova coluna à tabela.
     * 
     * @param {string} direction - Direção da inserção ('left' ou 'right').
     * @param {number} index - Índice da coluna atual.
     * 
     * @return {void} Não retorna nada, apenas atualiza a tabela com uma nova coluna inserida.
     */
    const btnInserirNovaColuna = useCallback(() => {
        const emptyCell = { value: "", style: { backgroundColor: theme.primaryColor } };

        const updatedData = tableData.map((row) => {
            if (direction === "left") {
                row.splice(index, 0, emptyCell);
            } else if (direction === 'right') {
                row.splice(index + 1, 0, emptyCell);
            }
            return row;
        });
        setTableData(updatedData);

        const updatedHeader = [...tableHeader];
        if (direction === "left") {
            updatedHeader.splice(index, 0, "nome");
        } else if (direction === 'right') {
            updatedHeader.splice(index + 1, 0, "nome");
        }

        setTableHeader(updatedHeader);
    }, [direction, index, tableData, setTableData, tableHeader, setTableHeader, theme.primaryColor]);

    return (
        <span
            className={`btn-insert-${direction}`}
            onClick={() => btnInserirNovaColuna(direction, index)}
        >
            {direction === 'left' ? '<' : '>'}
        </span>
    );
}

ButtonInserirNovaColuna.propTypes = {
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
    index: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

export default ButtonInserirNovaColuna;