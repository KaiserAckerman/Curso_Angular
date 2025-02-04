export interface Passenger{
    name:string;
    children?:string[];
}

const passenger1: Passenger = {
    name: 'John Doe'
}

const passenger2: Passenger = {
    name: 'Jane Doe',
    children: ['John Doe Jr', 'Jane Doe Jr'] 
} 


const printChildrenNumber = (passenger: Passenger):number => {
    
    const howManyChildren = passenger.children?.length || 0;

    console.log(passenger.name, howManyChildren);

    return howManyChildren;
}

printChildrenNumber(passenger1);