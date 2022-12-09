import styles from './styles.module.css'

export default function Avatar ({ src, alt, text }) {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.avatar} />
      {text && <strong>{text}</strong>}
    </div>
  )
}
