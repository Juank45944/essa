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

  var portal = document.getElementById('PortalESSA');
  var dbRef = firebase.database().ref().child('text');
  dbRef.on('value', snap => PortalESSA.innerText = snap.val());

  // Obtener elementos
  var txtEmail    = document.getElementById('txtEmail');
  var txtPassword = document.getElementById('txtPassword');
  var btnLogin    = document.getElementById('btnLogin');
  var btnSignUp   = document.getElementById('btnSignUp');
  var btnLogout   = document.getElementById('btnLogout');

  // Evento Boton login
  btnLogin.addEventListener('click', e => {
    //Obtener los valores de los campos email y password
    var email = txtEmail.value;
    var pass = txtPassword.value;
    //Almacenar el valor
    var auth = firebase.auth();

    // Sign in
    var promise = auth.signInWithEmailAndPassword(email, pass);
    //metodo catch por si existe algun error en el acceso
    promise.catch(e => console.log(e.message));   
  });

  // Añadir evento signup
  btnSignUp.addEventListener('click', e => {
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    // Sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    // Evento para cerrar sesion del usuario
    firebase.auth().signOut();
  });

  // Añadir un listener en tiempo real
  //Mostrar el cambio 
   firebase.auth().onAuthStateChanged( firebaseUser => {
     //Si el usuario esta logueado
    if(firebaseUser) {
      console.log(firebaseUser);
      //Se muestra el boton de Cerrar Sesión
      btnLogout.classList.remove('hide');
    } else {
      console.log('no logueado');
      btnLogout.classList.add('hide');
    }    
  });
} ());
