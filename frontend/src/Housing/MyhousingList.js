import  React, { Component } from  'react';
import  HousingService  from  './HousingService';
import {  Link } from  'react-router-dom';
const  housingService  =  new  HousingService();

class MyhousingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            housings: [],
            nextPageURL: '',
            prevPageURL: '',
        };
        this.prevPage  =  this.prevPage.bind(this);
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
        this.props.setType();
    }
    componentDidMount(){
        var self = this;
        housingService.getMyHousings().then( function(result) {
            self.setState({housings: result.data, nextPageURL:result.nextlink, prevPageURL:result.prevlink
            });
        } )
    }
    handleDelete(e,pk){
        var self = this;
        housingService.deleteHousings({pk:pk}).then(()=>{
            var newls = self.state.housings.filter((obj)=>{
                return obj.pk !== pk;
            });
            self.setState({housings: newls})
        });
    }
    nextPage(){
        var self = this;
        housingService.getHousingsByURL(self.state.nextPageURL).then(function(result) {
            self.setState({housings:result.data, nextPage: result.nextlink, prevPageURL: result.prevlink})
        });
    }
    prevPage(){
        var self = this;
        housingService.getHousingsByURL(self.state.prevPageURL).then(function(result) {
            self.setState({housings:result.data, nextPage: result.nextlink, prevPageURL: result.prevlink})
        });
    }
    render(){
        return(
            <div  className="housings--list">
                <div className='container'>
                    {this.state.housings.map(c =>
                        {
                            return(
                                <div className='card'>
                                    <h1>{c.address}</h1>
                                    <div className='image-container' >
                                        <img src={c.image} alt=""/>
                                    </div>
                                    <p>
                                        <div className='action-label'>
                                            <Link to={{ pathname: "/housing/" + c.pk,pk:this.props.location.pk}}>Update</Link>
                                            <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                                        </div>
                                        <div className="rent-label" >{c.rent}$</div>
                                    </p>
                                </div>
                            )
                        }
                    )}
                </div>
                {/*<table  className="table">*/}
                {/*    <thead  key="thead">*/}
                {/*    <tr>*/}
                {/*        <th>#</th>*/}
                {/*        <th>Address</th>*/}
                {/*        <th>Rent</th>*/}
                {/*        <th>Landlord</th>*/}
                {/*        <th>Email</th>*/}
                {/*        <th>Action</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*        {this.state.housings.map( c  =>*/}
                {/*        <tr  key={c.pk}>*/}
                {/*            <td>{c.pk}  </td>*/}
                {/*            <td>{c.address}</td>*/}
                {/*            <td>{c.rent}</td>*/}
                {/*            <td>{c.owner.username}</td>*/}
                {/*            <td>{c.owner.email}</td>*/}
                {/*            <td>*/}
                {/*            <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>*/}
                {/*            <Link to={{ pathname: "/housing/" + c.pk,pk:this.props.location.pk}}>Update</Link>*/}
                {/*            </td>*/}
                {/*        </tr>)}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <button  className="btn btn-primary"  onClick=  {  this.prevPage  }>Prev</button>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
        );
    }
}
export default MyhousingList;
