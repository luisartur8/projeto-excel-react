import PropTypes from "prop-types";
import { theme } from "@theme/theme";

/**
 * @component
 * 
 * Componente ButtonJuntarDDDTelefone.
 *
 * Botão que, quando clicado, junta os valores das colunas 'DDD' e 'telefone' na coluna de telefone,
 * concatenando o DDD com o número do telefone.
 * 
 * @param {Array} tableData - Dados da tabela, contendo as células a serem modificadas.
 * @param {Function} setTableData - Função que atualiza os dados da tabela com os novos valores.
 * @param {Array} tableHeader - Cabeçalho da tabela, utilizado para identificar as colunas 'DDD' e 'telefone'.
 *
 * @returns {JSX.Element} Retorna o botão que executa a ação de juntar o DDD com o telefone.
 */
function ButtonJuntarDDDTelefone({ tableData, setTableData, tableHeader }) {

    /**
     * Função que junta os valores das colunas 'DDD' e 'telefone'.
     * A função verifica se existe exatamente uma coluna 'DDD' e pelo menos uma coluna 'telefone'.
     * Se essas condições forem atendidas, a função concatena os valores do DDD com os números de telefone
     * e atualiza os dados da tabela.
     */
    function mergeDDDTelefone() {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        };

        let indexDDD = [];
        let indexTelefone = [];

        // Encontrar os índices das colunas DDD e telefone.
        tableHeader.map((cell, index) => {
            if (cell === 'DDD') {
                indexDDD.push(index);
            }

            if (cell === 'telefone') {
                indexTelefone.push(index);
            }
        });

        // Verificar se há apenas um DDD e pelo menos um telefone.
        if (!(indexDDD.length === 1 && indexTelefone.length >= 1)) {
            alert('Apenas 1 DDD, e no mínimo 1 telefone');
            return;
        }

        // Junta o DDD com o telefone na celula do telefone.
        const updatedData = tableData.map(row => {
            const ddd = row[indexDDD].value;
            let newRow = [...row];

            for (let i = 0; i < indexTelefone.length; i++) {
                const telefoneIndex = indexTelefone[i];
                const telefone = row[telefoneIndex].value;

                const numeroCompleto = ddd + telefone;

                newRow[telefoneIndex] = { value: numeroCompleto, style: { backgroundColor: theme.primaryColor } };
            }

            return newRow;
        });

        setTableData(updatedData);
    }

    return (
        <button id="junta-ddd-telefone" className="button-padrao" onClick={mergeDDDTelefone} >Juntar DDD e telefone</button>
    )
}

ButtonJuntarDDDTelefone.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired
}

export default ButtonJuntarDDDTelefone;