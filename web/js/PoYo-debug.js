var PoYo = {};
(function(){
	PoYo.object_diff = function() {
    var arr1 = arguments[0], retArr = {};
    var k1 = '', i = 1, k = '', arr = {};

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < arguments.length; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1]) {
                    // If it reaches here, it was found in at least one object, so try next value
                    continue arr1keys; 
                }
            }
            retArr[k1] = arr1[k1];
        }
    }
		
    return retArr;
	};
	
	PoYo.object_keys  = function(input) {
	  var tmp_arr = {}, cnt = 0;
	  var key = '';

	  for (key in input) {        
			tmp_arr[cnt] = key;
			cnt++;
	  }

	  return tmp_arr;
	};
	
	PoYo.object_merge = function(obj1, obj2) {
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
	};
})();