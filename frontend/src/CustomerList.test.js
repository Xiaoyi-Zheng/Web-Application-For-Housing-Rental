import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import renderer from  "react-test-renderer";
import CustomersList from "./CustomersList";
import nock from 'nock'; 
import Enzyme, { shallow,mount } from 'enzyme';

describe('CustomersList', () => {
    let didMountSpy; // Reusing the spy, and clear it with mockClear()
    afterEach(() => {
      didMountSpy.mockClear();
    });
  
    didMountSpy = jest.spyOn(CustomersList.prototype, 'componentDidMount');
   it('renders without crashing', () => {
      mount(<CustomersList changefield={()=>{return true;}}  setType={()=>{return true;}}  />);
    });
    it('check props',() => {
        const c=[{"pk":1,"first_name":"shimeng","last_name":"chen","email":"844650898@qq.com","phone":"123456789","address":"white house","description":"waterloo"}];
        const state={'customers': c,'nextPageURL':  'alowha'}
        const wrapper=mount(<CustomersList  changefield={()=>{return true;}}  setType={()=>{return true;}}/>);
        wrapper.setState(state);
        //expect(wrapper.props().customers).toEqual(state['customers']);
        expect(wrapper.state('customers')).toEqual(state['customers']);
        const hrows = wrapper.find('tr');
        expect(hrows).toHaveLength(2);
    });
    it('check table',() => {
        const cols = ['#','First Name','Last Name','Phone','Email','Address','Description','Actions'];
        const state={'customers': [{"pk":1,"first_name":"shimeng","last_name":"chen","email":"844650898@qq.com","phone":"123456789","address":"white house","description":"waterloo"}],'nextPageURL':  'alowha'};
        const wrapper=mount(<CustomersList  changefield={()=>{return true;}}  setType={()=>{return true;}}/>);
        wrapper.setProps(state);
        const table = wrapper.find('table');
        expect(table).toHaveLength(1);
        const thead = table.find('thead');
        expect(thead).toHaveLength(1);
        const hrows = thead.find('tr');
        expect(hrows).toHaveLength(1);
        const headers = thead.find('th');
        expect(headers).toHaveLength(8);
        headers.forEach((th,idx)=>{
            expect(th.text()).toEqual(cols[idx]);
        });
        const tbody = table.find('tbody');
        expect(tbody).toHaveLength(1);
        //const rows = tbody.find('tr');
        //console.log(rows);
        //expect(rows).toHaveLength(1);
    });
    /*test('should call did mount', () => {
      const scope = nock('http://localhost:8000') 
      .get('/api/customers/')
      .reply(200, { customers:  [], nextPageURL:  "" }, 
      { 
        'Access-Control-Allow-Origin': '*', 
        'Content-type': 'application/json' 
      }); 
      const div = document.createElement('div');
      ReactDOM.render(<CustomersList queryText=''
      field='All' />, div);
      ReactDOM.unmountComponentAtNode(div);

        expect(didMountSpy).toHaveBeenCalledTimes(0);   
        const wrapper=shallow(<CustomersList queryText=''
          field='All' />);
        expect(didMountSpy).toHaveBeenCalledTimes(1);


      });*/

});

