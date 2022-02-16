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
						<p className="type">Integer or list of integers, default: 0</p>
						<br></br>
						<p>The indices of the uploaded images that you want to explain.</p>
						<p>Multiple values can be entered.</p>
						<p>Separate each value with a comma, e.g. <i>"0, 1, 2, ...".</i></p>
					</div>
				</fieldset>
			</div> 
		  
		  
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Top labels</legend>
					<div className="input">
						<input id="top_labels" type="text" defaultValue="10"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 10</p>
						<br></br>
						<p>The number of predictions with the highest probabilities that LIME should store.</p>
						<p>Should be equal to or less than the number of classes that the model was trained to predict.</p>
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
						<p className="type">Integer, default: 3</p>
						<br></br>
						<p>The number of predictions with the highest probabilities that you want to see explanations for.</p>
						<p>Should be equal to or less than <i>Top labels</i></p>
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
						<p>The labels with respect to which you want to see explanations for.</p>
						<p>If <i>None</i>, explanations for top predictions will be produced instead.</p>
						<p>Multiple values can be entered.</p>
						<p>Separate each value with a comma, e.g. <i>"0, 1, 2, ...".</i></p>
						<p>When not <i>None</i>, make sure that only one value is entered in <i>Image indices</i></p>
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
						<p>The size of the neighborhood data to generate for explanations.</p>
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
						<p>Whether to only highlight positive areas in the explanations.</p>
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
						<p>Whether to only highlight negative areas in the explanations.</p>
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
						<p>Whether to hide irrelevant areas in the explanations.</p>
						<p>If <i>positive_only=True</i>, will only show positive areas.</p>
						<p>If <i>negative_only=True</i>, will only show negative areas.</p>
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
						Waiting for user input...
					</div>        
				</fieldset>
			</div>		  
			
		</div>
  );
}
// {parse_data(props.data)}
export default ExplanationUI;
