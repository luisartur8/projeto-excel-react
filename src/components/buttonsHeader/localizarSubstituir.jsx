import lupaImg from '../../assets/icon-header/lupa.png';
import PropTypes from 'prop-types';

function ButtonLocalizarSubstituir({ index, isLocalSubstOpen, setLocalSubstOpen, setColumnIndexAtual }) {

    function abrirLocalizarSubstituir() {
        setLocalSubstOpen(true);
    }

    return (
        <button className="btn-abrir-localizar-substituir" onClick={abrirLocalizarSubstituir}>
            <img src={lupaImg} alt="Localizar" />
        </button>
    )
}

ButtonLocalizarSubstituir.propTypes = {
    index: PropTypes.number.isRequired,
    isLocalSubstOpen: PropTypes.bool.isRequired,
    setLocalSubstOpen: PropTypes.func.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired,
}

export default ButtonLocalizarSubstituir;