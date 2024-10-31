interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: "male" | "female" | "other";
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: BankDetails;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: "admin" | "moderator" | "user";
}

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface BankDetails {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}
