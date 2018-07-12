$(document).ready(function(){
  $(document).on('click', 'a.ajax', function(e){
    e.preventDefault();
    var el = $(this),
      contract_addr = el.closest('tr').data('contract');
    if(el.hasClass('buy-ticket')) {

    }
    if(el.hasClass('show-winners')) {

    }
  });
});
