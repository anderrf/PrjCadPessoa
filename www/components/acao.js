// This is a JavaScript file

$(document).on("click", "#btnLinkCadastro", function(){
  $(location).attr("href", "cadastro.html");
});

$(document).on("click", "#btnVoltar", function(){
  $(location).attr("href", "index.html");
});

function habilita(){
  $("#nome").prop("readonly", false);
  $("#idade").prop("readonly", false);
  $("#sexo").prop("readonly", false);
  $("#endereco").prop("readonly", false);
  $("#cpf").prop("readonly", false);
  $("#rfoto").prop("hidden", false);
}

function desabilita(){
  $("#nome").prop("readonly", true);
  $("#idade").prop("readonly", true);
  $("#sexo").prop("readonly", true);
  $("#endereco").prop("readonly", true);
  $("#cpf").prop("readonly", true);
  $("#rfoto").prop("hidden", true);
}

function mostrarImg(input){
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imgFoto')
        .attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).on("click", "#btnCancelar", function(){
  $("#nome").val("");
  $("#idade").val("");
  $("#sexo").val("");
  $("#endereco").val("");
  $("#cpf").val("");
  $("#foto").val("");
  $("#imgFoto").src = "";
  desabilita();
});

$(document).on("click", "#btnLinkLista", function(){
  $(location).attr("href", "lista.html");
});