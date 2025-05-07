import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { centerModal, makeDraggable } from "@DragModal/arrastarModais";
import './ModalValidacaoData.css';
import iconCancelar from '@assets/img/icon-cancelar.png';
import iconLixeira from '@assets/img/icon-lixeira.png';

/**
 * @component
 * 
 * Componente ModalValidaData.
 *
 * Modal que permite validar uma data, configurando os formatos de data original e final.
 * O usuário pode escolher os componentes da data (dia, mês e ano) nos formatos desejados.
 *
 * @param {boolean} isValDataOpen - Estado que controla a visibilidade do modal.
 * @param {function} setIsValDataOpen - Função para alterar o estado de visibilidade do modal.
 * @param {function} executarValidacao - Função para executar a validação da data.
 * @param {number} columnIndexAtual - Índice da coluna que está sendo validada.
 * @param {string} selectedValueAtual - Valor atual selecionado (o campo que está sendo validado).
 *
 * @return {JSX.Element} Retorna o modal para validação de telefone data.
 */
function ModalValidaData({ isValDataOpen, setIsValDataOpen, executarValidacao, columnIndexAtual, selectedValueAtual }) {

    const [originalOne, setOriginalOne] = useState('dd');
    const [originalTwo, setOriginalTwo] = useState('mm');
    const [originalThree, setOriginalThree] = useState('yyyy');

    const [finalOne, setFinalOne] = useState('dd');
    const [finalTwo, setFinalTwo] = useState('mm');
    const [finalThree, setFinalThree] = useState('yyyy');

    // Reseta ao abrir o modal.
    useEffect(() => {
        if (isValDataOpen) {
            setOriginalOne('dd');
            setOriginalTwo('mm');
            setOriginalThree('yyyy');
            setFinalOne('dd');
            setFinalTwo('mm');
            setFinalThree('yyyy');
            centerModal('#modalValidaNascimento');

            document.getElementById('modalValidaNascimento').focus();
        }
    }, [isValDataOpen]);

    // Permite arrastar o modal pela tela
    useEffect(() => {
        makeDraggable("#modalValidaNascimento", ".dragHandle");
    }, []);

    // Data Original
    function handleOriginalOne(e) {
        setOriginalOne(e.target.value);
    }

    function handleOriginalTwo(e) {
        setOriginalTwo(e.target.value);
    }

    function handleOriginalThree(e) {
        setOriginalThree(e.target.value);
    }

    // Data Final
    function handleFinalOne(e) {
        setFinalOne(e.target.value);
    }

    function handleFinalTwo(e) {
        setFinalTwo(e.target.value);
    }

    function handleFinalThree(e) {
        setFinalThree(e.target.value);
    }

    function closeModal() {
        setIsValDataOpen(false);
    }

    /**
     * Função para validar a data com os formatos selecionados e executar a validação.
     */
    function validarData() {
        const formatoOriginal = `${originalOne}/${originalTwo}/${originalThree}`;
        const formatoFinal = `${finalOne}/${finalTwo}/${finalThree}`;

        setIsValDataOpen(false);
        executarValidacao(selectedValueAtual, columnIndexAtual, null, null, formatoOriginal, formatoFinal);
    }

    /**
     * Lida com a tecla pressionada no modal.
     * Valida a coluna ao pressionar 'Enter'.
     * ou fecha o modal ao pressionar 'Escape'.
     * 
     * @param {KeyboardEvent} e - Evento da tecla pressionada.
     * 
     * @returns {void} Não retorna nada, apenas executa uma ação baseada na tecla pressionada.
     */
    const actionsByKeyPress = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            validarData();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <div id="modalValidaNascimento" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: isValDataOpen ? "flex" : "none" }}>
            <div className="modal-nascimento-conteudo draggable-modal">
                <div id="modalHeaderValidaNascimento" className="dragHandle"></div>
                <div className="nascimento-conteudo-central">
                    <div className="quadrado-conteudo-nascimento">
                        <p>Data original</p>
                        <div className="nascimento-data-original">
                            <select className="dia-mes-ano-original-1" value={originalOne} onChange={handleOriginalOne}>
                                <option value="dd">Dia</option>
                                <option value="mm">Mês</option>
                                <option value="yyyy">Ano(yyyy)</option>
                                <option value="yy">Ano(yy)</option>
                            </select>
                            <select className="dia-mes-ano-original-2" value={originalTwo} onChange={handleOriginalTwo}>
                                <option value="dd">Dia</option>
                                <option value="mm">Mês</option>
                                <option value="yyyy">Ano(yyyy)</option>
                                <option value="yy">Ano(yy)</option>
                            </select>
                            <select className="dia-mes-ano-original-3" value={originalThree} onChange={handleOriginalThree}>
                                <option value="dd">Dia</option>
                                <option value="mm">Mês</option>
                                <option value="yyyy">Ano(yyyy)</option>
                                <option value="yy">Ano(yy)</option>
                            </select>
                        </div>

                        <p>Data final</p>

                        <div className="nascimento-data-final">
                            <select className="dia-mes-ano-final-1" value={finalOne} onChange={handleFinalOne}>
                                <option value="dd">Dia</option>
                                <option value="mm">Mês</option>
                                <option value="yyyy">Ano(yyyy)</option>
                                <option value="yy">Ano(yy)</option>
                            </select>
                            <select className="dia-mes-ano-final-2" value={finalTwo} onChange={handleFinalTwo}>
                                <option value="dd">Dia</option>
                                <option value="mm">Mês</option>
                                <option value="yyyy">Ano(yyyy)</option>
                                <option value="yy">Ano(yy)</option>
                            </select>
                            <select className="dia-mes-ano-final-3" value={finalThree} onChange={handleFinalThree}>
                                <option value="dd">Dia</option>
                                <option value="mm">Mês</option>
                                <option value="yyyy">Ano(yyyy)</option>
                                <option value="yy">Ano(yy)</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-nascimento-botao">
                        <button className="botoesNascimento botaoValidarNascimento" onClick={validarData}>
                            <img src={iconCancelar} />
                            Validar
                        </button>
                        <button className="botoesNascimento botaoFecharNascimento" onClick={closeModal}>
                            <img src={iconLixeira} />
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

ModalValidaData.propTypes = {
    isValDataOpen: PropTypes.bool.isRequired,
    setIsValDataOpen: PropTypes.func.isRequired,
    executarValidacao: PropTypes.func.isRequired,
    columnIndexAtual: PropTypes.number.isRequired,
    selectedValueAtual: PropTypes.string.isRequired
}

export default ModalValidaData;