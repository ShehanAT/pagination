$(document).ready(function(){
    (function addSearchBox(){//adds search box to the HTML IF JavaScript is enabled in the browser.
        $(".page").prepend('<div class="page-header"><h2 id="title">Students</h2><div class="search-box" id="search-box"></div><input type="search" placeholder="Search for student..." id="search"><button id="search-btn">Search</button></div></div>');
    })();
   
    function appendPageLinks(studentList){//function that checks the number of students in the html.
        var options;//need a empty variable for $.extend
        var paginationContainer = $("#pagination_tags");
        var defaults = {
            itemsPerPage: 10
        }
        var settings = [];
        $.extend(settings, defaults, options);
        var numberOfPaginationLinks = Math.ceil((studentList / settings.itemsPerPage));
        $("<ul id='link_list'></ul>").prependTo(paginationContainer);
        for (var i = 1 ; i < numberOfPaginationLinks + 1; i++){
            $("<li><a id='"+i +"'>"+i +"</a></li>").appendTo($("#link_list"));
        }
        var counter = 0;
        for (var i=0; i < studentList; i+= 10){
            $('<div id="page'+counter+'"></div>').insertBefore($(".cf")[i]);
            counter++;
        }
        var div = $("#page0");
        for (var i = 0 ; i < studentList; i++){
            if ( (i) % 10 == 0 ){
                div = $("#page"+((i)/10));
            }
            $($(".cf")[i]).appendTo(div);
        } 
    };
   
    function startPage(studentList){//function that shows page 1 of pagination list when the page is loaded
        var itemsPerPage = 10;
        var numberOfPages = Math.ceil(studentList / itemsPerPage);
        
        const id = 0;
        for(var i = 0; i <= numberOfPages; i++){
        if (i != id){
            $("#page"+i).css("display","none");
        }
        else{
            $("#page"+i).css("display","block");
        }}
    };
    (function getStudentList(){
        var itemsToPaginate = $(".cf").length;
        appendPageLinks(itemsToPaginate);
        startPage(itemsToPaginate);
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
        var matched = [];
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
                matched.push($(value)[0]);
            }
            else{
                counter++
            }
            
        });
        if (counter == studentList.length){
            alert('User Not Found');
            location.reload();
        }
        else{
            $("#search").val('');
            console.log(matched);
            showPage(0,matched)
        }
        console.log(studentList)
    }

document.getElementById('pagination_tags').addEventListener('click', (event) => {
    showPage(event.target.id, []);//gets the id of the child element through event bubbling and invokes the showPage() function
});    

function showPage(id, studentList){
    
    var itemsToPaginate = $(".cf").length;
    var itemsPerPage = 10;
    var numberOfPages = Math.ceil(itemsToPaginate / itemsPerPage);
    var page = (parseInt(id)) - 1;
        if (studentList.length != 0){
            var searchDiv = $("#page0")
            //console.log(studentList.length);
            for (var i = 0 ; i < numberOfPages; i++){
                $("#page"+i).children().hide();
            }
            for (var i = 0 ; i < studentList.length ; i++){
                if (i % 10 == 0 && i != 0){
                    searchDiv = $("#page"+ (i/10));
                    console.log(studentList[i]);
                }
                $(studentList[i]).show();
                searchDiv.prepend(studentList[i]);
                
            }
            for (var i = 0 ; i < numberOfPages; i++){
                if (i != 0){
                    $("#page"+i).hide();
                }
                else{
                    $("#page"+i).show();
                }
            }
        }
         else{
        for(var i = 0; i <= numberOfPages; i++){
        if (i != page){
            
            $("#page"+i).css("display","none");
        }
        else{
            
            $("#page"+i).css("display","block");
        }}
    }
    }
    

});


