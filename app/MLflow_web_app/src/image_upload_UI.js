import "./App.css";
import {events} from "./events.js"

function ImageUploadUI(props){
	return (
		<div id="image_upload_UI">			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Images</legend>
					<div className="input">
						<input type="file" id="images" multiple accept=".jpg, .jpeg"></input>
					</div>
					<button id="upload_image_button" onClick={(e) => {document.getElementById("images").click()}}>UPLOAD</button>
					<div className="description">
						<br></br>
						<p>The images that you want to generate explanations for.</p>
						<p>RGB images expected, with -1 being the channel axis.</p>
					</div>
				</fieldset>
			</div>


			<div className="ui_item">
				<button id="upload_images_btn" onClick={(event) => {events.uploadImages()}}>Upload images</button> 
			</div>		
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend align="center" className="legend">RESPONSE</legend>
					<div className="text" id="response_images_upload">
						Waiting for the images to be uploaded...
					</div>        
				</fieldset>
			</div>	
			 
			</div>
		</div>
);}

export default ImageUploadUI;