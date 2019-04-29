(function () {
  $(function () {
    window.addEventListener("devicemotion", devicemotionHandler);
  });
  
  function devicemotionHandler(event) {
    var x = event.acceleration.x;
    var y = event.acceleration.y;
    var z = event.acceleration.z;
    
    setValue("acceleration_x", x);
    setValue("acceleration_y", y);
    setValue("acceleration_z", z);
  }
  
  function setValue(id, value){
    var id_obj = document.getElementById(id);
    id_obj.innerHTML = value;
  }
})();