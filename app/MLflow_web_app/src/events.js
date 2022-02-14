import { config } from "./config.js";
import papa from "papaparse";
import axios from "axios";

// Variable for a UI box that will display the names of existing CSV files
// that contain predictions
var fileArea;

export const events = {
  // Function for loading global UI elements  
  explain: function(){
	  var imageIndices = document.getElementById("image_indices").value;
	  var topLabels = document.getElementById("top_labels").value;
	  var topPredictions = document.getElementById("top_predictions").value;
	  var labelsToExplain = document.getElementById("labels_to_explain").value;
	  var numSamples = document.getElementById("num_samples").value;
	  var positiveOnly = document.getElementById("positive_only").checked;
	  var negativeOnly = document.getElementById("negative_only").checked;
	  var hideRest = document.getElementById("hide_rest").checked;
	  var algoType = document.getElementById("selector_segmenter").value;
	  	  	  
	  var segmenterParams;
	  
	  var img = document.getElementById("explanation_image");
	  
	  img.src = "";
	  var explanationPlot = document.getElementById("explanation_plot");	
	
	var	 explainButton = document.getElementById("explain_button");	
     explainButton.style.visibility = "hidden"
	 
	 
	 var responseArea = document.getElementById("response_explanation")
	 
	 responseArea.innerText = "Generating explanations..."
	
	  if (algoType == "quickshift"){
		  segmenterParams = events.handleQuickshift();
	  } else if (algoType == "felzenszwalb"){
		  segmenterParams = events.handleFelzenszwalb();
	  } else if (algoType == "slic"){
		  segmenterParams = events.handleSlic();
	  } 
	  	  
	  
	  var body = {explanation_params: {image_index: imageIndices,
									top_labels: topLabels,
									top_predictions: topPredictions,
									labels_to_explain: labelsToExplain,
									num_samples: numSamples,
									positive_only: positiveOnly,
									negative_only: negativeOnly,
									hide_rest: hideRest}, 
		segmenter_params:{args: segmenterParams}}
	
	fetch("http://localhost:5000/explain/",
	{method: "POST",
	headers: {"Content-Type": "application/json"},
	body: JSON.stringify(body)
	})
	.then(res => res.json())
	 .then(res => {		  		  
		  //var img = document.createElement("img");
		  img.src = "http://localhost:8080/explanation.jpg";		  
		  //explanationPlot.appendChild(img);
		  
		  explainButton.style.visibility = "visible"
		  
		  responseArea.innerText = "Explanations ready!"
		  
	  })
	  .catch(function (error) {
		  console.log(error.response);
		  explainButton.style.visibility = "visible"
	  });
	  
	  
	  /*axios({method: "post",
			 url: "http://localhost:5000/explain/",
			 data: JSON.stringify(body),
			 headers: {"Content-Type": "application/json"}})*/
  },
  handleQuickshift: function(){
	  var ratio = document.getElementById("ratio").value;	  
	  var kernelSize = document.getElementById("kernel_size").value;	  
	  var maxDist = document.getElementById("max_dist").value;
	  var sigma = document.getElementById("sigma_quickshift").value;
	  var channelAxis = document.getElementById("channel_axis_quickshift").value;
	  
	  return {algo_type: "quickshift", ratio: ratio, kernel_size: kernelSize, max_dist: maxDist, sigma: sigma, channel_axis: channelAxis};
  },
  handleFelzenszwalb: function(){
	  var scale = document.getElementById("scale").value;	  
	  var sigma = document.getElementById("sigma_felzenszwalb").value;
	  var minSize = document.getElementById("min_size").value;
	  var channelAxis = document.getElementById("channel_axis_felzenszwalb").value;
	  
	  return {algo_type: "felzenszwalb", scale: scale, sigma: sigma, min_size: minSize, channel_axis: channelAxis};
  },
  handleSlic: function(){
	  var nSegments = document.getElementById("n_segments").value;
	  var compactness = document.getElementById("compactness").value;
	  var maxNumIter = document.getElementById("max_num_iter").value;
	  var sigma = document.getElementById("sigma_slic").value;
	  var convert2Lab = document.getElementById("convert2lab").checked;
	  var enforceConnectivity = document.getElementById("enforce_connectivity").checked;
	  var minSizeFactor = document.getElementById("min_size_factor").value;
	  var maxSizeFactor = document.getElementById("max_size_factor").value;
	  var slicZero = document.getElementById("slic_zero").checked;
	  var startLabel = document.getElementById("start_label").value;
	  var channelAxis = document.getElementById("channel_axis_slic").value;
	  
	  return {algo_type: "slic", 
	  n_segments: nSegments,
	  compactness: compactness,	  
	  max_num_iter: maxNumIter, 
	  sigma: sigma, 
	  convert2lab: convert2Lab,
	  enforce_connectivity: enforceConnectivity,
	  min_size_factor: minSizeFactor,
	  max_size_factor: maxSizeFactor,
	  slic_zero: slicZero,
	  start_label: startLabel,
	  channel_axis: channelAxis}
	  
  },
  uploadModel: function()
  {		  
	 
  
  
	  var arch = document.getElementById("model_arch").files[0];
	  var weights = document.getElementById("model_weights").files[0];
	  
	  var uploadButton = document.getElementById("upload_model_btn");
	  var responseArea = document.getElementById("response_model_upload");

	  uploadButton.style.visibility = "hidden"
	  /*const formData = new FormData();
	  formData.append('model_weights', file);
	  
	  axios.defaults.headers.post['Content-Type'] = "application/json";
	  
	  axios.post("http://localhost:5000/post/", formData)
	  .then(res => res.json())
	  .then(res => console.log(res))
	  .catch(function (error) {
		  console.log(error.response);
	  });*/
	  
	  var formData = new FormData();
	  formData.append('weights', weights);
	  formData.append('arch', arch);	  
	  
	  /*axios.post("http://localhost:5000/post_test/", formData)
	  .then(res => res.json())
	  .then(res => console.log(res))
	  .catch(function (error) {
		  console.log(error.response);
	  });*/
	  
	  
	  /*axios({method: "post",
			 url: "http://localhost:5000/post_test/",
			 data: formData,
			 headers: {"Accept": "application/json",
					   "Content-Type": "multipart/form-data"}})*/
					   
					   
	fetch("http://localhost:5000/upload-model/",
	{method: "POST",	
	body: formData
	})
	.then(res => res.json())
	  .then(res => {
		  uploadButton.style.visibility = "visible";
			responseArea.innerText = "Model loaded!"})
	  .catch(function (error) {
		  console.log(error.response);
		  uploadButton.style.visibility = "visible"
	  });
	  
  },
  uploadImages: function() {
		var file = document.getElementById("images").files;
		
		var uploadButton = document.getElementById("upload_images_btn");
		 var responseArea = document.getElementById("response_images_upload");
		uploadButton.style.visibility = "hidden"
		
		
		responseArea.innerText = "Uploading images..."
		
		var formData = new FormData();
		
		var arr = []
		
		for (var i = 0; i < file.length; i++){
			formData.append("item", file[i]);
		}					
		
		
		/*axios({method: "post",
			 url: "http://localhost:5000/post-images/",
			 data: formData,
			 headers: {"Accept": "application/json",
					   "Content-Type": "multipart/form-data"}})*/
					   
	fetch("http://localhost:5000/upload-images/",
		{method: "POST",
		body: formData})
	.then(res => res.json())
	  .then(res => {uploadButton.style.visibility = "visible"
	  responseArea.innerText = "Images uploaded!"})
	  .catch(function (error) {
		  //responseArea.innerText = "Something went wrong!"
		  //uploadButton.style.visibility = "visible"
		  
	  });
  },
  /*
  toggle_train_state : {},
  toggle_choice : "Classification",
  toggle_training_mode : function(id, choice) {
    events.toggle_choice = choice;
    const possible = ["ball_id", "ball_id2"];
    const elem = document.getElementById(id);
    if(typeof(events.toggle_train_state[id]) === "undefined") {
      events.toggle_train_state[id] = false;
    }
    if(events.toggle_train_state[id]) {
      elem.style.marginLeft = "35px";
      elem.style.background = "limegreen";
      const other_id = possible.filter((x) => x !== id)[0]
      const other_elem = document.getElementById(other_id);
      other_elem.style.marginLeft = "0px";
      other_elem.style.background = "red";
    } else {
      elem.style.marginLeft = "0px";
      elem.style.background = "red";
      const other_id = possible.filter((x) => x !== id)[0]
      const other_elem = document.getElementById(other_id);
      other_elem.style.marginLeft = "35px";
      other_elem.style.background = "limegreen";
    }
    elem.style.transition = "all 0.2s ease-in-out";
    events.toggle_train_state[id] = !events.toggle_train_state[id];
  }*/
};
