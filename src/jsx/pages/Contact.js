import React,{useState,useEffect} from 'react';
import {Link}  from "react-router-dom";
import {Modal} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import pic1 from './../../images/profile/small/pic1.jpg';
import EditableContact from './EditableContact';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteContact, loadContacts } from '../../store/actions/ContactActions';
 
const tableList =[];
 // const tableList =[
// 	{
// 		id:"1", lastname:'romé',firstname:"les jours de la semaine", etat_civil:'Marié ',genre:'Male', 
// 		civilite:'M.COM., M.B.A', telephone:'12345 67890',metier:"mathématicien",
// 		 email:'info1@example.com',birthdate:"2010-01-15",reseau_md:"réseau sociau"
// 	},
// 	{	
// 		id:"2", lastname:'Gloria ', etat_civil:'Marié rator',gender:'Male', 
// 		civilite:'BTech, MTech', telephone:'09876 54321',metier:"mathématicien",
// 		 email:'info2@example.com',birthdate:"2010-01-15",reseau_md:"réseau sociau"
// 	},
// 	{	
// 		id:"3", lastname:'Fréddy',firstname:"les jours de la semaine", etat_civil:'Marié Engineer',genre:'Male', 
// 		civilite:'B.CA M.CA', telephone:'98765 67890',metier:"mathématicien",
// 		 email:'info3@example.com',birthdate:"2010-01-15",reseau_md:"réseau sociau"
// 	},
// 	{	
// 		id:"4", lastname:'Melki',firstname:"les jours de la semaine", etat_civil:'Marié rator',genre:'Male', 
// 		civilite:'BTech, MTech', telephone:'09876 54321',metier:"mathématicien",
// 		 email:'info4@example.com',birthdate:"2010-01-15",reseau_md:"réseau sociau"
// 	},
// 	{
// 		id:"5", lastname:'Déborah',firstname:"les jours de la semaine", etat_civil:'célibataire',genre:'Male', 
// 		civilite:'M.COM., M.B.A', telephone:'12345 67890',metier:"informaticien",
// 		 email:'info5@example.com',birthdate:"2010-01-15",reseau_md:"réseau sociau"
// 	},
// 	{	
// 		id:"6", lastname:'Désiré',firstname:"les jours de la semaine", etat_civil:'Marié Engineer',genre:'Male', 
// 		civilite:'B.CA M.CA', telephone:'98765 67890',metier:"mathématicien",
// 		 email:'info6@example.com',birthdate:"2010-01-15",reseau_md:"réseau sociau"
// 	},
// ]; 

const Contact = () =>{
	let dispatch = useDispatch();
	let history = useHistory();
	const {listcontacts} = useSelector(state=>state.contacts)

	//get data	
	useEffect(()=>{
		dispatch(loadContacts());
	},[])
	console.log("mes contacts loaded depuis contactspage",listcontacts);


	const [contents, setContents] = useState(tableList);
	// delete data  
    const handleDeleteClick = (contactId) => {
        // const newContents = [...contents];    
        // const index = contents.findIndex((content)=> content.id === contentId);
        // newContents.splice(index, 1);
        // setContents(newContents);

		console.log("jordan")
		dispatch(deleteContact(contactId));
		history.push('/contact');
    }
	
	//Modal box
	const [addCard, setAddCard] = useState(false);
	//Add data 
    const [addFormData, setAddFormData ] = useState({
		civilite:'',
        lastname:'',
        firstname:'',
        etat_civil:'',
        genre:'',
		birthdate:'',
		est_mineur:'',
		metier:'',
		telephone:'',
		email:'',
		reseau_md:''

    }); 
    
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';
        if(addFormData.lastname === ""){
            error = true;
			errorMsg = 'le nom est requis !';
        }else if(addFormData.firstname === ""){
            error = true;
			errorMsg = 'le prenom est requis!';
        }else if(addFormData.etat_civil === ""){
			error = true;
			errorMsg = "l'état civil est requis";
		}else if(addFormData.genre === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.birthdate === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.metier === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.telephone === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.email === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.reseau_md === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.genre === ""){
			error = true;
			errorMsg = "le genre est requis";
		}else if(addFormData.genre === ""){
			error = true;
			errorMsg = "le genre est requis";
		}

        if(!error){
            const newContent = {
                id: nanoid(),
                lastname: addFormData.lastname,
                firstname: addFormData.firstname,
				etat_civil:  addFormData.etat_civil,
				genre:  addFormData.genre,
                birthdate:  addFormData.birthdate,
				metier:  addFormData.metier,
                email:  addFormData.email,
                telephone:  addFormData.telephone,
                civilite:  addFormData.civilite,
                reseau_md:  addFormData.reseau_md,
			};
            
            const newContents = [...contents, newContent];
            setContents(newContents);
            setAddCard(false);
            swal('bien joué !', 'contact  ajouté avec succès', "success");
            addFormData.lastname  = addFormData.firstname = addFormData.etat_civil = addFormData.genre = addFormData.birthdate=addFormData.metier= addFormData.email =addFormData.telephone=addFormData.civilite=addFormData.reseau_md ='';         
            
        }else{
			swal('Oops', errorMsg, "error");
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
            lastname: content.lastname,
            firstname: content.firstname,  
            etat_civil: content.etat_civil,  
            genre: content.genre,  
            birthdate: content.birthdate,  
            metier: content.metier,  
            email: content.email,  	
            telephone: content.telephone,  	
            civilite: content.civilite,  	
            reseau_md: content.reseau_md 	
        }
        setEditFormData(formValues);
        //setEditModal(true);
    };
   
    // edit  data  
    const [editFormData, setEditFormData] = useState({
		civilite:'',//fait
        lastname:'',//fait
        firstname:'',//fait
        etat_civil:'',//fait
        genre:'',//fait
		birthdate:'',//fait
		est_mineur:'',
		metier:'',//fait
		telephone:'',//fait
		email:'',//fait
		reseau_md:''//fait
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
            lastname: editFormData.lastname,
            firstname: editFormData.firstname,
            etat_civil: editFormData.etat_civil,
            genre: editFormData.genre,
            birthdate: editFormData.birthdate,
            metier: editFormData.metier,
            email: editFormData.email,
            telephone: editFormData.telephone,
			civilite:editFormData.civilite,
			reseau_md:editFormData.reseau_md,
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
	
	return(
		<>
			<PageTitle activeMenu="Contact" motherMenu="Contact" />
			<div className="col-12">
				<Modal className="modal fade"  show={addCard} onHide={setAddCard} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Ajouter un Contact</h4>
									<button type="button" className="btn-close" onClick={()=> setAddCard(false)} data-dismiss="modal"><span></span></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
									<div className="add-contact-box">
										<div className="add-contact-content">
											<div className="form-group mb-3">
												<label className="text-black font-w500">Nom</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="lastname" required="required"
														onChange={handleAddFormChange}
														placeholder="nom"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Prenom</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="firstname" required="required"
														onChange={handleAddFormChange}
														placeholder="prenom"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">civilite</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="civilite" required="required"
														onChange={handleAddFormChange}
														placeholder="civilite"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">genre</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="genre" required="required"
														onChange={handleAddFormChange}
														placeholder="gender"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">metier</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="metier" required="required"
														onChange={handleAddFormChange}
														placeholder="metier"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">telephone</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="telephone" required="required"
														onChange={handleAddFormChange}
														placeholder="telephone"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Email</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="email" required="required"
														onChange={handleAddFormChange}
														placeholder="email"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Date de naissance</label>
												<div className="contact-name">
													<input type="date"  className="form-control"  autocomplete="off"
														name="birthdate" required="required"
														onChange={handleAddFormChange}
														placeholder="date de naissance"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Réseau</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="reseau_md" required="required"
														onChange={handleAddFormChange}
														placeholder="reseau_md"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Valider</button>   
									<button type="button" onClick={()=> setAddCard(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i>Quitter</button>      
								</div>
							</form>
							
						</div>
					</div>
				</Modal>
				<div className="card">
					<div className="card-header">
						<h4 className="card-title">Tableau des contacts</h4> 
						<Link className="btn btn-primary shadow btn-xs sharp me-2"
							onClick={()=> setAddCard(true)}
						>
							<i className="fa fa-plus"></i>
						</Link>
					</div>
					<div className="card-body">
						<div className="w-100 table-responsive">
							<div id="example_wrapper" className="dataTables_wrapper">
								<div className="d-block float-right">
								</div>
								<form onSubmit={handleEditFormSubmit}>
									<table id="example" className="display w-100 dataTable">
										<thead>
											<tr>
												<th></th>
												<th>civilite</th>
												<th>Nom</th>
												<th>Prenom</th>
												<th>etat civil</th>
												<th>Genre</th>
												<th>Date de naissance</th>
												<th>Métier</th>
												<th>Email</th>
												<th>Telephone</th>
												<th>Marié(e) à </th>
												<th>N° Gf</th>
												<th>Gf infos</th>
												<th>réseau md</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{listcontacts && listcontacts.map((contact)=>(
												<>
													{editContentId === contact.id ? 
														( 
															<EditableContact editFormData={editFormData} 
																handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> 
																) : 
														( 
															<tr key={contact.id}>
																<td><img className="rounded-circle" width="35" src={pic1} alt={contact.lastname} /></td>
																<td><strong>{contact.civilite}</strong></td>
																<td>{contact.lastname}</td>
																<td>{contact.firstname}</td>
																<td>{contact.etat_civil}</td>
																<td>{contact.genre}</td>
																<td><strong>{contact.birthdate}</strong></td>
																<td><strong>{contact.metier}</strong></td>
																<td><strong>{contact.email}</strong></td>
																<td><strong>{contact.telephone}</strong></td>
																<td><strong>{contact.marie_a && contact.marie_a.lastname}</strong> &nbsp;{contact.marie_a && contact.marie_a.firstname}</td>
																<td>{contact.num_gf && contact.num_gf.num_gf}</td>
																<td>bloc :{contact.num_gf && contact.num_gf.bloc} &nbsp;secteur:{contact.num_gf && contact.num_gf.secteur}</td>
																<td><strong>{contact.reseau_md}</strong></td>
																<td>
																	<div className="d-flex">
																		<Link  className="btn btn-secondary	 shadow btn-xs sharp me-2"
																			onClick={(event) => handleEditClick(event, contact)}
																		>
																			<i className="fas fa-pen"></i>
																		</Link>
																		<Link  className="btn btn-danger shadow btn-xs sharp" 
																			onClick={()=>handleDeleteClick(parseInt(contact.id))}
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
export default Contact;