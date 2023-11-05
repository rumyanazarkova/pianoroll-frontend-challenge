import styled from "styled-components"
import SinglePianoRoll from "./SinglePianoRoll"
import MainPianoRoll from "./MainPianoRoll"


const MainView = ({ data, main, setMain, mainColor, setMainColor }) => {
  const mainSequence = data[main]
  
  return <Wrapper>
    <div className="main-sequence">
     <MainPianoRoll sequence={mainSequence} mainColor={mainColor}/>
      </div>
    <div className="rolls-list">
    {data.map((sequence, index) => {
       return index === main 
        ?  null 
        : <SinglePianoRoll key={index} index={index} sequence={sequence} setMain={setMain} setMainColor={setMainColor}/>
    })}
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
background-color: var(--clr-background);
display: flex;
flex-direction: column;
align-items:center;
padding:2rem;
gap:2rem;
.main-sequence{
width:100%;
height: fit-content;
}
.rolls-list{
width:90%;
}
@media (min-width: 800px) {
  align-items:start; 
}
@media (min-width: 1200px) {
flex-direction: row;
.main-sequence{
width:70%;
margin:0 auto;
height: fit-content;
position: sticky;
top:2rem;
}
.rolls-list{
  width:30%;
}
}


`
export default MainView