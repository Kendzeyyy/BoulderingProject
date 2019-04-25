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
                                                                    <img src="uploads/${file.imagename}" width="620" height="auto">                                                               
                                                                    <p>${file.description}</p>
                                                                    <p>${file.category}</p>
                                                                    <p>${file.location}</p>                                                                 
                                                                    <h6>ID: ${file._id}</h6>
                                                                  </ul>
                                                               </li>`;
    });
});