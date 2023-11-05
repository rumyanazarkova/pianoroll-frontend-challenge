import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { velocityToColor,getRandomGammaColor } from "../utils"

const SinglePianoRoll = ({ index, sequence, setMain, setMainColor }) => {
  const navigate = useNavigate()

  const start = sequence[0].start
  const end = sequence[sequence.length - 1].end - start

  const pitches = sequence.map(note => {
    return note.pitch
  })

  const timeToX = (time) => {
    return time / end;
  }

  // Make it at lest 2 octaves (2 * 12)
  let pitch_min = Math.min(...pitches);
  let pitch_max = Math.max(...pitches);
  let pitch_span = pitch_max - pitch_min;

  // If the span is too low, we have to extend it equally on both sides
  if (pitch_span < 24) {
    const diff = 24 - pitch_span;
    const low = Math.ceil(diff / 2);
    const high = Math.floor(diff / 2);
    pitch_min -= low;
    pitch_max += high;
    pitch_span = pitch_max - pitch_min;
  }

  const randomGammaColor = getRandomGammaColor();

  const selectAsMain = () => {
    setMain(index)
    setMainColor(randomGammaColor)
    navigate('/main-piano-roll')

  }

  return <Wrapper>
    <h5  data-text="Outlined Text">Piano Roll {index + 1}</h5>
  
      <svg className="piano-grid" onClick={selectAsMain} width="100%" height="300">

        {/* Drawing the keys */}
        {Array.from({ length: pitch_span }).map((_, i) => {
          const y = (i / pitch_span) * 300;
          const height = 300 / pitch_span;
          if ([1, 3, 6, 8, 10].includes((pitch_min + i) % 12)) {
            // Black keys
            return (
              <rect key={i} className="black-key" x="0" y={y} width="100%" height={height} />
            );
          } else {
            // White keys
            return (
              <rect key={i} className="white-key" x="0" y={y} width="100%" height={height} />
            );
          }
        })}

        {/* Drawing the notes */}
        {sequence.map((note, i) => {
          const x = timeToX(note.start - start) * 100;
          const width = timeToX(note.end - note.start) * 100;
          const y = (1 - (note.pitch - pitch_min) / pitch_span) * 300;
          const height = (1 / pitch_span) * 300;
          const fillColor = velocityToColor(randomGammaColor,note.velocity);
          return (
            <rect
              key={i}
              className="note"
              x={`${x}%`}
              y={y}
              width={`${width}%`}
              height={height}
              fill={fillColor}
              stroke="var(--clr-black-keys)"
              strokeWidth="1"
            />
          );
        })}


      </svg>

  </Wrapper>
}
const Wrapper = styled.div`
display: grid;
gap:1rem;
h5{
  color:var(--clr-white);
  margin:0;
}
 .piano-grid{
  display: grid;
  grid-template-rows: auto; 
  cursor: pointer;
  margin-bottom:1rem;
  outline:1px solid var(--clr-white);
 }
 .piano-grid:hover{
  outline:6px solid var(--clr-white);
 }
 .black-key{
  fill:var(--clr-black-keys);
 } 
 .white-key{
  fill:var(--clr-white-keys);
 }
`

export default SinglePianoRoll


