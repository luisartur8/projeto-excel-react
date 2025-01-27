import PropTypes from "prop-types";
import { theme } from "@theme/theme";

/**
 * @component
 * 
 * Componente para organizar as colunas de uma planilha dependendo do tipo de planilha selecionada.
 * 
 * A função principal deste componente é reorganizar as colunas da planilha.
 * de acordo com a ordem definida para o tipo de planilha especificado.
 * 
 * @param {Array} tableData Dados da tabela que serão reorganizados.
 * @param {Function} setTableData Função para atualizar os dados da tabela após reorganização.
 * @param {Array} tableHeader Cabeçalho da tabela (nomes das colunas).
 * @param {Function} setTableHeader Função para atualizar o cabeçalho da tabela após reorganização.
 * @param {String} tipoPlanilha Tipo da planilha ('cliente', 'lancamento', 'oportunidade', 'produtos').
 * 
 * @returns {JSX.Element} Retorna um botão que organiza a planilha.
 */
function ButtonModeloPadrao({ tableData, setTableData, tableHeader, setTableHeader, tipoPlanilha }) {

    /**
     * Função para organizar a planilha de acordo com o tipo de planilha selecionado.
     * Verifica se há colunas repetidas, e reorganiza as colunas conforme a ordem
     * definida para o tipo de planilha.
     */
    function organizarPlanilha() {
        if (!tableData || tableData.length === 0) return null;

        let indexHeader = {};
        let colunasRepetidas = false;

        // Verifica se há colunas com o mesmo nome no header.
        tableHeader.forEach((header, index) => {
            if (header) {
                if (!indexHeader[header]) {
                    indexHeader[header] = [];
                }
                indexHeader[header].push(index);
                if (indexHeader[header].length > 1) {
                    colunasRepetidas = true;
                }
            }
        });

        if (colunasRepetidas) {
            alert('Não é permitido colunas com mesmo nome');
            return;
        }

        let ordem = [];

        if (tipoPlanilha === 'cliente') {
            ordem = [
                ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
                ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
                ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
                ...(Array.isArray(indexHeader.data_nascimento) ? indexHeader.data_nascimento : [-1]),
                ...(Array.isArray(indexHeader.genero) ? indexHeader.genero : [-1]),
                ...(Array.isArray(indexHeader.email) ? indexHeader.email : [-1]),
                ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1]),
                ...(Array.isArray(indexHeader.DDD) ? indexHeader.DDD : [-1])
            ];

            setTableHeader(['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'DDD']);
        } else if (tipoPlanilha === 'lancamento') {
            ordem = [
                ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
                ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
                ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
                ...(Array.isArray(indexHeader.valor_venda) ? indexHeader.valor_venda : [-1]),
                ...(Array.isArray(indexHeader.valor_resgate) ? indexHeader.valor_resgate : [-1]),
                ...(Array.isArray(indexHeader.anotacao_venda) ? indexHeader.anotacao : [-1]),
                ...(Array.isArray(indexHeader.item_venda) ? indexHeader.item_venda : [-1]),
                ...(Array.isArray(indexHeader.data_lancamento) ? indexHeader.data_lancamento : [-1]),
                ...(Array.isArray(indexHeader.nome_vendedor) ? indexHeader.nome_vendedor : [-1]),
                ...(Array.isArray(indexHeader.codigo_vendedor) ? indexHeader.codigo_vendedor : [-1]),
                ...(Array.isArray(indexHeader.DDD) ? indexHeader.DDD : [-1])
            ];

            setTableHeader(['nome', 'telefone', 'cpf_cnpj', 'valor_venda', 'valor_resgate', 'anotacao_venda', 'item_venda', 'data_lancamento', 'nome_vendedor', 'codigo_vendedor', 'DDD']);
        } else if (tipoPlanilha === 'oportunidade') {
            ordem = [
                ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
                ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
                ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
                ...(Array.isArray(indexHeader.data_nascimento) ? indexHeader.data_nascimento : [-1]),
                ...(Array.isArray(indexHeader.genero) ? indexHeader.genero : [-1]),
                ...(Array.isArray(indexHeader.email) ? indexHeader.email : [-1]),
                ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1]),
                ...(Array.isArray(indexHeader.DDD) ? indexHeader.DDD : [-1]),
                ...(Array.isArray(indexHeader.bonus_valor) ? indexHeader.bonus_valor : [-1]),
                ...(Array.isArray(indexHeader.bonus_validade) ? indexHeader.bonus_validade : [-1])
            ];

            setTableHeader(['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'DDD', 'bonus_valor', 'bonus_validade']);
        } else if (tipoPlanilha === 'produtos') {
            ordem = [
                ...(Array.isArray(indexHeader.codigo) ? indexHeader.codigo : [-1]),
                ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
                ...(Array.isArray(indexHeader.percentual) ? indexHeader.percentual : [-1]),
                ...(Array.isArray(indexHeader.validade) ? indexHeader.validade : [-1])
            ];

            setTableHeader(['codigo', 'nome', 'percentual', 'validade']);
        };

        // O array [ordem] vem com os indices de cada coluna de [tableData] já em ordem
        const updatedData = tableData.map(row => {
            return ordem.map(index => {
                return index === -1 ? { value: '', style: { backgroundColor: theme.primaryColor } } : row[index];
            });
        })

        setTableData(updatedData);

    }

    return (
        <button id="button-modelo-padrao" className="button-padrao" onClick={organizarPlanilha}>Modelo padrão</button>
    )

}

ButtonModeloPadrao.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    tipoPlanilha: PropTypes.string.isRequired
}

export default ButtonModeloPadrao;