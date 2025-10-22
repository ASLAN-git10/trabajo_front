import { expresionesRegulares } from "./services/utils.js";

let camposForm = document.querySelector(".formulario_entrada")
camposForm.forEach((camposForm) => {
    camposForm.addEventListener("keyup", function (e) {
        switch (e.target.id) {
            case "nombre":
                if (expresionesRegulares.regexNombre.test(e.target.value)) {
                    document.getElementById
                        ("nombre").style.outline = "none"
                    document.getElementById
                        ("nombre").style.borderColor = "green"
                    document.getElementById
                        ("nombre").style.borderWidth = "2px"
                    document.getElementById("nombre").style.color = "black"
                } else {
                    document.getElementById("nombre").style.color = "red"
                    document.getElementById("nombre").style.borderColor = "red"
                    
                }
                break;

             case "correo":
                if (expresionesRegulares.regexCorreo.test(e.target.value)) {                    
                    document.getElementById("correo").style.outline = "none"
                    document.getElementById("correo").style.borderColor = "green"
                    document.getElementById("correo").style.borderWidth = "2px"
                    document.getElementById("correo").style.color = "black"
                } else {
                    document.getElementById("correo").style.color = "red"
                    document.getElementById("correo").style.borderColor = "red"
                    
                }
                break;

              case "telefono":
                if (expresionesRegulares.regexNumero.test(e.target.value)) {                    
                    document.getElementById("telefono").style.outline = "none"
                    document.getElementById("telefono").style.borderColor = "green"
                    document.getElementById("telefono").style.borderWidth = "2px"
                    document.getElementById("telefono").style.color = "black"
                } else {
                    document.getElementById("telefono").style.color = "red"
                    document.getElementById("telefono").style.borderColor = "red"
                    
                }
                break;  
                
            case "texto":
                if (expresionesRegulares.regexTexto.test(e.target.value)) {                    
                    document.getElementById("mensaje").style.outline = "none"
                    document.getElementById("mensaje").style.borderColor = "green"
                    document.getElementById("mensaje").style.borderWidth = "2px"
                    document.getElementById("mensaje").style.color = "black"
                } else {
                    document.getElementById("mensaje").style.color = "red"
                    document.getElementById("mensaje").style.borderColor = "red"
                    
                }
                break;
        }
    })
})




