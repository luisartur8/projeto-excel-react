import { useEffect, useState } from "react";

import './ModalGerenciadorPlanilha.css';
import './tableExcel.css';

import CarregaPlanilha from '@CarregaPlanilha/CarregaPlanilha.jsx';

import ButtonApagaPlanilha from "@ButtonsGerenciador/ButtonApagaPlanilha";
import ButtonExportaPlanilha from "@ButtonsGerenciador/ButtonExportaPlanilha";
import ButtonJuntarDDDTelefone from "@ButtonsGerenciador/ButtonJuntarDDDTelefone";
import ButtonRemoveLinhas from "@ButtonsGerenciador/ButtonRemoveLinhas/ButtonRemoveLinhas";
import ButtonBaixarPlanilha from "@ButtonsGerenciador/ButtonBaixarPlanilha/ButtonBaixarPlanilha";
import ButtonModeloPadrao from "@ButtonsGerenciador/ButtonModeloPadrao";
import ButtonMesclarColunas from "@ButtonsGerenciador/ButtonMesclarColunas.jsx";

import { optionsTipoPlanilha } from '@selects/optionsTipoPlanilha.js'

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
     * @type {boolean} isDownloadSheetOpen - Flag para exibir ou esconder o modal de download de planilha.
     * @type {string} mesclarColunaValue - Valor da coluna a ser mesclada.
     */
    const [tipoPlanilha, setTipoPlanilha] = useState('cliente');
    const [isGerenciadorVisible, setIsGerenciadorVisible] = useState(false);
    const [mesclarColunaValue, setMesclarColunaValue] = useState('nome');

    /**
     * Estado dos modals.
     * 
     * Abre os modais de download, delete column, localizar e substituir e validações.
     * 
     * @type {boolean} isDownloadSheetOpen
     * @type {boolean} isDelColOpen
     * @type {boolean} isLocalSubstOpen
     * @type {boolean} isTelOpen
     * @type {boolean} isValDataOpen
     */
    const [isDownloadSheetOpen, setIsDownloadSheetOpen] = useState(false);
    const [isDelColOpen, setDelColOpen] = useState(false);
    const [isLocalSubstOpen, setLocalSubstOpen] = useState(false);
    const [isTelOpen, setTelOpen] = useState(false);
    const [isValDataOpen, setIsValDataOpen] = useState(false);

    /**
     * Estado do modal para remover linhas.
     * 
     * @type {boolean} removeRowsOpen - Flag para abrir ou fechar o modal de remoção de linhas.
     */
    const [removeRowsOpen, setRemoveRowsOpen] = useState(false);

    const [historic, setHistoric] = useState([]);

    // Atualiza o histórico de alterações na tabela.
    useEffect(() => {
        if (tableData.length === 0) {
            return;
        }

        const lastEntry = historic.length > 0 ? historic[historic.length - 1] : null;

        if (!lastEntry || JSON.stringify(lastEntry) !== JSON.stringify(tableData)) {
            setHistoric((prevHistoric) => {
                if (prevHistoric.length > 0 && JSON.stringify(prevHistoric[prevHistoric.length - 1]) === JSON.stringify(tableData)) {
                    return prevHistoric;
                }

                const newHistoric = [...prevHistoric, tableData];

                if (newHistoric.length > 20) {
                    newHistoric.shift();
                }

                return newHistoric;
            });
        }

        console.log("1 - ", historic);
        console.log("2 - ", tableData);
    }, [tableData]);

    useEffect(() => {
        // Fechar todos os modals se o gerenciador estiver fechado.
        if (!isGerenciadorVisible || !isLoaded) {
            setIsDownloadSheetOpen(false);
            setDelColOpen(false);
            setLocalSubstOpen(false);
            setTelOpen(false);
            setIsValDataOpen(false);
        }
    }, [isGerenciadorVisible, isLoaded]);

    /**
     * Função para mudar o tipo de planilha selecionada.
     * 
     * @param {Event} event - Evento disparado pelo select ao escolher o tipo de planilha.
     */
    function mudarTipoPlanilha(event) {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        }

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
                        <div className="top-right-header-gerenciador">
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
                        <ButtonBaixarPlanilha setIsDownloadSheetOpen={setIsDownloadSheetOpen} isLoaded={isLoaded} />
                        <ButtonApagaPlanilha setTableHeader={setTableHeader} setTableData={setTableData} setIsLoaded={setIsLoaded} setTipoPlanilha={setTipoPlanilha} setSelectedFile={setSelectedFile} />
                        <ButtonExportaPlanilha tableData={tableData} tableHeader={tableHeader} tipoPlanilha={tipoPlanilha} />
                        <ButtonJuntarDDDTelefone tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} />
                        <ButtonRemoveLinhas setRemoveRowsOpen={setRemoveRowsOpen} isLoaded={isLoaded} />
                        <ButtonModeloPadrao tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader} tipoPlanilha={tipoPlanilha} />
                        <ButtonMesclarColunas tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader} mesclarColunaValue={mesclarColunaValue} setMesclarColunaValue={setMesclarColunaValue} optionsTipoPlanilha={optionsTipoPlanilha} tipoPlanilha={tipoPlanilha} />
                    </div>
                    <CarregaPlanilha
                        tableHeader={tableHeader}
                        setTableHeader={setTableHeader}
                        tableData={tableData}
                        setTableData={setTableData}
                        isLoaded={isLoaded}
                        setIsLoaded={setIsLoaded}
                        isDownloadSheetOpen={isDownloadSheetOpen}
                        setIsDownloadSheetOpen={setIsDownloadSheetOpen}
                        firstSheetName={firstSheetName}
                        workbookName={workbookName}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setFirstSheetName={setFirstSheetName}
                        setWorkbookName={setWorkbookName}
                        removeRowsOpen={removeRowsOpen}
                        setRemoveRowsOpen={setRemoveRowsOpen}
                        isDelColOpen={isDelColOpen}
                        setDelColOpen={setDelColOpen}
                        isLocalSubstOpen={isLocalSubstOpen}
                        setLocalSubstOpen={setLocalSubstOpen}
                        isTelOpen={isTelOpen}
                        setTelOpen={setTelOpen}
                        isValDataOpen={isValDataOpen}
                        setIsValDataOpen={setIsValDataOpen}
                        tipoPlanilha={tipoPlanilha}
                        historic={historic}
                        setHistoric={setHistoric}
                    />
                </div>
            </div>
        </>
    )

}

export default ModalGerenciadorPlanilha;