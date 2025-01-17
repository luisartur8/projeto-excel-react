import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente de botão que abre o modal para remover linhas na tabela.
 * 
 * @param {Function} setRemoveRowsOpen Função para abrir o modal de remoção de linhas.
 * 
 * @returns {JSX.Element} Retorna um que abre o modal de "Remover Linhas".
 */
function ButtonRemoveLinhas({ setRemoveRowsOpen }) {

    /**
    * Função chamada quando o botão é clicado.
    * Abre o modal de remoção de linhas, definindo o estado de `removeRowsOpen` como `true`.
    */
    function abrirRemoveRowsModal() {
        setRemoveRowsOpen(true);
    }

    return (
        <button id="button-remove-linhas" className="button-padrao" onClick={abrirRemoveRowsModal}>Remover linhas</button>
    )

}

ButtonRemoveLinhas.propTypes = {
    setRemoveRowsOpen: PropTypes.func.isRequired
}

export default ButtonRemoveLinhas;