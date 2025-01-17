import PropTypes from "prop-types";
import '../../css/ModalLocalizarSubstituir.css'
import { useEffect, useState } from "react";
import { makeDraggable } from "./dragmodal/arrastarModais";

function ModalLocalizarSubstituir({ isLocalSubstOpen, setLocalSubstOpen, columnIndexAtual, tableData, setTableData }) {

    const [searchValue, setSearchValue] = useState('');
    const [replaceValue, setReplaceValue] = useState('');

    const [cbDiferenciaLetras, setCbDiferenciaLetras] = useState(false);
    const [cbPesquisaRegex, setCbPesquisaRegex] = useState(false);
    const [cbCorrespondeCelula, setCbCorrespondeCelula] = useState(false);

    // Configuração inicial ao abrir o modal
    useEffect(() => {
        if (isLocalSubstOpen) {
            setSearchValue('');
            setReplaceValue('');
            setCbDiferenciaLetras(false);
            setCbPesquisaRegex(false);
            setCbCorrespondeCelula(false);
            // centerModal('.modal-telefone-content');
        }

    }, [isLocalSubstOpen])

    useEffect(() => {
        makeDraggable("#modalHeaderLocalizarSubstituir", ".dragHandle");
    }, []);

    function handleSearchInput(e) {
        setSearchValue(e.target.value);
    }

    function handleReplaceInput(e) {
        setReplaceValue(e.target.value);
    }

    function handleCbLetras() {
        if (!cbDiferenciaLetras) {
            setCbDiferenciaLetras(true);
        } else {
            setCbDiferenciaLetras(false);
        }
    }

    function handleCorrespondeTodaCelula() {
        if (!cbCorrespondeCelula) {
            setCbCorrespondeCelula(true);
        } else {
            setCbCorrespondeCelula(false);
        }
    }

    function handleSearchRegex() {
        if (!cbPesquisaRegex) {
            setCbPesquisaRegex(true);
            setCbDiferenciaLetras(true);
        } else {
            setCbPesquisaRegex(false);
        }
    }

    function btnFindNext() {
        console.log('btnFindNext')
    }

    function btnReplace() {
        console.log('btnReplace')
    }

    function btnReplaceAll() {
        const updatedData = tableData.map((row) => {
            const updatedRow = [...row];

            const cellData = updatedRow[columnIndexAtual];
            console.log(cellData)

            cellData.value = cellData.value.replace(new RegExp(searchValue, 'g'), replaceValue);

            if (cellData && cellData.value) {
                const updatedCellValue = cellData.value.replace(replaceValue, '');
                updatedRow[columnIndexAtual] = { ...cellData, value: updatedCellValue };
            }

            return updatedRow;
        });

        setTableData(updatedData);
    }

    function closeLocalSubst() {
        setLocalSubstOpen(false);
    }

    return (
        <div id="modalLocalizarSubstituir" style={{ display: isLocalSubstOpen ? "flex" : "none" }}>
            <div className="modal-localiza-subst-conteudo draggable-modal">
                <div>
                    <div id="modalHeaderLocalizarSubstituir" className="dragHandle">
                        <label>Localizar e substituir</label>
                        <span onClick={closeLocalSubst}>X</span>
                    </div>
                    <table>
                        <tbody>
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
                            <tr className="campo-mostrar-informacoes-search">
                                <td colSpan="2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-search-reaplace-buttons">
                    <button name="findNext" className="botao-acoes search-button" onClick={btnFindNext}>Procurar</button>
                    <button name="replace" className="botao-acoes replace-button" onClick={btnReplace}>Substituir</button>
                    <button name="replaceAll" className="botao-acoes replaceAll-button" onClick={btnReplaceAll}>Substituir tudo</button>
                    <button name="done" className="done-button" onClick={closeLocalSubst}>Concluído</button>
                </div>
            </div>
        </div>
    )
}

ModalLocalizarSubstituir.propTypes = {
    isLocalSubstOpen: PropTypes.bool.isRequired,
    setLocalSubstOpen: PropTypes.func.isRequired,
    columnIndexAtual: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
}

export default ModalLocalizarSubstituir;