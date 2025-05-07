import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import './ModalLocalizarSubstituir.css'
import { centerModal, makeDraggable } from "@DragModal/arrastarModais.js";

import LocalizarSubstituirInput from "./LocalizarSubstituirInput";
import LocalizarSubstituirCheckBox from "./LocalizarSubstituirCheckBox";
import LocalizarSubstituirButtons from "./LocalizarSubstituirButtons";

/**
 * @component
 * 
 * Componente ModalLocalizarSubstituir
 *
 * Modal que localiza e substitui um ou todos os valores.
 * Pode diferenciar por letras maiúsculas e minúsculas.
 * Pode pesquisar um valor correspondente a uma célula inteira.
 * Pode pesquisar usando expressões regulares (Regex).
 * 
 * @param {boolean} isLocalSubstOpen - Controle para abrir/fechar o modal.
 * @param {function} setLocalSubstOpen - Função para atualizar o estado de visibilidade do modal.
 * @param {number} columnIndexAtual - Índice da coluna a ser pesquisada e substituída.
 * @param {Array} tableData - Dados da tabela.
 * @param {function} setTableData - Função para atualizar os dados da tabela após substituição.
 * @param {object} selectedCell - Objeto contendo as coordenadas da célula selecionada.
 * @param {function} setSelectedCell - Função para atualizar o estado da célula selecionada.
 * @param {function} updateCellValue - Função para atualizar o valor de uma célula específica.
 * 
 * @return {JSX.Element} Retorna um modal para operações de Localizar, substituir e substituir tudo,
 * de acordo com as checkboxs selecionadas.
 */
function ModalLocalizarSubstituir({
    isLocalSubstOpen,
    setLocalSubstOpen,
    columnIndexAtual,
    tableData,
    setTableData,
    selectedCell,
    setSelectedCell,
    updateCellValue
}) {

    // Inputs.
    const [searchValue, setSearchValue] = useState('');
    const [replaceValue, setReplaceValue] = useState('');
    const [isSearchEmpty, setSearchEmpty] = useState(true);

    // Checkboxs.
    const [cbDiferenciaLetras, setCbDiferenciaLetras] = useState(false);
    const [cbPesquisaRegex, setCbPesquisaRegex] = useState(false);
    const [cbCorrespondeCelula, setCbCorrespondeCelula] = useState(false);

    // Info abaixo dos checkboxs.
    const [infoLocalSubst, setInfoLocalSubst] = useState('');

    // Configuração inicial ao abrir o modal.
    useEffect(() => {
        if (isLocalSubstOpen) {
            setSearchValue('');
            setReplaceValue('');
            setCbDiferenciaLetras(false);
            setCbPesquisaRegex(false);
            setCbCorrespondeCelula(false);
            setInfoLocalSubst('');
            centerModal('#modalLocalizarSubstituir');

            document.getElementById('modalLocalizarSubstituir').focus();
        }

    }, [isLocalSubstOpen])

    useEffect(() => {
        makeDraggable("#modalLocalizarSubstituir", ".dragHandle");
    }, []);

    /**
     * Função para fechar o modal.
     * 
     * @return {void} - Não retorna nada, apenas altera o estado para fechar o modal.
     * 
     */
    function closeLocalSubst() {
        setLocalSubstOpen(false);
        setSearchEmpty(true);
    }

    /**
     * Lida com a tecla pressionada no modal.
     * Procura o item ao pressionar 'Enter'.
     * Troca de input ao pressionar 'Tab'.
     * ou fecha o modal ao pressionar 'Escape'.
     * 
     * @param {KeyboardEvent} e - Evento da tecla pressionada.
     * 
     * @returns {void} Não retorna nada, apenas executa uma ação baseada na tecla pressionada.
     */
    const actionsByKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!isSearchEmpty) {
                document.querySelector('.search-button').click();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeLocalSubst();
        } else if (e.key === 'Tab' && (!e.altKey && !e.metaKey)) {
            e.preventDefault();
            const searchInput = document.querySelector('.modal-input-search')

            if (document.activeElement === searchInput) {
                document.querySelector('.modal-input-replace').focus();
            } else {
                document.querySelector('.modal-input-search').focus();
            }
        }
    };

    return (
        <div id="modalLocalizarSubstituir" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: isLocalSubstOpen ? "flex" : "none" }}>
            <div className="modal-localiza-subst-conteudo draggable-modal">
                <div>
                    <div id="modalHeaderLocalizarSubstituir" className="dragHandle">
                        <label>Localizar e substituir</label>
                        <span onClick={closeLocalSubst}>X</span>
                    </div>
                    <table>
                        <tbody>
                            <LocalizarSubstituirInput
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                replaceValue={replaceValue}
                                setReplaceValue={setReplaceValue}
                                setSearchEmpty={setSearchEmpty}
                            />
                            <LocalizarSubstituirCheckBox
                                cbDiferenciaLetras={cbDiferenciaLetras}
                                setCbDiferenciaLetras={setCbDiferenciaLetras}
                                cbPesquisaRegex={cbPesquisaRegex}
                                setCbPesquisaRegex={setCbPesquisaRegex}
                                cbCorrespondeCelula={cbCorrespondeCelula}
                                setCbCorrespondeCelula={setCbCorrespondeCelula}
                            />
                            <tr className="campo-mostrar-informacoes-search">
                                <td colSpan="2">{infoLocalSubst}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-search-reaplace-buttons">
                    <LocalizarSubstituirButtons
                        tableData={tableData}
                        setTableData={setTableData}
                        columnIndexAtual={columnIndexAtual}
                        selectedCell={selectedCell}
                        setSelectedCell={setSelectedCell}
                        updateCellValue={updateCellValue}
                        searchValue={searchValue}
                        isSearchEmpty={isSearchEmpty}
                        replaceValue={replaceValue}
                        cbCorrespondeCelula={cbCorrespondeCelula}
                        cbPesquisaRegex={cbPesquisaRegex}
                        cbDiferenciaLetras={cbDiferenciaLetras}
                        closeLocalSubst={closeLocalSubst}
                        setInfoLocalSubst={setInfoLocalSubst}
                    />
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
    selectedCell: PropTypes.object.isRequired,
    setSelectedCell: PropTypes.func.isRequired,
    updateCellValue: PropTypes.func.isRequired,
}

export default ModalLocalizarSubstituir;