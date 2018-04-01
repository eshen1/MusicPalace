window.name = "";
$("#button2").click(function() {
  let item = document.getElementById('userInfo').value;
  console.log("Hello");
  window.name = item;
  console.log(window.name);
});
