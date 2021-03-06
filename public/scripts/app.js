/* ---- particles.js config ---- */

particlesJS("particle-container", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "random"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


$(function(){
  $(document).scroll(function(){
    var $nav = $("#main-navbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});

$(document).ready(function() {
  $(".color").addClass("animation"); 
  $("#smiles").addClass("svg-main");
  $(".smile").addClass("smile-main");  
  $(".eyes").addClass("eyes-main"); 
});


document.onreadystatechange = function() { 
            if (document.readyState !== "complete") { 
                document.querySelector( 
                  "body").style.visibility = "hidden"; 
                document.querySelector( 
                  "#loader").style.visibility = "visible"; 
				document.querySelector("i").style.visibility = "hidden"; 
            } else { 
                document.querySelector( 
                  "#loader").style.display = "none"; 
                document.querySelector( 
                  "body").style.visibility = "visible"; 
				document.querySelector("i").style.visibility = "visible";
				

				let postUrl = encodeURI(document.location.href);

				let shareButton = document.querySelector(".button-mobile");
				shareButton.addEventListener('click', function(){
				if(navigator.share){
				  navigator.share({
					url: `${postUrl}`,
					title: "<%=blog.title%> | <%=blog.category.toUpperCase()%>"

				  });
				} else{
				  alert('Link share not supported on your browser!');
				}
				});




            } 
    
  const facebook_share = document.querySelector(".facebook-btn");
  const linkedin_share = document.querySelector(".linkedin-btn");
  const twitter_share = document.querySelector(".twitter-btn");
	
  const facebook_share_2 = document.querySelector(".facebook-btn-2");
  const linkedin_share_2 = document.querySelector(".linkedin-btn-2");
  const twitter_share_2 = document.querySelector(".twitter-btn-2");



  let postUrl = encodeURI(document.location.href);

  facebook_share.setAttribute("href", `https://www.facebook.com/sharer.php?u=${postUrl}`)
  twitter_share.setAttribute("href", `https://twitter.com/share?url=${postUrl}`)
  linkedin_share.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${postUrl}`)
  
  facebook_share_2.setAttribute("href", `https://www.facebook.com/sharer.php?u=${postUrl}`)
  twitter_share_2.setAttribute("href", `https://twitter.com/share?url=${postUrl}`)
  linkedin_share_2.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${postUrl}`)
 
}; 


 