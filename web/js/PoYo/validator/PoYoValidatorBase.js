(function(){
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
	PoYo.PoYoValidatorBase = function(options, messages) {
		this._init(options, messages);
	};

	PoYo.PoYoValidatorBase.prototype = {
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
			this._options = PoYo.object_merge({required: true, trim: false, empty_value: null}, this._options);
			this._messages = PoYo.object_merge({required: this._globalDefaultMessages.required, invalid: this._globalDefaultMessages.invalid}, this._messages);

			this._configure(options, messages);

			this.setDefaultOptions(this.getOptions());
			this.setDefaultMessages(this.getMessages());

	    var currentOptionKeys = PoYo.object_keys(this._options);
	    var optionKeys = PoYo.object_keys(options);
	    
	    // check option values
			var diff = PoYo.object_diff(optionKeys, PoYo.object_merge(currentOptionKeys, PoYo.object_keys(this._requiredOptions)));
	    if (diff.length)
	    {
	      throw new PoYo.PoYoInvalidArgumentException("sprintf('%s does not support the following options: \'%s\'.', get_class($this), implode('\', \'', $diff))");
			}
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
	    this._options  = PoYo.object_merge(this._options, options);
	    this._messages = PoYo.object_merge(this._messages, messages);
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
	   * @param object options   An options object
	   * @param object messages  A messages object
	   *
	   * @see _init()
	   */
		_configure: function(options, messages) {

		},

		/**
	   * Returns an error message given an error code.
	   *
	   * @param  string n  The error code
	   *
	   * @return string The error message, or the empty string if the error code does not exist
	   */
	  getMessage: function(n)
	  {
	    return this._messages[n] || '';
	  },

		/**
	   * Adds a new error code with a default error message.
	   *
	   * @param string n   The error code
	   * @param string v  The error message
	   *
	   * @return PoYoValidatorBase The current validator instance
	   */
	  addMessage: function(n, v)
	  {
	    this._messages[n] = this._globalDefaultMessages[n] || v;

	    return this;
	  },

		/**
	   * Changes an error message given the error code.
	   *
	   * @param string n   The error code
	   * @param string v  The error message
	   *
	   * @return PoYoValidatorBase The current validator instance
	   */
	  setMessage: function(n, v)
	  {
			if(!this._messages.hasOwnProperty(n))
			{
				throw {
					name: 'InvalidArgumentException',
					message: "sprintf('%s does not support the following error code: \'%s\'.', get_class($this), $n)"
				};
			}

	    this._messages[n] = v;

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
	  setMessages: function(vs)
	  {
	    this._messages = vs;

	    return this;
	  },

		/**
	   * Gets an option v.
	   *
	   * @param  string $n  The option n
	   *
	   * @return mixed  The option v
	   */
	  getOption: function(n)
	  {
	    return this._options[n];
	  },

	  /**
	   * Adds a new option v with a default v.
	   *
	   * @param string $n   The option n
	   * @param mixed  $v  The default v
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  addOption: function(n, v)
	  {
	    this._options[n] = v;

	    return this;
	  },

	  /**
	   * Changes an option v.
	   *
	   * @param string n   The option name
	   * @param mixed  v  The value
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  setOption: function(n, v)
	  {
			if(!this._optionMerge(this._options, this._requiredOptions).hasOwnProperty(n))
			{
				throw {
					name: 'InvalidArgumentException',
					message: "sprintf('%s does not support the following option: \'%s\'.', get_class($this), $n)"
				};
			}

			this._options[n] = v;

	    return this;
	  },

	  /**
	   * Returns true if the option exists.
	   *
	   * @param  string $n  The option n
	   *
	   * @return bool true if the option exists, false otherwise
	   */
	  hasOption: function(n)
	  {
	    return (this._options[n])? true : false;
	  },

	  /**
	   * Returns all options.
	   *
	   * @return array An array of options
	   */
	  getOptions: function()
	  {
	    return this._options;
	  },

	  /**
	   * Changes all options.
	   *
	   * @param array $vs  An array of options
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  setOptions: function(vs)
	  {
	    this._options = vs;

	    return this;
	  },

	  /**
	   * Adds a required option.
	   *
	   * @param string $n  The option n
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  addRequiredOption: function(n)
	  {
	    this._requiredOptions[n] = true;

	    return this;
	  },

	  /**
	   * Returns all required option names.
	   *
	   * @return array An array of required option names
	   */
	  getRequiredOptions: function()
	  {
	    return this._requiredOptions;
	  },

	  /**
	   * Sets the default message for a given n.
	   *
	   * @param string $n    The name of the message
	   * @param string $message The default message string
	   */
	  setDefaultMessage: function(n, message)
	  {
	    this._globalDefaultMessages[n] = message;
	  },

	  /**
	   * Cleans the input v.
	   *
	   * This method is also responsible for trimming the input value
	   * and checking the required option.
	   *
	   * @param  mixed $v  The input value
	   *
	   * @return mixed The cleaned value
	   *
	   * @throws sfValidatorError
	   */
	  clean: function(v)
	  {
	    var clean = v;
	    // 
	    // if ($this->options['trim'] && is_string($clean))
	    // {
	    //   $clean = trim($clean);
	    // }
	    // 
	    // // empty value?
	    // if ($this->isEmpty($clean))
	    // {
	    //   // required?
	    //   if ($this->options['required'])
	    //   {
	    //     throw new sfValidatorError($this, 'required');
	    //   }
	    // 
	    //   return $this->getEmptyValue();
	    // }
	    // 
	    return this.doClean(clean);
	  },

	  /**
	   * Cleans the input value.
	   *
	   * Every subclass must implements this method.
	   *
	   * @param  mixed $v  The input v
	   *
	   * @return mixed The cleaned v
	   *
	   * @throws sfValidatorError
	   */
	  doClean: function(v)
		{

		},

	  /**
	   * Sets the charset to use when validating strings.
	   *
	   * @param string $charset  The charset
	   */
	  setCharset: function(charset)
	  {
	    this._charset = charset;
	  },

	  /**
	   * Returns the charset to use when validating strings.
	   *
	   * @return string The charset (default to UTF-8)
	   */
	  getCharset: function()
	  {
	    return this._charset;
	  },

	  /**
	   * Returns true if the v is empty.
	   *
	   * @param  mixed v  The input value
	   *
	   * @return bool true if the value is empty, false otherwise
	   */
	  isEmpty: function(v)
	  {
	    //return in_array($v, array(null, '', array()), true);
	  },

	  /**
	   * Returns an empty v for this validator.
	   *
	   * @return mixed The empty v for this validator
	   */
	  getEmptyValue: function()
	  {
	    return this.getOption('empty_value');
	  },

	  /**
	   * Returns an array of all error codes for this validator.
	   *
	   * @return array An array of possible error codes
	   *
	   * @see getDefaultMessages()
	   */
	  getErrorCodes: function()
	  {
	    //return array_keys($this->getDefaultMessages());
	  },

	  /**
	   * Returns default messages for all possible error codes.
	   *
	   * @return array An array of default error codes and messages
	   */
	  getDefaultMessages: function()
	  {
	    return this._defaultMessages;
	  },

	  /**
	   * Sets default messages for all possible error codes.
	   *
	   * @param array $messages  An array of default error codes and messages
	   */
	  setDefaultMessages: function(messages)
	  {
	    this._defaultMessages = messages;
	  },

	  /**
	   * Returns default option values.
	   *
	   * @return array An array of default option values
	   */
	  getDefaultOptions: function()
	  {
	    return this._defaultOptions;
	  },

	  /**
	   * Sets default option values.
	   *
	   * @param array $options  An array of default option values
	   */
	  setDefaultOptions: function(options)
	  {
	    this._defaultOptions = options;
	  },

	  /**
	   * Returns a string representation of this validator.
	   *
	   * @param  int $indent  Indentation (number of spaces before each line)
	   *
	   * @return string The string representation of the validator
	   */
	  asString: function(indent)
	  {
	    // $options = $this->getOptionsWithoutDefaults();
	    // $messages = $this->getMessagesWithoutDefaults();
	    // 
	    // return sprintf('%s%s(%s%s)',
	    //   str_repeat(' ', $indent),
	    //   str_replace('sfValidator', '', get_class($this)),
	    //   $options ? sfYamlInline::dump($options) : ($messages ? '{}' : ''),
	    //   $messages ? ', '.sfYamlInline::dump($messages) : ''
	    // );
	  },

	  /**
	   * Returns all error messages with non default values.
	   *
	   * @return string A string representation of the error messages
	   */
	  getMessagesWithoutDefaults: function()
	  {
	    // $messages = $this->messages;
	    // 
	    // // remove default option values
	    // foreach ($this->getDefaultMessages() as $key => $value)
	    // {
	    //   if (array_key_exists($key, $messages) && $messages[$key] === $value)
	    //   {
	    //     unset($messages[$key]);
	    //   }
	    // }
	    // 
	    // return $messages;
	  },

	  /**
	   * Returns all options with non default values.
	   *
	   * @return string  A string representation of the options
	   */
	  getOptionsWithoutDefaults: function()
	  {
	    // $options = $this->options;
	    // 
	    // // remove default option values
	    // foreach ($this->getDefaultOptions() as $key => $value)
	    // {
	    //   if (array_key_exists($key, $options) && $options[$key] === $value)
	    //   {
	    //     unset($options[$key]);
	    //   }
	    // }
	    // 
	    // return $options;
	  }

	};
})();