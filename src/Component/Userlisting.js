import React from "react";
import { useEffect, useState  } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList,Removeuser} from "../Redux/Action";
import { useNavigate } from "react-router-dom";

const Userlisting = (props) => {

const [custlist, custupdate] = useState([]);
const [haveedit, editchange] = useState(false);
const [haveview, viewchange] = useState(false);
const [haveadd, addchange] = useState(false);
const [haveremove, removechange] = useState(false);
const navigate=useNavigate();




    useEffect(() => {
        GetUserAccess();
        loadcustomer();
       
    }, []);

    const loadcustomer = () => {
        fetch("http://localhost:8000/user").then(res => {
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then(res => {
            custupdate(res)
        });
    }

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:8000/roleaccess?role=" + userrole + "&menu=customer").then(res => {
            if (!res.ok) {
                navigate('/');
            toast.warning('You are not authorized to access');
                return false;
            }
            return res.json();
        }).then(res => {
            console.log(res);
            if (res.length > 0) {
                viewchange(true);
                let userobj = res[0];
                // editchange(userobj.haveedit);
                addchange(userobj.haveadd);
                removechange(userobj.havedelete);
            }else{
                navigate('/');
            toast.warning('You are not authorized to access');
            }
        })
    }

    const handleadd = () => {
        if(haveadd){
        toast.success('Access Granted for Adding')
        
        navigate('/user/add');
        }else{
            toast.warning('You are not having access to add user');
        }
    }
    const handleedit = (res) => {
        if(haveedit){
        toast.success('Access Granted for Editing')
        navigate('/user/edit/:code');
        console.log(res);
        let userobj = res[0];
        editchange(userobj.haveedit);
        }
        
        else{
            toast.warning('You are not having access to Edit user');
        }
    }
   
    // 
    useEffect(() => {
        props.loaduser();
    }, [])
    
    const handleremove = (code) => {
        if(haveremove){
        toast.success('Access Granted for deleting')
        props.removeuser(code);
             props.loaduser();
        
                     props.removeuser(code);
                     props.loaduser();
                     toast.success('User removed successfully.')
                }
        else{
            toast.warning('You are not having access to Delete user');
        }
    }
    return (
        props.user.loading ? <div><h2>Loading...</h2></div> :
            props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :

                <div>
                    <div className="card">
                        <div className="card-header" >
                            {/* <Link to={'/user/add'} onClick={handleadd} className="btn btn-success">Add User [+]</Link> */}
                            <button onClick={handleadd} className="btn btn-success">Add (+)</button>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td className="listhead" >User Id</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>DOJ</td>
                                        <td>Role</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.user.userlist && props.user.userlist.map(item =>
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.doj}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    {/* <Link to={'/user/edit/' + item.id}  className="btn btn-primary">Edit</Link> | */}
                                                    <button  onClick={handleedit} className="btn btn-primary">Edit (+)</button>
                                                    <button onClick={() => { handleremove(item.id) }} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loaduser: () => dispatch(FetchUserList()),
        removeuser:(code)=>dispatch(Removeuser(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);