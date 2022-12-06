import { colors } from '../../styles/themes'

export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          align-items: center;
          background-color: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: #fff;
          display: flex;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 20px;
          transition: opacity 0.3s ease;
        }

        button  > :global(svg) {
          margin-right: 4px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
