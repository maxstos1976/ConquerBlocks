document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["registro"];

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio inicial
    let isValid = true;
    let firstErrorField = null;

    // const form = e.target;
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();

    // Remove erros anteriores
    const fields = form.querySelectorAll(".form-input, .form-textarea");
    fields.forEach((field) => {
      field.classList.remove("input-error");
    });

    // Função para aplicar erro visual
    function marcarErro(campo) {
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

    // Validação do campo Fecha de Nacimiento
    const nacimiento = form["nacimiento"];
    if (nacimiento.value && new Date(nacimiento.value) > new Date()) {
      marcarErro(nacimiento);
      isValid = false;
    }

    // Validação do campo Email
    const email = form["email"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      marcarErro(email);
      isValid = false;
    }

    // Validação do campo Dirección
    const direccion = form["direccion"];
    if (direccion.value.trim() === "" || direccion.value.length > 50) {
      marcarErro(direccion);
      isValid = false;
    }

    // Validação do campo Página Web
    const paginaweb = form["paginaweb"];
    if (paginaweb.value.trim() !== "" && !paginaweb.value.startsWith("http")) {
      marcarErro(paginaweb);
      isValid = false;
    }

    // Validação do campo Foto
    const foto = form["foto"];
    const file = foto.files[0];

    if (!file) {
      // Se o campo estiver vazio
      marcarErro(foto);
      isValid = false;
    } else {
      // Se houver arquivo, verifica se é de tipo permitido
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        marcarErro(foto);
        isValid = false;
      }
    }

    if (isValid) {
      // form.submit(); // se tudo certo, envia o formulário
      window.location.href = "./simulacion.html?" + queryString;
    } else if (firstErrorField) {
      firstErrorField.focus(); // foca no primeiro campo com erro
    }
  });
});
