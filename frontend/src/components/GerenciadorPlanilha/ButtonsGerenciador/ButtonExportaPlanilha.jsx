import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente ButtonExportaPlanilha.
 *
 * Botão que, quando clicado, executa a ação de exportação dos dados da tabela.
 * Este componente representa um botão que, quando clicado faz a exportação da planilha para o banco de dados.
 * Ele tem alguns metodos de validação, como a validação do cabeçalho em relação ao tipo da planilha e a transformação de tableData em um objeto.
 *
 * @param {Array} tableData - Dados da tabela a serem exportados. Deve ser um array contendo os dados da tabela. [[col1, col2, col3][col1, col2, col3]]
 * @param {Array} tableHeader - Cabeçalho da tabela, usado para construção do JSON e validação da planilha.
 * @param {string} tipoPlanilha - O tipo da planilha que está sendo exportada.
 *
 * @returns {JSX.Element} Retorna o botão de exportação de planilha.
 */
function ButtonExportaPlanilha({ tableData, tableHeader, tipoPlanilha }) {

    /**
     * Função que valida se o cabeçalho da tabela está de acordo com o tipo de planilha.
     * 
     * @return {boolean} Retorna true se os dados são consistentes entre si, caso contrário retorna false.
     */
    function isValidTableHeader(tableHeader, tipoPlanilha) {
        const tipoCliente = ['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao'];
        const tipoLancamento = ['nome', 'telefone', 'cpf_cnpj', 'valor_venda', 'valor_resgate', 'anotacao_venda', 'item_venda', 'data_lancamento', 'nome_vendedor', 'codigo_vendedor'];
        const tipoOportunidade = ['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'bonus_valor', 'bonus_validade'];
        const tipoProdutos = ['codigo', 'nome', 'percentual', 'validade'];

        if (tipoPlanilha === 'cliente') {
            tipoPlanilha = tipoCliente;
        } else if (tipoPlanilha === 'lancamento') {
            tipoPlanilha = tipoLancamento;
        } else if (tipoPlanilha === 'oportunidade') {
            tipoPlanilha = tipoOportunidade;
        } else if (tipoPlanilha === 'produtos') {
            tipoPlanilha = tipoProdutos;
        }

        if (tableHeader.length !== tipoPlanilha.length) {
            return false;
        }

        // O tableHeader e o tipoPlanilha devem ser exatamente iguais, na mesma ordem.
        for (let i = 0; i < tableHeader.length; i++) {
            if (tableHeader[i] !== tipoPlanilha[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Função transforma a planilha tableData (Um array de arrays), em um Objeto.
     * 
     * @return {object} Retorna um objeto com o tableHeader sendo as keys e o tableData os valores do objeto.
     */
    function transformToObject(tableData, tableHeader) {
        return tableData.map(row => {
            const obj = {};
            tableHeader.forEach((header, index) => {
                obj[header] = row[index].value;
            });
            return obj;
        });
    }

    /**
     * Função que executa a exportação dos dados da tabela.
     * Ela valida se o cabeçalho da tabela é consistente com o tipo de planilha sendo exportada.
     * Transforma a tabela em um JSON e envia para o banco de dados.
     * 
     * @throws {Error} Caso ocorra algum erro na requisição ou ao transformar os dados.
     */
    async function exportSheet() {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        }

        if (!isValidTableHeader(tableHeader, tipoPlanilha)) {
            alert(`A tabela deve estar com o cabeçalho consistente com o tipo de planilha: '${tipoPlanilha}'`);
            return;
        }

        let data = transformToObject(tableData, tableHeader);

        const rotaAPI = {
            cliente: 'http://localhost:4444/clientes',
            lancamento: 'http://localhost:4444/lancamentos',
            oportunidade: 'http://localhost:4444/oportunidades',
            produtos: 'http://localhost:4444/produtos'
        }

        try {
            const response = await fetch(rotaAPI[tipoPlanilha], {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Adicionado com sucesso", result);
            } else {
                console.error("Erro ao adicionar", response.status);
            }
        } catch (error) {
            console.error("Erro de rede", error);
        }

    }

    return (
        <button className="button-padrao" onClick={exportSheet}>Exportar planilha</button>
    )

}

ButtonExportaPlanilha.propTypes = {
    tableData: PropTypes.array.isRequired,
    tableHeader: PropTypes.array.isRequired,
    tipoPlanilha: PropTypes.string.isRequired
}

export default ButtonExportaPlanilha;