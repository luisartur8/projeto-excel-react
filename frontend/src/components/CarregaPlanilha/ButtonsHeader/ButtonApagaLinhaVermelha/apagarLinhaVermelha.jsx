import PropTypes from 'prop-types';

import { theme } from '@theme/theme.js'

import { TbColumnRemove } from "react-icons/tb";

/**
 * @component
 * 
 * Componente ButtonApagarLinhaVermelha.
 *
 * Botão responsável por apagar as células com fundo vermelho da tabela.
 * Ao clicar no botão, o componente verifica todas as células na linha com base no índice `index`.
 * Se a célula tiver a cor de fundo vermelha, ela é limpa e volta para o fundo com a cor primária.
 * 
 * @param {number} index - Índice da coluna atual.
 * @param {Array} tableData - Dados da tabela (linhas e células).
 * @param {function} setTableData - Função para atualizar os dados da tabela.
 * 
 * @return {JSX.Element} Retorna um botão para apagar as linhas em vermelho de uma coluna.
 */
function ButtonApagarLinhaVermelha({ index, tableData, setTableData }) {

    /**
     * Função que apaga as células com fundo vermelho e redefine o estilo de fundo.
     * 
     * @return {void} Não retorna nada, retorna a tabela com o backGroundColor atualizado.
     */
    const apagaLinhaVermelha = () => {
        const updatedData = tableData.map((row) => {
            let updatedRow = [...row];
            let cellData = updatedRow[index];

            // Verifica se a celula tem fundo vermelho e apaga
            if (cellData && cellData.style.backgroundColor === theme.secondaryColor) {
                updatedRow[index] = { value: "", style: { backgroundColor: theme.primaryColor } }
            }

            return updatedRow;
        })

        setTableData(updatedData);
    };

    return (
        <button className="btn-apaga-red" onClick={apagaLinhaVermelha}>
            <TbColumnRemove size={16}/>
        </button>
    )
}

ButtonApagarLinhaVermelha.propTypes = {
    index: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
};

export default ButtonApagarLinhaVermelha;