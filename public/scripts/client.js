
function initForm(){
    $( "#form" ).submit(function( event ) {
        var saveData = $.ajax({
            type: 'POST',
            url: "/tweets",
            data: $(this).serialize(),
            dataType: "text",
            success: function(resultData) { 
                $('#tweet-text').val(''); 
                $(tweets).html('');                
                initTweets();
            }
        });
      event.preventDefault();
      });
}

function initTweets(){
   loadTweets();    
}

function loadTweets() {    
    $.get( "/tweets", function( data ) {       
        renderTweets(data);
      });
}

function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

function renderTweets(tweets) {
  tweets.forEach(createTweetElement);   
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));    
}

let createTweetElement = function(user) {  
 
  let $tweet = `
  <article>
          <theader>
            <div class="name">  
            <img src="`+escape(user.user.avatars)+`"> 
              <span> `+escape(user.user.name)+`</span>
            </div>
            <div class = "user_id"><span>`+escape(user.user.handle)+`</span></div>
            </theader>
          <div>`+escape(user.content.text)+`</div>
          <tfooter>
            <div class="date">
              <span class="need_to_be_rendered" datetime="${user.created_at}"></span>
            </div>
            <div class="icons w3-small">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </tfooter>
        </article>`;
        $('#tweets').append($tweet);        
}