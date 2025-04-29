import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente respectivo a planilhas do tipo Lançamento.
 * 
 * Componente que renderiza uma lista de checkboxes para o usuário escolher
 * quais colunas da tabela devem ser consideradas ao remover linhas com base em 
 * células vazias ao mesmo tempo.
 * 
 * O componente recebe os valores dos checkboxes e suas funções de atualização.
 * Cada checkbox controla uma coluna específica, como nome, telefone, cpf/cnpj, etc.
 * 
 * Estado atual para sua respectiva coluna
 * @param {boolean} cbClienteNome
 * @param {boolean} cbClienteTelefone
 * @param {boolean} cbClienteCpfCnpj
 * @param {boolean} cbValorVenda
 * @param {boolean} cbValorResgate
 * @param {boolean} cbAnotacaoVenda
 * @param {boolean} cbItemVenda
 * @param {boolean} cbDataLancamento
 * @param {boolean} cbNomeVendedor
 * @param {boolean} cbCodigoVendedor
 * Função para atualizar o estado do checkbox de sua respectiva coluna
 * @param {Function} setCbClienteNome
 * @param {Function} setCbClienteTelefone
 * @param {Function} setCbClienteCpfCnpj
 * @param {Function} setCbValorVenda
 * @param {Function} setCbValorResgate
 * @param {Function} setCbAnotacaoVenda
 * @param {Function} setCbItemVenda
 * @param {Function} setCbDataLancamento
 * @param {Function} setCbNomeVendedor
 * @param {Function} setCbCodigoVendedor
 * 
 * @returns {JSX.Element} - Retorna uma tabela com as checkboxes
 */
function ModalRemoveLinhasCheckboxLancamento({
    cbClienteNome, setCbClienteNome,
    cbClienteTelefone, setCbClienteTelefone,
    cbClienteCpfCnpj, setCbClienteCpfCnpj,
    cbValorVenda, setCbValorVenda,
    cbValorResgate, setCbValorResgate,
    cbAnotacaoVenda, setCbAnotacaoVenda,
    cbItemVenda, setCbItemVenda,
    cbDataLancamento, setCbDataLancamento,
    cbNomeVendedor, setCbNomeVendedor,
    cbCodigoVendedor, setCbCodigoVendedor,
}) {

    // Funções para alternar o estado (marcado/desmarcado) de cada checkbox
    function handleCbClienteNome() {
        setCbClienteNome(prevState => !prevState);
    }

    function handleCbClienteTelefone() {
        setCbClienteTelefone(prevState => !prevState);
    }

    function handleCbClienteCpfCnpj() {
        setCbClienteCpfCnpj(prevState => !prevState);
    }

    function handleCbValorVenda() {
        setCbValorVenda(prevState => !prevState);
    }

    function handleCbValorResgate() {
        setCbValorResgate(prevState => !prevState);
    }

    function handleCbAnotacaoVenda() {
        setCbAnotacaoVenda(prevState => !prevState);
    }

    function handleCbItemVenda() {
        setCbItemVenda(prevState => !prevState);
    }

    function handleCbDataLancamento() {
        setCbDataLancamento(prevState => !prevState);
    }

    function handleCbNomeVendedor() {
        setCbNomeVendedor(prevState => !prevState);
    }

    function handleCbCodigoVendedor() {
        setCbCodigoVendedor(prevState => !prevState);
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-cliente-nome-checkbox" type="checkbox" onChange={handleCbClienteNome} checked={cbClienteNome} />
                            cliente_nome
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-cliente-telefone-checkbox" type="checkbox" onChange={handleCbClienteTelefone} checked={cbClienteTelefone} />
                            cliente_telefone
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-cliente-cpf_cnpj-checkbox" type="checkbox" onChange={handleCbClienteCpfCnpj} checked={cbClienteCpfCnpj} />
                            cliente_cpf_cnpj
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-valor_venda-checkbox" type="checkbox" onChange={handleCbValorVenda} checked={cbValorVenda} />
                            valor_venda
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-valor_resgate-checkbox" type="checkbox" onChange={handleCbValorResgate} checked={cbValorResgate} />
                            valor_resgate
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-anotacao_venda-checkbox" type="checkbox" onChange={handleCbAnotacaoVenda} checked={cbAnotacaoVenda} />
                            anotacao_venda
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-item_venda-checkbox" type="checkbox" onChange={handleCbItemVenda} checked={cbItemVenda} />
                            item_venda
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-data_lancamento-checkbox" type="checkbox" onChange={handleCbDataLancamento} checked={cbDataLancamento} />
                            data_lancamento
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-nome_vendedor-checkbox" type="checkbox" onChange={handleCbNomeVendedor} checked={cbNomeVendedor} />
                            nome_vendedor
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-codigo_vendedor-checkbox" type="checkbox" onChange={handleCbCodigoVendedor} checked={cbCodigoVendedor} />
                            codigo_vendedor
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

ModalRemoveLinhasCheckboxLancamento.propTypes = {
    cbClienteNome: PropTypes.bool.isRequired,
    setCbClienteNome: PropTypes.func.isRequired,
    cbClienteTelefone: PropTypes.bool.isRequired,
    setCbClienteTelefone: PropTypes.func.isRequired,
    cbClienteCpfCnpj: PropTypes.bool.isRequired,
    setCbClienteCpfCnpj: PropTypes.func.isRequired,
    cbValorVenda: PropTypes.bool.isRequired,
    setCbValorVenda: PropTypes.func.isRequired,
    cbValorResgate: PropTypes.bool.isRequired,
    setCbValorResgate: PropTypes.func.isRequired,
    cbAnotacaoVenda: PropTypes.bool.isRequired,
    setCbAnotacaoVenda: PropTypes.func.isRequired,
    cbItemVenda: PropTypes.bool.isRequired,
    setCbItemVenda: PropTypes.func.isRequired,
    cbDataLancamento: PropTypes.bool.isRequired,
    setCbDataLancamento: PropTypes.func.isRequired,
    cbNomeVendedor: PropTypes.bool.isRequired,
    setCbNomeVendedor: PropTypes.func.isRequired,
    cbCodigoVendedor: PropTypes.bool.isRequired,
    setCbCodigoVendedor: PropTypes.func.isRequired
}

export default ModalRemoveLinhasCheckboxLancamento;