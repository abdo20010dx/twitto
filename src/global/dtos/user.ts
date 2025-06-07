export enum OauthType {
    google = "google",
    facebook = "facebook",
    linkedin = "linkedin",
    twitter = "twitter"
}

export class User {
    name?: string
    oauthId?: string;
    oauthType?: OauthType;
    address?: string = 'default address'
    email?: string
    password?: string
    age?: string
    phone?: string
    language?: string
    country?: string
    image?: string = 'image.jpg'
}