// (function(){
// 	var PoYo = function() {
// 		
// 	};

	/**
   * Constructor.
   *
   * Available options:
   *
   *  * required:    true if the value is required, false otherwise (default to true)
   *  * trim:        true if the value must be trimmed, false otherwise (default to false)
   *  * empty_value: empty value when value is not required
   *
   * Available error codes:
   *
   *  * required
   *  * invalid
   *
   * @param object options   An options object
   * @param object messages  A messages object
   */
	var PoYoBaseValidator = function(options, messages) {
		this._init(options, messages);
	};
	
	PoYoBaseValidator.prototype = {
		_globalDefaultMessages: {
			invalid: 'Invalid.', 
			required: 'Required.'
		},
		_requiredOptions: {},
		_defaultMessages: {},
		_defaultOptions: {},
		_messages: {},
		_options: {},
		
		_init: function(options, messages) {
			this._options = this._mergeOptions({required: true, trim: false, empty_value: null}, this._options);
			this._messages = this._mergeOptions({required: this._globalDefaultMessages.required, invalid: this._globalDefaultMessages.invalid}, this._messages);
		
			this.configure(options, messages);
			
			// $this->setDefaultOptions($this->getOptions());
			// $this->setDefaultMessages($this->getMessages());

	    // $currentOptionKeys = array_keys($this->options);
	    // $optionKeys = array_keys($options);
	    // 
	    // // check option names
	    // if ($diff = array_diff($optionKeys, array_merge($currentOptionKeys, $this->requiredOptions)))
	    // {
	    //   throw new InvalidArgumentException(sprintf('%s does not support the following options: \'%s\'.', get_class($this), implode('\', \'', $diff)));
	    // }
	    // 
	    // // check error code names
	    // if ($diff = array_diff(array_keys($messages), array_keys($this->messages)))
	    // {
	    //   throw new InvalidArgumentException(sprintf('%s does not support the following error codes: \'%s\'.', get_class($this), implode('\', \'', $diff)));
	    // }
	    // 
	    // // check required options
	    // if ($diff = array_diff($this->requiredOptions, array_merge($currentOptionKeys, $optionKeys)))
	    // {
	    //   throw new RuntimeException(sprintf('%s requires the following options: \'%s\'.', get_class($this), implode('\', \'', $diff)));
	    // }
	    // 
	    // $this->options  = array_merge($this->options, $options);
	    // $this->messages = array_merge($this->messages, $messages);
		},
		
		/**
	   * Configures the current validator.
	   *
	   * This method allows each validator to add options and error messages
	   * during validator creation.
	   *
	   * If some options and messages are given in the sfValidatorBase constructor
	   * they will take precedence over the options and messages you configure
	   * in this method.
	   *
	   * @param object $options   An options object
	   * @param object $messages  A messages object
	   *
	   * @see _init()
	   */
		configure: function(options, messages) {
			
		},
		
		/**
	   * Returns an error message given an error code.
	   *
	   * @param  string name  The error code
	   *
	   * @return string The error message, or the empty string if the error code does not exist
	   */
	  getMessage: function(name)
	  {
	    return this._messages[name] || '';
	  },
	
		/**
	   * Adds a new error code with a default error message.
	   *
	   * @param string name   The error code
	   * @param string value  The error message
	   *
	   * @return PoYoValidatorBase The current validator instance
	   */
	  addMessage: function(name, value)
	  {
	    this._messages[name] = this._globalDefaultMessages[name] || value;

	    return this;
	  },
	
		/**
	   * Changes an error message given the error code.
	   *
	   * @param string name   The error code
	   * @param string value  The error message
	   *
	   * @return PoYoValidatorBase The current validator instance
	   */
	  setMessage: function(name, value)
	  {
	    // if (!in_array(name, array_keys(this._messages)))
	    // {
	    //   throw new InvalidArgumentException(sprintf('%s does not support the following error code: \'%s\'.', get_class($this), $name));
	    // }

	    this._messages[name] = value;

	    return this;
	  },
	
		/**
	   * Returns an object of current error messages.
	   *
	   * @return object An object of messages
	   */
	  getMessages: function()
	  {
	    return this._messages;
	  },

	  /**
	   * Changes all error messages.
	   *
	   * @param object values  An array of error messages
	   *
	   * @return PoYoValidatorBase The current validator instance
	   */
	  setMessages: function(values)
	  {
	    this._messages = values;

	    return this;
	  },
		
		_mergeOptions: function(obj1, obj2) {
		  for (var p in obj2) {
		    try {
		      // Property in destination object set; update its value.
		      if (obj2[p].constructor == Object) {
		        obj1[p] = this._mergeOptions(obj1[p], obj2[p]);
		      } else {
		        obj1[p] = obj2[p];
		      }
		    } catch(e) {
		      // Property in destination object not set; create it and set its value.
		      obj1[p] = obj2[p];
		    }
		  }

		  return obj1;
		}
		
	};
	
	
// })();