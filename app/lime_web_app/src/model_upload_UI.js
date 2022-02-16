import "./App.css";
import {events} from "./events.js"

function ModelUploadUI(props){
	return (
		<div id="model_upload_UI">			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">Model weights</legend>
						<div className="input">
							<input type="file" id="model_weights" accept=".h5"></input>
						</div>
						<button id="upload_model_weights_button" onClick={(e) => {document.getElementById("model_weights").click()}}>UPLOAD</button>
						<div className="description">
							<br></br>
							<p>The weights of your model.</p>
							<p>You can obtain the weights of a TF model by calling the method <i>save</i> of a trained <i>Model</i> or <i>Sequential</i> model.</p>
							<p>Files in <i>.h5</i> format are expected.</p>
						</div>
					</fieldset>
				</div>  	


				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">Model arch</legend>
						<div className="input">
							<input type="file" id="model_arch" accept=".json"></input>
						</div>
						<button id="upload_model_arch_button" onClick={(e) => {document.getElementById("model_arch").click()}}>UPLOAD</button>
						<div className="description">
							<br></br>
							<p>The architecture of your model.</p>
							<p>You can obtain the architecture of a TF model by calling the method <i>to_json</i> of a trained <i>Model</i> or <i>Sequential</i> model.</p>
							<p>Files in <i>.json</i> format are expected.</p>
						</div>
					</fieldset>
				</div>


				<div className="ui_item">
					<button id="upload_model_btn" onClick={(event) => {events.uploadModel()}}>Upload model</button> 
				</div>	
					
						
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend align="center" className="legend">RESPONSE</legend>
						<div className="text" id="response_model_upload">
							Waiting for model files to be uploaded...
						</div>        
					</fieldset>
				</div>				
			 
			</div>
		</div>
);}

export default ModelUploadUI;