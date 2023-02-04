type Rating = { average: number };

export type Show_Cast = {
  cast: {id: number, person: Person[]}
  show: Shows
}

export type Shows = {
    id:             number;
    name:           string;
    type:           string;
    language:       string;
    genres:         string[];
    rating:         Rating;
    image:          Image;
    summary:        string
};

export type Cast = {
    person?:    Person;
    character: Character;
}

export interface Character {
    id:     number;
    url:    string;
    name:   string;
    image:  null;
}

export type Person = {
    id:       number;
    name:     string;
    image:    Image | null;
}

export type Image = {
    medium:   string;
    original: string;
}
