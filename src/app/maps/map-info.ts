export class MapInfo {
  constructor(public a :number = 0,
              public b : number = 0,
              public c :number = 0,
              public gameName :string = '',
              public hexSize:number = 0,
              public hexStr :string = '',
              public hexes : string = '',
              public id : string = '',
              public isDefault : boolean = false,
              public mapHeight  :number = 0,
              public mapUrl :string = '',
              public mapWidth :number = 0,
              public myAttr : string[] = [],
              public numX : number = 0,
              public numY  :number = 0,
              public perfectHexes : boolean = false,
              public scenarioName :string = '',
              public trueRows : boolean = false,
              public x : number = 0,
              public y :number = 0){

  }

}
