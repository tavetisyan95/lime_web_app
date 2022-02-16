import { config } from "./config.js";
import axios from "axios";

export const events = {
	// Function for generating and showing explanations  
	explain: function(){		
		// Getting parameters for LIME
		var imageIndices = document.getElementById("image_indices").value;
		var topLabels = document.getElementById("top_labels").value;
		var topPredictions = document.getElementById("top_predictions").value;
		var labelsToExplain = document.getElementById("labels_to_explain").value;
		var numSamples = document.getElementById("num_samples").value;
		var positiveOnly = document.getElementById("positive_only").checked;
		var negativeOnly = document.getElementById("negative_only").checked;
		var hideRest = document.getElementById("hide_rest").checked;
		var algoType = document.getElementById("selector_segmenter").value;

		// Getting parameters for the segmentation algorithm
		var segmenterParams;

		// Getting the object that will store the explanations
		var img = document.getElementById("explanation_image");
	

		// Removing any old explanations
		img.src = "";	
		
		// Getting the Explain button and hiding it
		var	 explainButton = document.getElementById("explain_button");	
		explainButton.style.visibility = "hidden"
		
		// Getting the area that displays status messages for explanations
		var responseArea = document.getElementById("response_explanation")
	 
	 	// Changing the status message to indicate that explanations are being generated
		responseArea.innerText = "Generating explanations..."
	
		// Check which segmenter was requested and handle parameters appropriately
		if (algoType == "quickshift"){
			segmenterParams = events.handleQuickshift();
		} else if (algoType == "felzenszwalb"){
			segmenterParams = events.handleFelzenszwalb();
		} else if (algoType == "slic"){
			segmenterParams = events.handleSlic();
		} 
	  			
		// Storing all arguments in a body
	    var body = {explanation_params: {image_index: imageIndices,
										top_labels: topLabels,
										top_predictions: topPredictions,
										labels_to_explain: labelsToExplain,
										num_samples: numSamples,
										positive_only: positiveOnly,
										negative_only: negativeOnly,
										hide_rest: hideRest}, 
					segmenter_params:{args: segmenterParams}}
			
		// Sending a request to the server to generate explanations
		fetch("http://" + config.api_url + ":" + config.api_port + config.api_explain_endpoint,
				{method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
		})	
	 	.then(() => {
			// Displaying the explanation
			img.src = "http://" + config.api_url + ":" + config.http_server_port + "/explanation.jpg/";  
		  	
			// Making the Explain button visible
			explainButton.style.visibility = "visible"
			
			// Dispalying a success message
			responseArea.innerText = "Explanations ready!"
		  
	  	})
	  	.catch(error => {		  
			console.error('Error: ', error);
			explainButton.style.visibility = "visible"		  
		  	responseArea.innerText = "Something went wrong!"
	  	});
	  
	  
	  /*axios({method: "post",
			 url: "http://localhost:5000/explain/",
			 data: JSON.stringify(body),
			 headers: {"Content-Type": "application/json"}})*/
	},
  	// Function for uploading model files 
  	uploadModel: function(){
		// Getting the model architecture and weights		  
		var arch = document.getElementById("model_arch").files[0];
		var weights = document.getElementById("model_weights").files[0];
		
		// Getting the Upload button and response area
		var uploadButton = document.getElementById("upload_model_btn");
		var responseArea = document.getElementById("response_model_upload");

		// Hiding the Upload button and updating the status message
		uploadButton.style.visibility = "hidden"
		responseArea.innerText = "Uploading model..."
		
		/*
		axios.defaults.headers.post['Content-Type'] = "application/json";
		
		axios.post("http://localhost:5000/post/", formData)
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(function (error) {
			console.log(error.response);
		});*/
		
		// Creating form data and adding the model files under the required keys
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
						
		// Uploading the model files to the server		   					
		fetch("http://" + config.api_url + ":" + config.api_port + config.api_model_upload_endpoint,
				{method: "POST",	
				body: formData
		})		
		.then(() => {
			// Making the Upload button visible
			uploadButton.style.visibility = "visible";

			// Showing a success message
			responseArea.innerText = "Model loaded!"})
		.catch(error => {		  			
			uploadButton.style.visibility = "visible"
			responseArea.innerText = "Something went wrong!"
			console.error('Error: ', error);
		});	  
  	},
  	// Function for uploading images
	uploadImages: function() {	  
	  	// Getting uploaded image files
		var file = document.getElementById("images").files;
		
		// Getting the image Upload button and response area
		var uploadButton = document.getElementById("upload_images_btn");
		var responseArea = document.getElementById("response_images_upload");

		// Hiding the image Upload button and changing the status message
		uploadButton.style.visibility = "hidden"				
		responseArea.innerText = "Uploading images..."
		
		// Adding the image files to a form under a single "images" key
		var formData = new FormData();							
		for (var i = 0; i < file.length; i++){
			formData.append("images", file[i]);
		}					
		
		
		axios({method: "post",
			 url: "http://" + config.api_url + ":" + config.api_port + config.api_image_upload_endpoint,
			 data: formData,
			 headers: {"Accept": "application/json",
					   "Content-Type": "multipart/form-data"}})
					   
		/*fetch("http://localhost:5000/upload-images/",
			{method: "POST",
			body: formData})*/		
		.then(() => {
			// Making the image Upload button visible
			uploadButton.style.visibility = "visible"

			// Showing a success message
	  		responseArea.innerText = "Images uploaded!"})
	  	.catch(function (error) {
			    console.log(error.response)
			    responseArea.innerText = "Something went wrong!"
				uploadButton.style.visibility = "visible"
		  
	  });
	},
	// Function for handling quickshift arguments
  	handleQuickshift: function(){
		// Getting the argument values
		var ratio = document.getElementById("ratio").value;	  
		var kernelSize = document.getElementById("kernel_size").value;	  
		var maxDist = document.getElementById("max_dist").value;
		var sigma = document.getElementById("sigma_quickshift").value;		
	  
		// Returning the argument values
	  	return {algo_type: "quickshift", ratio: ratio, kernel_size: kernelSize, max_dist: maxDist, sigma: sigma};
  	},
	// Function for handling felzenszwalb arguments
  	handleFelzenszwalb: function(){
		// Getting the argument values
		var scale = document.getElementById("scale").value;	  
		var sigma = document.getElementById("sigma_felzenszwalb").value;
		var minSize = document.getElementById("min_size").value;
		
		// Returning the argument values
		return {algo_type: "felzenszwalb", scale: scale, sigma: sigma, min_size: minSize};
  	},
	// Function for handling slic arguments
	handleSlic: function(){
		// Getting the argument values
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
		
		// Returning the arguments
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
		start_label: startLabel}	  
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
