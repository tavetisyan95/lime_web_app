import "./App.css";
import {events} from "./events.js";

function ExplanationUI(props) { 
	return (
		<div className="UI_wrapper">

			

			 					


			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Image indices</legend>
					<div className="input">
						<input id="image_indices" type="text" defaultValue="0"></input>
					</div>
					<div className="description">
						<p className="type">String, default: Experiment</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
			</div> 
		  
		  
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Top labels</legend>
					<div className="input">
						<input id="top_labels" type="text" defaultValue="3"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 3</p>
						<br></br>
						<p>The number of CPU cores that will be used during training.</p>
					</div>
				</fieldset>
			</div>
		  
		  
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Top predictions</legend>
					<div className="input">
						<input id="top_predictions" type="text" defaultValue="3"></input>
					</div>
					<div className="description">
						<p className="type">Integer or None, default: None</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Labels to explain</legend>
					<div className="input">
						<input id="labels_to_explain" type="text" defaultValue="None"></input>
					</div>
					<div className="description">
						<p className="type">Integers or None, default: None</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Number of samples</legend>
					<div className="input">
						<input id="num_samples" type="text" defaultValue="250"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 250</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">positive_only</legend>
					<div className="input">
						<input type="checkbox" id="positive_only" defaultChecked={true}></input>
					</div>
					<div className="description">
						<p className="type">Bool, default: True</p>
						<br></br>
						<p>If False, the <i>cv_results_</i> attribute will not include training scores.</p>
					</div>
				</fieldset>
			</div>
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">negative_only</legend>
					<div className="input">
						<input type="checkbox" id="negative_only" defaultChecked={false}></input>
					</div>
					<div className="description">
						<p className="type">Bool, default: False</p>
						<br></br>
						<p>If False, the <i>cv_results_</i> attribute will not include training scores.</p>
					</div>
				</fieldset>
			</div>
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">hide_rest</legend>
					<div className="input">
						<input type="checkbox" id="hide_rest" defaultChecked={false}></input>
					</div>
					<div className="description">
						<p className="type">Bool, default: False</p>
						<br></br>
						<p>If False, the <i>cv_results_</i> attribute will not include training scores.</p>
					</div>
				</fieldset>
			</div>
		  
		  
			<div className="ui_item">
				<button id="explain_button" onClick={(event) => {events.explain()}}>Explain</button> 
			</div>		
	


					
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend align="center" className="legend">RESPONSE</legend>
					<div className="text" id="response_explanation">
						Waiting for training to start...
					</div>        
				</fieldset>
			</div>		  
		</div>
  );
}
// {parse_data(props.data)}
export default ExplanationUI;
