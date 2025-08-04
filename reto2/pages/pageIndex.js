document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("userName");
    const decodedUserName = userName ? decodeURIComponent(userName) : "Cliente";
    const userNameSpan = document.getElementById('userNameDisplay');
    if (userNameSpan) {
        userNameSpan.textContent = decodedUserName;
    }

    const saldoActualSpan = document.getElementById('saldoActual');
    const cantidadRetiroInput = document.getElementById('cantidadRetiro');
    const btnRetirar = document.getElementById('btnRetirar');
    const retiroMessageDiv = document.getElementById('retiroMessage');
    const retiroDiv = document.querySelector('.retiro');
    const cierreSesion = document.getElementById('cierreSesion');

    function mensajeRetiro(element, message, type) {
        element.textContent = message;
        element.className = '';
        element.classList.add('message-' + type);
    }

    const saldoInicial = 100;
    let currentBalance;

    function balanceActual() {
        const saldoHistorico = localStorage.getItem('balanceUsuario');
        if (saldoHistorico !== null && !isNaN(parseFloat(saldoHistorico))) {
            currentBalance = parseFloat(saldoHistorico);
        } else {
            currentBalance = saldoInicial;
            localStorage.setItem('balanceUsuario', currentBalance);
        }
        visualSaldoActual();
        visibilidadRetiro();
    }

    function visualSaldoActual() {
        if (saldoActualSpan) {
            saldoActualSpan.textContent = currentBalance;
        } else {
            console.error("Elemento con ID 'saldoActual' no encontrado.");
        }
    }

    function visibilidadRetiro() {
        if (retiroDiv) {
            if (currentBalance <= 0) {
                retiroDiv.classList.add('hidden');
                mensajeRetiro(retiroMessageDiv, "Tu saldo es 0. No puedes realizar retiros.", 'info');
            } else {
                retiroDiv.classList.remove('hidden');
                mensajeRetiro(retiroMessageDiv, "", '');
            }
        }
    }

    btnRetirar.addEventListener('click', () => {
        mensajeRetiro(retiroMessageDiv, "", '');

        const cantidadARetirar = parseFloat(cantidadRetiroInput.value);

        if (isNaN(cantidadARetirar) || cantidadARetirar <= 0) {
            mensajeRetiro(retiroMessageDiv, "Por favor, ingresa una cantidad válida y positiva.", 'error');
            return;
        }

        if (cantidadARetirar > currentBalance) {
            mensajeRetiro(retiroMessageDiv, `Saldo insuficiente. Tu saldo es de ${currentBalance} USD.`, 'error');
            return;
        }

        currentBalance -= cantidadARetirar;
        localStorage.setItem('balanceUsuario', currentBalance);

        visualSaldoActual();
        cantidadRetiroInput.value = '';

        mensajeRetiro(retiroMessageDiv, `Has retirado ${cantidadARetirar} USD. Saldo restante: ${currentBalance} USD.`, 'success');
    
    if (currentBalance <= 0) {
        visibilidadRetiro(); 
    } 
    });

        if (cierreSesion) { 
        cierreSesion.addEventListener('click', () => {
            const confirmLogout = confirm("¿Estás seguro de que quieres cerrar sesión?");
            if (confirmLogout) {
                localStorage.setItem('balanceUsuario', saldoInicial);
                window.location.href = '../index.html';
            }
        });
    } else {
        console.error("Error: Botón con ID 'btnLogout' no encontrado.");
    }


    balanceActual();

}); 