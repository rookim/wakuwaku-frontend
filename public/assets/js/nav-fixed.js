/*------- Sticky Header -------*/

document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.getElementById('nav-scroll').classList.add('nav-fixed');
      } else {
        document.getElementById('nav-scroll').classList.remove('nav-fixed');
      } 
  });
}); 

/*------- End of Sticky Header -------*/