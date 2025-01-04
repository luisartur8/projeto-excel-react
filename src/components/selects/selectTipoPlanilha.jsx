import PropTypes from 'prop-types';

function SelectTipoPlanilha({ index, tableHeader, setTableHeader }) {

    // Atualiza o select do header da table
    const handleSelectChange = (e) => {
        const updatedHeader = [...tableHeader];
        updatedHeader[index] = e.target.value;
        setTableHeader(updatedHeader);
    };

    return (
        <select id="tipoCliente" value={tableHeader[index]} onChange={(e) => handleSelectChange(e)}>
            <option value="nome">nome</option>
            <option value="telefone">telefone</option>
            <option value="cpf_cnpj">cpf_cnpj</option>
            <option value="data_nascimento">data_nascimento</option>
            <option value="genero">genero</option>
            <option value="email">email</option>
            <option value="anotacao">anotacao</option>
            <option value="DDD">DDD</option>
        </select>
    )

}

SelectTipoPlanilha.propTypes = {
    index: PropTypes.number.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
};

export default SelectTipoPlanilha;