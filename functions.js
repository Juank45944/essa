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

  var email    = document.getElementById('email');
  var password = document.getElementById('password');
  var nombre_reg    = document.getElementById('nombre_reg');
  var password_reg = document.getElementById('password_reg');
  var email_reg    = document.getElementById('email_reg');
  var email_rec = document.getElementById('email_rec');
  var ingresar_btn = document.getElementById('ingresar_btn');
  var enviar_btn   = document.getElementById('enviar_btn');
  //var btnLogout    = document.getElementById('btnLogout');

  ingresar_btn.addEventListener('click', e => {
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    promise.success( () => {}); //funcion a ejecutar en caso de iniciar sesion   
  });

  enviar_btn.addEventListener('click', e => {
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email_reg, password_reg);
    promise.catch(e => console.log(e.message));
    promise.success(()=>{}); //funcion a ejecutar en caso de registro exitoso
  });

  /*btnLogout.addEventListener('click', e => {
    // Evento para cerrar sesion del usuario
    firebase.auth().signOut();
  });*/

}());
