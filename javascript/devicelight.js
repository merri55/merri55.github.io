(function () {
  $(function () {
    window.addEventListener("devicelight", devicelightHandler);
  });
  
  function devicelightHandler(event) {
    var lux = event.value;

    setValue("lux_value", lux);
  }
  
  function setValue(id, value){
    var id_obj = document.getElementById(id);
    id_obj.innerHTML = value;
  }
})();