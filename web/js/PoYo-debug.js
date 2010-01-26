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
	var PoYoValidatorBase = function(options, messages) {
		this._init(options, messages);
	};
	
	PoYoValidatorBase.prototype = {
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
			
			this.setDefaultOptions(this.getOptions());
			this.setDefaultMessages(this.getMessages());

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
	    this._options  = this._mergeOptions(this._options, options);
	    this._messages = this._mergeOptions(this._messages, messages);
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
	    return this._messages.name || '';
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
	
		/**
	   * Gets an option value.
	   *
	   * @param  string $name  The option name
	   *
	   * @return mixed  The option value
	   */
	  getOption: function(name)
	  {
	    return this._options.name;
	  },

	  /**
	   * Adds a new option value with a default value.
	   *
	   * @param string $name   The option name
	   * @param mixed  $value  The default value
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  addOption: function(name, value)
	  {
	    this._options.name = value;

	    return this;
	  },

	  /**
	   * Changes an option value.
	   *
	   * @param string $name   The option name
	   * @param mixed  $value  The value
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  setOption: function(name, value)
	  {
	    // if (!in_array($name, array_merge(array_keys($this->options), $this->requiredOptions)))
	    // {
	    //   throw new InvalidArgumentException(sprintf('%s does not support the following option: \'%s\'.', get_class($this), $name));
	    // }
	    // 
	    // $this->options[$name] = $value;

	    return this;
	  },

	  /**
	   * Returns true if the option exists.
	   *
	   * @param  string $name  The option name
	   *
	   * @return bool true if the option exists, false otherwise
	   */
	  hasOption: function(name)
	  {
	    //return isset($this->options[$name]);
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
	   * @param array $values  An array of options
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  setOptions: function(values)
	  {
	    this._options = values;

	    return this;
	  },

	  /**
	   * Adds a required option.
	   *
	   * @param string $name  The option name
	   *
	   * @return sfValidatorBase The current validator instance
	   */
	  addRequiredOption: function(name)
	  {
	    //this._requiredOptions[] = name;

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
	   * Sets the default message for a given name.
	   *
	   * @param string $name    The name of the message
	   * @param string $message The default message string
	   */
	  setDefaultMessage: function(name, message)
	  {
	    this._globalDefaultMessages[name] = message;
	  },

	  /**
	   * Cleans the input value.
	   *
	   * This method is also responsible for trimming the input value
	   * and checking the required option.
	   *
	   * @param  mixed $value  The input value
	   *
	   * @return mixed The cleaned value
	   *
	   * @throws sfValidatorError
	   */
	  clean: function(value)
	  {
	    var clean = value;
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
	   * @param  mixed $value  The input value
	   *
	   * @return mixed The cleaned value
	   *
	   * @throws sfValidatorError
	   */
	  doClean: function(value)
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
	   * Returns true if the value is empty.
	   *
	   * @param  mixed $value  The input value
	   *
	   * @return bool true if the value is empty, false otherwise
	   */
	  isEmpty: function(value)
	  {
	    //return in_array($value, array(null, '', array()), true);
	  },

	  /**
	   * Returns an empty value for this validator.
	   *
	   * @return mixed The empty value for this validator
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
	
	var PoYoValidatorBoolean = function(options, messages) {
		this._init(options, messages);
	};
	PoYoValidatorBoolean.prototype = PoYoValidatorBase.prototype;
	/**
   * Configures the current validator.
   *
   * Available options:
   *
   *  * true_values:  The list of true values
   *  * false_values: The list of false values
   *
   * @param array $options    An array of options
   * @param array $messages   An array of error messages
   *
   * @see sfValidatorBase
   */
  PoYoValidatorBoolean.prototype.configure = function(options , messages)
  {
    // $this->addOption('true_values', array('true', 't', 'yes', 'y', 'on', '1'));
    // $this->addOption('false_values', array('false', 'f', 'no', 'n', 'off', '0'));
    // 
    // $this->setOption('required', false);
    // $this->setOption('empty_value', false);
  };

  /**
   * @see sfValidatorBase
   */
  PoYoValidatorBoolean.prototype.doClean = function(value)
  {
    // if (in_array($value, $this->getOption('true_values')))
    // {
    //   return true;
    // }
    // 
    // if (in_array($value, $this->getOption('false_values')))
    // {
    //   return false;
    // }
    // 
    // throw new sfValidatorError($this, 'invalid', array('value' => $value));
  };
	
// })();