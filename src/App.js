//import logo from './logo.svg'
import './App.css'
import ButtonDefault from './components/buttons/button'
import ValidationTextFields from './components/inputs/TextInput'
import RebootTable from './components/tables/defaultTable'
import headCells from './components/tables/headerCellsExample.json'
import rows from './components/tables/dataExample.json'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <br />
      <br />
      <br />
      <br />
      <ButtonDefault text="TESTE"></ButtonDefault>
      <ValidationTextFields
        defaultValue={'Sugestão'}
        helperText={'Nome do cliente'}
        //placeholder={'Sugestão de preenchimento'}
      />

      <RebootTable
        headCells={headCells}
        title="Meus clientes"
        rows={rows}
      ></RebootTable>
    </div>
  )
}

export default App
