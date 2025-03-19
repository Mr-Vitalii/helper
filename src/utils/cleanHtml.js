export const cleanHtml = (text, removeAttributes, removeTags, removeStylesScripts, addNoFollow, replaceLinksWithSpan, wrapWithSection) => {
  let htmlContent = text;
  let firstH2 = true;

  if (removeAttributes) {
    // Удаление классов и атрибутов
    htmlContent = htmlContent.replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, "<$1$2>");
  }

  if (removeTags) {
    // Удаление <span> и </span>
    htmlContent = htmlContent.replace(/<\/?span[^>]*>/gi, "");
    // Удаление <img>
    htmlContent = htmlContent.replace(/<img[^>]*>/gi, "");
    // Удаление пустых тегов (например, <div></div>)
    htmlContent = htmlContent.replace(/<([a-z][a-z0-9]*)>\s*<\/\1>/gi, "");
    // Удаление лишних абзацев
    htmlContent = htmlContent.replace(/(\r\n|\n|\r)(\s*<[^>]+>\s*)(\r\n|\n|\r)+/gi, "$1$2$1");
    // Удаление <figure> и всего его содержимого
    htmlContent = htmlContent.replace(/<figure.*?>.*?<\/figure>/gis, "");
  }

  if (removeStylesScripts) {
    // Удаление <style>...</style>
    htmlContent = htmlContent.replace(/<style[^>]*>.*?<\/style>/gis, "");
    // Удаление <script>...</script>
    htmlContent = htmlContent.replace(/<script[^>]*>.*?<\/script>/gis, "");
  }

  if (addNoFollow) {
    // Добавление rel="nofollow" для ссылок
    htmlContent = htmlContent.replace(/<a(?![^>]*\brel=)[^>]*?>/gi, (match) => {
      return match.includes("rel=") ? match : match.replace(">", ' rel="nofollow">');
    });
  }

  if (replaceLinksWithSpan) {
    htmlContent = htmlContent.replace(/<a\b[^>]*>(.*?)<\/a>/gis, '<span style="overflow-wrap: break-word; word-break: break-word;">$1</span>');
  }

  if (wrapWithSection) {
    // Добавляем <section> перед первым <h1>
    htmlContent = htmlContent.replace(/<h1/gi, "<section><h1");

    // Добавляем `</section><section>` перед каждым <h2>
    htmlContent = htmlContent.replace(/<h2.*?>.*?<\/h2>/gis, (match) => {
      if (firstH2) {
        // Для первого h2 добавляем <section> перед ним
        firstH2 = false;
        return `<section>${match}`;
      } else {
        // Для всех последующих h2 добавляем </section><section>
        return `</section><section>${match}`; // Закрываем предыдущую секцию и открываем новую
      }
    });

    // Закрываем последний <section> в конце
    htmlContent += "</section></section>";

  }

  return htmlContent;
};