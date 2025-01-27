import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente LocalizarSubstituirInput.
 *
 * Este componente exibe os campos de input para os valores de busca ("Localizar") e substituição ("Substituir").
 * Atualiza os valores dos inputs e notifica se o campo de busca está vazio através de uma função `setSearchEmpty`.
 * setSearchEmpty é usado em outro componente para habilitar ou desabilitar o botão).
 *
 * @component
 * 
 * @param {string} searchValue - Valor atual do campo "Localizar" (texto de pesquisa).
 * @param {function} setSearchValue - Função para atualizar o valor do campo "Localizar".
 * @param {string} replaceValue - Valor atual do campo "Substituir".
 * @param {function} setReplaceValue - Função para atualizar o valor do campo "Substituir".
 * @param {function} setSearchEmpty - Função para notificar se o campo "Localizar" está vazio ou não.
 * 
 * @return {JSX.Element} Retorna dois inputs para os valores a substituir.
 */
function LocalizarSubstituirInput({
    searchValue,
    setSearchValue,
    replaceValue,
    setReplaceValue,
    setSearchEmpty
}) {

    /**
     * Função que lida com a alteração do valor do campo "Localizar".
     * Atualiza o valor de `searchValue` e chama a função `setSearchEmpty` para verificar se o campo está vazio.
     *
     * @param {object} e - Evento de alteração do input.
     * 
     * @return {void} Não retorna nada, apenas atualiza o valor do input search e informa se está vazio.
     */
    function handleSearchInput(e) {
        const value = e.target.value;
        setSearchValue(value);
        setSearchEmpty(value === '')
    }

    /**
     * Função que lida com a alteração do valor do campo "Substituir".
     * Atualiza o valor de `replaceValue`.
     *
     * @param {object} e - Evento de alteração do input.
     * 
     * @return {void} Não retorna nada, apenas atualiza o valor do input replace.
     */
    function handleReplaceInput(e) {
        setReplaceValue(e.target.value);
    }

    return (
        <>
            <tr>
                <td>
                    <label>Localizar</label>
                </td>
                <td>
                    <input className="modal-input-search" type="text" onChange={handleSearchInput} value={searchValue} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>Substituir</label>
                </td>
                <td>
                    <input className="modal-input-replace" type="text" onChange={handleReplaceInput} value={replaceValue} />
                </td>
            </tr>
        </>
    )
}

LocalizarSubstituirInput.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    replaceValue: PropTypes.string.isRequired,
    setReplaceValue: PropTypes.func.isRequired,
    setSearchEmpty: PropTypes.func.isRequired,
}

export default LocalizarSubstituirInput;