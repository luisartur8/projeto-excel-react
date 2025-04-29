export function dblClickHandler(isEditable, setEditable, cellRef, moverCursorParaFinal) {
    // Não mover o cursor para o final ao dar double click quando a célula estiver editável.
    if (isEditable) return;

    // Torna a célula editavel.
    setEditable(true);

    setTimeout(() => {
        if (cellRef.current) {
            cellRef.current.focus();
            moverCursorParaFinal(cellRef.current);
        }
    }, 0);
}