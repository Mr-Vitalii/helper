import { useState } from 'react'
import styles from './Home.module.scss'
import { cleanHtml } from '@/utils/cleanHtml'

export const Home = () => {
  const [text, setText] = useState('')
  const [removeAttributes, setRemoveAttributes] = useState(false)
  const [removeTags, setRemoveTags] = useState(false)
  const [removeStylesScripts, setRemoveStylesScripts] = useState(false)
  const [addNoFollow, setAddNoFollow] = useState(false)
  const [replaceLinksWithSpan, setReplaceLinksWithSpan] = useState(false)
  const [wrapWithSection, setWrapWithSection] = useState(false)

  const toggleRemoveAttributes = () => {
    setRemoveAttributes((prev) => !prev)
  }

  const toggleRemoveExtraTags = () => {
    setRemoveTags((prev) => !prev)
  }

  const toggleRemoveStylesScripts = () => {
    setRemoveStylesScripts((prev) => !prev)
  }

  const toggleAddNoFollow = () => {
    setAddNoFollow((prev) => !prev)
  }

  const toggleReplaceLinksWithSpan = () => {
    setReplaceLinksWithSpan((prev) => !prev)
  }

  const toggleWrapWithSection = () => {
    setWrapWithSection((prev) => !prev)
  }

  const handleClear = () => {
    setText(
      cleanHtml(
        text,
        removeAttributes,
        removeTags,
        removeStylesScripts,
        addNoFollow,
        replaceLinksWithSpan,
        wrapWithSection
      )
    )
  }

  const handleCopy = () => {
    if (!text) return

    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Текст скопирован в буфер обмена!')
      })
      .catch((err) => {
        console.error('Ошибка копирования: ', err)
      })
  }

  return (
    <div className={styles.home}>
      <div className={styles.home__textareaWrapper}>
        <textarea
          className={styles.home__textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Вставьте сюда код...'
        />
        <button className={styles.home__copy_button} onClick={handleCopy}>
          Copy
        </button>
      </div>

      <div className={styles.home__options}>
        <label className={styles.home__checkbox}>
          <input
            type='checkbox'
            checked={wrapWithSection}
            onChange={toggleWrapWithSection}
          />
          <span className={styles.home__checkboxCustom}></span>
          Обернуть контент в тег &lt;section&gt;
        </label>

        <label className={styles.home__checkbox}>
          <input
            type='checkbox'
            checked={removeAttributes}
            onChange={toggleRemoveAttributes}
          />
          <span className={styles.home__checkboxCustom}></span>
          Очистка классов и атрибутов
        </label>

        <label className={styles.home__checkbox}>
          <input
            type='checkbox'
            checked={removeTags}
            onChange={toggleRemoveExtraTags}
          />
          <span className={styles.home__checkboxCustom}></span>
          Очистка лишних тегов
        </label>

        <label className={styles.home__checkbox}>
          <input
            type='checkbox'
            checked={removeStylesScripts}
            onChange={toggleRemoveStylesScripts}
          />
          <span className={styles.home__checkboxCustom}></span>
          Очистка стилей и скриптов
        </label>

        <label className={styles.home__checkbox}>
          <input
            type='checkbox'
            checked={addNoFollow}
            onChange={toggleAddNoFollow}
          />
          <span className={styles.home__checkboxCustom}></span>
          Добавить rel="nofollow для ссылок"
        </label>

        <label className={styles.home__checkbox}>
          <input
            type='checkbox'
            checked={replaceLinksWithSpan}
            onChange={toggleReplaceLinksWithSpan}
          />
          <span className={styles.home__checkboxCustom}></span>
          Заменить ссылку на тег &lt;span&gt;
        </label>
      </div>

      <button className={styles.home__clear_button} onClick={handleClear}>
        Сделать красиво
      </button>
    </div>
  )
}
