import "./App.css";

function SlicUI(props){
	return (
		<div id="slic_UI" hidden>			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">N_segments</legend>
						<div className="input">
							<input id="n_segments" type="text" defaultValue="100"></input>
						</div>
						<div className="description">
							<p className="type">Integer, default: 100</p>
							<br></br>
							<p>The (approximate) number of labels in the segmented output image.</p>
						</div>
					</fieldset>
				</div>
				
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">compactness</legend>
						<div className="input">
							<input id="compactness" type="text" defaultValue="10.0"></input>
						</div>
						<div className="description">
							<p className="type">Float, default: 10.0</p>
							<br></br>
							<p>Balances color proximity and space proximity. Higher values give more weight to space proximity, making superpixel shapes more square/cubic.</p> 
							<p>In SLICO mode, this is the initial compactness.</p>
						</div>
					</fieldset>
				</div>
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">max_num_iter</legend>
						<div className="input">
							<input id="max_num_iter" type="text" defaultValue="10"></input>
						</div>
						<div className="description">
							<p className="type">Integer, default: 10</p>
							<br></br>
							<p>Maximum number of iterations of k-means.</p>
						</div>
					</fieldset>
				</div>
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">sigma</legend>
						<div className="input">
							<input id="sigma_slic" type="text" defaultValue="0"></input>
						</div>
						<div className="description">
							<p className="type">Float, default: 0</p>
							<br></br>
							<p>Width of Gaussian smoothing kernel for pre-processing for each dimension of the image.</p>
						</div>
					</fieldset>
				</div>
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">convert2lab</legend>
						<div className="input">
							<input type="checkbox" id="convert2lab" defaultChecked={true}></input>
						</div>
						<div className="description">
							<p className="type">Bool, default: True</p>
							<br></br>
							<p>Whether the input should be converted to Lab colorspace prior to segmentation. The input image must be RGB.</p>
						</div>
					</fieldset>
				</div>
			
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">enforce connectivity</legend>
						<div className="input">
							<input type="checkbox" id="enforce_connectivity" defaultChecked={true}></input>
						</div>
						<div className="description">
							<p className="type">Bool, default: True</p>
							<br></br>
							<p>Whether the generated segments are connected or not</p>
						</div>
					</fieldset>
				</div>
			
			
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">min size factor</legend>
						<div className="input">
							<input id="min_size_factor" type="text" defaultValue="0.5"></input>
						</div>
						<div className="description">
							<p className="type">Float, default: 0.5</p>
							<br></br>
							<p>Proportion of the minimum segment size to be removed with respect to the supposed segment size</p>
						</div>
					</fieldset>
				</div>
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">max size factor</legend>
						<div className="input">
							<input id="max_size_factor" type="text" defaultValue="3"></input>
						</div>
						<div className="description">
							<p className="type">Float, default: 3</p>
							<br></br>
							<p>Proportion of the maximum connected segment size. A value of 3 works in most of the cases.</p>
						</div>
					</fieldset>
				</div>
				
				
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">slic zero</legend>
						<div className="input">
							<input type="checkbox" id="slic_zero" defaultChecked={false}></input>
						</div>
						<div className="description">
							<p className="type">Bool, default: False</p>
							<br></br>
							<p>Run SLIC-zero, the zero-parameter mode of SLIC.</p>
						</div>
					</fieldset>
				</div>
				
				
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">start label</legend>
						<div className="input">
							<input id="start_label" type="text" defaultValue="0"></input>
						</div>
						<div className="description">
							<p className="type">Integer, default: 0</p>
							<br></br>
							<p>The labels’ index start. Should be 0 or 1.</p>
						</div>
					</fieldset>
				</div>
				
			</div>
		</div>
);}

export default SlicUI;