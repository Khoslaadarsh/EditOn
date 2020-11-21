



$(function(){
    var n = 1;
    var totalNotes = [];
    var currentList = 1;

    class Notes{
        constructor(number, note){
            this.noteNumber = number;
            this.note = note;
        }
    }

    var deletedNote = [];
    // Getting Elements from Chrome Storage Api and updating the popu page
    chrome.storage.sync.getBytesInUse(['deleted'], function(bytes){
        if(bytes != 0){
            chrome.storage.sync.get('deleted', function(data){
                deletedNote = data.deleted;
            })
        }
        else{
            deletedNote = [];
        }
    })

    

    chrome.storage.sync.getBytesInUse(['text'], function(bytes){
        if(bytes !== 0){
            chrome.storage.sync.get('text', function(data){
                // document.getElementById('mainText').innerHTML = data.text
                    for(var i = 1; i<=data.text.length;i++){
                        noteNew = new Notes(n, data.text[i-1].note);
                        totalNotes.push(noteNew);
                        document.getElementById('mainText').value = totalNotes[n - 1].note;
            
                        let li = document.createElement('li');
                        li.id = n;
                        li.className = "notesss";
                        li.innerHTML = totalNotes[n - 1].note.substring(0,6);
                        document.getElementById('Notes').appendChild(li);

                        let getElemWithClass = document.querySelector('.active-note');
                        if (getElemWithClass !== null) {
                            getElemWithClass.classList.remove('active-note');
                        }
                        //add the active class to the element from which click event triggered
                    
                        li.classList.add('active-note')
                        currentList = Number(li.id);
                        document.getElementById('mainText').value = totalNotes[li.id - 1].note;
                        document.getElementById('mainText').focus();

                        currentList = Number(li.id);
                        li.addEventListener('click', function(){
                            let getElemWithClass1 = document.querySelector('.active-note');
                            if(getElemWithClass1 != null){
                                getElemWithClass1.classList.remove('active-note');
                            }
                            li.classList.add('active-note');
                            currentList =  Number(li.id);
                            document.getElementById('mainText').value = totalNotes[li.id - 1].note;
                            document.getElementById('mainText').focus();
                        })
                        n = n+1;
                    }
        
            })

        }
        else{

            // setting first list item and adding listeners to it
            noteNew = new Notes(n, `Type here ${n}`)
            totalNotes.push(noteNew);

            // <li id="1" class="active-note notesss">New Note</li>

            let li = document.createElement('li');
            li.id = n;
            li.className = "notesss active-note";
            li.innerHTML = "New Note";

            
            document.getElementById('Notes').appendChild(li);

            

            currentList = Number(li.id);
            document.getElementById('1').addEventListener('click', function(){
                currentList = 1;
                document.getElementById('mainText').value = totalNotes[0].note;
                document.getElementById('mainText').focus();
            })
           

            // add lsiteners to list item onclick -> toggle class
            document.querySelectorAll('.notesss').forEach(function(item) {
                // iterate and add event lstener to each of them
                item.addEventListener('click', function(elem) {
                    let getElemWithClass = document.querySelector('.active-note');
                    if (getElemWithClass !== null) {
                        getElemWithClass.classList.remove('active-note');
                    }
                    //add the active class to the element from which click event triggered
                    item.classList.add('active-note')
                })
            })

            n = n+1;


        }


    });



    // Creating List item and adding click events for other than 1st item
    $('#New').click(function(){
        
        noteNew = new Notes(n, `Type here ${n}`);
        totalNotes.push(noteNew);
        document.getElementById('mainText').value = totalNotes[n-1].note;
        
        let li = document.createElement('li');
        li.id = n;
        li.className = "notesss";
        li.innerHTML = 'New Note';

        
        document.getElementById('Notes').appendChild(li);

        let getElemWithClass = document.querySelector('.active-note');
            if (getElemWithClass !== null) {
                getElemWithClass.classList.remove('active-note');
            }
            //add the active class to the element from which click event triggered
        
        li.classList.add('active-note')
        currentList = Number(li.id);
        document.getElementById('mainText').value = totalNotes[li.id - 1].note;
        document.getElementById('mainText').focus();

        currentList = Number(li.id);
        // add listener to newly generated list item
        li.addEventListener('click', function(elem){
            let getElemWithClass = document.querySelector('.active-note');
                if (getElemWithClass !== null) {
                    getElemWithClass.classList.remove('active-note');
                }
                //add the active class to the element from which click event triggered
            
            li.classList.add('active-note')
            currentList = Number(li.id);
            document.getElementById('mainText').value = totalNotes[li.id - 1].note;
            document.getElementById('mainText').focus();

        })
        n = n+1;
    })

    $('#search-note').on('input',function(){
        if(this.value == "")
        {
            $('#Notes').empty();
            totalNotes.forEach(element => {
                document.getElementById('mainText').value = totalNotes[element.noteNumber - 1].note;
            
                        let li = document.createElement('li');
                        li.id = element.noteNumber;
                        li.className = "notesss";
                        li.innerHTML = totalNotes[li.id - 1].note.substring(0,6);
                        document.getElementById('Notes').appendChild(li);

                        let getElemWithClass = document.querySelector('.active-note');
                        if (getElemWithClass !== null) {
                            getElemWithClass.classList.remove('active-note');
                        }
                        //add the active class to the element from which click event triggered
                    
                        li.classList.add('active-note')
                        currentList = Number(li.id);
                        document.getElementById('mainText').value = totalNotes[li.id - 1].note;
                        // document.getElementById('mainText').focus();

                        currentList = Number(li.id);
                        li.addEventListener('click', function(){
                            let getElemWithClass1 = document.querySelector('.active-note');
                            if(getElemWithClass1 != null){
                                getElemWithClass1.classList.remove('active-note');
                            }
                            li.classList.add('active-note');
                            currentList =  Number(li.id);
                            document.getElementById('mainText').value = totalNotes[li.id - 1].note;
                            // document.getElementById('mainText').focus();
                        })
            });
        }
        else
        {
            var Nnew = 1;
            $('#Notes').empty();
            totalNotes.forEach(element => {
                if(element.note.includes(this.value)){

                    document.getElementById('mainText').value =element.note;
            
                        let li = document.createElement('li');
                        li.id = n;
                        li.className = "notesss";
                        li.innerHTML =element.note.substring(0,6);
                        document.getElementById('Notes').appendChild(li);

                        let getElemWithClass = document.querySelector('.active-note');
                        if (getElemWithClass !== null) {
                            getElemWithClass.classList.remove('active-note');
                        }
                        //add the active class to the element from which click event triggered
                    
                        li.classList.add('active-note')
                        currentList = Number(li.id);
                        document.getElementById('mainText').value = element.note;
                        // document.getElementById('mainText').focus();

                        currentList = Number(li.id);
                        li.addEventListener('click', function(){
                            let getElemWithClass1 = document.querySelector('.active-note');
                            if(getElemWithClass1 != null){
                                getElemWithClass1.classList.remove('active-note');
                            }
                            li.classList.add('active-note');
                            currentList =  Number(li.id);
                            document.getElementById('mainText').value = element.note;
                            // document.getElementById('mainText').focus();
                        })
                        Nnew = Nnew+1;
                }
            });
        }
    })
    
    document.getElementById('mainText').addEventListener('input', function(){
        document.querySelector('ol').children.item(currentList - 1).innerHTML = document.getElementById('mainText').value.substring(0,6)
    })


    document.getElementById('mainText').addEventListener('change', function(){

        totalNotes[currentList - 1].note = document.getElementById('mainText').value;

    })



    document.getElementById("mainText").addEventListener("change", function(event) {


        chrome.storage.sync.set({'text':totalNotes}, function(){
            console.log("changes saved");
        })

    });

    // toggling function
    document.getElementById('hide_seek').addEventListener('click', function(){
        if(document.getElementById('hide_and_show').style.display == "none"){
            document.getElementById('hide_and_show').style.display = "block";
            document.getElementById('right_8').classList.remove('col-12');
            document.getElementById('right_8').classList.add('col-8');
        }else{
            document.getElementById('hide_and_show').style.display = "none";
            document.getElementById('right_8').classList.remove('col-8');
            document.getElementById('right_8').classList.add('col-12');
        }
    })

    //  Deleting notes
    document.getElementById('delete-note').addEventListener('click', function(){
        
        if(totalNotes.length > 1){

        deletedNote.push(totalNotes[currentList - 1])

        totalNotes.splice(currentList - 1, 1);

        document.querySelector('ol').removeChild(document.getElementById(currentList));
        
        for(var i = currentList - 1; i<totalNotes.length; i++){
            totalNotes[i].noteNumber = totalNotes[i].noteNumber - 1;
            document.querySelector('ol').children.item(i).id = totalNotes[i].noteNumber;
        }

        if(currentList == totalNotes.length + 1){
            currentList = currentList - 1;
        }

        let getElemWithClass = document.querySelector('.active-note');
            if (getElemWithClass !== null) {
                getElemWithClass.classList.remove('active-note');
            }
            //add the active class to the element from which click event triggered
        
        document.querySelector('ol').children.item(currentList - 1).classList.add('active-note')

        document.getElementById('mainText').value = totalNotes[currentList - 1].note;


        chrome.storage.sync.set({'text':totalNotes}, function(){
            console.log("changes saved");
        })

        chrome.storage.sync.set({'deleted': deletedNote}, function(){
            console.log("deleted also updated");
        })

        n = n - 1;
    }
})




    // Toggling buttons 
    $(".button-toggle").click(function(){
        $(this).toggleClass("active");
    });
    
    

});

