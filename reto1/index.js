document.addEventListener("DOMContentLoaded", () => {
    const formularioAcceso = document.getElementById("formularioAcceso");
    const nameInput = document.getElementById("name");
    const edadInput = document.getElementById("edad");
    const invitacionInput = document.getElementById("invitacion");
    const resultMessageDiv = document.getElementById('resultMessage');


    formularioAcceso.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const edad = parseInt(edadInput.value, 10);
        const invitacion = invitacionInput.value === "si";

      
        console.log("Valores obtenidos:", { name, edad, invitacion });

        let message = "";
        let messageClass = "";

        if (edad < 18) {
            message = "Lo siento, " + name + ". Los menores de 18 años no pueden ingresar."
            messageClass = "access-denied";
        } else if (edad >= 18 && !invitacion) {
            message = "Lo siento, " + name + ". Necesitas una invitación para ingresar.";
            messageClass = "access-denied";
        } else if (edad >= 18 && invitacion) {
            message = "¡Bienvenido, " + name + "! Puedes ingresar.";
            messageClass = "access-granted";
        } else {
            message = "Por favor, ingresa datos válidos.";
            messageClass = "access-denied";   
        }

        console.log("Mensaje final:", message);
        console.log("Clase final:", messageClass); 

        resultMessageDiv.textContent = message;
        resultMessageDiv.className = '';
        resultMessageDiv.classList.add(messageClass);
    });
});