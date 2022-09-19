
var dbPersonas = localStorage.getItem("dbPersonas"); //Obtener datos de localStorage
var operacion = "A"; //"A"=agregar; "E"=edtidar
dbPersonas = JSON.parse(dbPersonas); // Covertir a objeto
if (dbPersonas === null) // Si no existe, creamos un array vacio.
dbPersonas = [];


function Mensaje(t){
        switch (t) {
            case 1: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego con exito el usuario</div>"
                );
                break;
            case 2: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino el usuario</div>"
                );
                break;
            default:

        }
    }


function AgregarPersona () {
    // Seleccionamos los datos de los inputs de formulario
    var datos_cliente = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });

    dbPersonas.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbPersonas", JSON.stringify(dbPersonas));



    ListarPersonas();


    return Mensaje(1);
}



function ListarPersonas (){
    $("#dbPersonas-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +

                    "<th> Nombre </th>" +
                    "<th> Correo </th>" +
                    "<th> Cedula </th>" +
                    "<th> fecha_nacimiento </th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbPersonas) {
        var d = JSON.parse(dbPersonas[i]);
        $("#dbPersonas-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.Correo + "</td>" +
                            "<td>" + d.Peso + "</td>" +
                            "<td>" + d.Fecha_nacimiento + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbPersonas.length !== 0) {
    ListarPersonas();
} else {
    $("#dbPersona-list").append("<h2> No tienes usuarios </h2>");
}

function contarPersonas(){
    var personas = dbPersonas;
    nPersonas = personas.length;

    $("#numeroPersonas").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nPersonas + "</span></a> Usuarios"
    );
    return nPersonas;
}

function Eliminar(e){
    dbPersonas.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbPersonas", JSON.stringify(dbPersonas));
    return Mensaje(2);
}

function Editar() {
    dbPersonas[indice_selecionado] = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });
    localStorage.setItem("dbPersonas", JSON.stringify(dbPersonas));
    operacion = "A"; //Regresamos la valor original
    return true;

}

$(".btnEliminar").bind("click", function(){
    alert("¿ Me quieres eliminar ?");
    indice_selecionado = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); // Eliminamos el elemento llamando la funcion de eliminar
    ListarPersonas();
});

$(".btnEditar").bind("click", function() {
    alert("¿ Me quieres editar ?");
    // Cambiamos el modo
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    // Llemanos el formulario con los datos actuales de las personas a editar
    var personaItem = JSON.parse(dbPersonas[indice_selecionado]);
    $("#nombre").val(personaItem.Nombre);
    $("#correo").val(personaItem.Correo);
    $("#peso").val(personaItem.Peso);
    $("#fecha_nacimiento").val(personaItem.Fecha_nacimiento);
    $("#nombre").focus();
});


contarPersonas();
// Esperar el evento de envio del formulario !!
$("#personas-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarPersona();
    else {
        return Editar();
    }
});

// Limitar que en la cedula solo acepten numeros
function cedula(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}