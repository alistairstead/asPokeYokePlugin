(function(){
	/**
	 * Constructor.
	 *
	 * @param string message  A messages string to be included in the thrown exception
	 */
	PoYo.PoYoException = function(message) {
		this.message = message;
		this.name = 'PoYoException';
		
		return this;
	};
	
	// Make the exception convert to a pretty string when used as
	// a string (e.g. by the error console)
	PoYo.PoYoException.prototype.toString = function ()
	{
	  return this.name + ': '+this.message;
	};
	
	PoYo.PoYoInvalidArgumentException = function(message) {
		this.message = message;
		this.name = 'PoYoInvalidArgumentException';
		
		return this;
	};
	PoYo.PoYoInvalidArgumentException.prototype = new PoYo.PoYoException();
	
	PoYo.PoYoValidatorError = function(validator, message) {
		this.validator = validator;
		this.message = message;
	};
})();