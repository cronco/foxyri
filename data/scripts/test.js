console.log(document.URL);
navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.mozGetUserMedia);
 
//var audio = document.querySelector('audio'),
var audio = new Audio(),
    startRec = function() {
      navigator.getMedia ({
        audio: true
      },
     
     // successCallback
     function(stream) {
       console.log(audio.mozChannels);
        audio.mozSrcObject = stream;
        audio.onloadedmetadata = function(e) {
          console.log("we have metadata!");
        };
        var audioAvailable = function(e) {
          console.log("We have audio!", e.frames);
        };
        audio.addEventListener('MozAudioAvailable', audioAvailable, false);
        audio.play();
     },
   
     // errorCallback
     function(err) {
      console.log("The following error occured: " + err);
     }
   
  );
};


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

audio.mozSetup(2, 44100);
console.log(audio.mozChannels);
self.port.on("stoprec", stopRec);
