$(document).ready(function() {

  $(document).on('click', '.new-scrape', function(e) {
    e.preventDefault();
    // var data = {newScrape: true};
    
    $.ajax({
      url: '/scrape',
      type: 'get',
      success: function(res) {
        if (res) {
          window.location.replace('/scrape');
          alert('New York Times Articles Scraped')
        }
      },
      error: function(err) {
        console.log(err);
        ;
      }
    });

  });

  $(document).on('click', '#clear', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/scrape',
      type: 'delete',
      success: function(res) {
        if (res){
          console.log('scraped articles cleared');
          $('.scraped-articles').empty();
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $(document).on('click', '.save', function(e) {
    e.preventDefault();
    var id = $(this).data('id');  
    $.ajax({
      url: '/saved',
      type: 'put',
      data: { id: id, saved: true },
      success: function(res) {
        if (res) {
          console.log('article saved');
          alert('This Article is Saved.<br>Go to Saved Articles & Make Notes.');
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $(document).on('click', '.delete', function(e) {
    e.preventDefault();
    var stub = $(this).data('stub');
    var id = $(this).data('id');
    $.ajax({
        url: '/saved',
        method: 'delete',
        data: { id: id },
        success: function(res) {
          if (res) {
            $(`#${stub}-card`).remove();
          }
          console.log('article deleted');
        },
        error: function(err) {
          console.log(err);
        }
    });
  });

  $(document).on('click', '.new-note', function(e) {

    e.preventDefault();
    var stub = $(this).data('stub');
    var id = $(this).data('id');
    var title = $(`#${stub}-title`).val().trim();
    var body = $(`#${stub}-body`).val().trim();
    var newNote = {
      title: title,
      body: body
    }
    $.ajax({
      url: '/note/' + id,
      method: 'post',
      data: newNote,
      success: function(newNote) {
        console.log('note created');
        $(`#${stub}-title`).empty();
        $(`#${stub}-body`).empty();
        let noteCard = $(`<div>`).addClass('card');
        let noteCardBody = $('<div>').addClass('card-body');
        noteCardBody.append(`<h5 class="card-title">${newNote.title}</h5>`)
                    .append(`<h6 class="card-subtitle mb-2 text-muted" style="font-size: 12px;">Created: ${newNote.createdAt}</h6>`)
                    .append(`<p class="card-text">${newNote.body}</p>`);
        noteCard.append(noteCardBody);
        $(`#${stub}-notes`).prepend(noteCard);
      },
      error: function(err) {
        console.log(err);
      }
    });

  });

});