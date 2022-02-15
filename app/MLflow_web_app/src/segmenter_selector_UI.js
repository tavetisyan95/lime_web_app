import "./App.css";

function SegmenterSelectorUI(props){
	return (
		<div id="segmenter_selector_UI">			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">Segmenter</legend>					
						<br></br>
									
						<select id="selector_segmenter" onChange={function(){
								// Getting the model selector
								var selector = document.getElementById("selector_segmenter");
						
								// Getting the UIs associated with each of the available models
								var quickshift_ui = document.getElementById("quickshift_UI");
								var felzenszwalb_ui = document.getElementById("felzenszwalb_UI");								
								var slic_ui = document.getElementById("slic_UI");
						
								// Creating a dictionary with our UI objects
								var uis = {"quickshift": quickshift_ui, "felzenszwalb": felzenszwalb_ui, "slic": slic_ui}
								
								
								// Iterating over the elements in the dict,
								// checking which one is selected,
								// and showing/hiding the corresponding UIs
								for (var key in uis){
									if (key == selector.value){
										uis[key].hidden = false
									} else {
										uis[key].hidden = true				
									}				
								}
								}}>
							<option value="quickshift" selected="selected">quickshift</option>
							<option value="felzenszwalb">felzenszwalb</option>  
							<option value="slic">slic</option> 
						</select>
						
						<div className="description">
							<br></br>
							<p>The segmentation algorithm you want to use to segment image explanations.</p>
						</div>
					</fieldset>
				</div>			
			 
			</div>
		</div>
);}

export default SegmenterSelectorUI;