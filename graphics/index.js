(function () {
  'use strict';

  const title = document.getElementById('title');

  nodecg.listenFor('titleChange', function(message){
    title.innerHTML = message;
  });
})();
