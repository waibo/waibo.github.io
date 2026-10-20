// 语言选择：?lang=zh|en > 上次手动选择 > 浏览器语言（中文显示中文，其余显示英文）
(function () {
  var root = document.documentElement;
  var supported = ["zh", "en"];

  function stored() {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  }

  function pick() {
    var param = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(param) >= 0) return param;
    var saved = stored();
    if (supported.indexOf(saved) >= 0) return saved;
    return (navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  }

  function apply(lang) {
    root.classList.remove("lang-zh", "lang-en");
    root.classList.add("lang-" + lang);
    root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    var title = document.querySelector("meta[name='title-" + lang + "']");
    if (title) document.title = title.content;
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.set === lang);
    });
  }

  apply(pick());

  document.addEventListener("DOMContentLoaded", function () {
    apply(pick());
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem("lang", b.dataset.set); } catch (e) {}
        apply(b.dataset.set);
      });
    });
  });
})();
