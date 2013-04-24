var { Hotkey } = require("sdk/hotkeys"),
     tabs = require("sdk/tabs"),
     widgets = require("sdk/widget"),
     data = require("sdk/self").data,
     page_worker = require("sdk/page-worker").Page({
      contentScriptFile: data.url("scripts/test.js"),
      contentURL: data.url("page/index.html")
}),
    testTab = tabs.open(data.url("page/index.html")),
    startRecording = function(worker) {
      console.log("I pressed the listener");
      worker.port.emit("startrec", "pretty please");
    },
    stopRecording = function(worker) {
      worker.port.emit("stoprec", "pretty please!");
    };
 
var showHotKey = Hotkey({
  combo: "accel-shift-o",
  onPress: function() {
    startRecording(page_worker);
  }
});
var hideHotKey = Hotkey({
  combo: "accel-alt-shift-o",
  onPress: function() {
    stopRecording(page_worker);
  }
});
var widget = widgets.Widget({
  id: "jquery-link",
  label: "jQuery website",
  contentURL: "http://www.jquery.com/favicon.ico",
  onClick: function() {
    tabs.open("http://www.jquery.com/");
  }
});
