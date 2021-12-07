        function initCounter()	{
            (function($) {
                $.fn.charCount = function(btnsub, options){
                    this.btnsub = btnsub;
                    var defaults = {	
                        allowed: 140,		
                        warning: 25,
                        css: 'counter',
                        counterElement: 'span',
                        cssWarning: 'warning',
                        cssExceeded: 'exceeded',
                        counterText: ''
                    };               
                    var options = $.extend(defaults, options); 
            
                    function calculate(obj,btnsub){			
                        btnsub.attr("disabled", "disabled");
                        var count = $(obj).val().length;
                        var available = options.allowed - count;
                        $('#form').submit(function() {
                            if ($.trim($("#tweet-text").val()) === "") {
                                $('#error').show().text('Please enter text of the Tweet!');
                                return false;
                            }
                        });         
                        if(available <= options.warning && available >= 0){
                            $('#btnsub').next().addClass(options.cssWarning);
                        } else {
                            $('#btnsub').next().removeClass(options.cssWarning);
                        }
                        if(available < 0){
                            $('#btnsub').next().addClass(options.cssExceeded);
                            $('#error').css({ display : "block" });
                        } else {
                            $('#btnsub').next().removeClass(options.cssExceeded);
                            $('#error').css({ display : "none" });
                            btnsub.removeAttr("disabled");
                        }                   
                        $('#btnsub').next().html(options.counterText + available);
                    };                  
                    this.each(function() {  			
                       $(this).after('<'+ options.counterElement +' class="' + options.css + '">'+ options.counterText+'' +'</'+ options.counterElement +'>');					     
                        calculate(this, btnsub);
                        $(this).keyup(function(){calculate(this,btnsub)});
                        $(this).change(function(){calculate(this,btnsub)});
                    });
          
                };
    
            })(jQuery);
        }

