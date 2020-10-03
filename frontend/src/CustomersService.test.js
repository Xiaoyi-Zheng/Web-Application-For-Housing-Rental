import axios from 'axios';
import CustomersService from './CustomersService';

jest.mock('axios');

test('should fetch customers', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  const  customersService  =  new  CustomersService();
  return customersService.getCustomers().then(data => expect(data).toEqual(users));
});