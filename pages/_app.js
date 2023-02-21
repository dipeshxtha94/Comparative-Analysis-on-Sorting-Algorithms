import '../styles/globals.css'
import Footer from '../components/footer'
import SortingBars from '../components/sortingBars'

function MyApp({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  <Footer/>
  </>
}

export default MyApp
