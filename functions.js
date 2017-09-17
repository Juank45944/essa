(function() {

var config = {
    apiKey: "AIzaSyCzRk0C9oB4dQpGqc8uBtOVX1EPV2ICUMk",
    authDomain: "portal-essa.firebaseapp.com",
    databaseURL: "https://portal-essa.firebaseio.com",
    projectId: "portal-essa",
    storageBucket: "",
    messagingSenderId: "392369971188"
  };
  firebase.initializeApp(config);


  var ingresar_btn = document.getElementById('ingresar_btn');
  var enviar_btn   = document.getElementById('enviar_btn');
  var recuperar_btn = document.getElementById('recuperar_btn');

  //var btnLogout    = document.getElementById('btnLogout');

  ingresar_btn.addEventListener('click', e => {
    var inputs = getInputs();
    var auth = firebase.auth();
    auth.signInWithEmailAndPassword(inputs.email, inputs.password)
      .then( () => console.log("ESOOO!")) //funcion a ejecutar en caso de iniciar sesion   
      .catch(e => console.log(e.message))
  });

  enviar_btn.addEventListener('click', e => {
    var inputs = getInputs();
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(inputs.email_reg, inputs.password_reg);
    promise.then(()=>{}) //funcion a ejecutar en caso de registro exitoso`
    promise.catch(e => console.log(e.message));
  });

  recuperar_btn.addEventListener('click', e => {
    var inputs = getInputs();
    var auth = firebase.auth();
    var promise = auth.sendPasswordResetEmail(inputs.email_rec);
    promise.then(()=>{})
    promise.catch(e => console.log(e.message));
  });

  /*btnLogout.addEventListener('click', e => {
    // Evento para cerrar sesion del usuario
    firebase.auth().signOut();
  });*/

}());

function getInputs(){
  return {
    email : document.getElementById('email').value,
    password : document.getElementById('password').value,
    nombre_reg : document.getElementById('nombre_reg').value,
    password_reg : document.getElementById('password_reg').value,
    email_reg : document.getElementById('email_reg').value,
    email_rec : document.getElementById('email_rec').value
  }
}