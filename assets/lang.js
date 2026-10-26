// 语言选择：?lang= > 上次手动选择 > 浏览器语言 > 英文
(function () {
  var root = document.documentElement;
  var supported = ["zh-Hans", "zh-Hant", "en", "ja", "ko", "fr", "es", "de", "pt-BR", "it", "ru"];

  function normalize(tag) {
    if (!tag) return null;
    var t = tag.toLowerCase();
    if (t === "zh" || t.indexOf("zh-hans") === 0 || t === "zh-cn" || t === "zh-sg") return "zh-Hans";
    if (t.indexOf("zh") === 0) return "zh-Hant";
    if (t.indexOf("pt") === 0) return "pt-BR";
    var base = t.split("-")[0];
    return supported.indexOf(base) >= 0 ? base : null;
  }

  function stored() {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  }

  function pick() {
    var param = normalize(new URLSearchParams(location.search).get("lang"));
    if (param) return param;
    var saved = normalize(stored());
    if (saved) return saved;
    var prefs = navigator.languages || [navigator.language];
    for (var i = 0; i < prefs.length; i++) {
      var lang = normalize(prefs[i]);
      if (lang) return lang;
    }
    return "en";
  }

  function apply(lang) {
    root.setAttribute("data-ui", lang);
    root.setAttribute("lang", lang);
    var title = document.querySelector("meta[name='title-" + lang + "']");
    if (title) document.title = title.content;
    var select = document.querySelector(".lang-select");
    if (select) select.value = lang;
  }

  apply(pick());

  document.addEventListener("DOMContentLoaded", function () {
    apply(pick());
    var select = document.querySelector(".lang-select");
    if (!select) return;
    select.addEventListener("change", function () {
      try { localStorage.setItem("lang", select.value); } catch (e) {}
      apply(select.value);
    });
  });
})();
