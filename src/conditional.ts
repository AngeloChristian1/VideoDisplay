interface Person {
    live(): void;
  }
  interface Student extends Person {
    learn(): void;
  }
   
  interface Car {
    drive():void
  type example1 = Student extends Person ? number : string
  
  type example2 = Car extends Person ? number : string


//   second usage example

interface IdLabel {
    id: number /* some fields */;
  }
  interface NameLabel {
    name: string /* other fields */;
  }
   
  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }

//   createLabel(2) 



function createLabel2<T extends number | string>(nameOrId: T): NameOrId<T> {
    throw "unimplemented";
  }
  
  // Here, 'NameOrId' is a conditional type that will return 'IdLabel' if 'T' is a number,
  // and 'NameLabel' if 'T' is a string.
  type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

  createLabel2(3)