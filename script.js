$(document).ready(function(){
    (function checkLength(options){//function that checks the number of students in the html.
        var paginationContainer = $("#pagination_tags");
        
        var itemsToPaginate = $(".cf").length;
        var defaults = {
            itemsPerPage: 10
        }
        var settings = [];
        $.extend(settings, defaults, options);
        var numberOfPaginationLinks = Math.ceil((itemsToPaginate / settings.itemsPerPage));
        $("<ul id='link_list'></ul>").prependTo(paginationContainer);
        for (var i = 1 ; i < numberOfPaginationLinks + 1; i++){
            $("<li><a id='"+i +"'>"+i +"</a></li>").appendTo($("#link_list"));
        }
        
    })();
    (function makeStartDiv(){//function that makes the seperating divs, each containing 10 student. 
        var itemsToPaginate = $(".cf").length;
        var counter = 0;
        for (var i=0; i < itemsToPaginate; i+= 10){
            $('<div id="page'+counter+'"></div>').insertBefore($(".cf")[i]);
            counter++;
        }
    })();
    (function insertStudents(){//function that takes 10 students and inserts them into each div created.
        var itemsToPaginate = $(".cf").length;
        var div = $("#page0");
        for (var i = 0 ; i < itemsToPaginate; i++){
            if ( (i) % 10 == 0 ){
                div = $("#page"+((i)/10));
            }
            $($(".cf")[i]).appendTo(div);
            
        }
    })();
     (function startPage(){//function that shows page 1 of pagination list
        var itemsToPaginate = $(".cf").length;
        var itemsPerPage = 10;
        var numberOfPages = Math.ceil(itemsToPaginate / itemsPerPage);
        
        const id = 0;
        for(var i = 0; i <= numberOfPages; i++){
        if (i != id){
            $("#page"+i).css("display","none");
        }
        else{
            $("#page"+i).css("display","block");
        }}
    })();
  
    $("#search-btn").click(function(){//on click of search button displays alert if value is empty, if not passes value to function search_list.
        if ($("#search").val() == ''){
            alert('User Not Found');
            location.reload();

        }
        else{
        search_list($("#search").val());
        $("#search").val() == '';
        }
    });
    function search_list(text){//function that searchs through the html to find a match to the text parameter, if found hides all other unrelated students, else give alert('not found').
        
        var counter = 0
        
        var itemsToPaginate = $(".cf").length;
        var itemsPerPage = 10;
        var numberOfPages = Math.ceil(itemsToPaginate / itemsPerPage);
        for (var i = 0 ; i < numberOfPages; i++){
            $("#page"+i).show();
        }
        var found = 'false';
        var studentList = $(".cf");
        studentList.each(function(key, value){
            
            if (value.childNodes[1].innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0){
                found = 'true';
                $(value).show();
            }
            else{
                counter++
                $(value).hide();
               
            }
        });
        if (counter == studentList.length){
            alert('User Not Found');
            location.reload();
        }
        
    }

    

$("#1").click(showPage);//onclick of the pagination links function showPage is invoked.
$("#2").click(showPage);
$("#3").click(showPage);
$("#4").click(showPage);
$("#5").click(showPage);
$("#6").click(showPage);
$("#7").click(showPage);//event handlers targeting buttons 7 to 10 are made in case of the student list lengthening over 54.
$("#8").click(showPage);
$("#9").click(showPage);
$("#10").click(showPage);
function showPage(id){
    var itemsToPaginate = $(".cf").length;
    var itemsPerPage = 10;
    var numberOfPages = Math.ceil(itemsToPaginate / itemsPerPage);
    var page = (parseInt(id.currentTarget.textContent)) - 1;
    for(var i = 0; i <= numberOfPages; i++){
        if (i != page){
            
            $("#page"+i).css("display","none");
        }
        else{
            
            $("#page"+i).css("display","block");
        }}}
});


