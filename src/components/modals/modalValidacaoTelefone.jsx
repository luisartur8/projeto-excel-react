import PropTypes from "prop-types";
import '../../css/ModalValidacoesTelefone.css';
import { useEffect, useState } from "react";
import { makeDraggable } from "./dragmodal/arrastarModais";
import { isValidDDD } from "../utils/validacao";

function ModalValidaTelefone({ isTelOpen, setTelOpen, executarValidacao, columnIndexAtual }) {

    const [selectedRadio, setSelectedRadio] = useState("sem");
    const [cbChecked, setCbChecked] = useState(false);
    const [cbEnable, setcbEnable] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputDisable, setInputDisable] = useState(false);
    const [opacityDDDInvalido, setOpacityDDDInvalido] = useState(0);

    // Configuração inicial ao abrir o modal
    useEffect(() => {
        if (isTelOpen) {
            setSelectedRadio("sem");
            setcbEnable(false);
            setCbChecked(false);
            setInputValue("");
            setInputDisable(true);
            setOpacityDDDInvalido(0);
            // centerModal('.modal-telefone-content');
        }

    }, [isTelOpen])

    useEffect(() => {
        makeDraggable("#modalValidaTelefone", ".dragHandle");
    }, []);

    function validarTelefone() {
        const ddd = inputValue;

        if ((!isValidDDD(ddd) && cbChecked) || ddd.length > 2) {
            setInputValue("");
            setOpacityDDDInvalido(1);
            return;
        }
        setOpacityDDDInvalido(0);

        if (selectedRadio === 'sem') {
            executarValidacao('telefone_sem_ddd', columnIndexAtual);
            setTelOpen(false);
            return;
        }

        if (selectedRadio === 'com') {
            executarValidacao('telefone', columnIndexAtual, true, ddd);
            setTelOpen(false);
            return;
        }

        throw new Error(`Erro: selectedRadio com valor '${selectedRadio}' não foi reconhecido em validarTelefone()`);
    }

    function closeValidacaoTelefone() {
        setTelOpen(false);
    }

    function semDDDClick() {
        setSelectedRadio("sem");
        setCbChecked(false);
        setcbEnable(false);
        setInputDisable(true);
        setInputValue("");
    }

    function comDDDClick() {
        setSelectedRadio("com");
        setcbEnable(true);
        setInputDisable(!cbChecked);
    }

    function onCbClick() {
        setCbChecked((p) => !p)
        setInputDisable(cbChecked);
        setInputValue("");
    }

    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    return (
        <div id="modalValidaTelefone" style={{ display: isTelOpen ? "flex" : "none" }}>
            <div className="modal-telefone-content draggable-modal">
                <div id="modalHeaderValidaTelefone" className="dragHandle"></div>
                <div className="modal-telefone-bordinha">
                    <p className="validar-como">VALIDAR COMO</p>
                    <form className="formulario-modal-telefone">
                        <label className="label-sem-ddd">
                            <input className="radio-telefone-sem-ddd" onClick={semDDDClick} type="radio" name="opcoes-telefone" value="sem" defaultChecked={selectedRadio === 'sem'} />
                            SEM DDD (9 8888-8888)
                        </label>
                        <div className="quadrado-com-ddd">
                            <label className="label-com-ddd">
                                <input className="radio-telefone-com-ddd" onClick={comDDDClick} type="radio" name="opcoes-telefone" value="com" defaultChecked={selectedRadio === 'com'} />
                                COM DDD (99 9 8888-8888)
                            </label>
                            <label className="inserir-ddd-personalizado">
                                <input className="checkbox-telefone-inserir-ddd" onClick={onCbClick} type="checkbox" defaultChecked={cbChecked} disabled={!cbEnable} />
                                Inserir DDD personalizado
                            </label>
                            <input className="input-telefone-inserir-ddd" onChange={handleInputChange} value={inputValue} type="text" placeholder="Para telefones sem DDD" disabled={inputDisable} />
                            <p className="p-ddd-invalido" style={{ opacity: opacityDDDInvalido }}>DDD Inválido</p>
                        </div>
                    </form>
                    <div className="modal-telefone-botoes">
                        <button className="botoesTelefone botaoValidarTelefone" onClick={validarTelefone}>Validar</button>
                        <button className="botoesTelefone botaoFecharTelefone" onClick={closeValidacaoTelefone} >Fechar</button>
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
    columnIndexAtual: PropTypes.number.isRequired,
};

export default ModalValidaTelefone;