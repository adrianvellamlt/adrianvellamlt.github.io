import Profile from './models/profile';


async function Initialize(_: Event) {
    document.getElementsByTagName("body")[0].innerHTML = `
    <div class="bg-g1 size1 flex-w flex-col-c-sb p-l-15 p-r-15 p-t-55 p-b-35 respon1">
        <span></span>
        <div class="flex-col-c p-t-50 p-b-50">
            <h3 id="username" class="txt-center l1-txt1 p-b-10"></h3>
            <p class="txt-center l1-txt2 p-b-60">
                website coming soon.
            </p>
        </div>
        <span id="websites" class="s1-txt3 txt-center"></span>
    </div>`;


    var profile = await Profile.Get();

    if (profile === null) return;

    console.debug(profile);

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const username = document.getElementById("username");

    if (firstName) firstName.innerText = profile.name.givenName;
    if (lastName) lastName.innerText = profile.name.familyName;
    if (username) {
        document.title = profile.preferredUsername;
        username.innerText = profile.preferredUsername;
    }

    const websites = document.getElementById("websites");

    if (websites && profile.urls)
    {
        for (const url of profile.urls)
        {
            websites.innerHTML += `<a href="${url.value}" target="_blank"><i class="fab fa-${url.title.toLowerCase()}-alt"></i>  ${url.value}</a>`;
        }
    }
}

window.onload = (event: Event) => 
{
    console.info("intializing");
    Initialize(event)
        .then(() => console.info("intialized!"))
        .catch(err => console.error("Error initializing: ", err));
}