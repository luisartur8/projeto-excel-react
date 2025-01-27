import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente LocalizarSubstituirCheckBox.
 *
 * Este componente exibe os checkboxes que permitem ao usuário definir opções de pesquisa,
 * como diferenciar maiúsculas de minúsculas, corresponder todo o conteúdo da célula e pesquisar usando expressões regulares (Regex).
 * Ele gerencia o estado dessas opções e atualiza as configurações de pesquisa de acordo com as interações do usuário.
 *
 * @component
 * 
 * @param {boolean} cbDiferenciaLetras - Determina se a pesquisa diferencia maiúsculas de minúsculas.
 * @param {function} setCbDiferenciaLetras - Função para atualizar o estado de diferenciação de letras maiúsculas/minúsculas.
 * @param {boolean} cbPesquisaRegex - Determina se a pesquisa será feita utilizando expressões regulares.
 * @param {function} setCbPesquisaRegex - Função para atualizar o estado de pesquisa com expressões regulares.
 * @param {boolean} cbCorrespondeCelula - Determina se a pesquisa deve corresponder ao conteúdo inteiro da célula.
 * @param {function} setCbCorrespondeCelula - Função para atualizar o estado de correspondência do conteúdo da célula.
 * 
 * @return {JSX.Element} Retorna checkboxes de configuração para as operações do usuário.
 */
function LocalizarSubstituirCheckBox({
    cbDiferenciaLetras, setCbDiferenciaLetras,
    cbPesquisaRegex, setCbPesquisaRegex,
    cbCorrespondeCelula, setCbCorrespondeCelula
}) {

    /**
     * Função que lida com a alteração do estado do checkbox "Diferenciar maiúsculas e minúsculas".
     * 
     * @return {void} Não retorna nada, apenas atualiza o checkbox.
     */
    function handleCbLetras() {
        setCbDiferenciaLetras(prevState => !prevState);
    }

    /**
     * Função que lida com a alteração do estado do checkbox "Corresponder todo conteúdo da célula".
     * 
     * @return {void} Não retorna nada, apenas atualiza o checkbox.
     */
    function handleCorrespondeTodaCelula() {
        setCbCorrespondeCelula(prevState => !prevState);
    }

    /**
     * Função que lida com a alteração do estado do checkbox "Pesquisar usando expressões regulares".
     * Alterna entre true e false. Quando true, também ativa "Diferenciar maiúsculas e minúsculas".
     * 
     * @return {void} Não retorna nada, apenas atualiza o checkbox.
     */
    function handleSearchRegex() {
        if (!cbPesquisaRegex) {
            setCbPesquisaRegex(true);
            setCbDiferenciaLetras(true);
        } else {
            setCbPesquisaRegex(false);
        }
    }

    return (
        <>
            <tr>
                <td></td>
                <td>
                    <div>
                        <label>
                            <input className="modal-search-upper-lower-checkbox" type="checkbox" onChange={handleCbLetras} checked={cbDiferenciaLetras} />
                            Diferenciar maiúsculas e minúsculas
                        </label>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div>
                        <label>
                            <input className="modal-search-regex-checkbox" type="checkbox" onChange={handleCorrespondeTodaCelula} checked={cbCorrespondeCelula} />
                            Corresponder todo conteúdo da celula
                        </label>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div>
                        <label>
                            <input className="modal-search-regex-checkbox" type="checkbox" onChange={handleSearchRegex} checked={cbPesquisaRegex} />
                            Pesquisar usando expressões regulares
                        </label>
                    </div>
                </td>
            </tr>
        </>
    )
}

LocalizarSubstituirCheckBox.propTypes = {
    cbDiferenciaLetras: PropTypes.bool.isRequired,
    setCbDiferenciaLetras: PropTypes.func.isRequired,
    cbPesquisaRegex: PropTypes.bool.isRequired,
    setCbPesquisaRegex: PropTypes.func.isRequired,
    cbCorrespondeCelula: PropTypes.bool.isRequired,
    setCbCorrespondeCelula: PropTypes.func.isRequired,
}

export default LocalizarSubstituirCheckBox;