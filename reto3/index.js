document.addEventListener('DOMContentLoaded', () => {
    let numeroInput = document.getElementById('numero');
    const generarTablaBtn = document.getElementById('generarTablaBtn');
    let resultadoTablaDiv = document.getElementById('resultadoTabla');
    const otraTablaDiv = document.getElementById('otraTabla');
    let otraTablaSiBtn = document.getElementById('otraTablaSi');
    let otraTablaNoBtn = document.getElementById('otraTablaNo');
    let messageArea = document.getElementById('messageArea');

    otraTablaDiv.classList.add('hidden');

    function showMessage(message, type = 'info') {
        messageArea.textContent = message;
        messageArea.className = 'message-area ' + type;
        
    }

    function generarTabla() {
        resultadoTablaDiv.innerHTML = '';
        showMessage('');

        const numero = parseInt(numeroInput.value);
        if (isNaN(numero) || numero <= 0) {
            showMessage("El numero ingresado no es válido por favor, ingresa un número válido y positivo.", 'error');
            return;
        }

        let tablaHTML = '<h2>Tabla del ' + numero + '</h2>';
        for (let i = 1; i <= 10; i++) {
            const resultado = numero * i;
            tablaHTML += `<p>${numero} x ${i} = ${resultado}</p>`;
        }
        resultadoTablaDiv.innerHTML = tablaHTML;

        messageArea.classList.add('hidden');
        otraTablaDiv.classList.remove('hidden');
    }

    function preguntarOtraTabla() {
        numeroInput.value = '';
        resultadoTablaDiv.innerHTML = '';
        otraTablaDiv.classList.add('hidden');
        showMessage("Ingresa el nuevo numero a multiplicar", 'info');
    }

    generarTablaBtn.addEventListener('click', generarTabla);
    otraTablaSiBtn.addEventListener('click', (event) => {
        event.preventDefault();
        preguntarOtraTabla();
    });
    otraTablaNoBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showMessage("¡Gracias por usar el generador de tablas de multiplicar!", 'success');
        otraTablaDiv.classList.add('hidden');
        return;
    });

});
