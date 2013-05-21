$(document).ready(function() {	

	$('.selectpicker').selectpicker( {
	});

	$('.slide-input').slider()
		.on('slide', function(ev){
			$('#slide-output').text(ev.value);
		});
});