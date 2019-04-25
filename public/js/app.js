console.log('app.js');
fetch('./file/all').then((response) => {
    return response.json();
}).then ((json) => {
    console.log(json);
    json.forEach((file) => {
        // all infos from file list
        document.querySelector('#files').innerHTML += `<li> 
                                                                  <ul>                                                                
                                                                    <h2>${file.title}</h2><br>     
                                                                    <img src="uploads/${file.imagename}">                                                               
                                                                    <p>${file.description}</p><br>
                                                                    <p>${file.category}</p><br>
                                                                    <p>${file.location}</p><br>                                                                  
                                                                    <h6>${file._id}</h6>
                                                                  </ul>
                                                               </li><br>`;
    });
});