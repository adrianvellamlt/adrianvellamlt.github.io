import Profile from './models/profile';


async function Initialize(_: Event) {
    var profile = await Profile.Get();

    if (profile === null) return;

    console.debug(profile);

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const username = document.getElementById("username");

    if (firstName) firstName.innerText = profile.name.givenName;
    if (lastName) lastName.innerText = profile.name.familyName;
    if (username) username.innerText = profile.preferredUsername;

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