import PropTypes from "prop-types";

/**
 * @component
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
 * @param {boolean} cbTelefone
 * @param {boolean} cbCpfCnpj
 * @param {boolean} cbDataNascimento
 * @param {boolean} cbGenero
 * @param {boolean} cbEmail
 * @param {boolean} cbAnotacao
 * Função para atualizar o estado do checkbox de sua respectiva coluna
 * @param {Function} setCbNome
 * @param {Function} setCbTelefone
 * @param {Function} setCbCpfCnpj
 * @param {Function} setCbDataNascimento
 * @param {Function} setCbGenero
 * @param {Function} setCbEmail
 * @param {Function} setCbAnotacao
 * 
 * @returns {JSX.Element} - Retorna uma tabela com as checkboxes
 */
function ModalRemoveLinhasCheckbox({
    cbNome, setCbNome,
    cbTelefone, setCbTelefone,
    cbCpfCnpj, setCbCpfCnpj,
    cbDataNascimento, setCbDataNascimento,
    cbGenero, setCbGenero,
    cbEmail, setCbEmail,
    cbAnotacao, setCbAnotacao
}) {

     // Funções para alternar o estado (marcado/desmarcado) de cada checkbox
    function handleCbNome() {
        setCbNome(prevState => !prevState);
    }

    function handleCbTelefone() {
        setCbTelefone(prevState => !prevState);
    }

    function handleCbCpfCnpj() {
        setCbCpfCnpj(prevState => !prevState);
    }

    function handleCbDataNascimento() {
        setCbDataNascimento(prevState => !prevState);
    }

    function handleCbGenero() {
        setCbGenero(prevState => !prevState);
    }

    function handleCbEmail() {
        setCbEmail(prevState => !prevState);
    }

    function handleCbAnotacao() {
        setCbAnotacao(prevState => !prevState);
    }

    return (
        <table>
            <tbody>
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
                            <input className="modal-linhas-telefone-checkbox" type="checkbox" onChange={handleCbTelefone} checked={cbTelefone} />
                            telefone
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-cpf_cnpj-checkbox" type="checkbox" onChange={handleCbCpfCnpj} checked={cbCpfCnpj} />
                            cpf_cnpj
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-data_nascimento-checkbox" type="checkbox" onChange={handleCbDataNascimento} checked={cbDataNascimento} />
                            data_nascimento
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-genero-checkbox" type="checkbox" onChange={handleCbGenero} checked={cbGenero} />
                            genero
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-email-checkbox" type="checkbox" onChange={handleCbEmail} checked={cbEmail} />
                            email
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <input className="modal-linhas-anotacao-checkbox" type="checkbox" onChange={handleCbAnotacao} checked={cbAnotacao} />
                            anotacao
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    )

}

ModalRemoveLinhasCheckbox.propTypes = {
    cbNome: PropTypes.bool.isRequired,
    setCbNome: PropTypes.func.isRequired,
    cbTelefone: PropTypes.bool.isRequired,
    setCbTelefone: PropTypes.func.isRequired,
    cbCpfCnpj: PropTypes.bool.isRequired,
    setCbCpfCnpj: PropTypes.func.isRequired,
    cbDataNascimento: PropTypes.bool.isRequired,
    setCbDataNascimento: PropTypes.func.isRequired,
    cbGenero: PropTypes.bool.isRequired,
    setCbGenero: PropTypes.func.isRequired,
    cbEmail: PropTypes.bool.isRequired,
    setCbEmail: PropTypes.func.isRequired,
    cbAnotacao: PropTypes.bool.isRequired,
    setCbAnotacao: PropTypes.func.isRequired,
}

export default ModalRemoveLinhasCheckbox;