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
  var ingresar_btn = document.getElementById('ingresar_btn');
  var enviar_btn   = document.getElementById('enviar_btn');
  var btnLogout    = document.getElementById('btnLogout');

  ingresar_btn.addEventListener('click', e => {
    //Obtener los valores de los campos email y password
    var email = email.value();
    var password = password.value();
    //Almacenar el valor
    var auth = firebase.auth(); // Sign in
    var promise = auth.signInWithEmailAndPassword(email, password);
    //metodo catch por si existe algun error en el acceso
    promise.catch(e => console.log(e.message));   
  });

  enviar_btn.addEventListener('click', e => {
    // Obtener email y pass
    // Comprobar que el email sea real
    var email = email.value;
    var pass = password.value;
    var auth = firebase.auth();
    // Sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    // Evento para cerrar sesion del usuario
    firebase.auth().signOut();
  });

}());
