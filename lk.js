var form=document.getElementById('formid');
var tasklist=document.getElementById('tasklist');
var taskinput=document.getElementById('taskinput');
var filter=document.getElementById('filter');
var cleartask=document.getElementById('cleartask');
var x=0;
form.onsubmit=function(e){
    if(taskinput.value==''){
        alert('Add a task');
    }
    else{
        var li=document.createElement('li');
        var x=taskinput.value;
        li.className='list-group-item p-2';
        li.innerHTML='<button class="close"><span class="span">&times;</span></button>';
        li.appendChild(document.createTextNode(x));
        tasklist.appendChild(li);
        storeinlocal(taskinput.value);
        taskinput.value="";
    }
    e.preventDefault();
}
tasklist.onclick=function(e){
    if(e.target.classList.contains('span')){
        e.target.parentElement.parentElement.remove();
        removetaskfromlocal(e.target.parentElement.parentElement);
    }
}
cleartask.onclick=function(){
    tasklist.innerHTML="";
    localStorage.clear();
}
filter.onkeyup=function(e){
    var text=e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(
        function(task){
            var item=task.textContent;
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display='block';
            }else{
                task.style.display='none';
            }
        }
    ); 
}
function storeinlocal(task){
    var tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
document.addEventListener('DOMContentLoaded',load);
function load(){
    var tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        var li=document.createElement('li');
        var x=task;
        li.className='list-group-item p-2';
        li.innerHTML='<button class="close"><span class="span">&times;</span></button>';
        li.appendChild(document.createTextNode(x));
        tasklist.appendChild(li);
    })
}
function removetaskfromlocal(taskitem){
    var tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskitem.innerText.substring(1,taskitem.innerText.length)===task){
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
