console.log('app.js');
fetch('./file/all').then((response) => {
    return response.json();
}).then ((json) => {
    console.log(json);
    json.forEach((file) => {
        // all infos from file list
        document.querySelector('#files').innerHTML += `<li class="gallery"> 
                                                                  <ul>                                                                
                                                                    <h2>${file.title}</h2>
                                                                        <form style="float: right">      
                                                                            <!--                                                                     
                                                                            <a href="/file/edit" style="padding-right: 45px">Edit</a>
                                                                            <a href="/file/delete" style="padding-right: 45px">Delete</a>
                                                                            -->
                                                                            <a href='/file/edit/${file._id}' style="padding-right: 45px">Edit</a>
                                                                            <a href='/file/delete/${file._id}' style="padding-right: 45px">Delete</a>
                                                                        </form>                                                                                                                            
                                                                    <img src="uploads/${file.imagename}" width="620" height="auto">                                                               
                                                                    <p>${file.description}</p>
                                                                    <p>${file.category}</p>
                                                                    <p>${file.location}</p>                                                                 
                                                                  </ul>
                                                               </li>`;
    });
});