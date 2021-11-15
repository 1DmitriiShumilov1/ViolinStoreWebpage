if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", code());
} else {
  code();
}

function code() {
  window.addEventListener("scroll", () => {
    let header_nav = document.getElementsByClassName("header-nav");
    let unactive = [...document.getElementsByClassName("unactive")];
    let active = document.getElementsByClassName("active");
    let important = document.getElementsByClassName("important");

    if (this.scrollY >= 500) {
      header_nav[0].style.backgroundColor = "rgba(224, 130, 22, 0.8)";
      header_nav[1].style.backgroundColor = "rgba(224, 130, 22, 0.8)";
      active[0].style.color = "white";
      active[0].style.fontweight = "bold";
      for (let link in unactive) {
        unactive[link].style.color = "rgb(230, 230, 230)";
      }
      important[0].style.color = "red";
    } else {
      header_nav[0].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      header_nav[1].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      active[0].style.color = "#111";
      for (let link in unactive) {
        unactive[link].style.color = "#555";
      }
      important[0].style.color = "rgb(252, 41, 41)";
    }
  });
}
