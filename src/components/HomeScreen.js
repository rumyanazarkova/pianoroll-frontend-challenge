import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import pianoKeys from "../assets/piano-keys.png"
import { loadPianoRollData } from '../utils.js'
import { useState } from "react";
import { ReactComponent as LogoSVG } from '../assets/white.svg'

const HomeScreen = ({ setData }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    setLoading(true);
    await loadPianoRollData(setData);
    setLoading(false);
    navigate('all-piano-rolls')
  }

  return <Wrapper>
    <section className="logo-text-btn"> 
    
    <div className="text">
    <div className="logo-container">
      <LogoSVG />
    </div>
      <h2><span>DISCOVER</span> YOUR </h2>
      <h2>SYMPHONY OF PIXELS</h2>
    </div>

    <button className="load-btn" onClick={handleData}>
      {loading ? 'Loading...' : 'Load Rolls'}
    </button>
    </section>

    <div className="piano-keys">
      <img src={pianoKeys} alt="piano keys" />
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
height: 100vh;
background-color: var(--clr-background);
display: grid;

.logo-text-btn{
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  height: fit-content;
  gap:5em;
  padding:2rem;
}
.logo-container svg{  
width:200px;
height:fit-content;
margin-bottom:2rem;
}
h2{
  color:var(--clr-white);
  font-size:3rem;
  margin: 0;
  padding:0;
}
span{
  color:var(--clr-primary-7)
}
.text{
  display: flex;
  flex-direction: column;
}
.load-btn{
  font-size: 2rem;
  padding:1rem 1.5rem;
  cursor:pointer;
  background: none;
  font-weight: 600;
  border-radius: 15px;
  border:3px solid var(--clr-white);
  color: var(--clr-white); 
  margin:0 auto; 
  
}
.load-btn:hover{
border:5px solid var(--clr-primary-7);  
background:  var(--clr-primary-7);
color: var(--clr-white);
}
img{
width:100%;
height:15%;
position:absolute; 
bottom: 0px;
background-image: var(--gradient);
background-size : 200%;
animation: bg-animation 7s infinite alternate;
}
@keyframes bg-animation {
  0%{
   background-position:left
  }
  100%{
   background-position:right
  }
}

@media (min-width:600px ) {
  h2{
  font-size:3rem;
}
img{
  height:20%;
  }
  .load-btn{
  font-size: 2rem;
  padding: 1.5rem 2rem;
}
}

@media (min-width:1000px ) {
  h2{
  font-size:4rem;
}
img{
height:25%;
  }
  .load-btn{
  font-size: 2.5rem;
  padding: 2rem 2.5rem;
}
}
`

export default HomeScreen