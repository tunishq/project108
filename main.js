prediction_1 = "";
prediction_2 = "";

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IvM90_bdp/model.json', modelLoaded);

function modelLoaded()
{
    console.log('model loaded');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = " And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}





function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results)
{
    if (error){
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "perfect")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "thumbs down")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "sign of the horns")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(results[0].label == "hello")
        {
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        }
        if(results[0].label == "point right")
        {
            document.getElementById("update_emoji").innerHTML = "&#9758;";
        }

        if(results[1].label == "perfect")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }
        if(results[1].label == "thumbs up")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }
        if(results[1].label == "thumbs down")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128078;";
        }
        if(results[1].label == "sign of the horns")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#129304;";
        }
        if(results[1].label == "hello")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128075;";
        }
        if(results[1].label == "point right")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#9758;";
        }
    }
    




}
