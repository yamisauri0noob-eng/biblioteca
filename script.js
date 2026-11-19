/**
 * Valida los campos del formulario antes de enviarlo y avisa si el libro se guardó bien.
 *
 * @param {HTMLFormElement} Form Formulario de registro de libros.
 * @param {string} titulo Texto del título ingresado.
 * @param {string} Autor Texto del autor ingresado.
 * @param {string} isbn Texto del ISBN ingresado.
 * @param {URLSearchParams} UrlParams Parámetros de la URL para detectar el registro exitoso.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLibro');

    // Validación interactiva antes de enviar los datos al servidor
    form.addEventListener('submit', (e) => {
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const isbn = document.getElementById('isbn').value.trim();

        if (titulo === "" || autor === "" || isbn === "") {
            e.preventDefault(); // Detiene el envío del formulario
            alert('Por favor, rellena todos los campos antes de guardar.');
            return;
        }

        // Validación simple para que el formato ISBN no contenga caracteres no validos
        if (isbn.length < 10) {
            e.preventDefault();
            alert('El campo ISBN parece demasiado corto o inválido.');
        }
    });

    // Detectar si venimos de un registro exitoso mediante la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        window.history.replaceState({}, document.title, window.location.pathname);
        alert('¡Libro registrado con éxito en el inventario!');
    }
});