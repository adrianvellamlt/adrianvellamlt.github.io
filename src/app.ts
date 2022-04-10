import Profile from './models/profile';
import config from './config';
import tippy from 'tippy.js';


async function RenderUnderDevelopmentApp() {
    document.getElementsByTagName("body")[0].innerHTML = `
    <div class="bg-g1 size1 flex-w flex-col-c-sb p-l-15 p-r-15 p-t-55 p-b-35 respon1">
        <span></span>
        <div class="flex-col-c p-t-50 p-b-50">
            <h3 id="username" class="txt-center l1-txt1 p-b-10"></h3>
            <p class="txt-center l1-txt2 p-b-60">
                website under development. check back in later.
            </p>
        </div>
        <span id="websites" class="s1-txt3 txt-center"></span>
    </div>`;


    var profile = await Profile.Get();

    if (profile === undefined) return;

    const username = document.getElementById("username");

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

async function RenderProductionApp() {
    
    var profile = await Profile.Get();

    if (profile === undefined) return;

    const profileImageUrl = profile.GetThumbnail(512)?.toString();
    const profileImageUrlSml = profile.GetThumbnail(256)?.toString();

    const primaryEmail = profile.emails.filter(x => x.primary)[0].value;

    const body = document.querySelector("body");
    
    if (body === null) return;

    body.classList.add(
        "font-sans", 
        "antialiased", 
        "text-gray-900", 
        "leading-normal", 
        "tracking-wider", 
        "bg-cover", 
        "bg-g1"
    );
    
    //body.style.backgroundImage = "url('https://source.unsplash.com/MP0IUfwrn0A')";

    const mainContainer = document.createElement("div");

    mainContainer.classList.add(
        "max-w-4xl",
        "flex",
        "items-center",
        "h-auto",
        "lg:h-screen",
        "flex-wrap",
        "mx-auto",
        "my-32",
        "lg:my-0"
    );

    const contentContainer = document.createElement("div");

    contentContainer.id = "profile-card";

    contentContainer.classList.add(
        "w-full",
        "rounded-lg",
        "shadow-2xl",
        "bg-white",
        "opacity-75",
        "mx-auto",
        "flex",
        "items-center"
    );

    const profileContainer = document.createElement("div");

    profileContainer.classList.add(
        "w-full",
        "lg:w-3/5",
        "mx-6",
        "lg:mx-0"
    );

    const innerProfileContainer = document.createElement("div");

    innerProfileContainer.classList.add("p-4", "md:p-12", "text-center", "lg:text-left");

    // image for mobile view
    innerProfileContainer.innerHTML += `<div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
        style="background-image: url('${profileImageUrlSml}')"></div>`;

    // name
    innerProfileContainer.innerHTML += `<h1 class="text-3xl font-bold pt-8 lg:pt-0">${profile.name.formatted}</h1>`;

    // horizontal line
    innerProfileContainer.innerHTML += `<div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-pink-500 opacity-25"></div>`;

    // job title
    innerProfileContainer.innerHTML += 
    `<p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
        <i class="fa-solid fa-laptop-code"></i>
        &nbsp;&nbsp;Senior Software Engineer
    </p>`;

    // location
    innerProfileContainer.innerHTML += 
    `<p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
        <i class="fa-solid fa-map-location"></i>
        &nbsp;&nbsp;${profile.currentLocation}
    </p>`;

    // about me
    innerProfileContainer.innerHTML += `<p class="pt-8 text-sm">${profile.aboutMe}</p>`;

    // get in touch
    innerProfileContainer.innerHTML += 
    `<div class="pt-12 pb-8">
        <button class="bg-pink-700 hover:bg-[#249da9] text-white font-bold py-2 px-4 rounded-full">
            Get in touch!
        </button>
    </div>`;

    const contactSection = document.createElement("div");

    contactSection.classList.add(
        "mt-6", 
        "pb-16", 
        "lg:pb-0", 
        "w-4/5", 
        "lg:w-full", 
        "mx-auto", 
        "flex", 
        "flex-wrap", 
        "items-center", 
        "justify-around"
    );

    // contacts

    const emailMailTo = `mailto:${primaryEmail}?subject=Hey Adrian!`;

    contactSection.innerHTML += `<a class="link" href="${emailMailTo}" data-tippy-content="${primaryEmail}"><i class="fa-solid fa-at"></i></a>`;

    for (const url of profile.urls)
    {
        contactSection.innerHTML += `<a class="link" href="${url.value}" data-tippy-content="${url.title}"><i class="fa-brands fa-${url.title.toLowerCase()}"></i></a>`;
    }

    for (const im of profile.ims)
    {
        contactSection.innerHTML += `<a class="link" href="${im.value}" data-tippy-content="${im.value}"><i class="fa-brands fa-${im.type}"></i></a>`;
    }

    innerProfileContainer.append(contactSection);

    profileContainer.appendChild(innerProfileContainer);

    const imageContainer = document.createElement("div");

    imageContainer.classList.add(
        "w-full",
        "lg:w-2/5",
        "mx-6",
        "lg:mx-0"
    );

    imageContainer.innerHTML = 
    `<div class="p-4 md:p-12">
        <img src="${profileImageUrl}" class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block">
    </div>`;

    contentContainer.appendChild(profileContainer);
    contentContainer.appendChild(imageContainer);

    const topFunctionsContainer = document.createElement("div");

    topFunctionsContainer.classList.add(
        "absolute",
        "top-0",
        "right-0",
        "h-12",
        "w-18",
        "p-4"
    );

    topFunctionsContainer.innerHTML = `<button class="js-change-theme focus:outline-none" data-tippy-content="Change Theme">🌙</button>`;

    mainContainer.appendChild(contentContainer);
    mainContainer.appendChild(topFunctionsContainer);

    body.appendChild(mainContainer);

    //toggle theme
    const toggle = document.querySelector('.js-change-theme');
    const profileSection = document.getElementById('profile-card');

    if (toggle === null  || profileSection === null) return;

    toggle.addEventListener('click', () => {

        if (body.classList.contains('text-gray-900')) {
            toggle.innerHTML = "☀️";
            body.classList.remove('text-gray-900');
            body.classList.add('text-gray-100');
            profileSection.classList.remove('bg-white');
            profileSection.classList.add('bg-gray-900');
        } else {
            toggle.innerHTML = "🌙";
            body.classList.remove('text-gray-100');
            body.classList.add('text-gray-900');
            profileSection.classList.remove('bg-gray-900');
            profileSection.classList.add('bg-white');

        }
    });

    //tooltips
    tippy('.link', { placement: 'bottom', theme: 'my-theme' });
    tippy('.js-change-theme', { placement: 'bottom', theme: 'my-theme' });
}

function Initialize(_: Event) {
    switch (config.appStatus)
    {
        default:
        case "under_development":
            return RenderUnderDevelopmentApp();
        case "production":
            return RenderProductionApp();
    }
}

window.onload = (event: Event) => 
{
    console.info("intializing");
    Initialize(event)
        .then(() => console.info("intialized!"))
        .catch(err => console.error("Error initializing: ", err));
}