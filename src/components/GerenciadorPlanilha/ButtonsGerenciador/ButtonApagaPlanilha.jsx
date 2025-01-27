import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente ButtonApagaPlanilha.
 *
 * Botão que, quando clicado, apaga os dados da planilha e reseta os estados associados a ela.
 * Este componente é utilizado para limpar as informações de uma planilha carregada.
 *
 * @param {function} setTableHeader - Função para atualizar o cabeçalho da tabela.
 * @param {function} setTableData - Função para atualizar os dados da tabela.
 * @param {function} setIsLoaded - Função para definir se os dados estão carregados.
 * @param {function} setTipoPlanilha - Função para resetar o tipo da planilha para "cliente".
 * @param {function} setSelectedFile - Função para resetar o arquivo selecionado.
 *
 * @returns {JSX.Element} Retorna o botão de apagar planilha.
 */
function ButtonApagaPlanilha({ setTableHeader, setTableData, setIsLoaded, setTipoPlanilha, setSelectedFile }) {

    /**
     * Função que reseta os estados relacionados aos dados da planilha e limpa a planilha atual.
     */
    function apagarPlanilha() {
        setTableHeader([]);
        setTableData([]);
        setIsLoaded(false);
        setSelectedFile(null);
        setTipoPlanilha('cliente');
    }

    return (
        <button id="button-apaga-planilha" className="button-padrao" onClick={apagarPlanilha}>Apagar planilha</button>
    )

}

ButtonApagaPlanilha.propTypes = {
    setTableHeader: PropTypes.func.isRequired,
    setTableData: PropTypes.func.isRequired,
    setIsLoaded: PropTypes.func.isRequired,
    setTipoPlanilha: PropTypes.func.isRequired,
    setSelectedFile: PropTypes.func.isRequired
}

export default ButtonApagaPlanilha;