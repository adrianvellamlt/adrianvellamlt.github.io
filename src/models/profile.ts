import Config from '../config';

export default class Profile {
    readonly preferredUsername: string;
    readonly thumbnailUrl: URL;
    readonly photos: Array<ProfilePhoto>;
    readonly name: ProfileName;
    readonly displayName: string;
    readonly aboutMe: string;
    readonly currentLocation: string;
    readonly emails: Array<ProfileEmail>;
    readonly urls: Array<ProfileUrl>;

    constructor(
        preferredUsername: string,
        thumbnailUrl: URL,
        photos: Array<ProfilePhoto>,
        name: ProfileName,
        displayName: string,
        aboutMe: string,
        currentLocation: string,
        emails: Array<ProfileEmail>,
        urls: Array<ProfileUrl>
    ) {
        this.preferredUsername = preferredUsername;
        this.thumbnailUrl = thumbnailUrl;
        this.photos = photos;
        this.name = name;
        this.displayName = displayName;
        this.aboutMe = aboutMe;
        this.currentLocation = currentLocation;
        this.emails = emails;
        this.urls = urls;
    }

    public static async Get() {
        const response = await fetch(Config.gravatarUrl);

        const gravatarProfile = await response.json();

        return gravatarProfile.entry[0] as Profile;
    }
}

enum ProfilePhotoType {
    thumbnail
}

class ProfilePhoto {
    readonly type?: ProfilePhotoType;
    readonly value: URL

    constructor(value: URL, type?: ProfilePhotoType) {
        this.value = value;
        this.type = type;
    }
}

class ProfileName {
    readonly givenName: string;
    readonly familyName: string;
    readonly formatted: string;

    constructor(givenName: string, familyName: string, formatted: string) {
        this.givenName = givenName;
        this.familyName = familyName;
        this.formatted = formatted;
    }
}

class ProfileEmail {
    readonly primary: boolean;
    readonly value: string;

    constructor(value: string, primary: boolean = false) {
        this.primary = primary;
        this.value = value;
    }
}

class ProfileUrl {
    readonly title: string;
    readonly value: URL

    constructor(title: string, value: URL) {
        this.title = title;
        this.value = value;
    }
}