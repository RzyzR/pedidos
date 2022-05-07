//configuración personal de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8-JK63wRT4kCyBnCxjUwOnyPnsPJuu7M",
    authDomain: "pedidosdragonwins.firebaseapp.com",
    projectId: "pedidosdragonwins",
    storageBucket: "pedidosdragonwins.appspot.com",
    messagingSenderId: "699782236928",
    appId: "1:699782236928:web:4db2ebcbca297418a601e5"
});
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos
function guardar(){
    var cantidad = document.getElementById('cantidad').value;
    var descripcion = document.getElementById('descripcion').value;
    

    db.collection("PlatoDragon3").add({
        cantidad: cantidad,
        descripcion: descripcion,
     
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('cantidad').value = '';
        document.getElementById('descripcion').value = '';
      
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("PlatoDragon3").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
  
        <td></td>
        <td></td>
        <td></td>
        <td>${doc.data().cantidad}</td>
        <td>${doc.data().descripcion}</td>
        <td></td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Despachar</button></td>

        </tr>
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("PlatoDragon3").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//editar documentos
function editar(id,cantidad,descripcion){

    document.getElementById('cantidad').value = cantidad;
    document.getElementById('descripcion').value = descripcion;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("PlatoDragon3").doc(id);
        // Set the "capital" field of the city 'DC'

        var cantidad = document.getElementById('cantidad').value;
        var descripcion = document.getElementById('descripcion').value;
       

        return washingtonRef.update({
            cantidad: cantidad,
        descripcion: descripcion,
            
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('cantidad').value = '';
            document.getElementById('descripcion').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}




