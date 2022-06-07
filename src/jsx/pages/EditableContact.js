import React from 'react';

const EditableContact = ({editFormData, handleEditFormChange, handleCancelClick}) =>{
    return(
        <>
            <tr>
				<td></td>
                <td>
                    <input type="text" required = "required" placeholder = "votre nom" name="lastname" 
                        value={editFormData.lastname}
                        onChange={handleEditFormChange}
                    />
                </td>   
                <td>
                    <input type="text" required = "required" placeholder = "Votre prénom" name="firstname" 
                        value={editFormData.firstname}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "votre genre" name="etat_civil"
                        value={editFormData.etat_civil}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "votre genre" name="genre"
                        value={editFormData.genre}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Votre date de naissance" name="birthdate"
                        value={editFormData.birthdate}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Votre métier" name="metier"
                        value={editFormData.metier}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Enter a email" name="email"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Votre telephone" name="telephone"
                        value={editFormData.telephone}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Votre civilité" name="civilite"
                        value={editFormData.civilite}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Votre réseau" name="reseau_md"
                        value={editFormData.reseau_md}
                        onChange={handleEditFormChange}
                    />
                </td>
                {/* <td>
                    <input type="text" required = "required" placeholder = "votre civilité" name="civilite" 
                        value={editFormData.civilite}
                        onChange={handleEditFormChange}
                    />
                </td> */}
                <td>	
					<div className="d-flex">
						<button className="btn btn-warning shadow btn-xs sharp me-1" type="submit"><i className="las la-check-circle scale5"></i></button>
						<button className="btn btn-danger shadow btn-xs sharp " type="button" onClick={handleCancelClick}>
							<i className="las la-times-circle scale5"></i>
						</button>
					</div>
                </td>
            </tr>
        </>
    )
}
export default EditableContact ;