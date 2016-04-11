var Dispatcher = require('flux').Dispatcher,

const DISPATCHER_CONSTANTS = {
  SERVER_ACTION: "SERVER_ACTION",
  VIEW_ACTION: "VIEW_ACTION"
};


var assign = require('object-assign');
//add to package.json dependencies: "object-assign": "^4.0.1"

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: DISPATCHER_CONSTANTS.SERVER_ACTION,
      action: action
    };

    // console.log("pre dispatch SA " + action.actionType);
    this.dispatch(payload);
    // console.log("DONE dispatch SA " + action.actionType);
    // console.log(payload);
  },

  //async dispatcher for view actions
  //pushes onto callback que, the same que used by server action callbacks
  handleViewAction: function(action) {
    if (this.isDispatching()) {
      // console.log("waiting..." + action.actionType);
      setTimeout(
        function(){
          this.handleViewAction(action);
        }.bind(this),
      0);
    } else {
      var payload = {
        source: DISPATCHER_CONSTANTS.VIEW_ACTION,
        action: action
      };

      // console.log("pre dispatch VA " + action.actionType);
      this.dispatch(payload);
      // console.log("DONE dispatch VA " + action.actionType);
      // console.log(payload);
    }
  }

});

module.exports = AppDispatcher;


//Note that this can be done without using assign operator,
//by monkey patching the flux dispatcher
// Dispatcher.prototype.handleServerAction = function(action) {
//  ...
// };
//
// Dispatcher.prototype.handleViewAction = function(action) {
//  ...
// };
//
// var AppDispatcher = new Dispatcher();
