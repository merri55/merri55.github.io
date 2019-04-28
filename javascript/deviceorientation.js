(function () {
  $(function () {
    window.addEventListener("deviceorientation", deviceorientationHandler);
  });
  
  function deviceorientationHandler(event) {
    var x = event.beta;
    var y = event.gamma;
    var z = event.alpha;
    
    setValue("orientation_x", x);
    setValue("orientation_y", y);
    setValue("orientation_z", z);
  }
  
  function setValue(id, value){
    var id_obj = document.getElementById(id);
    id_obj.innerHTML = value;
  }
})();