import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente ButtonBaixarPlanilha.
 *
 * Botão que, quando clicado, abre um modal que exporta os dados da tabela para um arquivo Excel (.xlsx).
 * O modal aberto converte os dados da tabela (incluindo o cabeçalho) para uma planilha Excel e permite o download do arquivo.
 *
 * @param {Function} setIsDownloadSheetOpen - Função que seta um boolean true para abrir o modal.
 *
 * @returns {JSX.Element} Retorna um botão que abre o modal para configurar o download da planilha.
 */
function ButtonBaixarPlanilha({ setIsDownloadSheetOpen, isLoaded }) {

    /**
     * Abre um modal para configurar o download da tabela em um arquivo excel.
     */
    function openBaixarPlanilha() {
        if (isLoaded) {
            setIsDownloadSheetOpen(true);
        }
    }

    return (
        <button id="button-baixar-planilha" className="button-padrao" onClick={openBaixarPlanilha}>Baixar planilha</button>
    )

}

ButtonBaixarPlanilha.propTypes = {
    setIsDownloadSheetOpen: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired
}

export default ButtonBaixarPlanilha;