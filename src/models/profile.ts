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
    readonly ims: Array<ProfileIM>;

    constructor(
        preferredUsername: string,
        thumbnailUrl: URL,
        photos: Array<ProfilePhoto>,
        name: ProfileName,
        displayName: string,
        aboutMe: string,
        currentLocation: string,
        emails: Array<ProfileEmail>,
        urls: Array<ProfileUrl>,
        ims: Array<ProfileIM>
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
        this.ims = ims;
    }

    public static async Get() {
        const response = await fetch(Config.gravatarUrl);

        const gravatarProfileJson = await response.json();

        if (gravatarProfileJson.entry.length === 0) return undefined;

        const gravatarProfile = gravatarProfileJson.entry[0] as Profile;

        return new Profile(
            gravatarProfile.preferredUsername,
            gravatarProfile.thumbnailUrl,
            gravatarProfile.photos,
            gravatarProfile.name,
            gravatarProfile.displayName,
            gravatarProfile.aboutMe,
            gravatarProfile.currentLocation,
            gravatarProfile.emails,
            gravatarProfile.urls,
            gravatarProfile.ims
        );
    }

    GetThumbnail(size?: number) {
        for (const photo of this.photos)
        {
            if (photo.type !== ProfilePhotoType.thumbnail) continue;

            if (size === undefined) return photo.value;

            return new URL(photo.value + `?s=${size}`);
        }

        return undefined;
    }
}

enum ProfilePhotoType {
    thumbnail = "thumbnail"
}

class ProfilePhoto {
    readonly type?: ProfilePhotoType;
    readonly value: URL

    constructor(value: URL, type?: ProfilePhotoType) {
        this.value = value;
        this.type = type;
    }
}

class ProfileIM {
    readonly type?: string;
    readonly value: string

    constructor(value: string, type: string) {
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