(function(){
	PoYo.PoYoValidatorBoolean = function(options, messages) {
		this._init(options, messages);
	};
	
	PoYo.PoYoValidatorBoolean.prototype = new PoYo.PoYoValidatorBase();
	/**
	 * Configures the current validator.
	 *
	 * Available options:
	 *
	 *  * true_values:  The list of true values
	 *  * false_values: The list of false values
	 *
	 * @param array options    An options object
	 * @param array messages   A messages object
	 *
	 * @see PoYoValidatorBase
	 */
	PoYo.PoYoValidatorBoolean.prototype.configure = function(options , messages)
	{
	  this.addOption('true_values', ['true', 't', 'yes', 'y', 'on', '1']);
	  this.addOption('false_values', ['false', 'f', 'no', 'n', 'off', '0']);
  
	  this.setOption('required', false);
	  this.setOption('empty_value', false);
	};

	/**
	 * @see PoYoValidatorBase
	 */
	PoYo.PoYoValidatorBoolean.prototype.doClean = function(v)
	{
	  if (in_array(v, this.getOption('true_values')))
	  {
	    return true;
	  }
  
	  if (in_array(v, this.getOption('false_values')))
	  {
	    return false;
	  }

		throw {
			name: 'sfValidatorError',
			message: 'invalid'
		};
  
	  //throw new sfValidatorError($this, 'invalid', array('v' => $value));
	};
})();