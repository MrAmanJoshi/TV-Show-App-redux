export type ActionCreater<T = undefined> = (...arg: any)=>{
  type: String,
  payload?: T
}