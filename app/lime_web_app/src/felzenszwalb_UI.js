import "./App.css";

function FelzenszwalbUI(props){
	return (
		<div id="felzenszwalb_UI" hidden>			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Scale</legend>
					<div className="input">
						<input id="scale" type="text" defaultValue="1.0"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 1.0</p>
						<br></br>
						<p>Free parameter. Higher means larger clusters.</p>
					</div>
				</fieldset>
				</div> 
				
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Sigma</legend>
					<div className="input">
						<input id="sigma_felzenszwalb" type="text" defaultValue="0.8"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 0.8</p>
						<br></br>
						<p>Width (standard deviation) of Gaussian kernel used in preprocessing.</p>
					</div>
				</fieldset>
				</div> 
				
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Min size</legend>
					<div className="min_size">
						<input id="min_size" type="text" defaultValue="20"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 20</p>
						<br></br>
						<p>Minimum component size. Enforced using postprocessing.</p>
					</div>
				</fieldset>
				</div>
				
			</div>
		</div>
);}

export default FelzenszwalbUI;