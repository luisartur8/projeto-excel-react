import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { centerModal, makeDraggable } from '@DragModal/arrastarModais';

import './ModalConfirmaDeleteColuna.css'
import botaoXImg from '@assets/img/botaoX.png';
import cancelarImg from '@assets/img/icon-cancelar.png';
import lixeiraImg from '@assets/img/icon-lixeira.png';

/**
 * @component
 * 
 * Componente ModalDeleteColumn
 *
 * Modal de confirmação para excluir uma coluna da tabela. O modal pode ser fechado ao clicar.
 * no botão "Cancelar" ou pressionando a tecla `Escape`. A exclusão ocorre ao pressionar a tecla `Enter`.
 * ou ao clicar no botão "Excluir".
 * 
 * 
 * @param {boolean} isDelColOpen - Flag que indica se o modal está aberto.
 * @param {function} setDelColOpen - Função para atualizar o estado que controla a visibilidade do modal.
 * @param {number} columnIndexAtual - Índice da coluna a ser excluída.
 * @param {Array} tableData - Dados da tabela (linhas e células).
 * @param {function} setTableData - Função para atualizar os dados da tabela.
 * @param {Array} tableHeader - Cabeçalhos da tabela.
 * @param {function} setTableHeader - Função para atualizar o cabeçalho da tabela.
 * 
 * @return {JSX.Element} Retorna um modal com botões para deletar uma coluna.
 */

function ModalDeleteColumn({
    isDelColOpen,
    setDelColOpen,
    tableData,
    setTableData,
    tableHeader,
    setTableHeader,
    columnIndexAtual
}) {

    // Configuração inicial ao abrir o modal.
    useEffect(() => {
        if (isDelColOpen) {
            document.getElementById('popupDeletaColuna').focus();
            centerModal('#popupDeletaColuna');
        }

    }, [isDelColOpen])

    useEffect(() => {
        makeDraggable("#popupDeletaColuna", ".dragHandle");
    }, []);

    /**
     * Exclui a coluna ao clicar no botão "Excluir".
     * 
     * @param {number} columnIndexAtual - Índice da coluna a ser excluída.
     * 
     * @function
     * @returns {void} Não retorna nada, mas atualiza os estados da tabela.
     */
    const btnExcluir = () => {
        const updatedHeader = [...tableHeader];
        updatedHeader.splice(columnIndexAtual, 1);

        const updatedData = tableData.map((row) => {
            row.splice(columnIndexAtual, 1);
            return row;
        });

        setTableHeader(updatedHeader);
        setTableData(updatedData);
        setDelColOpen(false);
    };

    /**
     * Cancela a ação de exclusão e fecha o modal.
     * 
     * @returns {void} Não retorna nada, apenas altera o estado para fechar o modal.
     */
    const btnCancelar = () => {
        setDelColOpen(false);
    };
    /**
     * Lida com a tecla pressionada no modal.
     * Exclui a coluna ao pressionar 'Enter'.
     * ou fecha o modal ao pressionar 'Escape'.
     * 
     * @param {KeyboardEvent} e - Evento da tecla pressionada.
     * 
     * @returns {void} Não retorna nada, apenas executa uma ação baseada na tecla pressionada.
     */
    const deleteByKeyPress = (e) => {
        if (e.key === 'Enter') {
            btnExcluir();
        } else if (e.key === 'Escape') {
            btnCancelar();
        }
    };

    return (
        <div id="popupDeletaColuna" tabIndex="-1" onKeyDown={deleteByKeyPress} style={{ display: isDelColOpen ? "flex" : "none" }}>
            <div className="popupExclusaoConteudo draggable-modal">
                <p className="popupHeaderExcluirColuna dragHandle"></p>
                <img className="popupImagemX" src={botaoXImg} />
                <p>Confirmar exclusão da coluna?</p>
                <div className="popupAgrupaBotao">
                    <button className="popupBotaoCancelarColuna" onClick={btnCancelar}><img src={cancelarImg} />Cancelar</button>
                    <button className="popupBotaoExcluirColuna" onClick={btnExcluir}><img src={lixeiraImg} />Excluir</button>
                </div>
            </div>
        </div>
    )

}

ModalDeleteColumn.propTypes = {
    isDelColOpen: PropTypes.bool.isRequired,
    setDelColOpen: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    columnIndexAtual: PropTypes.number.isRequired
};

export default ModalDeleteColumn;