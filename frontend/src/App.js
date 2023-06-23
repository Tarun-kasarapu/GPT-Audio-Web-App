import {Container,Col, Row, Button} from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";
import { useAddNewQuestionMutation } from "./paths";
import Loader from "./Loader";
import { useState } from "react";
import { useSpeechSynthesis} from "react-speech-kit";

function App() {


  const [addNewQuestion, { isLoading }] = useAddNewQuestionMutation();
  const [ans,setans]=useState("");
  
  const {speak}=useSpeechSynthesis();
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  console.log(transcript);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const speakhandler=()=>{
    speak({text:ans});
  }
  
  const answerhandler= async ()=>{
      try {
          const res=await addNewQuestion({question:transcript}).unwrap();
          setans(res);

      } catch (err) {
          console.log(err);
      }

  }
 
  return (
    <Container>
        <div className="mt-3">
          <h1 className="mb-3">Microphone: {listening ? 'on' : 'off'}</h1>
          <Button className="me-3" variant="primary" onClick={SpeechRecognition.startListening}>Start</Button>
          <Button className="me-3" variant="danger"  onClick={SpeechRecognition.stopListening}>Stop</Button>
          <Button variant="warning" onClick={resetTranscript}>Reset</Button>
      </div>
        <Row className="mt-4">
          <Col md={8}>
          <input className="form-control" type="text" placeholder={transcript||"Start Saying"} aria-label="Search" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={5}>
          <Button variant="info" onClick={answerhandler}>Want Answer for this question?</Button>
          </Col>
        </Row>
        <Row>
          
              {isLoading?<Loader/>:
                
                <Row className=" mt-5">
                  <Col md={8} >
                      <h3>{ans || "Answer for your question" }</h3>
                  </Col>
                 
                </Row>
              }
         
        </Row>
        <Row className="mt-3">
          <Col md={5}>
            <Button variant="primary" onClick={speakhandler}>Listen</Button>
          </Col>
        </Row>
        

    </Container>
  );
}

export default App;
