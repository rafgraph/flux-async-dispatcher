var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
const DISPATCHER_CONSTANTS = {
  SERVER_ACTION: "SERVER_ACTION",
  VIEW_ACTION: "VIEW_ACTION"
};

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: DISPATCHER_CONSTANTS.SERVER_ACTION,
      action: action
    };

    // console.log("PRE dispatch SA " + action.actionType);
    this.dispatch(payload);
    // console.log("DONE dispatch SA " + action.actionType);
    // console.log(payload);
  },

  //async dispatcher for view actions
  handleViewAction: function(action) {
    if (this.isDispatching()) {
      // console.log("waiting..." + action.actionType); //log the action waiting to be dispatched

      // push onto callback queue
      setTimeout(function(){
        this.handleViewAction(action);
      }.bind(this), 0);

    } else {

      var payload = {
        source: DISPATCHER_CONSTANTS.VIEW_ACTION,
        action: action
      };

      // console.log("PRE dispatch VA " + action.actionType);
      this.dispatch(payload);
      // console.log("DONE dispatch VA " + action.actionType);
      // console.log(payload);
    }
  }
});

module.exports = AppDispatcher;
