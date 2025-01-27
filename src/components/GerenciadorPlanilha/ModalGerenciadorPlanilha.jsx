import { useState } from "react";

import './ModalGerenciadorPlanilha.css';
import './tableExcel.css';

import CarregaPlanilha from '@CarregaPlanilha/CarregaPlanilha.jsx';

import ButtonApagaPlanilha from "./ButtonsGerenciador/ButtonApagaPlanilha";
import ButtonExportaPlanilha from "./ButtonsGerenciador/ButtonExportaPlanilha";
import ButtonJuntarDDDTelefone from "./ButtonsGerenciador/ButtonJuntarDDDTelefone";
import ButtonRemoveLinhas from "./ButtonsGerenciador/ButtonRemoveLinhas/ButtonRemoveLinhas";
import ButtonBaixarPlanilha from "./ButtonsGerenciador/ButtonBaixarPlanilha/ButtonBaixarPlanilha";
import ButtonModeloPadrao from "./ButtonsGerenciador/ButtonModeloPadrao";
import ButtonMesclarColunas from "./ButtonsGerenciador/ButtonMesclarColunas.jsx";

import { optionsTipoPlanilha } from '../selects/optionsTipoPlanilha.js'

/**
 * @component
 * 
 * Componente ModalGerenciadorPlanilha
 * 
 * Componente responsável por gerenciar e interagir com planilhas, permitindo operações como:
 * - Carregar, baixar e exportar planilhas.
 * - Gerenciar diferentes tipos de planilhas (clientes, lançamentos, oportunidades e produtos).
 * - Apagar planilha.
 * - Operações na tabela como:
 * - 1. Validação de dados e remoção de itens incorretos.
 * - 2. Remoção de linhas e colunas de forma personalizada.
 * - 3. Busca e substituição de valores.
 * - 4. Ordenação da tabela.
 * - 5. Mesclar colunas e aplicar modelos padrões.
 * 
 * @returns {JSX.Element} Retorna todo o gerenciador da planilha.
 */
function ModalGerenciadorPlanilha() {

    /**
     * Estado da planilha atual.
     * 
     * @type {string} firstSheetName - Nome da primeira planilha carregada.
     * @type {string} workbookName - Nome do arquivo de planilha.
     * @type {File} selectedFile - Arquivo de planilha selecionado.
     */
    const [firstSheetName, setFirstSheetName] = useState('');
    const [workbookName, setWorkbookName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    /**
     * Estado da tabela.
     * 
     * @type {Array} tableHeader - Header da tabela (nomes das colunas).
     * @type {Array} tableData - Dados da tabela (linhas e colunas).
     * @type {boolean} isLoaded - Flag para verificar se a tabela foi carregada.
     */
    const [tableHeader, setTableHeader] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    /**
     * Estado do gerenciador de planilhas.
     * 
     * @type {string} tipoPlanilha - Tipo da planilha selecionada (cliente, lançamentos, oportunidade, produtos).
     * @type {boolean} isGerenciadorVisible - Flag para exibir ou esconder o modal do gerenciador de planilhas.
     * @type {string} mesclarColunaValue - Valor da coluna a ser mesclada.
     */
    const [tipoPlanilha, setTipoPlanilha] = useState('cliente');
    const [isGerenciadorVisible, setIsGerenciadorVisible] = useState(false);
    const [mesclarColunaValue, setMesclarColunaValue] = useState('nome');

    /**
     * Estado do modal para remover linhas.
     * 
     * @type {boolean} removeRowsOpen - Flag para abrir ou fechar o modal de remoção de linhas.
     */
    const [removeRowsOpen, setRemoveRowsOpen] = useState(false);

    /**
     * Função para mudar o tipo de planilha selecionada.
     * 
     * @param {Event} event - Evento disparado pelo select ao escolher o tipo de planilha.
     */
    function mudarTipoPlanilha(event) {
        setTipoPlanilha(event.target.value);
        setMesclarColunaValue('nome');

        setTableHeader(() => {
            let arr = [];
            for (let i = 0; i < tableData[0].length; i++) {
                arr.push('nome');
            }
            return arr;
        })
    }

    /**
     * Função para abrir o modal do gerenciador de planilhas.
     */
    function abrirGerenciadorPlanilha() {
        setIsGerenciadorVisible(true);
    }

    /**
     * Função para fechar o modal do gerenciador de planilhas.
     */
    function fecharGerenciadorPlanilha() {
        setIsGerenciadorVisible(false);
    }

    return (
        <>
            <button onClick={abrirGerenciadorPlanilha}>Abrir modal</button>
            <div id="modalGerenciadorExcel" style={{ display: isGerenciadorVisible ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Gerenciador de planilhas</p>
                        <div>
                            <select id="tipoPlanilha" value={tipoPlanilha} onChange={mudarTipoPlanilha}>
                                <option value="cliente">Cliente</option>
                                <option value="lancamento">Lançamentos</option>
                                <option value="oportunidade">Oportunidade</option>
                                <option value="produtos">Produtos</option>
                            </select>
                            <span className="btn-close" onClick={fecharGerenciadorPlanilha}>&times;</span>
                        </div>
                    </div>
                    <div className="botoes-modal">
                        <ButtonBaixarPlanilha tableData={tableData} tableHeader={tableHeader} firstSheetName={firstSheetName} workbookName={workbookName} />
                        <ButtonApagaPlanilha setTableHeader={setTableHeader} setTableData={setTableData} setIsLoaded={setIsLoaded} setTipoPlanilha={setTipoPlanilha} setSelectedFile={setSelectedFile} />
                        <ButtonExportaPlanilha tableData={tableData} />
                        <ButtonJuntarDDDTelefone tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} />
                        <ButtonRemoveLinhas setRemoveRowsOpen={setRemoveRowsOpen} />
                        <ButtonModeloPadrao tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader} tipoPlanilha={tipoPlanilha} />
                        <ButtonMesclarColunas tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader} mesclarColunaValue={mesclarColunaValue} optionsTipoPlanilha={optionsTipoPlanilha} tipoPlanilha={tipoPlanilha} />
                    </div>
                    <CarregaPlanilha
                        tableHeader={tableHeader}
                        setTableHeader={setTableHeader}
                        tableData={tableData}
                        setTableData={setTableData}
                        isLoaded={isLoaded}
                        setIsLoaded={setIsLoaded}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setFirstSheetName={setFirstSheetName}
                        setWorkbookName={setWorkbookName}
                        removeRowsOpen={removeRowsOpen}
                        setRemoveRowsOpen={setRemoveRowsOpen}
                        tipoPlanilha={tipoPlanilha}
                    />
                </div>
            </div>
        </>
    )

}

export default ModalGerenciadorPlanilha;