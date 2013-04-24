console.log(document.URL);
navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.mozGetUserMedia);
 
var audio = document.querySelector('audio');
audio.setAttribute('controls', true);
function startRec() {
  navigator.getMedia ({
        audio: true
     },
   
     // successCallback
     function(localMediaStream) {
        audio.mozSrcObject = localMediaStream;
        //audio.src = window.URL.createObjectURL(localMediaStream);
        audio.onloadedmetadata = function(e) {
          console.log(e);
        };
        audio.play();
     },
   
     // errorCallback
     function(err) {
      console.log("The following error occured: " + err);
     }
   
  );
}

function stopRec() {

  console.log('stop recording');
  if (audio.mozSrcObject) {
    audio.mozSrcObject.stop();
    audio.mozSrcObject = null;
  }
}
self.port.on("startrec", function(e) {
  console.log(arguments, "Starting recording");
  startRec();
});

self.port.on("stoprec", stopRec);
