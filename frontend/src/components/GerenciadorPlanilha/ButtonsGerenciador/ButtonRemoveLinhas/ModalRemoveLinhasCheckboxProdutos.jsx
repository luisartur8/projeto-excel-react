import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente respectivo a planilhas do tipo Produtos.
 * 
 * Componente que renderiza uma lista de checkboxes para o usuário escolher
 * quais colunas da tabela devem ser consideradas ao remover linhas com base em 
 * células vazias ao mesmo tempo.
 * 
 * O componente recebe os valores dos checkboxes e suas funções de atualização.
 * Cada checkbox controla uma coluna específica, como nome, telefone, cpf/cnpj, etc.
 * 
 * Estado atual para sua respectiva coluna
 * @param {boolean} cbNome
 * @param {boolean} cbCodigo
 * @param {boolean} cbPercentual
 * @param {boolean} cbValidade
 * Função para atualizar o estado do checkbox de sua respectiva coluna
 * @param {Function} setCbNome
 * @param {Function} setCbCodigo
 * @param {Function} setCbPercentual
 * @param {Function} setCbValidade
 * 
 * @returns {JSX.Element} - Retorna uma tabela com as checkboxes
 */
function ModalRemoveLinhasCheckboxProdutos({
    cbNome, setCbNome,
    cbCodigo, setCbCodigo,
    cbPercentual, setCbPercentual,
    cbValidade, setCbValidade
}) {

    // Funções para alternar o estado (marcado/desmarcado) de cada checkbox
    function handleCbCodigo() {
        setCbCodigo(prevState => !prevState);
    }

    function handleCbNome() {
        setCbNome(prevState => !prevState);
    }

    function handleCbPercentual() {
        setCbPercentual(prevState => !prevState);
    }

    function handleCbValidade() {
        setCbValidade(prevState => !prevState);
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-codigo-checkbox" type="checkbox" onChange={handleCbCodigo} checked={cbCodigo} />
                            codigo
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-nome-checkbox" type="checkbox" onChange={handleCbNome} checked={cbNome} />
                            nome
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-percentual-checkbox" type="checkbox" onChange={handleCbPercentual} checked={cbPercentual} />
                            percentual
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-validade-checkbox" type="checkbox" onChange={handleCbValidade} checked={cbValidade} />
                            validade
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

ModalRemoveLinhasCheckboxProdutos.propTypes = {
    cbNome: PropTypes.bool.isRequired,
    setCbNome: PropTypes.func.isRequired,
    cbCodigo: PropTypes.bool.isRequired,
    setCbCodigo: PropTypes.func.isRequired,
    cbPercentual: PropTypes.bool.isRequired,
    setCbPercentual: PropTypes.func.isRequired,
    cbValidade: PropTypes.bool.isRequired,
    setCbValidade: PropTypes.func.isRequired,
}

export default ModalRemoveLinhasCheckboxProdutos;