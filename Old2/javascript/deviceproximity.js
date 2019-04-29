(function () {
  $(function () {
    window.addEventListener("deviceproximity", deviceproximityHandler);
  });
  
  function deviceproximityHandler(event) {
    var proximity = event.value;

    setValue("proximity", proximity);
  }
  
  function setValue(id, value){
    var id_obj = document.getElementById(id);
    id_obj.innerHTML = value;
  }
})();