import PropTypes from "prop-types";

function ButtonOrdenarAlfabetico({ index, tableData, setTableData }) {

    function ordenarAlfabetico(ordem, index) {
        if (!tableData) return;

        const ordemRed = [];
        const ordemNormal = [];

        // Separa as linhas com base no backgroundColor
        tableData.forEach((row) => {
            const cellData = row[index];
            if (cellData) {
                if (cellData.style.backgroundColor === 'red') {
                    ordemRed.push({ cellContent: cellData.value, row });
                } else {
                    ordemNormal.push({ cellContent: cellData.value, row });
                }
            }
        });

        // Função para comparar os valores e garantir que os espaços em branco venham por último
        function compareWithWhitespaceHandling(a, b) {
            // Se ambos são espaços em branco ou vazios, mantem a ordem
            if (!a.cellContent && !b.cellContent) return 0;

            // Se um deles é vazio ou contém apenas espaços, ele vai para o final
            if (!a.cellContent || a.cellContent.trim() === "") return 1;
            if (!b.cellContent || b.cellContent.trim() === "") return -1;

            // Caso contrário, faz a comparação padrão
            if (ordem === 'crescente') {
                return a.cellContent.localeCompare(b.cellContent);
            } else if (ordem === 'decrescente') {
                return b.cellContent.localeCompare(a.cellContent);
            }

            return 0;
        }

        ordemRed.sort(compareWithWhitespaceHandling);
        ordemNormal.sort(compareWithWhitespaceHandling);

        // Junta as linhas ordenadas: primeiro as linhas vermelhas, depois as normais
        const updatedData = [
            ...ordemRed.map(item => item.row),
            ...ordemNormal.map(item => item.row)
        ];

        setTableData(updatedData);
    }

    return (
        <>
            <button className="btn-ordenar-crescente" onClick={() => ordenarAlfabetico('crescente', index)}>AZ</button>
            <button className="btn-ordenar-decrescente" onClick={() => ordenarAlfabetico('decrescente', index)}>ZA</button>
        </>
    )

}

ButtonOrdenarAlfabetico.propTypes = {
    index: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
}

export default ButtonOrdenarAlfabetico;