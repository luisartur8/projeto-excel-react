import PropTypes from 'prop-types';

import { FaMagnifyingGlass } from "react-icons/fa6";

/**
 * @component
 * 
 * Componente ButtonLocalizarSubstituir
 *
 * Botão que, quando clicado, abre o modal localizar e substituir.
 * 
 * @param {function} setLocalSubstOpen - Função para alterar o estado de visibilidade do modal localizar e substituir.
 * 
 * @return {JSX.Element} O botão que, ao ser clicado, abre o modal de localizar e substituir.
 */
function ButtonLocalizarSubstituir({ setLocalSubstOpen, setColumnIndexAtual, index }) {

    /**
     * Função que abre a interface de localizar e substituir.
     * 
     * @return {void} Não retorna nada, apenas abre o modal "Localizar e Substituir".
     */
    const abrirLocalizarSubstituir = () => {
        setColumnIndexAtual(index);
        setLocalSubstOpen(true);
    }

    return (
        <button className="btn-abrir-localizar-substituir" onClick={abrirLocalizarSubstituir}>
            <FaMagnifyingGlass size={16} />
        </button>
    )
}

ButtonLocalizarSubstituir.propTypes = {
    setLocalSubstOpen: PropTypes.func.isRequired,
    setColumnIndexAtual: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default ButtonLocalizarSubstituir;