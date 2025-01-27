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
function ButtonRemoveLinhas({ setRemoveRowsOpen, isLoaded }) {

    /**
    * Função chamada quando o botão é clicado.
    * Abre o modal de remoção de linhas, definindo o estado de `removeRowsOpen` como `true`.
    */
    function abrirRemoveRowsModal() {
        if (isLoaded) {
            setRemoveRowsOpen(true);
        }
    }

    return (
        <button id="button-remove-linhas" className="button-padrao" onClick={abrirRemoveRowsModal}>Remover linhas</button>
    )

}

ButtonRemoveLinhas.propTypes = {
    setRemoveRowsOpen: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired
}

export default ButtonRemoveLinhas;