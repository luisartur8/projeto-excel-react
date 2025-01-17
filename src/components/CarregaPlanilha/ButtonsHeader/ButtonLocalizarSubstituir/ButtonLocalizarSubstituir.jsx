import PropTypes from 'prop-types';

import lupaImg from '@assets/icon-header/lupa.png';

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
function ButtonLocalizarSubstituir({ setLocalSubstOpen }) {

    /**
     * Função que abre a interface de localizar e substituir.
     * 
     * @return {void} Não retorna nada, apenas abre o modal "Localizar e Substituir".
     */
    const abrirLocalizarSubstituir = () => {
        setLocalSubstOpen(true);
    }

    return (
        <button className="btn-abrir-localizar-substituir" onClick={abrirLocalizarSubstituir}>
            <img src={lupaImg} alt="Localizar" />
        </button>
    )
}

ButtonLocalizarSubstituir.propTypes = {
    setLocalSubstOpen: PropTypes.func.isRequired,
}

export default ButtonLocalizarSubstituir;