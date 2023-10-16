import React from "react";
import { Card } from "react-bootstrap";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setSource(url);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {/* {!source && <button onClick={handleChoose}>Choose</button>} */}
      {source && (
        <video
          className="VideoInput_video"
          width="600px"
          height="300px"
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">
        {source || <p>Nothing selected</p>}
      </div>
    </div>
  );
}
