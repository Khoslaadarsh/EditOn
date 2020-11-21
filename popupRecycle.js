


window.onload = function(){
    var n = 1;
    var totalNotes = [];

    class Notes{
        constructor(number, note){
            this.noteNumber = number;
            this.note = note;
        }
    }
    var currentList = 1;

    var deletedNote = [];

    $(function(){

        chrome.storage.sync.getBytesInUse(['text'], function(bytes){
            if(bytes !== 0){
                chrome.storage.sync.get('text', function(data){
                    totalNotes = data.text;
                })
            }
        })



        chrome.storage.sync.getBytesInUse(['deleted'], function(bytes){
            if(bytes !== 0){
    
                chrome.storage.sync.get('deleted', function(data){

                    if(data.deleted.length == 0){
                        document.getElementById('mainText').disabled = false;
                        document.getElementById('mainText').value = "You are free of garbage";
                        document.getElementById('mainText').disabled = true;
                    }
                    else{
                        for( var i = 1; i <= data.deleted.length; i++){
                            noteNew = new Notes(n, data.deleted[i - 1].note);
                            deletedNote.push(noteNew);
    
                            let li = document.createElement('li');
                            li.id = n;
                            
                            let i1 = document.createElement('i');
                            i1.className = "fa fa-refresh";
                            i1.classList.add("restore");
                            i1.id = `restore${n}`;
                            i1.setAttribute("aria-hidden", "true");
                            i1.setAttribute("style", "float: right; padding-top: 3px")
    
                            let i2 = document.createElement('i');
                            i2.className = "fa fa-trash-o";
                            i2.classList.add("delete")
                            i2.id = `premaDelete${n}`;
                            i2.setAttribute("aria-hidden", "true");
                            i2.setAttribute("style", "float: right; padding-top: 3px; margin-right: 2px")
    
                            text = `${data.deleted[i - 1].note.substring(0,6)}  `
                            li.append(text)
                            li.append(i1);
                            li.append(i2);
                            document.getElementById('Deleted-Notes').appendChild(li);
    
                            let getElemWithClass = document.querySelector('.active-note');
                            if (getElemWithClass !== null) {
                                getElemWithClass.classList.remove('active-note');
                            }
                            //add the active class to the element from which click event triggered
                        
                            li.classList.add('active-note')
    
                            currentList = Number(li.id);
                            document.getElementById('mainText').disabled = false;
                            document.getElementById('mainText').value = deletedNote[li.id - 1].note;
                            document.getElementById('mainText').disabled = true;
    
                            currentList = Number(li.id);
                            // if(deletedNote.length > 2){
                                li.addEventListener('click', function(){
                                    let getElemWithClass1 = document.querySelector('.active-note');
                                    if(getElemWithClass1 != null){
                                        getElemWithClass1.classList.remove('active-note');
                                    }
                                    li.classList.add('active-note');
                                    currentList =  Number(li.id);
        
                                    if(currentList == deletedNote.length + 1){
                                        currentList = currentList - 2;
                                    }
                            
                                    document.getElementById('mainText').disabled = false;
                                    document.getElementById('mainText').value = deletedNote[currentList - 1].note;
                                    document.getElementById('mainText').disabled = true;
        
        
                                })
                            // }
                            
    
                            i1.addEventListener('click', function(){
                                currentList =  Number(li.id);
                                if(confirm(`Do You want to restore the note "${deletedNote[li.id-1].note.substring(0,6)}"`)){
    
                                    totalNotes.push(deletedNote[currentList - 1]);
    
                                    deletedNote.splice(currentList - 1, 1);
    
    
                                    document.querySelector('ol').removeChild(document.getElementById(currentList));
                                    
                                    for(var i = currentList - 1; i<deletedNote.length; i++){
                                        deletedNote[i].noteNumber = deletedNote[i].noteNumber - 1;
                                        document.querySelector('ol').children.item(i).id = deletedNote[i].noteNumber;
                                    }
                            
                                    if(currentList == deletedNote.length + 1){
                                        currentList = currentList - 1;
                                    }
                                    if(deletedNote.length>=1){
    
                                        document.querySelector('ol').children.item(currentList - 1).classList.add('active-note')
                                        
                                        document.getElementById('mainText').value = deletedNote[currentList - 1].note;
                                    }
                                    if(deletedNote.length == 0){
                                        document.getElementById('mainText').disabled = false;
                                        document.getElementById('mainText').value = "You are free of garbage";
                                        document.getElementById('mainText').disabled = true;
                                    }
                                    // document.getElementById('mainText').value = deletedNote[currentList - 1].note;
                            
    
                                    chrome.storage.sync.set({'deleted': deletedNote}, function(){
                                        console.log("deleted also updated");
                                    })
    
                                    chrome.storage.sync.set({'text':totalNotes}, function(){
                                        console.log("changes saved");
                                    })
                            
                                    n = n - 1;
    
                                }
                            })
    
                            i2.addEventListener('click', function(){
                                currentList =  Number(li.id);
                                if(confirm(`Do You want to delete the note "${deletedNote[li.id-1].note.substring(0,6)}"`)){
    
                                    deletedNote.splice(currentList - 1, 1);
    
                                    document.querySelector('ol').removeChild(document.getElementById(currentList));
                                    
                                    for(var i = currentList - 1; i<deletedNote.length; i++){
                                        deletedNote[i].noteNumber = deletedNote[i].noteNumber - 1;
                                        document.querySelector('ol').children.item(i).id = deletedNote[i].noteNumber;
                                    }
                            
                                    if(currentList == deletedNote.length + 1){
                                        currentList = currentList - 1;
                                    }
                            
                                    let getElemWithClass = document.querySelector('.active-note');
                                        if (getElemWithClass !== null) {
                                            getElemWithClass.classList.remove('active-note');
                                        }
                                        //add the active class to the element from which click event triggered
                                    
                                        if(deletedNote.length>=1){
    
                                            document.querySelector('ol').children.item(currentList - 1).classList.add('active-note')
                                            
                                            document.getElementById('mainText').value = deletedNote[currentList - 1].note;
                                        }
                                        if(deletedNote.length == 0){
                                            document.getElementById('mainText').disabled = false;
                                            document.getElementById('mainText').value = "You are free of garbage";
                                            document.getElementById('mainText').disabled = true;
                                        }
                            
                                    // chrome.storage.sync.set({'text':deletedNote}, function(){
                                    // })
                            
                                    chrome.storage.sync.set({'deleted': deletedNote}, function(){
                                        console.log("deleted also updated");
                                    })
                            
                                    n = n - 1;
    
                                }
                            })
    
                            n = n+1;
                        }
                    }
                    

                })
    
            }
            else{
                document.getElementById('mainText').disabled = false;
                document.getElementById('mainText').value = "You are free of garbage";
                document.getElementById('mainText').disabled = true;
            }

        });


    })



}













