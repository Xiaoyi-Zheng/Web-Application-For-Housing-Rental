import  React, { Component } from  'react';
import { BrowserRouter,Route, Link,Switch, useLocation } from  'react-router-dom';
import  CustomersList  from  './CustomersList';
import  CustomerCreateUpdate  from  './CustomerCreateUpdate';
import HousingList from './Housing/HousingList';
import HousingCreateUpdate from './Housing/HousingCreateUpdate';
import MyhousingList from './Housing/MyhousingList';
import  SearchBar from './SearchBar'
import  './Capp.css';

function usePageViews() {
    let location = useLocation();
    return location.pathname;
  }

class  Capp  extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            queryText: '',
            field: 'All',
            type:'',
        };
        //this.handleCustomerSearch = this.handleCustomerSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setTypeCustomer = this.setTypeCustomer.bind(this);
        this.setTypeHousing = this.setTypeHousing.bind(this);
        this.setTypeNull = this.setTypeNull.bind(this);
    }
    /*handleCustomerSearch(query, field){
        this.setState(
            {
               queryText: query,
                field: field,
            }
        );
    }*/
    handleSubmit(event){
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState['queryText'] = this.refs.queryText.value;
            newState['field'] = this.refs.field.value;
            return newState;
          });
        /*this.setState(
            {
               queryText: this.refs.queryText.value,
                field: this.refs.field.value,
            }
        );*/
        event.preventDefault();
    }
    setTypeCustomer(event){
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState['type'] = 'customer';
            return newState;
          });
          //event.preventDefault();
    }
    setTypeHousing(event){
        //console.log("alow ha");
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState['type'] = 'housing';
            return newState;
          });
          //this.setState({type:'housing'});
          //event.preventDefault();
    }
    setTypeNull(event){
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState['type'] = '';
            return newState;
          });
    }

    render() {
        let options=null;
        let my_housing=null;
        let fields=null;
        let searchBar=null;
        if(this.props.group==='landord'){
            my_housing=(
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link  className="dropdown-item" onClick={this.props.handle_logout} to={{ pathname: "/"}}>Logout</Link>
            <Link  className="dropdown-item" to={{ pathname: "/house/create",pk:this.props.pk}}>Create Housing</Link>
            <Link  className="dropdown-item" to={{ pathname: "/myhousing",pk:this.props.pk}}>My Housing List</Link>
            </div>);
            options=(
                <Link  className="dropdown-item" to={{ pathname: "/house/create",pk:this.props.pk}}>Create Housing</Link>
            );
        }else{
            my_housing=(
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link  className="dropdown-item" onClick={this.props.handle_logout} to={{ pathname: "/"}}>Log out</Link>
            </div>);
            options=(
                <Link  className="dropdown-item" to={{ pathname: "/customer",pk:this.props.pk}}>Create Request</Link>
            );
        }
        if(this.state.type === 'customer' ){
            fields=(
                <select className="form-control" ref='field'>
                <option>All</option>
                <option>Name</option>
                <option>Phone</option>
                <option>Email</option>
                <option>Address</option>
                <option>Description</option>
                </select>
                );
        }else{
            fields=(
                <select className="form-control" ref='field'>
                <option>All</option>
                <option>Rent</option>
                <option>Landord</option>
                <option>Email</option>
                <option>Address</option>
                </select>
            );
        }
        if (this.state.type !== ''){
            searchBar = (
                <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>

                    {fields}
                    <input className="form-control  mr-sm-2" type="search" ref='queryText' placeholder="Search..."
                           aria-label="Search"/>
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
            );
        }
        var pk=this.props.username;

        return (
        <BrowserRouter>
            <div  className="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div className="logo-container">
                    <a href="/housing">
                        <img src={require('./logo.png')} alt=""/>
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/housing" onClick={this.setTypeHousing} >HOME <span class="sr-only">(current)</span></a>
                        </li>
                        {/*<li class="nav-item">*/}
                        {/*    <a class="nav-link" onClick={this.tocustomer} href="#">Link</a>*/}
                        {/*</li>*/}
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            OPTIONS
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {options}
                                <Link  className="dropdown-item" to={{ pathname: "/housing"}}>Housing List</Link>
                                <Link  className="dropdown-item" to={{ pathname: "/request"}}>Request List</Link>
                            </div>
                        </li>
                        {/*<li class="nav-item">*/}
                        {/*    <a class="nav-link disabled" href="#">Disabled</a>*/}
                        {/*</li>*/}
                    </ul>

                    {searchBar}

                    <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             {this.props.username}
                            </a>
                            {my_housing}

                     </li>
                </div>
            </nav>


                    <div  className="content">
                        <switch>

                            <Route  path="/customer/:pk/" isAuthed={pk} render={(props,pk) => <CustomerCreateUpdate {...props} {...pk} setType={this.setTypeNull}/> } />
                            <Route  path="/request"  exact  render={(props) =>
                                    <CustomersList {...props}
                                                   queryText={this.state.queryText}
                                                   field={this.state.field}
                                                   setType={this.setTypeCustomer}
                                    />}
                            />
                            <Route  path="/customer/"  exact  render={(props) => <CustomerCreateUpdate {...props} isAuthed={true} setType={this.setTypeNull}/>}   />
                            <Route  path="/house/create"  exact  render={(props) => <HousingCreateUpdate {...props} setType={this.setTypeNull}/>} />
                            <Route  path="/housing/:pk"  exact  render={(props, pk) => <HousingCreateUpdate {...props}{...pk} setType={this.setTypeNull}/>} />
                            <Route  path="/myhousing/"  exact  render={(props) => <MyhousingList {...props} setType={this.setTypeHousing}/>}  />
                            <Route
                                exact path="/housing/"
                                render={(props) =>
                                    <HousingList {...props}
                                                   queryText={this.state.queryText}
                                                   field={this.state.field}
                                                   setType={this.setTypeHousing}
                                    />}
                            />
                            <Route
                                exact path="/"
                                render={(props) =>
                                    <HousingList {...props}
                                                   queryText={this.state.queryText}
                                                   field={this.state.field}
                                                   setType={this.setTypeHousing}
                                    />}
                            />
                        </switch>
                    </div>


            </div>

        </BrowserRouter>
        );

    }
    }
    export  default  Capp;
