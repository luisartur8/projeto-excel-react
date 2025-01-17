import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import ModalRemoveLinhasVazias from "./ModalRemoveLinhasVazias";
import ModalRemoveLinhasCheckbox from "./ModalRemoveLinhasCheckbox";
import ModalRemoveLinhasMesmoTempo from "./ModalRemoveLinhasMesmoTempo";

import { centerModal, makeDraggable } from "@DragModal/arrastarModais";
import './ModalRemoveLinhas.css'

/**
 * @component
 * 
 * Componente para exibir o modal de remoção de linhas na tabela.
 * Este modal oferece várias opções para remover linhas da tabela com base em critérios específicos.
 *
 * @param {boolean} removeRowsOpen - Estado para controlar se o modal está aberto ou fechado.
 * @param {Function} setRemoveRowsOpen - Função para alterar o estado de abertura do modal.
 * @param {Array} tableData - Dados da tabela que podem ser modificados.
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {Array} tableHeader - Cabeçalhos da tabela.
 * @param {Function} setTableHeader - Função para atualizar os cabeçalhos da tabela.
 * 
 * @returns {JSX.Element} - Modal de remoção de linhas.
 */
function ModalRemoveLinhas({ removeRowsOpen, setRemoveRowsOpen, tableData, setTableData, tableHeader, setTableHeader }) {

    // Estado para os checkboxes que controlam os campos a serem considerados na remoção de linhas.
    const [cbNome, setCbNome] = useState(false);
    const [cbTelefone, setCbTelefone] = useState(false);
    const [cbCpfCnpj, setCbCpfCnpj] = useState(false);
    const [cbDataNascimento, setCbDataNascimento] = useState(false);
    const [cbGenero, setCbGenero] = useState(false);
    const [cbEmail, setCbEmail] = useState(false);
    const [cbAnotacao, setCbAnotacao] = useState(false);

    // Estado para armazenar as informações sobre as colunas ou linhas removidas.
    const [infoRemovedRowCols, setInfoRemovedRowCols] = useState('ㅤ');

    /**
     * Efeito que é executado quando o modal de remoção de linhas é aberto.
     * Reseta os valores dos checkboxes e centraliza o modal na tela.
     */
    useEffect(() => {
        if (removeRowsOpen) {
            setCbNome(false);
            setCbTelefone(true);
            setCbCpfCnpj(true);
            setCbDataNascimento(false);
            setCbGenero(false);
            setCbEmail(false);
            setCbAnotacao(false);
            setInfoRemovedRowCols('ㅤ');
            centerModal('#modalRemoveLinhas');
        }
    }, [removeRowsOpen])

    // Permite o modal ser arrastado na tela.
    useEffect(() => {
        makeDraggable("#modalRemoveLinhas", ".dragHandle");
    }, []);

    function closeModal() {
        setRemoveRowsOpen(false);
    }

    return (
        <div id="modalRemoveLinhas" style={{ display: removeRowsOpen ? "flex" : "none" }}>
            <div className="modal-remove-linhas-conteudo draggable-modal">
                <div id="modalHeaderRemoveLinhas" className="dragHandle">
                    <label>Remover linhas</label>
                    <span className="close-modal-linhas-btn" onClick={closeModal}>X</span>
                </div>
                <div className="remove-linha-bordinha">
                    <div className="modal-secao-remover-quando-vazia">
                        <label>Remover quando vazias:</label>
                        <ModalRemoveLinhasVazias
                            tableData={tableData}
                            setTableData={setTableData}
                            tableHeader={tableHeader}
                            setTableHeader={setTableHeader}
                            setInfoRemovedRowCols={setInfoRemovedRowCols}
                        />
                    </div>
                    <div className="modal-secao-remover-quando-vazia2">
                        <label>Quando vazias ao mesmo tempo:</label>
                        <ModalRemoveLinhasCheckbox
                            cbNome={cbNome}
                            setCbNome={setCbNome}
                            cbTelefone={cbTelefone}
                            setCbTelefone={setCbTelefone}
                            cbCpfCnpj={cbCpfCnpj}
                            setCbCpfCnpj={setCbCpfCnpj}
                            cbDataNascimento={cbDataNascimento}
                            setCbDataNascimento={setCbDataNascimento}
                            cbGenero={cbGenero}
                            setCbGenero={setCbGenero}
                            cbEmail={cbEmail}
                            setCbEmail={setCbEmail}
                            cbAnotacao={cbAnotacao}
                            setCbAnotacao={setCbAnotacao}
                        />
                        <div className="informacoes-linhas-removidas">{infoRemovedRowCols}</div>
                        <ModalRemoveLinhasMesmoTempo
                            tableData={tableData}
                            setTableData={setTableData}
                            setInfoRemovedRowCols={setInfoRemovedRowCols}
                            tableHeader={tableHeader}
                            cbNome={cbNome}
                            cbTelefone={cbTelefone}
                            cbCpfCnpj={cbCpfCnpj}
                            cbDataNascimento={cbDataNascimento}
                            cbGenero={cbGenero}
                            cbEmail={cbEmail}
                            cbAnotacao={cbAnotacao}
                        />
                    </div>
                </div>

            </div>
        </div>
    )

}

export default ModalRemoveLinhas;

ModalRemoveLinhas.propTypes = {
    removeRowsOpen: PropTypes.bool.isRequired,
    setRemoveRowsOpen: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
}