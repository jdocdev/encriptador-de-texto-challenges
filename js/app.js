// Selección del campo donde vamos a almacenar el texto encriptado y lo almaceno en una variable
const textEncrypt = document.querySelector("#textEncrypt").textContent;

// Selección de la imagen y la almaceno en una variable
const imgEncrypt = document.querySelector(".text-encrypt img");

// Seleccion del h3 y lo almaceno en una variable
const h3Encrypt = document.querySelector(".text-encrypt h3");

// Selección del boton de copiar texto
const copyButton = document.querySelector("#copyButton");

copyButton.addEventListener("click", function () {
    const textEncrypt = document.querySelector("#textEncrypt").textContent;
    navigator.clipboard.writeText(textEncrypt).then(function () {
        console.log("Texto copiado al portapapeles");
    }, function () {
        console.error("No se pudo copiar el texto al portapapeles");
    });
});

// borrar texto del textarea al recargar
window.onload = function () {
    const textBase = document.querySelector("#textBase").value = '';
    if (textBase.value === '') {
        textBase.value = textBase.getAttribute('placeholder');
    }
}

// Funcion de cifrado cesar
function cifradoCesar(texto, desplazamiento) {
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        let codigo = texto.charCodeAt(i);
        if (codigo >= 65 && codigo <= 90) {
            caracter = String.fromCharCode(((codigo - 65 + desplazamiento) % 26) + 65);
        } else if (codigo >= 97 && codigo <= 122) {
            caracter = String.fromCharCode(((codigo - 97 + desplazamiento) % 26) + 97);
        }
        resultado += caracter;
    }
    return resultado;
}

// Función para encriptar el texto
function encriptarCampo() {

    const textBase = document.querySelector("#textBase").value;

    //validación de formulario en blanco
    if (textBase.trim() === "") {
        alert("El campo de texto no puede estar en blanco");
        return;
    } else {
        // Eliminar la imagen
        imgEncrypt.style.display = 'none';
        // Eliminar el titulo
        h3Encrypt.style.display = 'none';
        // Mostrar botón de copiar
        copyButton.style.display = 'block';
    }

    const desplazamiento = 19; // número de posiciones que se van a desplazar las letras en el alfabeto
    const textoCifrado = cifradoCesar(textBase, desplazamiento);
    document.querySelector("#textEncrypt").textContent = textoCifrado;
}

// Función de descifrado César
function descifradoCesar(textoCifrado, desplazamiento) {
    let resultado = "";
    for (let i = 0; i < textoCifrado.length; i++) {
        let caracter = textoCifrado[i];
        let codigo = textoCifrado.charCodeAt(i);
        if (codigo >= 65 && codigo <= 90) {
            caracter = String.fromCharCode(((codigo - 65 - desplazamiento + 26) % 26) + 65);
        } else if (codigo >= 97 && codigo <= 122) {
            caracter = String.fromCharCode(((codigo - 97 - desplazamiento + 26) % 26) + 97);
        }
        resultado += caracter;
    }
    return resultado;
}

// Función para desencriptar el texto
function desencriptarCampo() {

    const textBase = document.querySelector("#textEncrypt").textContent;

    //validación de formulario en blanco
    if (textBase.trim() === "Ingresa el texto que desees encriptar o desencriptar.") {
        alert("El campo de texto no puede estar en blanco");
        return;
    } else {
        // Eliminar la imagen
        imgEncrypt.style.display = 'none';
        // Eliminar el titulo
        h3Encrypt.style.display = 'none';
        // Mostrar botón de copiar
        copyButton.style.display = 'block';
    }

    const desplazamiento = 19; // número de posiciones que se van a desplazar las letras en el alfabeto
    const textoDesCifrado = descifradoCesar(textBase, desplazamiento);
    document.querySelector("#textEncrypt").textContent = textoDesCifrado;
}

// Solo permitir letras minusculas
const textBase = document.querySelector("#textBase");

textBase.addEventListener("keydown", function (event) {
    const key = event.key;
    const charCode = event.keyCode || event.which;

    // Si la tecla presionada es una letra mayúscula, convertirla a minúscula y permitir su ingreso en el campo
    if (charCode >= 65 && charCode <= 90) {
        const newKey = key.toLowerCase();
        textBase.value += newKey;
        event.preventDefault();
    }

    // Si la tecla presionada es una letra minúscula, permitir su ingreso en el campo
    if (/^[a-z]+$/.test(key)) {
        return true;
    }

    // permitir espacios en blanco
    if (charCode == 32) {
        return true;
    }

    // permitir eliminación de texto
    if (charCode == 8) {
        return true;
    }

    // permitir suprimir
    if (charCode == 46) {
        return true;
    }

    // permitir uso de tecla Enter
    if (charCode == 13) {
        return true;
    }

    // Si la tecla presionada no es una letra prevenir su ingreso en el campo
    event.preventDefault();
});




