import './assets/main.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter as Router} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<Router>

  <App />
</Router>

)
