$('#confirmacaoExclusaoModal').on('show.bs.modal', function (event) {
	
	// Pega o elemento que disparou o evento, no caso o botão
	var button = $(event.relatedTarget);
	
	var codigoTitulo = button.data('codigo');
	var descricaoTitulo = button.data('descricao');
	
	var modal = $(this);
	var form = modal.find('form');
	var action = form.data('url-base');
	if (!action.endsWith('/')) {
		action += '/';
	}
	form.attr('action', '/titulos/' + codigoTitulo);
	
	modal.find('.modal-body span').html('Tem certeza que deseja excluir o título <strong>' + descricaoTitulo + '</strong>?');
});

// Funcão chamada sempre que carrega uma página
$(function() {
	$('[rel="tooltip"]').tooltip();
	$('.js-currency').maskMoney({thousands: '.', decimal: ',', allowZero: true});

	$('.js-atualizar-status').on('click', function(event) {
		event.preventDefault(); // Não executa o comportamento default do botão
		
		var botaoReceber = $(event.currentTarget);
		var urlReceber = botaoReceber.attr('href');
		
		var response = $.ajax({
			url: urlReceber,
			method: 'PUT'
		});
		
		response.done(function(e) {
			var codigoTitulo = botaoReceber.data('codigo');
			
			// Substitui o span
			$('[data-role=' + codigoTitulo + ']').html('<span class="label label-success">' + e + '</span>');
			
			botaoReceber.hide();
		});
		
		response.fail(function(e) {
			console.log(e);
			alert("Erro ao receber a cobrança;");
		})
		
	});
});

