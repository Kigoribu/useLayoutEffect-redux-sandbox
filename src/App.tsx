import { useSelector } from "react-redux"

function App() {

  const counter = useSelector(state => state.counter.counter) //  TODO: забрать counter

  return (
    <>
      123
    </>
  )
}

export default App
