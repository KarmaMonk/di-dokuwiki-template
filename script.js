jQuery(document).ready(function(){
  if (jQuery(window).height() >= jQuery(document).height()) {
    jQuery("a.top").css("display", "none");
  } else {
    jQuery("a.top").css("display", "block");
  }
  jQuery("nav.mainmenu ul.idx > li.closed > div.li").each(function() {
    jQuery(this).prepend('<span class="inout closed">&nbsp;</span> ');
  });
  jQuery("nav.mainmenu ul.idx li div.li > span.inout").click(function() {
    if(jQuery(this).parent("div.li").parent("li").hasClass("closed")) {
      jQuery(this).parent("div.li").parent("li.closed").removeClass("closed").addClass("open");
      jQuery(this).removeClass("closed").addClass("open");
    } else {
      jQuery(this).parent("div.li").parent("li.open").removeClass("open").addClass("closed");
      jQuery(this).removeClass("open").addClass("closed");
    }
  });

  // Collapsible Sidebar
  jQuery("div#dokuwiki__aside  > div > ul > li.level1 > div.li").each(function(i){
    let level1 = jQuery(this).parent("li.level1");
    let level2 = level1.find("ul > li.level2");
    level1.addClass("sidebar_"+i);
    let cookieValue = jQuery.cookie("sidebar_"+i);
    console.log("sidebar_"+i + " / State: " + cookieValue);
    if (cookieValue){
      if (cookieValue === "closed"){
        level1.addClass("closed");
        level2.hide();
//        level2.css("display", "none");
      } else if (cookieValue === "open") {
        level1.addClass("open");
        level2.hide();
        level2.css("display", "block");      
      }
    } else {
      // default withput cookie
      level1.addClass("closed");
      level2.css("display", "none");    
    }
  });

  jQuery("div#dokuwiki__aside  > div > ul > li.level1 > div.li").click(function(e){
    let state = "";
    let level1 = jQuery(this).parent("li.level1");
    let level2 = level1.find("ul > li.level2");
    if(level1.hasClass("open")) {
      level1.removeClass("open").addClass("closed");
      level2.css("display", "none");
      state = "closed";
    } else {
      level1.removeClass("closed").addClass("open");
      level2.css("display", "block");
      state = "open";
    }
    let match = level1[0].className.match(/sidebar_\w+/);
    if (match) {
        console.log(match[0] + " / State: " + state);  
        jQuery.cookie(match[0], state, {expires: 7, path: DOKU_BASE});
    } 
  });
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 120) {
    document.querySelector(".di-background-header").classList.add("sticky");
  } else {
    document.querySelector(".di-background-header").classList.remove("sticky");
  }
}