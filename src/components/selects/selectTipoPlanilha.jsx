import PropTypes from 'prop-types';

import { optionsTipoPlanilha } from './optionsTipoPlanilha.js'

/**
 * @component
 * 
 * Componente para renderizar um select de tipo de planilha dentro do cabeçalho da tabela.
 * 
 * @param {number} index - Índice da coluna que o select está associado no cabeçalho da tabela.
 * @param {Array} tableHeader - Array que contém os valores do header da tabela.
 * @param {Function} setTableHeader - Função para atualizar o header da tabela.
 * @param {string} tipoPlanilha - Tipo de planilha ('cliente', 'lancamento', 'oportunidade', 'produtos').
 * 
 * @returns {JSX.Element|null} - Retorna o select renderizado.
 */
function SelectTipoPlanilha({ index, tableHeader, setTableHeader, tipoPlanilha }) {

    // Atualiza o select do header da table.
    const handleSelectChange = (e) => {
        const updatedHeader = [...tableHeader];
        updatedHeader[index] = e.target.value;
        setTableHeader(updatedHeader);
    };

    // Obtem os options dependendo do tipo da planilha.
    const options = optionsTipoPlanilha[tipoPlanilha];

    if (!options) {
        return null;
    }

    return (
        <select id={`tipo${tipoPlanilha}`} value={tableHeader[index]} onChange={handleSelectChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

}

SelectTipoPlanilha.propTypes = {
    index: PropTypes.number.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    tipoPlanilha: PropTypes.string.isRequired,
};

export default SelectTipoPlanilha;