document.addEventListener("DOMContentLoaded", () => {
    const formularioAcceso = document.getElementById("formularioAcceso");
    const nameInput = document.getElementById("name");
    const pinInput = document.getElementById("pin");
    const resultMessageDiv = document.getElementById('resultMessage');

    function displayMessage(element, message, type) {
        element.textContent = message;
        element.className = 'mensaje';
        element.classList.add(type);
    }

    formularioAcceso.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const pin = parseInt(pinInput.value, 10);


        console.log("Valores obtenidos:", { name, pin });

        let message = "";
        let messageClass = "";

        if (pin === 1234) {
            const encodedName = encodeURIComponent(name);           
            const nextPageURL = `../reto2/pages/banca.html?userName=${encodedName}`;
            console.log("URL de redirección construida:", nextPageURL);

            message = "¡Tus datos son correctos " + name + "!";
            messageClass = "access-granted";
            setTimeout(() => {
                window.location.href = nextPageURL; 
            }, 1500);
        } else {
            message = "PIN incorrecto. Por favor, intenta de nuevo.";
            messageClass = "access-denied";
            pinInput.value = '';
        }

        console.log("Mensaje final:", message);
        console.log("Clase final:", messageClass);

        resultMessageDiv.textContent = message;
        resultMessageDiv.className = '';
        resultMessageDiv.classList.add(messageClass);
    });
});