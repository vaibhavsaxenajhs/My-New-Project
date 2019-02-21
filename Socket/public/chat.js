let socket = io.connect('localhost:8023');


var person = prompt("Please enter your name:", "vaibhav..");
//Handel Frontend request
document.getElementById("send").addEventListener('click',function(){    
    socket.emit('chat',{
        message:message.value,
        handle:person,
        IP:"123"
    });
});

socket.on('chat',function(data){
    // document.getElementById("output").innerHTML += '<br><strong>'+data.handle+'</strong> : '+data.message+'    <strong> '+data.IP+'</strong>';
    document.getElementById("output").innerHTML += '<br><strong>'+data.handle+'</strong> : '+data.message;

});