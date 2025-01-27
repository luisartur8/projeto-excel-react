export function dblClickHandler(setEditable, cellRef, moverCursorParaFinal) {
    setEditable(true);
    setTimeout(() => {
        if (cellRef.current) {
            cellRef.current.focus();
            moverCursorParaFinal(cellRef.current);
        }
    }, 0);
}