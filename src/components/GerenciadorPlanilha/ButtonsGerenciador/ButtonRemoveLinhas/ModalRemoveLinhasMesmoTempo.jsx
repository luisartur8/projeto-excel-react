import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente responsável por remover linhas de uma tabela quando determinadas linhas estão vazias.
 * Ele verifica as colunas selecionadas pelo usuário e, se todas as células de uma linha nas colunas selecionadas estiverem vazias, essa linha será removida.
 * 
 * @param {Array} tableData - Dados da tabela, que são uma lista de linhas e colunas.
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {Function} setInfoRemovedRowCols - Função para atualizar a mensagem de informações sobre as linhas removidas.
 * @param {Array} tableHeader - Header da tabela, que contém os nomes das colunas.
 * Indica se a coluna está selecionada para remoção:
 * @param {boolean} cbNome
 * @param {boolean} cbTelefone
 * @param {boolean} cbCpfCnpj
 * @param {boolean} cbDataNascimento
 * @param {boolean} cbGenero
 * @param {boolean} cbEmail
 * @param {boolean} cbAnotacao
 * 
 * @returns {JSX.Element} - Retorna um botão para disparar a remoção das linhas.
 */
function ModalRemoveLinhasMesmoTempo({
    tableData,
    setTableData,
    setInfoRemovedRowCols,
    tableHeader,
    cbNome,
    cbTelefone,
    cbCpfCnpj,
    cbDataNascimento,
    cbGenero,
    cbEmail,
    cbAnotacao
}) {

    /**
     * Função que remove as linhas da tabela onde todas as células das colunas selecionadas estão vazias.
     * 
     * A função percorre as linhas da tabela e verifica as células das colunas selecionadas (através dos checkboxes).
     * Se todas as células de uma linha nas colunas selecionadas estiverem vazias, essa linha será removida.
     * 
     * A função também atualiza a mensagem sobre quantas linhas foram removidas.
     */
    function removeSpecificRows() {
        if (!tableData || tableData.length === 0) return null;

        let indexNome = [];
        let indexTelefone = [];
        let indexCpf_cnpj = [];
        let indexData_nascimento = [];
        let indexGenero = [];
        let indexEmail = [];
        let indexAnotacao = [];

        let linhasRemovidas = 0;

        // Mapeia as colunas selecionadas e armazena seus índices.
        tableHeader.map((cell, index) => {
            switch (cell) {
                case 'nome': indexNome.push(index); break;
                case 'telefone': indexTelefone.push(index); break;
                case 'cpf_cnpj': indexCpf_cnpj.push(index); break;
                case 'data_nascimento': indexData_nascimento.push(index); break;
                case 'genero': indexGenero.push(index); break;
                case 'email': indexEmail.push(index); break;
                case 'anotacao': indexAnotacao.push(index); break;
            }
        })

        // Filtra as linhas da tabela, removendo as que possuem todas as células vazias nas colunas selecionadas.
        const updatedData = tableData.filter(row => {
            let todasVazias = true;

            if (cbNome) {
                for (let j = 0; j < indexNome.length; j++) {
                    const colunaNome = indexNome[j];

                    if (row[colunaNome].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexNome.length === 0) {
                    todasVazias = false;
                }
            }

            if (cbTelefone) {
                for (let j = 0; j < indexTelefone.length; j++) {
                    const colunaTelefone = indexTelefone[j];

                    if (row[colunaTelefone].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexTelefone.length === 0) {
                    todasVazias = false;
                }
            }

            if (cbCpfCnpj) {
                for (let j = 0; j < indexCpf_cnpj.length; j++) {
                    const colunaCpf_cnpj = indexCpf_cnpj[j];

                    if (row[colunaCpf_cnpj].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexCpf_cnpj.length === 0) {
                    todasVazias = false;
                }
            }

            if (cbDataNascimento) {
                for (let j = 0; j < indexData_nascimento.length; j++) {
                    const colunaData = indexData_nascimento[j];

                    if (row[colunaData].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexData_nascimento.length === 0) {
                    todasVazias = false;
                }
            }

            if (cbGenero) {
                for (let j = 0; j < indexGenero.length; j++) {
                    const colunaGenero = indexGenero[j];

                    if (row[colunaGenero].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexGenero.length === 0) {
                    todasVazias = false;
                }
            }

            if (cbEmail) {
                for (let j = 0; j < indexEmail.length; j++) {
                    const colunaEmail = indexEmail[j];

                    if (row[colunaEmail].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexEmail.length === 0) {
                    todasVazias = false;
                }
            }

            if (cbAnotacao) {
                for (let j = 0; j < indexAnotacao.length; j++) {
                    const colunaAnotacao = indexAnotacao[j];

                    if (row[colunaAnotacao].value.trim() !== '') {
                        todasVazias = false;
                        break;
                    }
                }

                if (indexAnotacao.length === 0) {
                    todasVazias = false;
                }
            }

            if (todasVazias) {
                linhasRemovidas++;
                return false;
            }

            return true;
        })

        const message = linhasRemovidas === 0
            ? "Nenhuma linha foi removida"
            : `Foram removidas ${linhasRemovidas} linha${linhasRemovidas > 1 ? 's' : ''}`;

        setInfoRemovedRowCols(message);
        setTableData(updatedData);
    }

    return (
        <button className="remover-linhas-especificas remover-linha-botao" onClick={removeSpecificRows}>Remover</button>
    )
}

ModalRemoveLinhasMesmoTempo.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    setInfoRemovedRowCols: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    cbNome: PropTypes.bool.isRequired,
    cbTelefone: PropTypes.bool.isRequired,
    cbCpfCnpj: PropTypes.bool.isRequired,
    cbDataNascimento: PropTypes.bool.isRequired,
    cbGenero: PropTypes.bool.isRequired,
    cbEmail: PropTypes.bool.isRequired,
    cbAnotacao: PropTypes.bool.isRequired
}

export default ModalRemoveLinhasMesmoTempo;