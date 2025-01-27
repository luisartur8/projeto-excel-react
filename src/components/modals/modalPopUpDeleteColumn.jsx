import { useEffect } from 'react';
import { makeDraggable } from './dragmodal/arrastarModais';
import '../../css/ModalConfirmaDeleteColuna.css'
import botaoXImg from '../../assets/img/botaoX.png';
import cancelarImg from '../../assets/img/icon-cancelar.png';
import lixeiraImg from '../../assets/img/icon-lixeira.png';
import PropTypes from 'prop-types';

function ModalDeleteColumn({ isDelColOpen, setDelColOpen, columnIndexAtual, tableData, setTableData, tableHeader, setTableHeader }) {

    // Configuração inicial ao abrir o modal
    useEffect(() => {
        if (isDelColOpen) {
            document.getElementById('popupDeletaColuna').focus();
            // centerModal('.modal-telefone-content');
        }

    }, [isDelColOpen])

    useEffect(() => {
        makeDraggable(".popupHeaderExcluirColuna", ".dragHandle");
    }, []);

    function btnExcluir(columnIndex) {
        const updatedHeader = [...tableHeader];
        updatedHeader.splice(columnIndex, 1);

        const updatedData = tableData.map((row) => {
            row.splice(columnIndex, 1);
            return row;
        });

        setTableHeader(updatedHeader);
        setTableData(updatedData);

        setDelColOpen(false);
    }

    function btnCancelar() {
        setDelColOpen(false);
    }

    function deleteByKeyPress(e, index) {
        if (e.key === 'Enter') {
            btnExcluir(index);
        } else {
            if (e.key === 'Escape') {
                btnCancelar();
            }
        }
    }

    return (
        <div id="popupDeletaColuna" tabIndex="-1" onKeyDown={(e) => deleteByKeyPress(e, columnIndexAtual)} style={{ display: isDelColOpen ? "flex" : "none" }}>
            <div className="popupExclusaoConteudo draggable-modal">
                <p className="popupHeaderExcluirColuna dragHandle"></p>
                <img className="popupImagemX" src={botaoXImg} />
                <p>Confirmar exclusão da coluna?</p>
                <div className="popupAgrupaBotao">
                    <button className="popupBotaoCancelarColuna" onClick={btnCancelar}><img src={cancelarImg} />Cancelar</button>
                    <button className="popupBotaoExcluirColuna" onClick={() => btnExcluir(columnIndexAtual)}><img src={lixeiraImg} />Excluir</button>
                </div>
            </div>
        </div>
    )

}

ModalDeleteColumn.propTypes = {
    isDelColOpen: PropTypes.bool.isRequired,
    setDelColOpen: PropTypes.func.isRequired,
    columnIndexAtual: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
};

export default ModalDeleteColumn;