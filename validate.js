// Variable declarations
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
const botaoEnviar = document.getElementById("btnSend");

// Add event listeners for validation on each required field
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("input", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

// Types of errors to check
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

// Specific error messages for each field
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio.",
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio.",
    }
};

// Checks and validates the field
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }

    verificaCamposPreenchidos();
}

// Checks that all mandatory fields are filled in correctly
function verificaCamposPreenchidos() {
    let todosCamposValidos = true;
    camposDoFormulario.forEach(campo => {
        if (!campo.checkValidity()) {
            todosCamposValidos = false;
        }
    });

    botaoEnviar.disabled = !todosCamposValidos;
    return todosCamposValidos;
}