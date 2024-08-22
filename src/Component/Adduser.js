import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";

const Adduser = () => {
    const [name, namechange] = useState('');
    const [id, idchange] = useState('');
    const [email, emailchange] = useState('');
    const [doj, dojchange] = useState('');
    const [role, rolechange] = useState('');
    const [password, passwordchange] = useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();

    
    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { name, email, doj, role ,id ,password};
        dispatch(FunctionAddUser(userobj));
        navigate('/user');
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add User</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>User Id</label>
                                    <input value={id} onChange={e => idchange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>password</label>
                                    <input type="password" value={password} onChange={e => passwordchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>DOJ</label>
                                    <input type="date" value={doj} onChange={e => dojchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Role</label>
                                    <select value={role} onChange={e => rolechange(e.target.value)} className="form-control">
                                        <option disabled>Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">user</option>
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
    );
}

export default Adduser;