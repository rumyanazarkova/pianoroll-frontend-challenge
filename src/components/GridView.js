import styled from "styled-components"
import SinglePianoRoll from "./SinglePianoRoll"

const GridView = ({data,setMain,setMainColor}) => {
  return <Wrapper>
    {data.map((sequence,index)=>{
    return <SinglePianoRoll key={index} index={index} sequence={sequence} setMain={setMain} setMainColor={setMainColor}/>
    })}
  </Wrapper> 
}

const Wrapper= styled.section`
padding: 2rem;
display: grid;
gap:2rem;
background-color: var(--clr-background);
color:var(--clr-white);
@media (min-width: 800px){
 grid-template-columns: repeat(2,1fr); 
}
@media (min-width: 1300px){
 grid-template-columns: repeat(3,1fr); 
}
`
export default GridView