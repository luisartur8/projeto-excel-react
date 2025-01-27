import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente responsável por permitir o upload de uma planilha Excel
 * e carregar seus dados para visualização na tabela.
 * 
 * @return {JSX.Element} Retorna um input para carregar uma planilha e um botão para carregar a tabela.
 */
function RenderFileUploadScreen({
    selectedFile,      // Arquivo Excel selecionado pelo usuário.
    setSelectedFile,   // Função para atualizar o arquivo selecionado.
    isLoaded,          // Estado que indica se os dados do arquivo foram carregados.
    setIsLoaded,       // Função para definir o estado de carregamento do arquivo.
    XLSX,              // Objeto da biblioteca XLSX para ler e processar o arquivo Excel.
    setFirstSheetName, // Função para definir o nome da primeira planilha do arquivo Excel.
    setWorkbookName,   // Função para definir o nome do arquivo Excel carregado.
    theme,             // Objeto de tema com propriedades de style. (primaryColor, secondaryColor, etc).
    setTableData,      // Função para atualizar os dados da tabela.
    setTableHeader     // Função para definir o cabeçalho da tabela.
}) {

    /**
     * Função que processa o upload e leitura do arquivo Excel.
     * Valida o tipo do arquivo e carrega os dados para a tabela.
     * 
     * @function
     * @returns {void} Não retorna nada, mas atualiza os estados com os dados processados.
     */
    const processExcelFileUpload = () => {
        if (!selectedFile) {
            alert("Por favor, selecione um arquivo Excel primeiro.");
            return;
        }

        // Verifica os tipos de arquivo suportados (XLSX, XLS, CSV, ODS).
        const validFileTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
            'application/vnd.ms-excel', // XLS
            'text/csv', // CSV
            'application/vnd.oasis.opendocument.spreadsheet', // ODS
        ];

        console.log(selectedFile.type)

        if (!validFileTypes.includes(selectedFile.type)) {
            alert("Por favor, selecione um arquivo válido (.xlsx, .xls, .csv, .ods).");
            return;
        }

        if (isLoaded) {
            return;
        }

        // Configuração do leitor de arquivos.
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Guarda o nome do Workbook e sheet para futuras operações.
            setFirstSheetName(firstSheetName);
            setWorkbookName(selectedFile.name);

            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                raw: false, // Todos os dados que chegarem serão uma string.
                header: 1, // Considera a primeira linha como o header.
                defval: "" // Celulas null se tornam uma string vazia.
            });

            // Carrega um objeto que ficará dentro de tableData (O value ficará dentro de cada <td>).
            const updatedData = jsonData.map((row) => {
                return row.map((cell) => {
                    return { value: cell, style: { backgroundColor: theme.primaryColor } };
                });
            });

            setTableData(updatedData);

            // Inicializa o tableHeader.
            setTableHeader(() => {
                let arr = [];
                for (let i = 0; i < jsonData[0].length; i++) {
                    arr.push("nome");
                }
                return arr;
            })

            setIsLoaded(true);
        };

        // Leitura do arquivo selecionado.
        reader.readAsArrayBuffer(selectedFile);
    };

    /**
     * Função chamada quando o arquivo é selecionado.
     * 
     * @param {Event} event - Evento disparado quando o arquivo é selecionado.
     * @returns {void} Não retorna nada, apenas atualiza o estado.
     */
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className="nenhuma-planilha">
            <p>Nenhuma planilha carregada</p>
            <input
                type="file"
                id="upload-planilha"
                accept=".xlsx, .xls, .csv, .ods"
                onChange={handleFileChange}
            />
            <button
                id="button-carrega-planilha"
                className="button-padrao"
                onClick={processExcelFileUpload}
            >
                Carregar Planilha
            </button>
        </div>
    )

}

RenderFileUploadScreen.propTypes = {
    selectedFile: PropTypes.any,
    setSelectedFile: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    setIsLoaded: PropTypes.func.isRequired,
    XLSX: PropTypes.any.isRequired,
    setFirstSheetName: PropTypes.func.isRequired,
    setWorkbookName: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    setTableData: PropTypes.func.isRequired,
    setTableHeader: PropTypes.func.isRequired
}

export default RenderFileUploadScreen;