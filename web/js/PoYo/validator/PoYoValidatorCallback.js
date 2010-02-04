(function(){
	PoYo.PoYoValidatorCallback = function(options, messages) {
		this.constructor(options, messages);
	};
	
	/**
   * Configures the current validator.
   *
   * Available options:
   *
   *  * callback:  A valid callback function (required)
   *  * arguments: An array of arguments to pass to the callback
   *
   * @param object options    An options object
   * @param object messages   A messages object
   *
   * @see sfValidatorBase
   */
  PoYo.PoYoValidatorCallback.prototype.configure = function(options, messages)
  {
    this.addRequiredOption('callback');
    this.addOption('arguments', Array());

    this.setOption('required', false);
  };

  /**
   * @see sfValidatorBase
   */
  PoYo.PoYoValidatorCallback.prototype.doClean = function(v)
  {
    return call_user_func(this.getOption('callback'), $this, v, this.getOption('arguments'));
  };
})();