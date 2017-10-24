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
        var numberOfPaginationLinks = Math.ceil((studentList / settings.itemsPerPage));//getting the appropriate number of pagination links to use
        $("<ul id='link_list'></ul>").prependTo(paginationContainer);
        for (var i = 1 ; i < numberOfPaginationLinks + 1; i++){
            $("<li><a id='"+i +"'>"+i +"</a></li>").appendTo($("#link_list"));
        }
        var counter = 0;
        for (var i=0; i < studentList; i+= 10){//for loop that inserts the required amount of div tags for all students to fit with a max of 10 students per page
            $('<div id="page'+counter+'"></div>').insertBefore($(".cf")[i]);
            counter++;
        }
        var div = $("#page0");
        for (var i = 0 ; i < studentList; i++){
            if ( (i) % 10 == 0 ){
                div = $("#page"+((i)/10));//switchs to next div when the current div has 10 students
            }
            $($(".cf")[i]).appendTo(div);//moving students to the appropriate div 
        } 
    };
   
    function startPage(studentList){//function that shows page 1 of pagination list when the page is loaded
        var itemsPerPage = 10;
        var numberOfPages = Math.ceil(studentList / itemsPerPage);
        
        const id = 0;
        for(var i = 0; i <= numberOfPages; i++){//only shows page 1
        if (i != id){
            $("#page"+i).css("display","none");
        }
        else{
            $("#page"+i).css("display","block");
        }}
    };
    (function getStudentList(){//function that get the amount of students in the HTML page and invokes appendPageLinks function to start the application
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
        search_list($("#search").val());//make the search field empty after clicking the search button
        $("#search").val() == '';
        }
    });

    function search_list(text){//function that searchs through the html to find a match to the text parameter, if found hides all other unrelated students, else give alert('not found').
        var counter = 0
        var matched = [];
        var itemsToPaginate = $(".cf").length;
        var itemsPerPage = 10;
        var numberOfPages = Math.ceil(itemsToPaginate / itemsPerPage);
        for (var i = 0 ; i < numberOfPages; i++){//showing all pages 
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
        if (counter == studentList.length){//if invalid search value is entered refresh the page 
            alert('User Not Found');
            location.reload();
        }
        else{
            $("#search").val('');//if valid search value is entered call the showPage function with the matced array as the argument
            console.log(matched);
            showPage(0,matched)
        }
        
    }

document.getElementById('pagination_tags').addEventListener('click', (event) => {//event delegation
    showPage(event.target.id, []);//gets the id of the child element through event bubbling and invokes the showPage() function
});    

function showPage(id, studentList){//function that controls what is shown on the page
    
    var itemsToPaginate = $(".cf").length;
    var itemsPerPage = 10;
    var numberOfPages = Math.ceil(itemsToPaginate / itemsPerPage);
    var page = (parseInt(id)) - 1;
        if (studentList.length != 0){
            var searchDiv = $("#page0")
            //console.log(studentList.length);
            for (var i = 0 ; i < numberOfPages; i++){//hiding existing students so as to not to interfer with the search results students
                $("#page"+i).children().hide();
            }
            for (var i = 0 ; i < studentList.length ; i++){
                if (i % 10 == 0 && i != 0){// if the search results exceeds 10 students add the remaining students to div page 2, div page 3 and so on...
                    searchDiv = $("#page"+ (i/10));
                    console.log(studentList[i]);
                }
                $(studentList[i]).show();
                searchDiv.prepend(studentList[i]);
                
            }
            for (var i = 0 ; i < numberOfPages; i++){
                if (i != 0){
                    $("#page"+i).hide();//show div page 1 after the students matching the search results have been sorted into the HTML
                }
                else{
                    $("#page"+i).show();
                }
            }
        }
         else{//if a pagination link is click hide all pages except the page with the id that matchs the link
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


