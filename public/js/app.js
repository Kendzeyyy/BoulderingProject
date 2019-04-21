console.log('app.js');
fetch('./file/all').then((response) => {
    return response.json();
}).then ((json) => {
    console.log(json);
    json.forEach((file) => {
        // all infos from file list
        document.querySelector('#files').innerHTML += `<li> 
                                                                  <ul>
                                                                    <h3>${file.title}</h3><br>
                                                                    <p>${file.description}</p><br>
                                                                    <p>${file.category}</p><br>
                                                                    <p>${file.location}</p><br>
                                                                    ${file.image}
                                                                  </ul>
                                                               </li><br>`;
    });
});