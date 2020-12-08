$(function () {
  var blogSelect = document.getElementById('blog-select');

  blogSelect.addEventListener('change', function () {
    location.href = this.value;
  });
})