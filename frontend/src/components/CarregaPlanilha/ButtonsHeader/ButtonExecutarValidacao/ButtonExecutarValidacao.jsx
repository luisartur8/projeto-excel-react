import PropTypes from 'prop-types';

import { FaEdit } from "react-icons/fa";

/**
 * @component
 * 
 * Componente ButtonExecutarValidacao.
 *
 * Botão que, ao ser clicado, executa uma validação com base no valor selecionado de um `select` dentro de uma célula da tabela. 
 * Dependendo do valor do `select`, pode abrir diferentes modais, como o de telefone ou de data.
 * 
 * @param {number} index - Índice da coluna, usado para identificar qual coluna foi clicada.
 * @param {function} setColumnIndexAtual - Função para armazenar o índice da coluna atual.
 * @param {function} executarValidacao - Função que executa a validação na coluna com o index selecionado.
 * @param {function} setTelOpen - Função para alterar o estado de visibilidade do modal de telefone.
 * @param {function} setIsValDataOpen - Função para alterar o estado de visibilidade do modal de data de nascimento ou lançamento.
 * @param {function} setSelectValueAtual - Função para armazenar o valor selecionado no `select` da célula da tabela.
 * 
 * @return {JSX.Element} Retorna um botão que quando clicado abre os modais de validação ou executa a validação para a coluna.
 */
function ButtonExecutarValidacao({ index, setColumnIndexAtual, executarValidacao, setTelOpen, setIsValDataOpen, setSelectValueAtual }) {

    /**
     * Função que executa a validação e abre os modais de acordo com o valor selecionado.
     * 
     * @param {Event} e - O evento de clique no botão, utilizado para capturar o valor do `select` relacionado.
     * @param {number} index - O índice da coluna atual.
     * 
     * @return {void} Não retorna nada mas abre os modais de validação ou executa a validação diretamente.
     */
    const abrirModalValidacao = (e) => {
        const selectValue = e.target.closest('th').querySelector('select').value;

        // Setar para ser usado no modal.
        setColumnIndexAtual(index);
        setSelectValueAtual(selectValue);

        // Abre o modal de validação do telefone.
        if (selectValue === 'telefone') {
            setTelOpen(true);
            return;
        }

        // Abre o modal de validação de datas.
        if (selectValue === 'data_nascimento' || selectValue === 'data_lancamento') {
            setIsValDataOpen(true);
            return;
        }

        // Caso não tenha modal para abrir executa a validação diretamente.
        executarValidacao(selectValue, index);
    };

    return (
        <>
            <button className="btn-executar-validacao" onClick={abrirModalValidacao}>
                <FaEdit size={16} />
            </button>
        </>
    )
}

ButtonExecutarValidacao.propTypes = {
    index: PropTypes.number.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired,
    executarValidacao: PropTypes.func.isRequired,
    setTelOpen: PropTypes.func.isRequired,
    setIsValDataOpen: PropTypes.func.isRequired,
    setSelectValueAtual: PropTypes.func.isRequired
};

export default ButtonExecutarValidacao;