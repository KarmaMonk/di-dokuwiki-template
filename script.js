jQuery(document).ready(function () {
  if (jQuery(window).height() >= jQuery(document).height()) {
    jQuery("a.top").css("display", "none");
  } else {
    jQuery("a.top").css("display", "block");
  }
  jQuery("nav.mainmenu ul.idx > li.closed > div.li").each(function () {
    jQuery(this).prepend('<span class="inout closed">&nbsp;</span> ');
  });
  jQuery("nav.mainmenu ul.idx li div.li > span.inout").click(function () {
    if (jQuery(this).parent("div.li").parent("li").hasClass("closed")) {
      jQuery(this).parent("div.li").parent("li.closed").removeClass("closed").addClass("open");
      jQuery(this).removeClass("closed").addClass("open");
    } else {
      jQuery(this).parent("div.li").parent("li.open").removeClass("open").addClass("closed");
      jQuery(this).removeClass("open").addClass("closed");
    }
  });
});


// Collapsible Sidebar
jQuery("div#dokuwiki__aside  > div > ul > li.level1 > div.li").each(function (i) {
  let level1 = jQuery(this).parent("li.level1");
  let level2 = level1.children("ul");

  let match = level1[0].className.match(/sidebar_\w+/);
  if (!match) level1.addClass("sidebar_" + i);
  let stateCookie = jQuery.cookie("sidebar_" + i);
  let stateClass = null;
  if (level1.hasClass("open")) {
    stateClass = "open";
  } else if (level1.hasClass("closed")) {
    stateClass = "closed";
  }

  console.log("sidebar_" + i + " / " + "Cookie State: " + stateCookie + " Class State: " + stateClass);

  if ((stateCookie) && (stateCookie !== stateClass)) {
    if (stateCookie === "closed") {
      level1.addClass("closed");
      level2.hide();
    } else if (stateCookie === "open") {
      level1.addClass("open");
      level2.show();
    }
  } else {
    // default withput cookie
    level1.addClass("closed");
    level2.hide();
  }
});

jQuery("div#dokuwiki__aside  > div > ul > li.level1 > div.li > a").click(function (e) {
  //jQuery(this).parent().parent("div.li").data("link-clicked", true);
  // prevent loading page if we are already on that page
  if (window.location.href.includes(jQuery(this)[0].attributes.href.value)) {
    e.preventDefault();
  }
});

// set active class for parent object based on url
jQuery("div#dokuwiki__aside  > div > ul > li  a").each(function () {
  if (window.location.href.includes(jQuery(this)[0].attributes.href.value)) {
    // check level 1 or 2
    if (jQuery(this).closest("li").hasClass("level1")) {
      jQuery(this).parent("div.li").addClass("active");
    } else {
      jQuery(this).closest("li[class=level2]").addClass("active");
    }
  }
});;

jQuery("div#dokuwiki__aside  > div > ul > li.level1 > div.li").click(function (e) {
  //if (jQuery(this).data("link-clicked")) console.log("link clicked");
  let state = "";
  let level1 = jQuery(this).parent("li.level1");
  let level2 = level1.children("ul");
  if (level1.hasClass("open")) {
    level1.removeClass("open").addClass("closed");
    if (!jQuery(this).data("link-clicked")) {
      level2.hide()
    };
    state = "closed";
  } else {
    level1.removeClass("closed").addClass("open");
    if (!jQuery(this).data("link-clicked")) {
      level2.show()
    };
    state = "open";
  }
  let match = level1[0].className.match(/sidebar_\w+/);
  if (match) {
    console.log("Click: " + match[0] + " / State: " + state);
    jQuery.cookie(match[0], state, {
      expires: 7,
      path: DOKU_BASE
    });
  }
});





window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 120) {
    document.querySelector(".di-background-header").classList.add("sticky");
  } else {
    document.querySelector(".di-background-header").classList.remove("sticky");
  }
}