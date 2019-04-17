console.log('app.js');
fetch('./file/all').then((response) => {
    return response.json();
}).then ((json) => {
    console.log(json);
    json.forEach((file) => {
        // all infos from file list
        document.querySelector('#files').innerHTML += `<li> 
                                                                  <ul>
                                                                    ${file.title} 
                                                                    ${file.description} 
                                                                    ${file.category} 
                                                                    ${file.location} 
                                                                    ${file.image}
                                                                  </ul>
                                                               </li><br>`;
    });
});