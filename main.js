Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version:',ml5.version);

Classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/d7EDe9UmV/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

Prediction="";

function speak()
{
    var synth=window.speechSynthesis;
    speakdata1="Prediction is"+Prediction;
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}

function predictemotion()
{
    img=document.getElementById("captured_image");
    Classifier.classify(img,gotresults);
}

function gotresults(error,results)
{
    if(error)
    {
    console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        Prediction_1=results[0].label;
        if(results[0].label=="AMAZING")
        {
            document.getElementById("update_emoji").innerHTML="&#128522";
        }
        if(results[0].label=="BEST")
        {
            document.getElementById("update_emoji").innerHTML="&#128549";
        }
        if(results[0].label=="VICTORY")
        {
            document.getElementById("update_emoji").innerHTML="&#128545";
        }
        
    }
}