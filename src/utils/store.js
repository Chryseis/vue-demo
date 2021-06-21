class Store{
  constructor() {
    this.a=1
  }

  set(value){
    this.a=value
  }

  get(){
    return this.a
  }
}

export default new Store()
