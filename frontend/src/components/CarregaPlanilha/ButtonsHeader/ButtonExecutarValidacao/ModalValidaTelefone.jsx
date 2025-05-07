import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import './ModalValidacoesTelefone.css';
import { centerModal, makeDraggable } from "@DragModal/arrastarModais";
import { isValidDDD } from "@utils/validacao";

/**
 * @component
 * 
 * Componente ModalValidaTelefone.
 *
 * Modal que permite validar um número de telefone.
 * O usuário pode escolher entre validar o telefone com ou sem DDD.
 * Caso escolha a opção "Com DDD", o modal permite a inserção de um DDD personalizado.
 * 
 * @param {boolean} isTelOpen - Estado que controla a visibilidade do modal.
 * @param {function} setTelOpen - Função que altera o estado de visibilidade do modal.
 * @param {function} executarValidacao - Função que executa a validação do telefone.
 * @param {number} columnIndexAtual - Índice da coluna que está sendo validada.
 * 
 * @return {JSX.Element} Retorna o modal para validação de telefone.
 */
function ModalValidaTelefone({ isTelOpen, setTelOpen, executarValidacao, columnIndexAtual }) {

    const [radioSemDDD, setRadioSemDDD] = useState(true);
    const [radioComDDD, setRadioComDDD] = useState(false);
    const [cbChecked, setCbChecked] = useState(false);
    const [cbEnable, setcbEnable] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputDisable, setInputDisable] = useState(true);
    const [opacityDDDInvalido, setOpacityDDDInvalido] = useState(0);

    // Resetar configurações ao abrir ou fechar o modal.
    useEffect(() => {
        setRadioSemDDD(true);
        setRadioComDDD(false);

        setCbChecked(false);
        setcbEnable(false);

        setInputValue("");
        setInputDisable(true);
        setOpacityDDDInvalido(0);

        centerModal('.modal-telefone-content');

        if (isTelOpen) {
            document.getElementById('modalValidaTelefone').focus();
        }
    }, [isTelOpen]);

    useEffect(() => {
        makeDraggable(".modal-telefone-content", ".dragHandle");
    }, []);

    /**
     * Função que valida o número de telefone com ou sem DDD, e executa a validação correspondente.
     * 
     * @throws {Error} Lança um erro se a opção de validação não for reconhecida.
     */
    function validarTelefone() {
        const ddd = inputValue;

        if ((!isValidDDD(ddd) && cbChecked) || ddd.length > 2) {
            setInputValue("");
            setOpacityDDDInvalido(1);
            return;
        }
        setOpacityDDDInvalido(0);

        if (radioSemDDD) {
            executarValidacao('telefone_sem_ddd', columnIndexAtual);
            setTelOpen(false);
            return;
        }

        if (radioComDDD) {
            executarValidacao('telefone', columnIndexAtual, true, ddd);
            setTelOpen(false);
            return;
        }

        throw new Error(`Erro: selectedRadio não foi reconhecido em validarTelefone()`);
    }

    /**
     * Função que fecha o modal de validação de telefone.
     */
    function closeValidacaoTelefone() {
        setTelOpen(false);
    }

    /**
     * Função que reseta as opções quando a opção "Sem DDD" é selecionada.
     */
    function semDDDClick() {
        setRadioSemDDD(true);
        setRadioComDDD(false);
        setCbChecked(false);
        setcbEnable(false);
        setInputDisable(true);
        setInputValue("");
    }

    /**
     * Função que ativa as opções de DDD quando a opção "Com DDD" é selecionada.
     */
    function comDDDClick() {
        setRadioSemDDD(false);
        setRadioComDDD(true);
        setcbEnable(true);
        setInputDisable(!cbChecked);
    }

    /**
     * Função que lida com o clique no checkbox de inserir DDD personalizado.
     */
    function onCbClick() {
        setCbChecked((prev) => {
            const newCbChecked = !prev;
            setInputDisable(!newCbChecked);
            return newCbChecked;
        });
        setInputValue("");
    }

    /**
     * Função que lida com as mudanças no valor do input de telefone.
     * 
     * @param {Event} e - O evento de mudança no valor do input.
     */
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    /**
     * Lida com a tecla pressionada no modal.
     * Valida a coluna ao pressionar 'Enter'.
     * Troca o tipo de validação ao pressionar 'Tab', 'ArrowUp' ou 'ArrowDown'.
     * ou fecha o modal ao pressionar 'Escape'.
     * 
     * @param {KeyboardEvent} e - Evento da tecla pressionada.
     * 
     * @returns {void} Não retorna nada, apenas executa uma ação baseada na tecla pressionada.
     */
    const actionsByKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validarTelefone();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeValidacaoTelefone();
        } else if ((e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown') && (!e.altKey && !e.metaKey)) {
            e.preventDefault();
            if (radioComDDD) {
                semDDDClick()
            }
            if (radioSemDDD) {
                comDDDClick()
            }
        }
    };

    return (
        <div id="modalValidaTelefone" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: isTelOpen ? "flex" : "none" }}>
            <div className="modal-telefone-content draggable-modal">
                <div id="modalHeaderValidaTelefone" className="dragHandle"></div>
                <div className="modal-telefone-bordinha">
                    <p className="validar-como">VALIDAR COMO</p>
                    <form className="formulario-modal-telefone">
                        <label className="label-sem-ddd">
                            <input
                                className="radio-telefone-sem-ddd"
                                onClick={semDDDClick}
                                type="radio"
                                name="opcoes-telefone"
                                value="sem"
                                checked={radioSemDDD}
                                readOnly
                            />
                            SEM DDD (9 8888-8888)
                        </label>
                        <div className="quadrado-com-ddd">
                            <label className="label-com-ddd">
                                <input
                                    className="radio-telefone-com-ddd"
                                    onClick={comDDDClick}
                                    type="radio"
                                    name="opcoes-telefone"
                                    value="com"
                                    checked={radioComDDD}
                                    readOnly
                                />
                                COM DDD (99 9 8888-8888)
                            </label>
                            <label className="inserir-ddd-personalizado">
                                <input
                                    className="checkbox-telefone-inserir-ddd"
                                    onClick={onCbClick}
                                    type="checkbox"
                                    checked={cbChecked}
                                    disabled={!cbEnable}
                                />
                                Inserir DDD personalizado
                            </label>
                            <input
                                className="input-telefone-inserir-ddd"
                                onChange={handleInputChange}
                                value={inputValue}
                                type="text"
                                placeholder="Para telefones sem DDD"
                                disabled={inputDisable}
                            />
                            <p className="p-ddd-invalido" style={{ opacity: opacityDDDInvalido }}>DDD Inválido</p>
                        </div>
                    </form>
                    <div className="modal-telefone-botoes">
                        <button className="botoesTelefone botaoValidarTelefone" onClick={validarTelefone}>Validar</button>
                        <button className="botoesTelefone botaoFecharTelefone" onClick={closeValidacaoTelefone}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalValidaTelefone.propTypes = {
    isTelOpen: PropTypes.bool.isRequired,
    setTelOpen: PropTypes.func.isRequired,
    executarValidacao: PropTypes.func.isRequired,
    columnIndexAtual: PropTypes.number.isRequired
};

export default ModalValidaTelefone;