import { useState } from "react";
import styles from "./Home.module.scss";

export const Home = () => {
  const [text, setText] = useState("");
  const [removeAttributes, setRemoveAttributes] = useState(false);
  const [removeTags, setRemoveTags] = useState(false);
  const [removeStylesScripts, setRemoveStylesScripts] = useState(false);


  const toggleRemoveAttributes = () => {
  setRemoveAttributes((prev) => !prev);
};

const toggleRemoveExtraTags = () => {
  setRemoveTags((prev) => !prev);
};

const toggleRemoveStylesScripts = () => {
  setRemoveStylesScripts((prev) => !prev);
};

  const handleClear = () => {
    let htmlContent = text;

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
          placeholder="Вставьте сюда код..."
        />
        <button className={styles.home__copy_button} onClick={handleCopy}>Copy</button>
      </div>

      <div className={styles.home__options}>

        <label className={styles.home__checkbox}>
          <input type="checkbox" checked={removeAttributes} onChange={toggleRemoveAttributes} />
          <span className={styles.home__checkboxCustom}></span>
            Очистка классов и атрибутов
        </label>

            <label className={styles.home__checkbox}>
              <input type="checkbox" checked={removeTags} onChange={toggleRemoveExtraTags} />
              <span className={styles.home__checkboxCustom}></span>
              Очистка лишних тегов
             </label>
          
            <label className={styles.home__checkbox}>
              <input type="checkbox" checked={removeStylesScripts} onChange={toggleRemoveStylesScripts} />
              <span className={styles.home__checkboxCustom}></span>
              Очистка стилей и скриптов
            </label>
        
      </div>

      <button className={styles.home__clear_button} onClick={handleClear}>
        Очистить
      </button>
    </div>
  );
};