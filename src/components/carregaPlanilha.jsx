import { useEffect, useState } from "react";

// Biblioteca para manipulação de arquivos excel
import * as XLSX from "xlsx";

// CSS
import '../css/ModalGerenciadorPlanilha.css';
import '../css/tableExcel.css';

// Buttons Header
import ButtonRemoveColumn from "./buttonsHeader/removerColuna.jsx";
import ButtonExecutarValidacao from "./buttonsHeader/executarValidacao.jsx";
import ButtonApagarLinhaVermelha from "./buttonsHeader/apagarLinhaVermelha.jsx";
import ButtonLocalizarSubstituir from "./buttonsHeader/localizarSubstituir.jsx";
import ButtonOrdenarAlfabetico from "./buttonsHeader/ordenarAlfabetico.jsx";
import SelectTipoPlanilha from "./selects/selectTipoPlanilha.jsx";

// Modals
import ModalDeleteColumn from "./modals/modalPopUpDeleteColumn.jsx";
import ModalValidaTelefone from "./modals/modalValidacaoTelefone.jsx";
import ModalLocalizarSubstituir from "./modals/modalLocalizarSubstituir.jsx";

// Utils
import { validarCelula } from "./utils/validacao.js";

// Configs
import { theme } from "../config/theme.js";

function CarregaPlanilha() {
    // Table
    const [tableHeader, setTableHeader] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [columnIndexAtual, setColumnIndexAtual] = useState(null);

    // Upload sheet
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Modals
    const [isDelColOpen, setDelColOpen] = useState(false);
    const [isTelOpen, setTelOpen] = useState(false);
    const [isLocalSubstOpen, setLocalSubstOpen] = useState(false);

    useEffect(() => {
        console.log('carregaPlanilha rendered!')
    })

    // Função para carregar a planilha
    const handleFileUpload = () => {
        if (!selectedFile) {
            alert("Por favor, selecione um arquivo Excel primeiro.");
            return;
        }

        // Configuração do leitor
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "" // Celulas null se tornam uma string vazia
            });

            const updatedData = jsonData.map((row) => {
                return row.map((cell) => {
                    return { value: cell, style: { backgroundColor: theme.primaryColor } };
                });
            });

            setTableData(updatedData);

            // Inicializa o tableHeader
            setTableHeader(() => {
                let arr = [];
                for (let i = 0; i < jsonData[0].length; i++) {
                    arr.push("");
                }
                return arr;
            })
            setIsLoaded(true);
        };

        // Leitura do arquivo selecionado
        reader.readAsArrayBuffer(selectedFile);
    };

    // Função chamada quando o arquivo é selecionado
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const inserirNovaColuna = (direction, columnIndex) => {
        const updatedData = tableData.map((row) => {
            if (direction === "left") {
                row.splice(columnIndex, 0, "");
            } else if (direction === 'right') {
                row.splice(columnIndex + 1, 0, "");
            }
            return row;
        });
        setTableData(updatedData);

        const updatedHeader = [...tableHeader];
        if (direction === "left") {
            updatedHeader.splice(columnIndex, 0, "");
        } else if (direction === 'right') {
            updatedHeader.splice(columnIndex + 1, 0, "");
        }

        setTableHeader(updatedHeader);
    };

    const removeRow = (index) => {
        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
    };

    const onDragStart = (e, index) => {
        e.dataTransfer.setData("colunaIndex", index);
    };

    const onDrop = (e, targetIndex) => {
        const sourceIndex = parseInt(e.dataTransfer.getData("colunaIndex"), 10);

        const updatedHeader = [...tableHeader];
        const [movedHeader] = updatedHeader.splice(sourceIndex, 1);
        updatedHeader.splice(targetIndex, 0, movedHeader);
        setTableHeader(updatedHeader);

        const updatedData = tableData.map(row => {
            const newRow = [...row];
            const [movedCell] = newRow.splice(sourceIndex, 1);
            newRow.splice(targetIndex, 0, movedCell);
            return newRow;
        });
        setTableData(updatedData);
    };

    const onDragOver = (e) => {
        e.preventDefault(); // Permite o drop
    };

    const executarValidacao = (selectValue, columnIndex, cb, ddd) => {
        const updatedData = tableData.map((row) => {
            const cellData = row[columnIndex];

            if (cellData) {
                const originalValue = cellData.value;
                const correctedValue = validarCelula(originalValue, selectValue, cb, ddd);

                if (correctedValue === '' && originalValue !== '') {
                    row[columnIndex] = { value: originalValue, style: { backgroundColor: theme.secondaryColor } };
                } else {
                    row[columnIndex] = { value: correctedValue, style: { backgroundColor: theme.primaryColor } };
                }
            }

            return row;
        });

        setTableData(updatedData);
    }

    // Carrega o <th> da table para cada coluna
    const renderHeader = () => {
        if (!tableData || tableData.length === 0) return null;

        return (
            <tr>
                <th></th>
                <th></th>
                {tableHeader.map((_, index) => (
                    <th key={index}
                        draggable onDragStart={(e) => onDragStart(e, index)}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, index)}>
                        <div className="botoes-header">
                            <span className="btn-inserir-esquerda" onClick={() => inserirNovaColuna('left', index)}>{"<"}</span>
                            <div className="thead-icons-central">
                                <ButtonRemoveColumn index={index} setDelColOpen={setDelColOpen} setColumnIndexAtual={setColumnIndexAtual}/>
                                <ButtonExecutarValidacao index={index} executarValidacao={executarValidacao} setTelOpen={setTelOpen} setColumnIndexAtual={setColumnIndexAtual} />
                                <ButtonApagarLinhaVermelha index={index} tableData={tableData} setTableData={setTableData} />
                                <ButtonLocalizarSubstituir index={index} isLocalSubstOpen={isLocalSubstOpen} setLocalSubstOpen={setLocalSubstOpen} setColumnIndexAtual={setColumnIndexAtual} />
                                <ButtonOrdenarAlfabetico index={index} tableData={tableData} setTableData={setTableData} />
                            </div>
                            <span className="btn-inserir-direita" onClick={() => inserirNovaColuna('right', index)}>{">"}</span>
                        </div>
                        <div className="selectAtual">
                            <SelectTipoPlanilha index={index} tableHeader={tableHeader} setTableHeader={setTableHeader} />
                        </div>
                    </th>
                ))}
            </tr>
        );
    };

    // Carrega o body da table
    const renderBody = () => {
        return (
            <>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>
                            <button onClick={() => removeRow(rowIndex)}>X</button>
                        </td>
                        <td>{rowIndex + 1}</td>
                        {row.map((cell, colIndex) => {
                            return (
                                <td key={colIndex} style={cell.style}>{cell.value || ""}</td>
                            )
                        })}
                    </tr>
                ))}
            </>
        )
    }

    // Carrega toda a table
    const renderTable = () => {
        if (!tableData || tableData.length === 0) return null;

        return (
            <>
                <table className="minha-tabela">
                    <thead>
                        {renderHeader()}
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </table>
                <ModalDeleteColumn isDelColOpen={isDelColOpen} setDelColOpen={setDelColOpen} columnIndexAtual={columnIndexAtual || 0} tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader}/>
                <ModalValidaTelefone isTelOpen={isTelOpen} setTelOpen={setTelOpen} executarValidacao={executarValidacao} columnIndexAtual={columnIndexAtual || 0} />
                <ModalLocalizarSubstituir isLocalSubstOpen={isLocalSubstOpen} setLocalSubstOpen={setLocalSubstOpen} columnIndexAtual={columnIndexAtual || 0} tableData={tableData} setTableData={setTableData} />
            </>
        );
    };

    return (
        <div id="table-excel" className="table-excel">
            {isLoaded ? (
                <>
                    {renderTable()}
                </>
            ) : (
                <div className="nenhuma-planilha">
                    <p>Nenhuma planilha carregada</p>
                    <input type="file" id="upload-planilha" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button id="button-carrega-planilha" className="button-padrao" onClick={handleFileUpload}>Carregar Planilha</button>
                </div>
            )}
        </div>
    );
}

export default CarregaPlanilha;
