
    var n = 1;
    var totalNotes = [];

    class Notes{
        constructor(number, note){
            this.noteNumber = number;
            this.note = note;
        }
    }

$(function(){
     var currentList = 1;
    // Getting Elements from Chrome Storage Api and updating the popu page

    chrome.storage.sync.getBytesInUse(['text'], function(bytes){
        if(bytes !== 0){

            console.log('Inside if');
            chrome.storage.sync.get('text', function(data){
                // document.getElementById('mainText').innerHTML = data.text
                    console.log("inside storage");
                    for(var i = 1; i<=data.text.length;i++){
                        console.log("Inside For");
                        noteNew = new Notes(n, data.text[i-1].note);
                        totalNotes.push(noteNew);
                        document.getElementById('mainText').value = totalNotes[n - 1].note;
            
                        let li = document.createElement('li');
                        li.id = n;
                        li.className = "notesss";
                        li.innerHTML = "New Note";
                        document.getElementById('Notes').appendChild(li);
            
                        li.addEventListener('click', function(){
                            let getElemWithClass1 = document.querySelector('.active-note');
                            if(getElemWithClass1 != null){
                                getElemWithClass1.classList.remove('active-note');
                            }
                            li.classList.add('active-note');
                            currentList = li.id;
                            document.getElementById('mainText').value = totalNotes[li.id - 1].note;
                            document.getElementById('mainText').focus();
                        })
                        n = n+1;
                    }
        
            })

        }
        else{

            console.log("Inside else");
            // setting first list item and adding listeners to it
            noteNew = new Notes(n, `Type here ${n}`)
            totalNotes.push(noteNew);

            // <li id="1" class="active-note notesss">New Note</li>

            let li = document.createElement('li');
            li.id = n;
            li.className = "notesss active-note";
            li.innerHTML = "New Note";
            document.getElementById('Notes').appendChild(li);

            document.getElementById('1').addEventListener('click', function(){
                currentList = 1;
                document.getElementById('mainText').value = totalNotes[0].note;
                document.getElementById('mainText').focus();
            })
           

            // add lsiteners to list item onclick -> toggle class
            document.querySelectorAll('.notesss').forEach(function(item) {
                // iterate and add event lstener to each of them
                item.addEventListener('click', function(elem) {
                    console.log(elem);
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
        li.className = "notesss"
        li.innerHTML = 'New Note';
        document.getElementById('Notes').appendChild(li);
        
        // add listener to newly generated list item
        li.addEventListener('click', function(elem){
            // console.log(li.id);
            let getElemWithClass = document.querySelector('.active-note');
                if (getElemWithClass !== null) {
                    getElemWithClass.classList.remove('active-note');
                }
                //add the active class to the element from which click event triggered
            
            li.classList.add('active-note')
            // console.log(`list id numebr: ${li.id}`);
            currentList = li.id;
            document.getElementById('mainText').value = totalNotes[li.id - 1].note;
            document.getElementById('mainText').focus();

        })
        n = n+1;
    })



    document.getElementById('mainText').addEventListener('change', function(){

        totalNotes[currentList - 1].note = document.getElementById('mainText').value;

    })



    document.getElementById("mainText").addEventListener("change", function(event) {


        chrome.storage.sync.set({'text':totalNotes}, function(){
            console.log("changes saved");
        })

    });



    // Toggling buttons 
    $(".button-toggle").click(function(){
        $(this).toggleClass("active");
    });

});
