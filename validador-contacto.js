document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["contacto"];

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio inicial
    let isValid = true;
    let firstErrorField = null;

    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();

    // Remove erros anteriores
    const fields = form.querySelectorAll(
      ".form-input, .form-textarea, input, textarea"
    );
    fields.forEach((field) => {
      field.classList.remove("input-error");
    });

    // Função para aplicar erro visual
    function marcarErro(campo) {
      console.log(campo);
      campo.classList.add("input-error");
      if (!firstErrorField) {
        firstErrorField = campo;
      }
    }

    // Validação do campo Nombre
    const nombre = form["nombre"];
    if (nombre.value.trim().length < 2 || nombre.value.length > 30) {
      marcarErro(nombre);
      isValid = false;
    }

    // Validação do campo Teléfono (formato 123-123-123)
    const telefono = form["telefono"];
    const telRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (telefono.value.trim() !== "" && !telRegex.test(telefono.value.trim())) {
      marcarErro(telefono);
      isValid = false;
    }

    // Validação do campo Email
    const email = form["email"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      marcarErro(email);
      isValid = false;
    }

    // Validação dos checkboxes (pelo menos um marcado)
    const checkboxes = ["fullstack", "blockchain", "inteligenciaArtificial"];
    const algumMarcado = checkboxes.some((name) => form[name].checked);
    const formgroup = document.querySelector(".group-information");

    if (!algumMarcado) {
      // Marca o primeiro checkbox como erro para feedback visual
      marcarErro(formgroup);
      formgroup.style.backgroundColor = "pink";
      isValid = false;
    }

    // Validação da mensagem
    const mensaje = form["mensaje"];
    if (mensaje.value.trim().length < 10) {
      marcarErro(mensaje);
      isValid = false;
    }

    if (isValid) {
      window.location.href = "./simulacion.html?" + queryString;
    } else if (firstErrorField) {
      firstErrorField.focus(); // foca no primeiro campo com erro
    }
  });
});
