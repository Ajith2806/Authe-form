import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";

const Updateuser = () => {

    const [id, idchange] = useState(0);
    const [name, namechange] = useState('');
    const [email, emailchange] = useState('');
    const [doj, dojchange] = useState('');
    const [role, rolechange] = useState('');
    const [password, passwordchange] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();


    const userobj = useSelector((state) => state.user.userobj)


    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { id, name, email, doj, role, password };
        dispatch(FunctionUpdateUser(userobj, id));
        navigate('/user');
    }



    //
    // Handle form submission
    //  const handlesubmit = (e) => { e.preventDefault();
    //      axios.put(`http://localhost:8000/users/add/${code}`, id) 
    //      .then(response => { 
    //         alert('User updated successfully'); 
    //         navigate('/users'); // Redirect to the users list or wherever 
    //         }) 
    //         // .catch(error => { setError('Error updating user'); }); 
    //         toast.warning('You are not having access to edit user');
    //         }; 

    //     const handlesubmit = (e) => {
    //         e.preventDefault();
    //         let regobj = { id, name, password, email, doj, role};
    //          {
    //         //console.log(regobj);
    //         fetch("http://localhost:8000/user", {
    //             method: "POST",
    //             headers: { 'content-type': 'application/json' },
    //             body: JSON.stringify(regobj)
    //         }).then((res) => {
    //             toast.success('Updated successfully.')
    //             navigate('/user');
    //         }).catch((err) => {
    //             toast.error('Failed :' + err.message);
    //         });
    //     }
    // }

    // 

    useEffect(() => {
        dispatch(FetchUserObj(code));
    }, [])

    useEffect(() => {
        if (userobj) {
            idchange(userobj.id);
            namechange(userobj.name);
            emailchange(userobj.email);
            dojchange(userobj.doj);
            rolechange(userobj.role);
            passwordchange(userobj.password);
        }
    }, [userobj])

    return (
        <div>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
            <form onSubmit={handlesubmit}>

                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Edit User</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>User id</label>
                                    <input value={id || ''} disabled onChange={e => idchange(e.target.value)} className="form-control"></input>
                                </div>

                            </div>
                            {/* <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password || ''} onChange={e => passwordchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name || ''} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email || ''} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>DOJ</label>
                                    <input type="date" value={doj || ''} onChange={e => dojchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Role</label>
                                    <select value={role || ''} onChange={e => rolechange(e.target.value)} className="form-control">
                                        <option disabled>Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit">Submit</button> |
                        <Link className="btn btn-danger" to={'/user'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
        </div>
    );
}

export default Updateuser;