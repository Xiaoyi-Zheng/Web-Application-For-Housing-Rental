import  React, { Component } from  'react';
import  CustomersService  from  './CustomersService';

const  customersService  =  new  CustomersService();

class  CustomersList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            customers: [],
            nextPageURL:  '',
            prevPageURL:  '',

        };
        this.prevPage  =  this.prevPage.bind(this);
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
        this.props.setType();
    }
    componentDidMount() {
        
        var  self  =  this;
        customersService.getCustomers().then(function (result) {
            self.setState({ customers:  result.data, nextPageURL:  result.nextlink, prevPageURL: result.prevlink})
        }).catch(error => console.log("customerlist could not connect to backend !!!!") );
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props !== nextProps){
            const queryText = nextProps.queryText;
            const field = nextProps.field;
            if (queryText !== '') {
                customersService.searchCustomer(queryText, field).then((result) =>{
                    this.setState({ customers:  result.data, nextPageURL:  result.nextlink, prevPageURL: result.prevlink})
                });
            }
            else {
                this.componentDidMount()
            }
        }
    }

    handleDelete(e,pk){
        var  self  =  this;
        customersService.deleteCustomer({pk :  pk}).then(()=>{
            var  newArr  =  self.state.customers.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({customers:  newArr})
        });
    }
    nextPage(){
        //var  self  =  this;
        customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {
            this.setState({ customers:  result.data, nextPageURL:  result.nextlink, prevPageURL: result.prevlink})
        });
    }
    prevPage(){
        //var  self  =  this;
        customersService.getCustomersByURL(this.state.prevPageURL).then((result) => {
            this.setState({ customers:  result.data, nextPageURL:  result.nextlink, prevPageURL: result.prevlink})
        });
    }
    render() {
        
        return (
        <div  className="customers--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.customers.map( c  =>
                    <tr  key={c.pk}>
                        <td>{c.pk}  </td>
                        <td>{c.first_name}</td>
                        <td>{c.last_name}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.address}</td>
                        <td>{c.description}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                        <a  href={"/customer/" + c.pk}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.prevPage  }>Prev</button>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }
}
export  default  CustomersList;