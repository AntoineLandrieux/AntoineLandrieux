var language = document.querySelectorAll("section#language > img");
var projectSection = document.querySelector("section#projects");
var loaded = [];

function update() {
    let data = "";
    if (loaded.length != 0) {
        let filtered_projects = projects.filter(function(project) {
            return project.language.some(function(lang) {
                return loaded.includes(lang);
            });
        });
        let matching_project = filtered_projects.map(function(project) {
            return project;
        });
        matching_project.forEach(function (Item) {
            data += `
<div class="project">
    <div class="proj">
        <span class="name">${Item.name}</span>
        <span class="desc">${Item.desc}</span>
    </div>
    <div class="btns">
        <a href="${Item.href}" target="_blank" class="btn">projet</a>`;
            if (Item.eula == true) {
                data += `
        <a href="${Item.eulaRel}" target="_blank" class="btn">eula</a>
                `;
            } else {
                data += `
        <span class="btn">eula</span>
                `;
            }
            data += ` 
    </div>
</div>`;
        });
    } else {
        projects.forEach(function (Item) {
            data += `
<div class="project">
    <div class="proj">
        <span class="name">${Item.name}</span>
        <span class="desc">${Item.desc}</span>
    </div>
    <div class="btns">
        <a href="${Item.href}" target="_blank" class="btn">projet</a>`;
            if (Item.eula == true) {
                data += `
        <a href="${Item.eulaRel}" target="_blank" class="btn">eula</a>
                `;
            } else {
                data += `
        <span class="btn">eula</span>
                `;
            }
            data += ` 
    </div>
</div>`;
        });
    }
    if (data == "") {
        data = `
<div class="error">
    <span class="errmsg">Nothing</span>
</div>
        `;
    }
    projectSection.innerHTML = data;
}

language.forEach(function (lang) {
    lang.addEventListener('click', function() {
        lang.classList.toggle("active");
        if (lang.classList.toString() == "active") {
            loaded.push(lang.getAttribute("alt"));
        } else {
            let index = loaded.indexOf(lang.getAttribute("alt"));
            loaded.splice(index, 1);
        }
        update();
    })
});

update();