(function(){
	/**
	 * Constructor.
	 *
	 * @param string message  A messages string to be included in the thrown exception
	 */
	PoYo.PoYoException = function(message) {
		this.message = message;
		this._name = 'PoYoException';
		
		return this;
	};
	
	// Make the exception convert to a pretty string when used as
	// a string (e.g. by the error console)
	PoYo.PoYoException.prototype.toString = function ()
	{
	  return this._name;
	};
	
	PoYo.PoYoInvalidArgumentException = function(message) {
		this.message = message;
		this._name = 'PoYoInvalidArgumentException';
		
		return this;
	};
	PoYo.PoYoInvalidArgumentException.prototype = new PoYo.PoYoException();
})();