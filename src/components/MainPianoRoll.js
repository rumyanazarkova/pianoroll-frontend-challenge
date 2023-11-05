import styled from "styled-components"
import { useState,useEffect } from "react"
import { velocityToColor } from "../utils"

const MainPianoRoll = ({ sequence,mainColor }) => {
  const start = sequence[0].start
  const end = sequence[sequence.length - 1].end
  const duration = sequence[sequence.length - 1].end - start

  const [startLine, setStartLine] = useState(start);
  const [endLine, setEndLine] = useState('');

  useEffect(() => {
    if (sequence) {
      const newStart = sequence[0].start;
      setStartLine(newStart);
      setEndLine(''); 
    }
  }, [sequence]);
 
  const handleClick = (e) => {
    const svgRect = document.querySelector('.piano-grid').getBoundingClientRect();
    const x = e.pageX - svgRect.left; // x position relative to the left edge of the SVG
    const clickedPositionRatio = x / svgRect.width;
    const clickedTime = start + clickedPositionRatio * (end - start);

    if (endLine === '' || clickedTime > endLine) {
      setEndLine(clickedTime);
    }
    else if(clickedTime < endLine && clickedTime>start){
      setStartLine(clickedTime)
    }
  };
 

  const pitches = sequence.map(note => {
    return note.pitch
  })

  const timeToX = (time) => {
    return time / duration;
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

  return <Wrapper>
    <svg className="piano-grid" onClick={handleClick} width="100%" height="500">

      {/* Drawing the keys */}
      {Array.from({ length: pitch_span }).map((_, i) => {
        const y = (i / pitch_span) * 500;
        const height = 500 / pitch_span;
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
        const y = (1 - (note.pitch - pitch_min) / pitch_span) * 500;
        const height = (1 / pitch_span) * 500;
        const fillColor = velocityToColor(mainColor,note.velocity);
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

      {/* Adding the vertical line */}
      {endLine && (
        <line
          x1={`${(endLine - start) / duration * 100}%`}
          y1="0"
          x2={`${(endLine - start) / duration * 100}%`}
          y2="500"
          stroke="black"
          strokeWidth="2"
        />
      )}

      {/* Adding the selected territory */}
      {endLine && (
        <>
          <rect
            x={`${(startLine - start) / duration * 100}%`}
            y="0"
            width={`${(endLine - startLine) / duration * 100}%`}
            height="500"
            fill="rgba(238, 107, 255,0.3)"
          />
          {/* endLine */}
          <line
            x1={`${(endLine - start) / duration * 100}%`}
            y1="0"
            x2={`${(endLine - start) / duration * 100}%`}
            y2="500"
            stroke="rgb(238, 107, 255)"
            strokeWidth="2"
          />
        </>
      )}
      {/* startLine */}
      {startLine !== start && (
        <line
          x1={`${(startLine - start) / duration * 100}%`}
          y1="0"
          x2={`${(startLine - start) / duration * 100}%`}
          y2="500"
          stroke="rgb(238, 107, 255)"
          strokeWidth="2"
        />
      )}
    </svg>
    
  { endLine &&
    <div className="duration-selected">
    <h3>Timelapse Excerpt</h3>
    <h3>Start: {Number(startLine).toFixed(2)} s</h3>
    <h3>End: {Number(endLine).toFixed(2)} s</h3>
    </div>
  }
  </Wrapper>
}

const Wrapper = styled.div`
 .piano-grid{
  position:relative;
  height:500px;
  display: grid;
  grid-template-rows: auto; 
  outline:1px solid white;
 }
  .black-key{
  fill: var(--clr-black-keys);
 } 
 .white-key{
  fill:  var(--clr-white-keys);
 }
 .duration-selected{
 padding:1rem 0;
 display:flex;
 flex-direction: column;
 gap:.3rem;
 color:var(--clr-white);

 }
`

export default MainPianoRoll