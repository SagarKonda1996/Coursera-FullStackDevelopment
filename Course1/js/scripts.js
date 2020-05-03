$(document).ready(function(){
    $("#mycarousel").carousel( { interval: 1000 } );
    $("#carousel-Button").click(function(){
       if($("#carousel-Button").children('span').hasClass('fa-pause'))
       {
        $("#mycarousel").carousel('pause')
        $("#carousel-Button").children('span').removeClass('fa-pause')
        $("#carousel-Button").children('span').addClass('fa-play')
        }
        else{
            $("#mycarousel").carousel('cycle');
            $("#carousel-Button").children('span').removeClass('fa-play')                
            $("#carousel-Button").children('span').addClass('fa-pause')
        }
    });



    $("#LoginModalTrigger").click(function(){
        $('#loginModal').modal('show')

    })
    $("#LoginHeaderClose").click(function(){
        $('#loginModal').modal('hide')

    })
    $("#LoginBodyClose").click(function(){
        $('#loginModal').modal('hide')

    })
                
    $("#ReserveTableModalTrigger").click(function(){
        $('#ReserveTable').modal('show')

    })
    $("#ReserveTableHeaderClose").click(function(){
        $('#ReserveTable').modal('hide')

    })
    $("#ReserveTableBodyClose").click(function(){
        $('#ReserveTable').modal('hide')

    })

   
});