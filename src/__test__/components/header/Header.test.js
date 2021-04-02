import { loginUser } from "../../../actions";

it('TEST1 ', () => {
    let name = 'HCL';
    expect(name).toBe('HCL');
})

it('TEST2 ', () => {
    let userDetails = {userId:'rohit',passowrd:'rohit'};
    expect(loginUser(userDetails)) ;
})
