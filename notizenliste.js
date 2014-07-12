jQuery(document).ready(function($) {
	//$.jStorage.flush()
	notizenListeLaden();	
	
	$("#buttonHinzufügen").click(function(){
		var textInput = $("#notizTextInput").val();       
    if (textInput == '') {
    	alert("Bitte geben Sie einen Songtitel ein!")
    } 
    else {      	
    	speichere(textInput);
		notizenListeLaden();
		setDataAttributes();
    	var count = $("#notizenliste").children().length;            	
    	$('#count').html("<strong>Offene Notizen:</strong> " + count); 
    	$('#count').show();
    	$("#notizTextInput").val('');
    }   			
	});

	function speichere(element) {
		var listenArray = speicherArrayAbrufen("wiedergabeliste");
		
		listenArray.push(element);
		$.jStorage.set("wiedergabeliste", JSON.stringify(listenArray));
	}

	function notizenListeLaden() {
		var listenArray = gespeicherteNotizenLaden();		
		
		if (listenArray != null) {
			$("ul li").remove();
			for (var i = 0; i < listenArray.length; i++) {
				$('#notizenliste').append("<li>"+listenArray[i]+"</li>");				
			}
		}
	}

	function gespeicherteNotizenLaden() {
		return speicherArrayAbrufen("wiedergabeliste");
	}

	function speicherArrayAbrufen(schluessel) {
		var listenArray = jQuery.jStorage.get(schluessel);
		
		if (listenArray == null || listenArray == "") {
			listenArray = new Array();
		}
		else {
			listenArray = JSON.parse(listenArray);			
		}
		return listenArray;
	}

	function setDataAttributes(){
		var elem = $("#notizenliste").find("*");
		
		for (var i = 0; i < elem.length; i++) {			
			$(elem[i]).attr("data-value", i).addClass('listitem');
		}
	}; 

	$("ul").on("click", "li", function() {
		var text = $(this).text();
		var s = JSON.parse($.jStorage.get("wiedergabeliste"));			
        var searchValue = $.inArray(text, s);       
        
        s.splice(searchValue, 1);
        $.jStorage.set("wiedergabeliste", JSON.stringify(s));       		
		notizenListeLaden();
		var count = $("#notizenliste").children().length;
		if (count != 0){
			$('#count').html("<strong>Offene Notizen:</strong> " + count);  
		} else {
			$('#count').hide();
		}		
	});

	$("#buttonSearch").click(function() {
		$('#count').hide();
		var searchInput = $("#notizTextInput").val();   
		var store = JSON.parse($.jStorage.get("wiedergabeliste"));
		var resultContainer = [];

		for (var i = 0; i < store.length; i++) {
        	if (store[i].match(searchInput)) {
        		resultContainer.push(store[i]);
        	}
        }
        $("#notizTextInput").val('');
        if (resultContainer != null) {
        	$("ul li").remove();
        	
        	for (var i = 0; i < resultContainer.length; i++) {
				$('#notizenliste').append("<li>"+resultContainer[i]+"</li>");				
			}

			var count = $("#notizenliste").children().length;
			if (count != 0){
				$('#count').show();
				$('#count').html(count +" <strong>Treffer</strong>");
				$('#all').show();
				$('#all').html("Alle Notizen anzeigen");  
			} else {
				$('#count').show();
				$('#count').html("<strong>Keine Treffer</strong> ");
				$('#all').show();
				$('#all').html("Alle Notizen anzeigen"); 							
			}	
        }	
	});

	$("#all").click(function() {
		notizenListeLaden();
		$('#all').hide();
		$('#count').hide();
	});	
});