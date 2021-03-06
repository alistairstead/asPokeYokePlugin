(function(){
	PoYo.PoYoValidatorChoice = function(options, messages) {
		this.constructor(options, messages);
	};
	
	PoYo.PoYoValidatorChoice.prototype = new PoYo.PoYoValidatorBase();
	/**
   * Configures the current validator.
   *
   * Available options:
   *
   *  * choices:  An array of expected values (required)
   *  * multiple: true if the select tag must allow multiple selections
   *  * min:      The minimum number of values that need to be selected (this option is only active if multiple is true)
   *  * max:      The maximum number of values that need to be selected (this option is only active if multiple is true)
   *
   * @param array options    An array of options
   * @param array messages   An array of error messages
   *
   * @see sfValidatorBase
   */
  PoYo.PoYoValidatorChoice.prototype.configure = function(options, messages)
  {
    this.addRequiredOption('choices');
    this.addOption('multiple', false);
    this.addOption('min');
    this.addOption('max');

    this.addMessage('min', 'At least %min% values must be selected (%count% values selected).');
    this.addMessage('max', 'At most %max% values must be selected (%count% values selected).');
  };

  /**
   * @see sfValidatorBase
   */
  PoYo.PoYoValidatorCallback.prototype.doClean = function(v)
  {
    var choices = this.getChoices();

    if (this.getOption('multiple'))
    {
      v = this.cleanMultiple(v, choices);
    }
    else
    {
      if (!this.inChoices(v, choices))
      {
        throw new PoYoValidatorError(this, 'invalid', {'value': v});
      }
    }

    return v;
  };

	// public function getChoices()
	//   {
	//     $choices = $this->getOption('choices');
	//     if ($choices instanceof sfCallable)
	//     {
	//       $choices = $choices->call();
	//     }
	// 
	//     return $choices;
	//   }
	// 
	//   /**
	//    * Cleans a value when multiple is true.
	//    *
	//    * @param  mixed $value The submitted value
	//    *
	//    * @return array The cleaned value
	//    */
	//   protected function cleanMultiple($value, $choices)
	//   {
	//     if (!is_array($value))
	//     {
	//       $value = array($value);
	//     }
	// 
	//     foreach ($value as $v)
	//     {
	//       if (!self::inChoices($v, $choices))
	//       {
	//         throw new sfValidatorError($this, 'invalid', array('value' => $v));
	//       }
	//     }
	// 
	//     $count = count($value);
	// 
	//     if ($this->hasOption('min') && $count < $this->getOption('min'))
	//     {
	//       throw new sfValidatorError($this, 'min', array('count' => $count, 'min' => $this->getOption('min')));
	//     }
	// 
	//     if ($this->hasOption('max') && $count > $this->getOption('max'))
	//     {
	//       throw new sfValidatorError($this, 'max', array('count' => $count, 'max' => $this->getOption('max')));
	//     }
	// 
	//     return $value;
	//   }
	// 
	//   /**
	//    * Checks if a value is part of given choices (see bug #4212)
	//    *
	//    * @param  mixed $value   The value to check
	//    * @param  array $choices The array of available choices
	//    *
	//    * @return Boolean
	//    */
	//   static protected function inChoices($value, array $choices = array())
	//   {
	//     foreach ($choices as $choice)
	//     {
	//       if ((string) $choice == (string) $value)
	//       {
	//         return true;
	//       }
	//     }
	// 
	//     return false;
	//   }

})();