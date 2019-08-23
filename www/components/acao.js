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
}

function desabilita(){
  $("#nome").prop("readonly", true);
  $("#idade").prop("readonly", true);
  $("#sexo").prop("readonly", true);
  $("#endereco").prop("readonly", true);
  $("#cpf").prop("readonly", true);
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

$(document).on("click", "#btnCadastrar", function(){
  var prop = document.getElementById('foto').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

  if(jQuery.inArray(extensao_imagem, ['png', 'jpg', 'jpeg']) == -1){
    navigator.notification.alert("Imagem inválida")
  }else{

    var form_data = new FormData();
    form_data.append("foto", prop);
    form_data.append("nome", $("#nome").val());
    form_data.append("idade", $("#idade").val());
    form_data.append("sexo", $("#sexo").val());
    form_data.append("endereco", $("#endereco").val());
    form_data.append("cpf", $("#cpf").val());

    $.ajax({
      url:"https://dimorphous-seesaws.000webhostapp.com/cadastro.php",
      method: "post",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      }
    });
  }
});

function lista(){
  $.ajax({
        type:"post", //como enviar
        url:"https://dimorphous-seesaws.000webhostapp.com/listar.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.pessoa,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
            });
        $("#lista").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
}

$(document).on("change", "#lista", function(){
  var codigoEscolhido = $("option:selected", ("#lista")).val();
  $.ajax({
    type: "post", //como enviar
    url: "https://dimorphous-seesaws.000webhostapp.com/lista_um.php", //para onde enviar
    data: "codigo="+codigoEscolhido,
    dataType:"json",
    //se der certo
    success: function(data){
      $("#codigo").val(data.pessoa.codigo);
      $("#nome").val(data.pessoa.nome);
      $("#idade").val(data.pessoa.idade);
      $("#sexo").val(data.pessoa.sexo);
      $("#endereco").val(data.pessoa.endereco);
      $("#cpf").val(data.pessoa.cpf);
      $("#imgFoto").attr('src', "https://dimorphous-seesaws.000webhostapp.com/"+data.pessoa.foto);
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#btnSalvarAlterar", function(){
  var prop = document.getElementById('foto').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

  if(jQuery.inArray(extensao_imagem, ['png', 'jpg', 'jpeg']) == -1){
    navigator.notification.alert("Imagem inválida")
  }else{

    var form_data = new FormData();
    form_data.append("foto", prop);
    form_data.append("codigo", $("#codigo").val());
    form_data.append("nome", $("#nome").val());
    form_data.append("idade", $("#idade").val());
    form_data.append("sexo", $("#sexo").val());
    form_data.append("endereco", $("#endereco").val());
    form_data.append("cpf", $("#cpf").val());

    $.ajax({
      url:"https://dimorphous-seesaws.000webhostapp.com/alterar.php",
      method: "post",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      }
    });
  }
});

$(document).on("click", "#btnExcluir", function(){
  var codigoEscolhido = $("#codigo").val();
  $.ajax({
    type: "post",
    url: "https://dimorphous-seesaws.000webhostapp.com/deleta.php",
    data: "codigo="+codigoEscolhido,
    dataType: "json",
    success: function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#btnScan", function(){
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        listascan(parseInt(result.text));
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          prompt : "Posicione um código de barras ou qr code na tela demarcada (apenas números)", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "CODE_39,QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableSuccessBeep: false // iOS and Android
      }
   );
});


function listascan(codigo){
  var codigoescolhido = codigo;
    $.ajax({
        type:"post", //como enviar
        url:"https://dimorphous-seesaws.000webhostapp.com/lista_um.php",//para onde enviar
        data: "codigo="+codigoescolhido,
        dataType:"json",
          //se der certo
        success: function(data){
          $("#codigo").val(data.pessoa.codigo);
          $("#nome").val(data.pessoa.nome);
          $("#idade").val(data.pessoa.idade)
          $("#sexo").val(data.pessoa.sexo);
          $("#endereco").val(data.pessoa.endereco);
          $("#cpf").val(data.pessoa.cpf);
          $("#imgFoto").attr('src', "https://dimorphous-seesaws.000webhostapp.com/"+data.pessoa.foto);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
}