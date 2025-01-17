export function makeDraggable(modalSelector, handleSelector) {
    let offsetX = 0, offsetY = 0, initialX = 0, initialY = 0;
    let activeModal = null;

    const modals = document.querySelectorAll(modalSelector);

    modals.forEach(modal => {
        const dragHandle = modal.querySelector(handleSelector);

        if (dragHandle) {
            dragHandle.onmousedown = (e) => {
                activeModal = modal;
                e.preventDefault();
                initialX = e.clientX;
                initialY = e.clientY;

                offsetX = modal.offsetLeft;
                offsetY = modal.offsetTop;

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", stopDragging);
            };
        }
    });

    function onMouseMove(e) {
        if (!activeModal) return;

        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        activeModal.style.left = `${offsetX + deltaX}px`;
        activeModal.style.top = `${offsetY + deltaY}px`;
    }

    function stopDragging() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopDragging);
        activeModal = null;
    }
}

export function centerModal(modalContent) {
    const modal = document.querySelector(modalContent);

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let modalWidth = modal.offsetWidth;
    let modalHeight = modal.offsetHeight;

    modal.style.position = 'fixed';
    modal.style.left = (windowWidth / 2 - modalWidth / 2) + "px";
    modal.style.top = (windowHeight / 2 - modalHeight / 2) + "px";
}