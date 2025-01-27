import PropTypes from "prop-types";

import { TiDeleteOutline } from "react-icons/ti";

/**
 * @component
 * 
 * @param {boolean} index - Index da coluna atual.
 * @param {function} setDelColOpen - Função para abrir a coluna.
 * @param {function} setColumnIndexAtual - Função para setar a coluna onde o botão foi clicado.
 * 
 * @return {JSX.Element} Retorna um botão que abre o modal "Remove Column".
 */

function ButtonRemoveColumn({ index, setDelColOpen, setColumnIndexAtual }) {

    /**
     * Função que é chamada quando o botão é clicado. 
     * Ela configura o índice da coluna a ser excluída e abre o modal.
     * Salva o index para ser usado no modal.
     * 
     * @param {number} index - Índice da coluna a ser excluída.
     * 
     * @returns {void} Não retorna nada, apenas altera o estado para abrir o modal.
     */
    const abrirModalDelCol = () => {
        setColumnIndexAtual(index);
        setDelColOpen(true);
    };

    return (
        <button className="btn-remove" onClick={abrirModalDelCol}><TiDeleteOutline size={18} /></button>
    )

}

ButtonRemoveColumn.propTypes = {
    index: PropTypes.number.isRequired,
    setDelColOpen: PropTypes.func.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired,
}

export default ButtonRemoveColumn;