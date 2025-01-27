import PropTypes from 'prop-types';
import listaValidaImg from '../../assets/icon-header/lista-valida.png';

function ButtonExecutarValidacao({ index, executarValidacao, setTelOpen, setColumnIndexAtual }) {

    const abrirModalValidacao = (e, columnIndex) => {

        // Setar column index para ser usado no modal
        setColumnIndexAtual(columnIndex);

        const selectValue = e.target.closest('th').querySelector('select').value;

        if (selectValue === 'telefone') {
            setTelOpen(true);
            return;
        }

        if (selectValue === 'data_nascimento' || selectValue === 'data_lancamento') {
            return;
        }

        executarValidacao(selectValue, columnIndex);
    };

    return (
        <>
            <button className="btn-executar-validacao" onClick={(e) => abrirModalValidacao(e, index)}>
                <img src={listaValidaImg} alt="Validação" />
            </button>
        </>
    )
}

ButtonExecutarValidacao.propTypes = {
    index: PropTypes.number.isRequired,
    executarValidacao: PropTypes.func.isRequired,
    setTelOpen: PropTypes.func.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired
};

export default ButtonExecutarValidacao;