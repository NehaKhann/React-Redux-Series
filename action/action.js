const redux = require("redux")
const reduxlogger = require("redux-logger")

const logger = reduxlogger.createLogger()
const applymiddleware = redux.applyMiddleware

const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM= "BUY_ICECREAM"
//we create an action which is basically an object

// there is action creator function which actually creates an action
function buycake(){
    return {
        type: BUY_CAKE
    }
}
function buyicecream(){
    return {
        type: BUY_ICECREAM
    }
}
// action is an object and action creator is a function

//according to the first principle
//state is represented by an object 
const cakeinitialState = {
    noOfCakes: 10,
   
}
const icecreaminitialState={
    noOficecreams:30
}
//reducer function
const cakeReducer = (state=cakeinitialState,action)=>{
switch(action.type){
    case BUY_CAKE:
        return {
            //copy the state and only changes noofcakes others will remain same
            ...state,
            noOfCakes: state.noOfCakes-1
        }
        default:
            return state
}
}

const icecreamReducer = (state=icecreaminitialState,action)=>{
    switch(action.type){
            case BUY_ICECREAM:
                return{
                    ...state,
                    noOficecreams: state.noOficecreams-1
                }
            default:
                return state
    }
    }
//creating a redux store
const createstore = redux.createStore;
const combineReducer = redux.combineReducers;
const rootReducer = combineReducer({
    cake: cakeReducer,
    icecream: icecreamReducer
})
//store holds the application's state
const store = createstore(rootReducer,applymiddleware(logger))
console.log("initial state is", store.getState());
//get the changes in state
const unsubscribe = store.subscribe(()=>{
    console.log();
})
//dispatching an action
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyicecream());
store.dispatch(buyicecream());
store.dispatch(buyicecream());
unsubscribe();





