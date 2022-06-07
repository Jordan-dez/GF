import React,{useState,useEffect} from 'react';
import {Link,useHistory}  from "react-router-dom";
import {Modal} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import pic1 from '../../../images/profile/small/pic1.jpg';
import EditableGf from './EditableGf';
import { useDispatch,useSelector } from 'react-redux';
import { addGif, deleteGif, loadGifs } from '../../../store/actions/Gifs/GifActions';
import { loadUsers } from '../../../store/actions/Users/UserActions';
import { parse } from 'date-fns';



const Gf = () =>{
    //constants defined
	const [contents, setContents] = useState({});
    let  dispatch = useDispatch();
	let history = useHistory();
    const {listgifs} = useSelector(state=>state.gifs);
	const {listusers} = useSelector(state=>state.users);

	// delete data from api and redirect to gfs pageContent
    const handleDeleteClick = (gifId) => {
		if(window.confirm('êtes-vous sûr de supprimer ce Gif ?')){

			dispatch(deleteGif(gifId));
			history.push('/gfs')
		}
    }
	
	//Modal box
	const [addCard, setAddCard] = useState(false);
	//initialState  
    const [addFormData, setAddFormData ] = useState({
		num_gf:'',
        name:'',
		secteur:'',
		bloc:'',
        num_voie:'',
        nom_rue:'',
        cp_postal:'',
        commune:'',
		create_by_id:'',
		create_by:{}
    }); 
	//state 
    
    // Add contact function
    const handleAddFormChange = (event) => {

        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
		console.log("fieldValue",fieldValue);
		const newFormData = {...addFormData}; 

		if(fieldName==="create_by"){
			
			let selectedId= event.target.value;
			const selectedUser = listusers.filter((d)=>{
				selectedId = parseInt(selectedId); 
				return d.id===selectedId
			})[0];
			
			console.log("newFormData",newFormData);
			addFormData.create_by=selectedUser;
			addFormData.create_by_id=selectedId;
			setAddFormData(addFormData)
			
			console.log("newFormData intermediateData",addFormData);
			
		}else{ 
			
			newFormData[fieldName] = fieldValue;
			setAddFormData(newFormData);
		}
        
		console.log("addFormData full completed",addFormData);

    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        let error = false;
		let errorMsg = '';
        if(addFormData.name === ""){
            error = true;
			errorMsg = 'le nom du gf est obligatoire';
        }else if(addFormData.num_voie === ""){
            error = true;
			errorMsg = 'le numero de la voie est obligatoire';
        }else if(addFormData.nom_rue === ""){
			error = true;
			errorMsg = "remplissez le champ du nom de la rue svp!";
		
        }else if(addFormData.cp_postal === ""){
			error = true;
			errorMsg = "le code postal est requis";
		
        }else if(addFormData.commune === ""){
			error = true;
			errorMsg = "la coommune est requise";
		}

        if(!error){
            const gif = {
				num_gf:addFormData.num_gf,
                name: addFormData.name,
				secteur:  addFormData.secteur,
				bloc:  addFormData.bloc,
                num_voie:  addFormData.num_voie,
                nom_rue:  addFormData.nom_rue,
                cp_postal:  addFormData.cp_postal,
                commune:  addFormData.commune,
				create_by:  addFormData.create_by,
				create_by_id: addFormData.create_by_id,
			};
			console.log("gif",gif)
            setAddCard(false);
			dispatch(addGif(gif));
            swal('bravo!', 'GF ajouté avec succès', "success");
			addFormData.num_gf= addFormData.name  = addFormData.num_voie = addFormData.nom_rue = addFormData.cp_postal = addFormData.commune = addFormData.create_by ='';         
			dispatch(loadGifs())
        }else{
			swal('Oups !', errorMsg, "error");
		}
    };
	
	//Edit start 
	//const [editModal, setEditModal] = useState(false);	
	// Edit function editable page loop
    const [editContentId, setEditContentId] = useState(null);
   
    // Edit function button click to edit
    const handleEditClick = ( event, content) => {
        event.preventDefault();
        setEditContentId(content.id);
        const formValues = {
            name: content.name,
            num_voie: content.num_voie,  
            nom_rue: content.nom_rue,  
            cp_postal: content.cp_postal,  
            commmune: content.commmune,   	
        }
        setEditFormData(formValues);
        //setEditModal(true);
    };
   
    // edit  data  
    const [editFormData, setEditFormData] = useState({
        name:'',
        num_voie:'',
        nom_rue:'',
        cp_postal:'',
        commune:'',
    })
    
    //update data function
    const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    
    // edit form data submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContent = {
            id: editContentId,
            name: editFormData.name,
            num_voie: editFormData.num_voie,
            nom_rue: editFormData.nom_rue,
            cp_postal: editFormData.cp_postal,
            commune: editFormData.commune,
        }
        const newContents = [...contents];
        const index = contents.findIndex((content)=> content.id === editContentId);
        newContents[index] = editedContent;
        setContents(newContents);
        setEditContentId(null);
       // setEditModal(false);
    }
	//Cencel button to same data
    const handleCancelClick = () => {
        setEditContentId(null);    
    };

	//useEffect to dispatch loading all gfs
    useEffect(() => {
		dispatch(loadUsers())
        dispatch(loadGifs())
    },[])

	// state for autocompleting adresse
	const [displayAdresseResult,setDisplayAdresseResult] = useState(false);
	const[adresse,setAdresse] =useState([])

	//handleAddress
	const handleAddress =(properties)=>{
		// const target = e.target;
		setDisplayAdresseResult(false);
		const {housenumber,postcode,street,city}= properties;
		let newVal = {...addFormData};
		newVal.num_voie = housenumber;
		newVal.nom_rue=street;
		newVal.commune = city;
		newVal.cp_postal = postcode;
		setAddFormData(newVal);
		console.log("displayAdresseResult",displayAdresseResult);
		
	}
	//useEffect to dispatch for auto complete addresses
	useEffect(() => {
		if(addFormData.num_voie && addFormData.nom_rue){
			// setDisplayAdresseResult(!displayAdresseResult);
			console.log("displayAdresseResult",displayAdresseResult);
			fetch(`https://api-adresse.data.gouv.fr/search/?q=${addFormData.num_voie} ${addFormData.nom_rue}&type=housenumber&autocomplete=1`).then(response => response.json()).then(response =>{
				setAdresse(response.features)
				setDisplayAdresseResult(true)
			})
		}
	},[addFormData.num_voie,addFormData.nom_rue])

    //console.log("loadgifs",listgifs);
	
	return(
		<>
			<PageTitle activeMenu="gfs" motherMenu="Post" />
			<div className="col-12">
				<Modal className="modal fade"  show={addCard} onHide={setAddCard} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">ajouter Gf</h4>
									<button type="button" className="btn-close" onClick={()=> setAddCard(false)} data-dismiss="modal"><span></span></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
									<div className="add-contact-box">
										<div className="add-contact-content">
											<div className="form-group mb-3">
												<label className="text-black font-w500">N° GF</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="num_gf" required="required"
														onChange={handleAddFormChange}
														placeholder="numero gf"
														value={addFormData.num_gf}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											 <div className="form-group mb-3">
												<label className="text-black font-w500">Nom du Gf</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="name" required="required"
														onChange={handleAddFormChange}
														placeholder="nom Gf"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">secteur</label>
												<div className="contact-name">
												<select className="form-select" name="secteur" aria-label="Default select example" onChange={handleAddFormChange}>
													<option desabled>selectionnez un secteur</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
												</select>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">bloc</label>
												<div className="contact-name">
												<select className="form-select" name="bloc" aria-label="Default select example" onChange={handleAddFormChange}>
													<option desabled>selectionnez un bloc</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
												</select>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">N° voie</label>
												<div className="contact-name">
													<input type="number"  className="form-control"  autocomplete="off"
														name="num_voie" required="required"
														onChange={handleAddFormChange}
														placeholder="numero voie"
														value={addFormData.housenumber}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Nom de la rue</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="nom_rue" required="required"
														onChange={handleAddFormChange}
														placeholder="Nom de la rue"
														value={addFormData.nom_rue}
														
													/>
													<datalist id="browsers"/>
													<span className="validation-text"></span>
													{
														displayAdresseResult && <>

															{adresse && 
																<ul className="list-group cursor-pointer">
																	{
																		adresse.map(eachadress=><li className="list-group-item" onClick={()=>handleAddress(eachadress.properties)} key={eachadress.id}>{eachadress.id} {eachadress.properties.label}</li>)
																	}
																</ul>
															}
														
														</>
													}
													
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Code postal</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="cp_postal" required="required"
														onChange={handleAddFormChange}
														placeholder="code postal"
														value={addFormData.cp_postal}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Commmune</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="commune" required="required"
														onChange={handleAddFormChange}
														placeholder="Commmune"
														value={addFormData.commune}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label>créé par </label>
												<select className="form-select" aria-label="Default select example" name="create_by" onChange={handleAddFormChange}>
													<option desabled>veuillez choisir le créateur du gf</option>
													{
														listusers && <>
															{/* {setUsers(listusers)} */}
															{listusers.map(user => <>
															<option value={user.id}>{user.name} {user.firstname}</option>
															</>)}
														</>
													}
												</select>
													{/* {
														listusers && setUsers(listusers)
													} */}
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Ajouter</button>   
									<button type="button" onClick={()=> setAddCard(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i>Fermer</button>      
								</div>
							</form>
							
						</div>
					</div>
				</Modal>
				<div className="card">
					<div className="card-header">
						<h4 className="card-title">listes des gfs</h4>
						<Link className="btn btn-primary shadow btn-xs sharp me-2"
							onClick={()=> setAddCard(true)}
						>
							<i className="fa fa-plus"></i>
						</Link>
					</div>
					<div className="card-body">
						<div className="w-100 table-responsive">
							<div id="example_wrapper" className="dataTables_wrapper">
								<form onSubmit={handleEditFormSubmit}>
									<table id="example" className="display w-100 dataTable">
										<thead>
											<tr>
												<th></th>
												<th>Nom</th>
												<th>N° GF</th>
												<th>secteur</th>
												<th>bloc</th>
												<th>Adresse</th>
												<th>créé par</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{listgifs && listgifs.map((gif)=>(
												<>
													{editContentId === gif.id ? 
														( 
															<EditableGf editFormData={editFormData} 
																handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> 
																) : 
														( 
															<tr>
																<td><img className="rounded-circle" width="35" src={pic1} alt="" /></td>
																<td>{gif.name}</td>
																<td><strong>{gif.num_gf}</strong></td>
																<td>{gif.secteur}</td>
																<td>{gif.bloc}</td>
																<td>
																	<strong>{gif.num_voie}</strong>&nbsp;
																	<strong>{gif.nom_rue}</strong>&nbsp;
																	<strong>{gif.cp_postal}</strong>&nbsp;
																	<strong>{gif.commune}</strong>
																</td>
																<td>
																	{
																		gif.create_by && <>
																			<span>{gif.create_by.name}</span>&nbsp;
																			<span>{gif.create_by.firstname}</span>&nbsp;

																		</>
																	}
																</td>
																<td>
																	<div className="d-flex">
																		<Link  className="btn btn-secondary	 shadow btn-xs sharp me-2"
																			onClick={(event) => handleEditClick(event, gif)}
																		>
																			<i className="fas fa-pen"></i>
																		</Link>
																		<Link  className="btn btn-danger shadow btn-xs sharp" 
																			onClick={()=>handleDeleteClick(parseInt(gif.id))}
																		> 
																			<i className="fa fa-trash"></i>
																		</Link>
																			
																	</div>												
																</td>			
															</tr>   
														)
													}
												</>    
											))}
										</tbody>
									</table>
								</form>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Gf;