console.log('app.js');
fetch('./file/all').then((response) => {
    return response.json();
}).then ((json) => {
    console.log(json);
    json.forEach((file) => {
        // all infos from list
        document.querySelector('#files').innerHTML += `<ul> ${file.title} 
                                                                    ${file.description} 
                                                                    ${file.category} 
                                                                    ${file.location} 
                                                                    ${file.image}</ul><br>`;
    });
});