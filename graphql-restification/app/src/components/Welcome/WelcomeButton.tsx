type ButtonProps = {
  fetchBrightspot: () => void
  isClicked: Boolean | undefined
}

const WelcomeButton = ({ fetchBrightspot, isClicked }: ButtonProps) => {
  return (
    <button style={styles.container} onClick={fetchBrightspot}>
      {' '}
      {isClicked ? 'Welcome Message' : 'Brightspot'}{' '}
    </button>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: 'none',
    borderRadius: '12px',
    padding: '10px',
    backgroundColor: '#ee0120',
    color: 'white',
    fontWeight: 'bold',
  },
}

export default WelcomeButton
