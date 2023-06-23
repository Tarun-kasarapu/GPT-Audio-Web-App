const express=require("express");
const path=require("path");

const app=express();
const PORT=process.env.PORT|| 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let Prompt;
let answer;

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

/**
 * Calls the Speech-to-Text API .
 */
async function quickstart() {
// The path to the remote LINEAR16 file stored in Google Cloud Storage
  const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
  console.log(`Transcription: ${transcription}`);
}







/// ChatGPT RESPONSE..


const { Configuration, OpenAIApi } = require("openai");
const { contains } = require("jquery");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const runPrompt= async() => {
        
    try {
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: Prompt, 
        max_tokens:2048,
        temperature:1,   
        });
        console.log(Prompt);
        console.log(completion.data.choices[0].text);
        answer=completion.data.choices[0].text;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            answer=(error.response.data);
        } else {
            answer=(error.message);
        }
    }

}

app.post('/',async function(req,res){
    Prompt=req.body.question;
    console.log(Prompt);
    try{
        await runPrompt();
        res.status(200).json(answer);
    }catch(err){
        res.status(404).json(err);
    }
});

///Text to speech

const say = require('say');
 
 
// Use default system voice and speed
say.speak('Hello!')
 
// Stop the text currently being spoken
say.stop()

const __dirname=path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
}

app.listen(PORT,function(req,res){
    console.log("listenning");
})