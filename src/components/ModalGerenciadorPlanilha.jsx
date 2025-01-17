import { useState } from "react";

import '../css/ModalGerenciadorPlanilha.css';
import '../css/tableExcel.css';

import CarregaPlanilha from './carregaPlanilha';

function ModalGerenciadorPlanilha() {

    const [tipoPlanilha, setTipoPlanilha] = useState('cliente');
    const [isGerenciadorVisible, setIsGerenciadorVisible] = useState(false);

    function mudarTipoPlanilha(event) {
        setTipoPlanilha(event.target.value);
    }

    function abrirGerenciadorPlanilha() {
        setIsGerenciadorVisible(true);
    }

    function fecharGerenciadorPlanilha() {
        setIsGerenciadorVisible(false);
    }

    const modalGerenciadorExcel = {
        display: isGerenciadorVisible ? 'block' : 'none',
    };

    return (
        <>
            <button onClick={abrirGerenciadorPlanilha}>Abrir modal</button>
            <div id="modalGerenciadorExcel" style={modalGerenciadorExcel}>
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Gerenciador de planilhas</p>
                        <div>
                            <select id="tipoPlanilha" value={tipoPlanilha} onChange={mudarTipoPlanilha}>
                                <option value="cliente">Cliente</option>
                                <option value="lancamento">Lançamentos</option>
                                <option value="oportunidade">Oportunidade</option>
                                <option value="produtos">Produtos</option>
                            </select>
                            <span className="btn-close" onClick={fecharGerenciadorPlanilha}>&times;</span>
                        </div>
                    </div>
                    <div className="botoes-modal">
                        <button id="button-baixar-planilha" className="button-padrao">Baixar planilha</button>
                        <button id="button-apaga-planilha" className="button-padrao">Apagar planilha</button>
                        <button className="button-padrao">Exportar planilha</button>
                        <button id="junta-ddd-telefone" className="button-padrao">Juntar DDD e telefone</button>
                        <button id="button-remove-linhas" className="button-padrao">Remover linhas</button>
                        <button id="button-modelo-padrao" className="button-padrao">Modelo padrão</button>
                        <div className="container-mesclar-colunas">
                            <select id="select-mesclar-colunas">
                                <option value="nome">nome</option>
                                <option value="telefone">telefone</option>
                                <option value="cpf_cnpj">cpf_cnpj</option>
                                <option value="data_nascimento">data_nascimento</option>
                                <option value="genero">genero</option>
                                <option value="email">email</option>
                                <option value="anotacao">anotacao</option>
                                <option value="DDD">DDD</option>
                            </select>
                            <button id="button-mesclar-colunas" className="button-padrao">Mesclar colunas</button>
                        </div>
                    </div>
                    <CarregaPlanilha tipoPlanilha={tipoPlanilha}/>
                </div>
            </div>
        </>
    )

}

export default ModalGerenciadorPlanilha;