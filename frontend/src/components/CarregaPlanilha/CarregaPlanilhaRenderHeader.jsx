import PropTypes from "prop-types";

import ButtonInserirNovaColuna from "@ButtonsHeader/ButtonInserirNovaColuna/ButtonInserirNovaColuna";
import ButtonRemoveColumn from "@ButtonsHeader/ButtonRemoveColumn/ButtonRemoveColumn";
import ButtonExecutarValidacao from "@ButtonsHeader/ButtonExecutarValidacao/ButtonExecutarValidacao";
import ButtonApagarLinhaVermelha from "@ButtonsHeader/ButtonApagaLinhaVermelha/apagarLinhaVermelha";
import ButtonLocalizarSubstituir from "@ButtonsHeader/ButtonLocalizarSubstituir/ButtonLocalizarSubstituir";
import ButtonOrdenarAlfabetico from "@ButtonsHeader/ButtonOrdenarAlfabetico/ButtonOrdenarAlfabetico";
import SelectTipoPlanilha from "@selects/selectTipoPlanilha";

/**
 * @component
 * 
 * Componente que renderiza o cabeçalho da tabela, incluindo botões de interação e funcionalidades de arrastar e soltar para reordenar as colunas.
 * 
 * @param {Array} tableData - Dados da tabela.
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {Array} tableHeader - Cabeçalho atual da tabela.
 * @param {Function} setTableHeader - Função para atualizar o cabeçalho da tabela.
 * @param {Function} executarValidacao - Função de validação que será executada nas células.
 * @param {Function} setDelColOpen - Função para abrir/fechar o modal de remoção de coluna.
 * @param {Function} setTelOpen - Função para abrir/fechar o modal de validação de telefone.
 * @param {Function} setIsValDataOpen - Função para abrir/fechar o modal de validação de data.
 * @param {Function} setSelectValueAtual - Função para atualizar o valor selecionado na validação.
 * @param {Function} setLocalSubstOpen - Função para abrir/fechar o modal de localizar/substituir.
 * @param {Function} setColumnIndexAtual - Função para definir o índice da coluna atual.
 * @param {Object} theme - Tema de estilização da tabela.
 * @param {string} tipoPlanilha - Tipo da planilha atual (para uso no SelectTipoPlanilha).
 * 
 * @returns {JSX.Element} Retorna uma table row com o header personalizado renderizado.
 */
function CarregaPlanilhaRenderHeader({
    tableData, setTableData,
    tableHeader, setTableHeader,
    executarValidacao,
    setDelColOpen,
    setTelOpen,
    setIsValDataOpen,
    setSelectValueAtual,
    setLocalSubstOpen,
    setColumnIndexAtual,
    theme,
    tipoPlanilha,
    colWidths
}) {

    /**
     * Função chamada quando o evento de "arrastar" começa, armazenando o índice da coluna.
     * @param {Event} e - Evento de arrastar.
     * @param {number} index - Índice da coluna sendo arrastada.
     */
    const onDragStart = (e, index) => {
        e.dataTransfer.setData("colunaIndex", index);
    };

    /**
    * Função chamada quando uma coluna é solta para alterar sua posição.
    * Atualiza tanto o cabeçalho quanto os dados da tabela para refletir a nova ordem.
    * 
    * @param {Event} e - Evento de "drop".
    * @param {number} targetIndex - Índice da coluna de destino para o "drop".
    */
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

    /**
     * Função chamada durante o evento de "dragover", permitindo o "drop" na área da coluna.
     * 
     * @param {Event} e - Evento de "dragover".
     */
    const onDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <tr style={{
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
        }}>
            <th style={{ width: `${colWidths[0]}px` }}></th>
            <th style={{ width: `${colWidths[1]}px` }}></th>
            {tableHeader.map((_, index) => (
                <th key={index}
                    style={{ width: `${colWidths[index + 2]}px` }}
                    draggable onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, index)}>
                    <div className="botoes-header">
                        <ButtonInserirNovaColuna
                            direction="left"
                            index={index}
                            tableData={tableData}
                            setTableData={setTableData}
                            tableHeader={tableHeader}
                            setTableHeader={setTableHeader}
                            theme={theme}
                        />
                        <div className="thead-icons-central">
                            <ButtonRemoveColumn
                                index={index}
                                setDelColOpen={setDelColOpen}
                                setColumnIndexAtual={setColumnIndexAtual}
                            />
                            <ButtonExecutarValidacao
                                index={index}
                                executarValidacao={executarValidacao}
                                setTelOpen={setTelOpen}
                                setIsValDataOpen={setIsValDataOpen}
                                setColumnIndexAtual={setColumnIndexAtual}
                                setSelectValueAtual={setSelectValueAtual}
                            />
                            <ButtonApagarLinhaVermelha
                                index={index}
                                tableData={tableData}
                                setTableData={setTableData}
                            />
                            <ButtonLocalizarSubstituir
                                setLocalSubstOpen={setLocalSubstOpen}
                                setColumnIndexAtual={setColumnIndexAtual}
                                index={index}
                            />
                            <ButtonOrdenarAlfabetico
                                index={index}
                                tableData={tableData}
                                setTableData={setTableData}
                            />
                        </div>
                        <ButtonInserirNovaColuna
                            direction="right"
                            index={index}
                            tableData={tableData}
                            setTableData={setTableData}
                            tableHeader={tableHeader}
                            setTableHeader={setTableHeader}
                            theme={theme}
                        />
                    </div>
                    <div className="selectAtual">
                        <SelectTipoPlanilha
                            index={index}
                            tableHeader={tableHeader}
                            setTableHeader={setTableHeader}
                            tipoPlanilha={tipoPlanilha}
                        />
                    </div>
                </th>
            ))}
        </tr>
    )
}

CarregaPlanilhaRenderHeader.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    executarValidacao: PropTypes.func.isRequired,
    setDelColOpen: PropTypes.func.isRequired,
    setTelOpen: PropTypes.func.isRequired,
    setIsValDataOpen: PropTypes.func.isRequired,
    setSelectValueAtual: PropTypes.func.isRequired,
    setLocalSubstOpen: PropTypes.func.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    tipoPlanilha: PropTypes.string.isRequired,
    colWidths: PropTypes.array.isRequired
}

export default CarregaPlanilhaRenderHeader;