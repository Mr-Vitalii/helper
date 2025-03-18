import { useState } from "react";
import styles from "./Home.module.scss";

const Home = () => {
  const [text, setText] = useState("");

  const handleClear = () => {
    let htmlContent = text;

    // Удаление открывающих и закрывающих тегов <span>
    htmlContent = htmlContent.replace(/<\/?span[^>]*>/gi, "");

    // Удаление всех тегов <img>
    htmlContent = htmlContent.replace(/<img[^>]*>/gi, "");

    // Удаление пустых атрибутов
    htmlContent = htmlContent.replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, "<$1$2>");

    // Удаление пустых тегов
    htmlContent = htmlContent.replace(/<([a-z][a-z0-9]*)>\s*<\/\1>/gi, "");

    // Удаление лишних абзацев
    htmlContent = htmlContent.replace(/(\r\n|\n|\r)(\s*<[^>]+>\s*)(\r\n|\n|\r)+/gi, "$1$2$1");

    // Удаление тегов <figure> и их содержимого
    htmlContent = htmlContent.replace(/<figure.*?>.*?<\/figure>/gis, "");

    // Обновляем состояние с очищенным контентом
    setText(htmlContent);
  };


    const handleCopy = () => {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      alert("Текст скопирован в буфер обмена!");
    }).catch(err => {
      console.error("Ошибка копирования: ", err);
    });
  };

  return (
    <div className={styles.home}>
      <div className={styles.home__textareaWrapper}>
        <textarea
        className={styles.home__textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст..."
        />
         <button className={styles.copyButton} onClick={handleCopy}>Copy</button>
      </div>
      <button className={styles.clearButton} onClick={handleClear}>
        Очистить
      </button>
    </div>
  );
};

export default Home;