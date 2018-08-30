var socket = io.connect('http://192.168.0.106:6677',{'forceNew':true})
socket.on('messages', (data)=>{
  console.log(data);
  render(data);
})
function render(data){
  var html = data.map((messages,index)=>{
    return (`
      <div class="messages">
        <strong>${messages.nickname} dice: </strong><br>
        <span>${messages.text}</span>
      </div>
    `);
  }).join(' ');
  document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
  var message = {
    nickname : document.getElementById('nickname').value,
    text : document.getElementById('text').value
  };
  document.getElementById('nickname').style.display = 'none';
  socket.emit('add-message',message);
  return false;
}
